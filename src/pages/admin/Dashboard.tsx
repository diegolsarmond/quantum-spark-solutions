import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, FileText, MessageSquare, Rocket, Users } from "lucide-react";

const stats = [
  {
    label: "Novos Leads",
    value: "128",
    change: "+18%",
    description: "Comparado à última semana",
    icon: Users,
  },
  {
    label: "Artigos Publicados",
    value: "42",
    change: "+4",
    description: "Atualizados nos últimos 30 dias",
    icon: FileText,
  },
  {
    label: "Projetos em Andamento",
    value: "9",
    change: "+2",
    description: "Inclui integrações de IA personalizadas",
    icon: Rocket,
  },
  {
    label: "Tickets Respondidos",
    value: "94%",
    change: "-3%",
    description: "Taxa de resolução nas últimas 24h",
    icon: MessageSquare,
  },
];

const latestPosts = [
  { title: "Como a IA está revolucionando o marketing jurídico", author: "Ana Costa", status: "Publicado", date: "14/03/2025" },
  { title: "Guia prático de automações comerciais", author: "Pedro Santos", status: "Agendado", date: "12/03/2025" },
  { title: "Checklist de implantação de CRM", author: "Marina Lopes", status: "Rascunho", date: "09/03/2025" },
];

const activeProjects = [
  { client: "Escritório Almeida & Co.", service: "CRM Advocacia", progress: "Em revisão", owner: "Equipe Jurídica" },
  { client: "Quantum Hub", service: "Assistente IA", progress: "Implementação", owner: "Squad IA" },
  { client: "TechPrime", service: "Automação Comercial", progress: "Discovery", owner: "Squad Growth" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visão geral</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho das operações e das iniciativas digitais.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[11px] font-medium uppercase">
                    {stat.change}
                  </Badge>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Últimas publicações</CardTitle>
              <CardDescription>Conteúdo preparado para fortalecer a autoridade digital.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver blog
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden sm:table-cell">Autor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestPosts.map((post) => (
                  <TableRow key={post.title}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{post.author}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "Publicado" ? "default" : "outline"}>{post.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{post.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos ativos</CardTitle>
            <CardDescription>Monitoramento das entregas estratégicas para clientes-chave.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead className="hidden lg:table-cell">Responsável</TableHead>
                  <TableHead>Etapa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProjects.map((project) => (
                  <TableRow key={project.client}>
                    <TableCell className="font-medium">{project.client}</TableCell>
                    <TableCell>{project.service}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{project.owner}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-xs font-medium">
                        {project.progress}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
