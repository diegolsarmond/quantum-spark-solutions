import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Server,
  Code2,
  MessageSquare,
  Database,
  Shield,
  Cpu,
  Settings,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SimpleBackground from "@/components/ui/SimpleBackground";
import { useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { getGtag } from "@/lib/gtag";

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  Bot,
  server: Server,
  Server,
  code: Code2,
  code2: Code2,
  Code2,
  message: MessageSquare,
  messagesquare: MessageSquare,
  MessageSquare,
  database: Database,
  Database,
  shield: Shield,
  Shield,
  cpu: Cpu,
  Cpu,
  settings: Settings,
  Settings,
};

const getIconComponent = (iconName: string | undefined): LucideIcon => {
  if (!iconName) {
    return Sparkles;
  }

  const normalized = iconName.replace(/[-_\s]/g, "").toLowerCase();
  return iconMap[iconName as keyof typeof iconMap] ?? iconMap[normalized] ?? Sparkles;
};

const Services = () => {
  const navigate = useNavigate();
  const { data: services, isLoading, isError } = useServices();

  const orderedServices = useMemo(() => services?.slice().sort((a, b) => a.title.localeCompare(b.title)) ?? [], [services]);

  const handleNavigate = (slug: string | undefined) => {
    if (!slug) {
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/servicos/${slug}`);
  };

  return (
    <section id="servicos" className="py-20 relative overflow-hidden">
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

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-gradient-card border-quantum-light/20">
                <CardHeader>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((__, featureIndex) => (
                      <Skeleton key={featureIndex} className="h-3 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
            Não foi possível carregar os serviços. Atualize a página para tentar novamente.
          </div>
        )}

        {!isLoading && !isError && orderedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orderedServices.map((service) => {
              const Icon = getIconComponent(service.icon);
              return (
                <Card
                  key={service.id}
                  className="relative overflow-hidden bg-gradient-card border-quantum-light/20 hover:shadow-quantum transition-all duration-300 group hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className="p-3 rounded-full bg-gradient-quantum w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-quantum-bright transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{service.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-quantum-bright rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline_quantum"
                      className="w-full track-link"
                      onClick={() => {
                        const gtag = getGtag();
                        gtag?.("event", "service_click", {
                          service_name: service.title,
                        });
                        handleNavigate(service.slug);
                      }}
                    >
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && orderedServices.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Nenhum serviço cadastrado até o momento. Utilize o painel administrativo para adicionar novas ofertas.
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            variant="quantum"
            size="xl"
            className="track-link"
            onClick={() => {
              const gtag = getGtag();
              gtag?.("event", "contact_team_click", {
                source: "services_section",
              });
              document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
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
