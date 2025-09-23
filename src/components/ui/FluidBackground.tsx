import { useEffect, useRef } from 'react';

interface FluidBackgroundProps {
  className?: string;
  intensity?: number;
}

const FluidBackground = ({ 
  className = '', 
  intensity = 1 
}: FluidBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const animateGradient = () => {
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      
      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--mouse-x', `${targetX}%`);
        container.style.setProperty('--mouse-y', `${targetY}%`);
      }
      
      requestAnimationFrame(animateGradient);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateGradient();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-quantum-deep/30 via-background to-quantum-cyan/20"></div>
      
      {/* Animated fluid shapes */}
      <div className="absolute inset-0">
        {/* Primary blob */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-blob"
          style={{
            background: 'radial-gradient(circle, hsl(var(--quantum-bright)) 0%, hsl(var(--quantum-cyan)) 50%, transparent 70%)',
            left: 'var(--mouse-x)',
            top: 'var(--mouse-y)',
            transform: 'translate(-50%, -50%)',
            animationDelay: '0s'
          }}
        />
        
        {/* Secondary blob */}
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-2xl animate-blob"
          style={{
            background: 'radial-gradient(circle, hsl(var(--quantum-cyan)) 0%, hsl(var(--quantum-bright)) 50%, transparent 70%)',
            right: `calc(100% - var(--mouse-x) - 20%)`,
            top: `calc(var(--mouse-y) + 10%)`,
            transform: 'translate(50%, -50%)',
            animationDelay: '2s'
          }}
        />
        
        {/* Tertiary blob */}
        <div 
          className="absolute w-72 h-72 rounded-full opacity-10 blur-xl animate-blob"
          style={{
            background: 'radial-gradient(circle, hsl(var(--quantum-medium)) 0%, hsl(var(--quantum-light)) 50%, transparent 70%)',
            left: `calc(var(--mouse-x) + 30%)`,
            bottom: `calc(100% - var(--mouse-y) - 30%)`,
            transform: 'translate(-50%, 50%)',
            animationDelay: '4s'
          }}
        />
      </div>
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-4 h-4 rotate-45 bg-quantum-bright/30 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rotate-12 bg-quantum-cyan/25 animate-float-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rotate-45 bg-quantum-bright/20 animate-float-slow" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 rotate-12 bg-quantum-medium/30 animate-float-slow" style={{animationDelay: '3.5s'}}></div>
        
        {/* Circles */}
        <div className="absolute top-1/6 right-1/6 w-2 h-2 rounded-full bg-quantum-cyan/40 animate-pulse-smooth"></div>
        <div className="absolute bottom-1/4 right-1/2 w-3 h-3 rounded-full bg-quantum-bright/35 animate-pulse-smooth" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 rounded-full bg-quantum-medium/40 animate-pulse-smooth" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>
      
      {/* Interactive gradient layer */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              hsl(var(--quantum-bright) / 0.15),
              hsl(var(--quantum-cyan) / 0.1) 40%,
              transparent 70%
            )
          `
        }}
      />
    </div>
  );
};

export default FluidBackground;