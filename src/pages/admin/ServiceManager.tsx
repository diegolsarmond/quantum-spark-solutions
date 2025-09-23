import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, BarChart, CheckCircle2, ClipboardList } from "lucide-react";

const serviceMetrics = [
  {
    label: "Serviços ativos",
    value: "12",
    description: "Planos em execução para clientes recorrentes",
    icon: CheckCircle2,
  },
  {
    label: "Implantações",
    value: "5",
    description: "Projetos em fase crítica de go-live",
    icon: ClipboardList,
  },
  {
    label: "Upgrades previstos",
    value: "8",
    description: "Solicitações com previsão de contratação",
    icon: BarChart,
  },
];

const serviceRequests = [
  {
    service: "Assistente IA personalizado",
    plan: "Enterprise",
    status: "Em negociação",
    leads: 6,
    owner: "Squad IA",
    updatedAt: "14/03/2025",
  },
  {
    service: "CRM Advocacia",
    plan: "Profissional",
    status: "Em implementação",
    leads: 11,
    owner: "Equipe Jurídica",
    updatedAt: "13/03/2025",
  },
  {
    service: "Automação Comercial",
    plan: "Growth",
    status: "Discovery",
    leads: 4,
    owner: "Squad Growth",
    updatedAt: "11/03/2025",
  },
  {
    service: "Portal de serviços Quantum",
    plan: "Custom",
    status: "Suporte contínuo",
    leads: 3,
    owner: "Sucesso do Cliente",
    updatedAt: "10/03/2025",
  },
];

const statusColors: Record<string, string> = {
  "Em negociação": "bg-amber-100 text-amber-900",
  "Em implementação": "bg-primary/10 text-primary",
  Discovery: "bg-sky-100 text-sky-900",
  "Suporte contínuo": "bg-emerald-100 text-emerald-900",
};

const ServiceManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de serviços</h1>
          <p className="text-muted-foreground">
            Alinhe pipelines comerciais e operacionais para entregar experiências consistentes aos clientes Quantum.
          </p>
        </div>
        <Button size="sm">
          Nova oportunidade
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {serviceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </div>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline ativo</CardTitle>
          <CardDescription>Visão geral das implantações e oportunidades com maior prioridade.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Responsável</TableHead>
                <TableHead>Leads ativos</TableHead>
                <TableHead className="hidden md:table-cell">Atualizado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRequests.map((request) => (
                <TableRow key={request.service}>
                  <TableCell className="font-medium">{request.service}</TableCell>
                  <TableCell>{request.plan}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[request.status] ?? ""}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{request.owner}</TableCell>
                  <TableCell className="font-medium">{request.leads}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{request.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManager;
