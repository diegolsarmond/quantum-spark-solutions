import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Scale, Users, FileText, Calendar, Gavel } from "lucide-react";

const CRMPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "R$ 299",
      period: "/mês",
      description: "Ideal para advogados autônomos e pequenos escritórios",
      popular: false,
      features: [
        "Até 3 usuários",
        "Gestão de até 100 processos",
        "Calendário jurídico básico",
        "Controle de prazos",
        "Relatórios básicos",
        "Suporte por email",
        "Backup automático"
      ],
      icon: Scale
    },
    {
      name: "Professional",
      price: "R$ 599",
      period: "/mês",
      description: "Para escritórios em crescimento com demandas mais complexas",
      popular: true,
      features: [
        "Até 10 usuários",
        "Gestão ilimitada de processos",
        "Calendário jurídico avançado",
        "Controle de prazos automático",
        "Gestão financeira completa",
        "Relatórios avançados",
        "Integração com TRTs",
        "Suporte prioritário",
        "Assinatura digital",
        "API para integrações"
      ],
      icon: Users
    },
    {
      name: "Enterprise",
      price: "R$ 1.199",
      period: "/mês",
      description: "Solução completa para grandes escritórios e departamentos jurídicos",
      popular: false,
      features: [
        "Usuários ilimitados",
        "Todos os recursos Professional",
        "BI e Analytics avançado",
        "Automações personalizadas",
        "Integração com sistemas ERP",
        "Consultoria especializada",
        "Treinamento da equipe",
        "SLA garantido",
        "Customizações sob demanda",
        "Suporte 24/7"
      ],
      icon: Gavel
    }
  ];

  const additionalFeatures = [
    {
      icon: FileText,
      title: "Gestão de Documentos",
      description: "Organize e controle todos os documentos do processo de forma digital e segura"
    },
    {
      icon: Calendar,
      title: "Calendário Jurídico",
      description: "Nunca mais perca um prazo com alertas automáticos e sincronização completa"
    },
    {
      icon: Users,
      title: "Controle de Equipe",
      description: "Gerencie tarefas, prazos e responsabilidades de toda sua equipe jurídica"
    }
  ];

  return (
    <section id="crm-advogados" className="py-20 bg-gradient-to-br from-quantum-light/50 to-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            CRM para Advogados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Sistema completo de gestão jurídica desenvolvido especificamente para escritórios de advocacia, 
            com todas as funcionalidades que você precisa para otimizar sua prática jurídica.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-gradient-quantum">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-quantum-bright shadow-quantum scale-105' 
                  : 'border-quantum-light/20 hover:shadow-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-gradient-quantum text-white px-4 py-1">
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
                  plan.popular ? 'bg-gradient-quantum' : 'bg-quantum-light'
                }`}>
                  <plan.icon className={`h-8 w-8 ${
                    plan.popular ? 'text-white' : 'text-quantum-bright'
                  }`} />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${
                    plan.popular ? 'text-quantum-bright' : 'text-foreground'
                  }`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-quantum-bright mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? "quantum" : "outline_quantum"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? "Começar Agora" : "Solicitar Demo"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-gradient-card rounded-2xl p-8 border border-quantum-light/20">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Precisa de uma solução personalizada?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Desenvolvemos CRMs totalmente customizados para atender às necessidades específicas do seu escritório. 
            Entre em contato para discutirmos sua solução ideal.
          </p>
          <Button variant="quantum" size="xl">
            Solicitar Orçamento Personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CRMPlans;