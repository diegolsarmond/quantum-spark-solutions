#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SRC_DIR = path.resolve(process.cwd(), 'src');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.ts');

let childProcess = null;
let pendingRestart = false;
let restartTimer = null;

const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[dev ${timestamp}] ${message}`);
};

const startServer = () => {
  childProcess = spawn(process.execPath, ['--loader', 'ts-node/esm', ENTRY_FILE], {
    stdio: 'inherit',
  });

  childProcess.on('exit', (code, signal) => {
    const requestedRestart = pendingRestart;
    pendingRestart = false;

    if (requestedRestart) {
      startServer();
      return;
    }

    if (signal) {
      log(`server exited due to signal ${signal}`);
    } else if (code !== 0) {
      log(`server exited with code ${code}`);
    }
  });

  childProcess.on('error', (error) => {
    log(`failed to start server: ${error.message}`);
  });

  log('development server started');
};

const stopServer = () => {
  if (!childProcess) {
    return;
  }

  const terminated = childProcess.kill('SIGTERM');
  if (!terminated) {
    pendingRestart = false;
  }
};

const restartServer = () => {
  if (!childProcess || childProcess.killed) {
    startServer();
    return;
  }

  pendingRestart = true;
  stopServer();
};

const scheduleRestart = (filePath) => {
  if (restartTimer) {
    clearTimeout(restartTimer);
  }

  restartTimer = setTimeout(() => {
    restartTimer = null;
    log(`change detected in ${path.relative(process.cwd(), filePath)} - restarting`);
    restartServer();
  }, 150);
};

const watchers = new Map();

const closeWatcher = (dir) => {
  const watcher = watchers.get(dir);
  if (watcher) {
    watcher.close();
    watchers.delete(dir);
  }
};

const closeDescendantWatchers = (dir) => {
  for (const watchedDir of Array.from(watchers.keys())) {
    if (watchedDir.startsWith(dir)) {
      closeWatcher(watchedDir);
    }
  }
};

const watchDirectory = async (dir) => {
  if (watchers.has(dir)) {
    return;
  }

  const watcher = watch(dir, { persistent: true }, async (eventType, filename) => {
    if (!filename) {
      return;
    }

    const name = filename.toString();
    const fullPath = path.join(dir, name);

    if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      scheduleRestart(fullPath);
    }

    if (eventType === 'rename') {
      try {
        const fileStats = await stat(fullPath);
        if (fileStats.isDirectory()) {
          await watchDirectory(fullPath);
        }
      } catch (error) {
        if (error && error.code === 'ENOENT') {
          closeDescendantWatchers(fullPath + path.sep);
        }
      }
    }
  });

  watchers.set(dir, watcher);

  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => watchDirectory(path.join(dir, entry.name))),
  );
};

const bootstrap = async () => {
  await watchDirectory(SRC_DIR);
  startServer();
};

const shutdown = () => {
  for (const watcher of watchers.values()) {
    watcher.close();
  }
  watchers.clear();

  if (childProcess) {
    childProcess.kill('SIGTERM');
  }
};

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

bootstrap().catch((error) => {
  log(`failed to start watcher: ${error.message}`);
  process.exit(1);
});
