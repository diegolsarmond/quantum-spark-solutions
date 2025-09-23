import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Sparkles } from "lucide-react";

const postMetrics = [
  { label: "Publicados", value: 28, trend: "+6 nos últimos 90 dias" },
  { label: "Agendados", value: 4, trend: "Próximas duas semanas" },
  { label: "Rascunhos", value: 7, trend: "Aguardando revisão" },
];

const posts = [
  {
    title: "Estratégias de marketing orientadas por IA",
    author: "Ana Costa",
    category: "Inteligência Artificial",
    status: "Publicado",
    updatedAt: "14/03/2025",
    views: 1842,
  },
  {
    title: "Como integrar o CRM à jornada do cliente",
    author: "Pedro Santos",
    category: "CRM",
    status: "Revisão",
    updatedAt: "13/03/2025",
    views: 952,
  },
  {
    title: "Checklist para automatizar operações de vendas",
    author: "Marina Lopes",
    category: "Automação",
    status: "Agendado",
    updatedAt: "12/03/2025",
    views: 642,
  },
  {
    title: "Tendências de tecnologia para escritórios jurídicos",
    author: "Rafael Oliveira",
    category: "Mercado",
    status: "Rascunho",
    updatedAt: "10/03/2025",
    views: 0,
  },
];

const statusVariants: Record<string, { variant: "default" | "secondary" | "outline"; className?: string }> = {
  Publicado: { variant: "default" },
  Revisão: { variant: "secondary" },
  Agendado: { variant: "outline", className: "bg-amber-100 text-amber-900" },
  Rascunho: { variant: "outline" },
};

const BlogManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão do blog</h1>
          <p className="text-muted-foreground">Organize pautas, acompanhe revisões e mantenha o fluxo de publicações em dia.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="mr-2 h-4 w-4" /> Sugerir pauta com IA
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Novo artigo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {postMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdos recentes</CardTitle>
          <CardDescription>Status editorial e indicadores de engajamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Autor</TableHead>
                <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Atualizado em</TableHead>
                <TableHead className="text-right">Visualizações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => {
                const badgeProps = statusVariants[post.status] ?? { variant: "outline" };
                return (
                  <TableRow key={post.title}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{post.author}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{post.category}</TableCell>
                    <TableCell>
                      <Badge variant={badgeProps.variant} className={badgeProps.className}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{post.updatedAt}</TableCell>
                    <TableCell className="text-right font-medium">{post.views.toLocaleString("pt-BR")}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;
