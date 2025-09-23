import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Building2, ArrowRight, Users, FileText, Shield, BarChart3 } from "lucide-react";
import FluidBackground from "@/components/ui/FluidBackground";

const CRMAdvogados = () => {
  const plans = [
    {
      name: "Starter",
      price: "R$ 197",
      period: "/mês",
      description: "Ideal para advogados autônomos e pequenos escritórios",
      icon: Zap,
      features: [
        "Gestão de até 500 clientes",
        "Controle de processos básico",
        "Agenda integrada",
        "Relatórios essenciais",
        "Suporte por email",
        "1 usuário incluso"
      ],
      highlight: false,
      color: "from-quantum-medium to-quantum-bright"
    },
    {
      name: "Professional",
      price: "R$ 397",
      period: "/mês",
      description: "Para escritórios em crescimento que precisam de mais recursos",
      icon: Crown,
      features: [
        "Gestão ilimitada de clientes",
        "Controle avançado de processos",
        "Automações inteligentes",
        "Relatórios avançados com BI",
        "Integração com tribunais",
        "Até 5 usuários inclusos",
        "App mobile completo",
        "Suporte prioritário"
      ],
      highlight: true,
      color: "from-quantum-deep to-quantum-cyan"
    },
    {
      name: "Enterprise",
      price: "R$ 697",
      period: "/mês",
      description: "Solução completa para grandes escritórios e departamentos jurídicos",
      icon: Building2,
      features: [
        "Todos os recursos Professional",
        "Usuários ilimitados",
        "Customizações avançadas",
        "API completa para integrações",
        "Gestão financeira avançada",
        "Compliance e auditoria",
        "Treinamento dedicado",
        "Suporte 24/7 com SLA"
      ],
      highlight: false,
      color: "from-quantum-bright to-quantum-cyan"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Centralize todas as informações dos seus clientes em um só lugar"
    },
    {
      icon: FileText,
      title: "Controle de Processos",
      description: "Acompanhe todos os processos jurídicos com prazos e alertas automáticos"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de nível bancário"
    },
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Dashboards e relatórios que ajudam na tomada de decisões"
    }
  ];

  return (
    <section id="crm-advogados" className="py-20 relative overflow-hidden">
      {/* Fluid Background Effect */}
      <FluidBackground className="opacity-75" intensity={1} />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-quantum text-white text-sm font-medium mb-6 animate-pulse-glow">
            <Shield className="h-4 w-4 mr-2" />
            CRM Especializado para Advogados
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-quantum bg-clip-text text-transparent animate-gradient">
            Gerencie seu Escritório com Eficiência Total
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Sistema completo de gestão jurídica com automações inteligentes, 
            controle de processos e relatórios avançados. Desenvolvido especificamente 
            para as necessidades de escritórios de advocacia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center bg-gradient-card border-quantum-light/20 hover:shadow-quantum transition-all duration-300 group hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="p-4 rounded-full bg-gradient-quantum w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-quantum-bright transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 group hover:-translate-y-2 ${
                plan.highlight 
                  ? 'border-quantum-bright/50 shadow-quantum scale-105 ring-1 ring-quantum-bright/20' 
                  : 'border-quantum-light/20 hover:shadow-card'
              }`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-quantum-bright to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-quantum-bright text-white">
                      Mais Popular
                    </span>
                  </div>
                </>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`p-4 rounded-full bg-gradient-to-r ${plan.color} w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-quantum-bright transition-colors">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 px-4">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-quantum-bright flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.highlight ? "quantum" : "outline_quantum"} 
                  size="lg" 
                  className="w-full group track-link"
                  onClick={() => {
                    // Analytics tracking
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'crm_plan_click', {
                        'plan_name': plan.name,
                        'plan_price': plan.price
                      });
                    }
                    // Scroll to contact
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Teste Grátis por 14 dias
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-quantum text-white border-0 shadow-quantum max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Precisa de uma Solução Personalizada?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Desenvolvemos CRMs sob medida para escritórios com necessidades específicas. 
                Fale conosco e descubra como podemos criar a solução perfeita para seu escritório.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  variant="outline_quantum" 
                  size="xl" 
                  className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-quantum-deep track-link"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'custom_crm_click', {
                        'source': 'crm_section'
                      });
                    }
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Solicitar Orçamento Personalizado
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  variant="outline_quantum" 
                  size="xl" 
                  className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-quantum-deep track-link"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'demo_request', {
                        'source': 'crm_section'
                      });
                    }
                    window.open('https://wa.me/5531993054200?text=Olá! Gostaria de iniciar o teste grátis de 14 dias do CRM para advogados.', '_blank');
                  }}
                >
                  Teste Grátis por 14 dias
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CRMAdvogados;