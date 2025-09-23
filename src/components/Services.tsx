import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Server, Code2, MessageSquare, Database, Shield, Cpu, Settings } from "lucide-react";
import SimpleBackground from "@/components/ui/SimpleBackground";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "Assistentes Virtuais com IA",
      description: "Chatbots inteligentes para atendimento automatizado, suporte ao cliente e automação de conversas com tecnologia de ponta.",
      features: ["ChatGPT Integration", "Processamento Natural", "Multi-canal", "Aprendizado Contínuo"]
    },
    {
      icon: Settings,
      title: "Automações Empresariais",
      description: "Otimize processos internos, automatize tarefas repetitivas e aumente a produtividade da sua equipe.",
      features: ["Workflows Automáticos", "API Integration", "Processos Customizados", "Relatórios Automáticos"]
    },
    {
      icon: Code2,
      title: "Desenvolvimento Sob Medida",
      description: "Soluções de software personalizadas para atender às necessidades específicas do seu negócio.",
      features: ["Aplicações Web", "APIs Customizadas", "Integrações", "Arquitetura Escalável"]
    },
    {
      icon: Database,
      title: "Consultoria em TI",
      description: "Orientação estratégica em tecnologia para impulsionar o crescimento e inovação da sua empresa.",
      features: ["Análise Tecnológica", "Planejamento Estratégico", "Auditoria de Sistemas", "Melhores Práticas"]
    },
    {
      icon: Server,
      title: "Infraestrutura e Servidores",
      description: "Alocação e gerenciamento de servidores, cloud computing e infraestrutura de TI completa.",
      features: ["Cloud Computing", "Backup Automático", "Monitoramento 24/7", "Escalabilidade"]
    }
  ];

  return (
    <section id="servicos" className="py-20 relative overflow-hidden">
      {/* Simple Background Effect */}
      <SimpleBackground className="opacity-60" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções completas em tecnologia para transformar e modernizar seu negócio com as mais avançadas ferramentas do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden bg-gradient-card border-quantum-light/20 hover:shadow-quantum transition-all duration-300 group hover:-translate-y-2"
            >
              <CardHeader>
                <div className="p-3 rounded-full bg-gradient-quantum w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-quantum-bright transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-quantum-bright rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline_quantum" 
                  className="w-full track-link"
                  onClick={() => {
                    // Analytics tracking
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'service_click', {
                        'service_name': service.title
                      });
                    }
                    
                    // Navigate to service page
                    let servicePath = '';
                    if (service.title === 'Assistentes Virtuais com IA') {
                      servicePath = '/servicos/assistente-ia';
                    } else if (service.title === 'Automações Empresariais') {
                      servicePath = '/servicos/automacoes';
                    } else if (service.title === 'Desenvolvimento Sob Medida') {
                      servicePath = '/servicos/desenvolvimento';
                    } else {
                      // For other services, scroll to contact
                      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                      return;
                    }
                    
                    window.location.href = servicePath;
                  }}
                >
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="quantum" 
            size="xl"
            className="track-link"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'contact_team_click', {
                  'source': 'services_section'
                });
              }
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Fale com Nossa Equipe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;