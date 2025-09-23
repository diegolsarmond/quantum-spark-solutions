interface SimpleBackgroundProps {
  className?: string;
  intensity?: number;
}

const SimpleBackground = ({ 
  className = '', 
}: SimpleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-quantum-deep/30 via-background to-quantum-cyan/20"></div>
      
      {/* Static animated shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-quantum-bright/30 to-quantum-cyan/20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-2xl bg-gradient-to-r from-quantum-cyan/25 to-quantum-bright/15 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full opacity-10 blur-xl bg-gradient-to-r from-quantum-medium/20 to-quantum-light/10 animate-blob" style={{animationDelay: '4s'}}></div>
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
    </div>
  );
};

export default SimpleBackground;