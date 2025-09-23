import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Lightbulb, Target } from "lucide-react";
import FluidBackground from "@/components/ui/FluidBackground";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Sempre na vanguarda da tecnologia, utilizando as ferramentas mais avançadas do mercado"
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Focamos em entregar soluções que geram impacto real e mensurável para nossos clientes"
    },
    {
      icon: Users,
      title: "Parceria",
      description: "Trabalhamos lado a lado com nossos clientes, como verdadeiros parceiros de negócio"
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Comprometimento com a qualidade e excelência em cada projeto que desenvolvemos"
    }
  ];

  return (
    <section id="sobre" className="py-20 relative overflow-hidden">
      {/* Fluid Background Effect */}
      <FluidBackground className="opacity-50" intensity={0.6} />
      
      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-quantum bg-clip-text text-transparent">
              Sobre a Quantum Tecnologia
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Somos uma empresa especializada em soluções tecnológicas avançadas, 
              com foco em inteligência artificial, automações e desenvolvimento de software sob medida.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nossa missão é transformar negócios através da tecnologia, oferecendo soluções 
              inovadoras que aumentam a eficiência, reduzem custos e impulsionam o crescimento 
              de nossos clientes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="quantum" size="lg">
                Nossa História
              </Button>
              <Button variant="outline_quantum" size="lg">
                Nosso Time
              </Button>
            </div>
          </div>

          {/* Right Column - Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-quantum-light/20 hover:shadow-card transition-all duration-300 group hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-full bg-gradient-quantum w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-quantum-bright transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div className="group">
            <div className="text-4xl font-bold text-quantum-bright mb-2 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-muted-foreground">Projetos Entregues</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-quantum-bright mb-2 group-hover:scale-110 transition-transform duration-300">
              5+
            </div>
            <div className="text-muted-foreground">Anos de Experiência</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-quantum-bright mb-2 group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-muted-foreground">Satisfação dos Clientes</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-quantum-bright mb-2 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-muted-foreground">Suporte Técnico</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;