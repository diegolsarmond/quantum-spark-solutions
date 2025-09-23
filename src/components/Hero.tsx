import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Bot, Code } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-bright/20 via-quantum-cyan/10 to-transparent animate-pulse-slow"></div>
        
        {/* Floating orbs with animation */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-quantum-cyan/20 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-quantum-bright/15 rounded-full blur-3xl animate-float opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-quantum-cyan/15 rounded-full blur-2xl animate-float opacity-50" style={{animationDelay: '4s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--quantum-cyan)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-quantum-cyan/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-quantum-bright/60 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-quantum-cyan/50 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-quantum-bright/40 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Glow effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-quantum-bright/5 to-transparent animate-pulse-glow"></div>
      </div>
      
      <div className="container px-4 text-center text-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transforme seu negócio com{" "}
            <span className="bg-gradient-to-r from-quantum-cyan to-quantum-bright bg-clip-text text-transparent">
              IA e Automação
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Soluções completas em tecnologia: assistentes virtuais com IA, automações empresariais, 
            desenvolvimento sob medida e CRM especializado para advogados.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="group">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline_quantum" size="xl">
              Nossos Serviços
            </Button>
          </div>

          {/* Features Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur group-hover:bg-white/20 transition-all duration-300">
                <Bot className="h-8 w-8 text-quantum-cyan" />
              </div>
              <h3 className="text-lg font-semibold">IA & Assistentes Virtuais</h3>
              <p className="text-white/80 text-center">Automatize conversas e processos com inteligência artificial avançada</p>
            </div>
            
            <div className="flex flex-col items-center space-y-4 group">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur group-hover:bg-white/20 transition-all duration-300">
                <Zap className="h-8 w-8 text-quantum-cyan" />
              </div>
              <h3 className="text-lg font-semibold">Automações Empresariais</h3>
              <p className="text-white/80 text-center">Otimize processos e aumente a eficiência da sua empresa</p>
            </div>
            
            <div className="flex flex-col items-center space-y-4 group">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur group-hover:bg-white/20 transition-all duration-300">
                <Code className="h-8 w-8 text-quantum-cyan" />
              </div>
              <h3 className="text-lg font-semibold">Desenvolvimento Sob Medida</h3>
              <p className="text-white/80 text-center">Soluções personalizadas para as necessidades do seu negócio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;