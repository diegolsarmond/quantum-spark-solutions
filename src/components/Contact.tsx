import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SimpleBackground from "@/components/ui/SimpleBackground";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contato@quantumtecnologia.com.br",
      description: "Resposta em até 2 horas úteis"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(31) 99305-4200",
      description: "Segunda a sexta, 8h às 18h"
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "R. Antônio de Albuquerque, 330 - Sala 901, Savassi",
      description: "Belo Horizonte - MG, 30112-010"
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg - Sex: 8h às 18h",
      description: "Suporte técnico 24/7"
    }
  ];

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      {/* Simple Background Effect */}
      <SimpleBackground className="opacity-70" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pronto para transformar seu negócio? Nossa equipe está aqui para ajudar você a encontrar a solução perfeita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-quantum-light/20 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Solicite um Orçamento
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Preencha o formulário e entraremos em contato em até 2 horas úteis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome
                  </label>
                  <Input placeholder="Seu nome completo" className="border-quantum-light/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="seu@email.com" className="border-quantum-light/30" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Telefone
                  </label>
                  <Input placeholder="(11) 99999-9999" className="border-quantum-light/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Empresa
                  </label>
                  <Input placeholder="Nome da sua empresa" className="border-quantum-light/30" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Serviço de Interesse
                </label>
                <select className="w-full p-3 rounded-md border border-quantum-light/30 bg-background text-foreground">
                  <option>Selecione um serviço</option>
                  <option>Assistente Virtual com IA</option>
                  <option>Automações Empresariais</option>
                  <option>Desenvolvimento Sob Medida</option>
                  <option>CRM para Advogados</option>
                  <option>Consultoria em TI</option>
                  <option>Infraestrutura e Servidores</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Mensagem
                </label>
                <Textarea 
                  placeholder="Conte-nos mais sobre seu projeto e suas necessidades..." 
                  className="min-h-[120px] border-quantum-light/30"
                />
              </div>

              <Button variant="quantum" size="lg" className="w-full">
                Enviar Solicitação
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Unified Contact Card */}
            <Card className="bg-gradient-card border-quantum-light/20 hover:shadow-card transition-all duration-300 group hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Informações de Contato
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Entre em contato conosco pelos canais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                    <div className="p-3 rounded-full bg-gradient-quantum group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-quantum-bright transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-foreground font-medium mb-1 break-words">
                        {info.info}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-quantum text-white border-0 shadow-quantum">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Precisa de Atendimento Imediato?
                </h3>
                <p className="mb-6 text-white/90">
                  Nossa equipe está pronta para atender suas necessidades urgentes
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline_quantum" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-quantum-deep track-link"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'whatsapp_click', {
                          'source': 'contact_section'
                        });
                      }
                      window.open('https://wa.me/5531993054200?text=Olá! Gostaria de saber mais sobre os serviços da Quantum Tecnologia.', '_blank');
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button variant="outline_quantum" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-quantum-deep track-link"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'phone_click', {
                          'source': 'contact_section'
                        });
                      }
                      window.open('tel:5531993054200', '_self');
                    }}
                  >
                    Ligar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;