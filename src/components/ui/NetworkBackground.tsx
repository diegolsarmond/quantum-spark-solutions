import { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
}

const NetworkBackground = ({ 
  className = '', 
  particleCount = 50,
  connectionDistance = 120 
}: NetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
  }>>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isAnimating = true;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    const initParticles = () => {
      if (!canvas) return;
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticle = (particle: any) => {
      if (!ctx) return;
      try {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.6)`;
        ctx.fill();
      } catch (error) {
        console.warn('Canvas drawing error:', error);
      }
    };

    const drawConnection = (p1: any, p2: any, distance: number) => {
      if (!ctx) return;
      try {
        const opacity = Math.max(0, 1 - distance / connectionDistance);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `hsla(${180 + Math.sin(Date.now() * 0.001) * 40}, 70%, 50%, ${opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } catch (error) {
        console.warn('Canvas connection drawing error:', error);
      }
    };

    const updateParticles = () => {
      if (!canvas) return;
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x));
        particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y));
      });
    };

    const animate = () => {
      if (!isAnimating || !ctx || !canvas) return;
      
      try {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        updateParticles();

        // Draw connections
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            
            if (distance < connectionDistance) {
              drawConnection(p1, p2, distance);
            }
          }
        }

        // Draw particles
        particlesRef.current.forEach(drawParticle);

        if (isAnimating) {
          animationRef.current = requestAnimationFrame(animate);
        }
      } catch (error) {
        console.warn('Animation error:', error);
        isAnimating = false;
      }
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    try {
      resizeCanvas();
      initParticles();
      animate();

      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.warn('NetworkBackground initialization error:', error);
    }

    return () => {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, connectionDistance]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-quantum-deep/40 via-background to-quantum-cyan/20"></div>
      
      {/* Animated network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Additional overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-quantum-bright/5 via-transparent to-quantum-cyan/5 animate-pulse-glow"></div>
      
      {/* Geometric overlay pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, hsl(var(--quantum-cyan)) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, hsl(var(--quantum-bright)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px'
        }}
      />
    </div>
  );
};

export default NetworkBackground;