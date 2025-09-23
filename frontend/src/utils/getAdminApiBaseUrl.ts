const DEFAULT_ADMIN_API_PATH = "/api/admin";

const stripTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

export const getAdminApiBaseUrl = (rawBaseUrl: string | undefined) => {
  if (!rawBaseUrl || rawBaseUrl.trim().length === 0) {
    return DEFAULT_ADMIN_API_PATH;
  }

  const trimmed = stripTrailingSlashes(rawBaseUrl.trim());

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const currentPath = stripTrailingSlashes(url.pathname);

      if (!currentPath) {
        url.pathname = DEFAULT_ADMIN_API_PATH;
      } else {
        url.pathname = currentPath;
      }

      url.search = "";
      url.hash = "";

      return stripTrailingSlashes(url.toString());
    } catch (error) {
      console.warn("Invalid VITE_API_BASE_URL provided. Falling back to default.", error);
      return DEFAULT_ADMIN_API_PATH;
    }
  }

  if (trimmed === "") {
    return DEFAULT_ADMIN_API_PATH;
  }

  if (trimmed === "/") {
    return DEFAULT_ADMIN_API_PATH;
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export default getAdminApiBaseUrl;
