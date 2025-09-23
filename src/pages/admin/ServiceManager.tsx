import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Loader2, Plus, Trash2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  type Service,
} from "@/hooks/useServices";

const serviceFormSchema = z.object({
  title: z.string().min(1, "Informe o nome do serviço"),
  category: z.string().min(1, "Informe a categoria"),
  slug: z.string().min(1, "Informe o slug"),
  summary: z.string().min(1, "Informe um resumo"),
  description: z.string().min(1, "Descreva o serviço"),
  icon: z.string().min(1, "Informe o ícone"),
  features: z.string().min(1, "Liste ao menos um recurso"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const defaultServiceValues: ServiceFormValues = {
  title: "",
  category: "",
  slug: "",
  summary: "",
  description: "",
  icon: "",
  features: "",
};

const ServiceManager = () => {
  const { data: services, isLoading: isFetching } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [editingService, setEditingService] = useState<Service | null>(null);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: defaultServiceValues,
  });

  useEffect(() => {
    if (editingService) {
      form.reset({
        title: editingService.title,
        category: editingService.category,
        slug: editingService.slug,
        summary: editingService.summary,
        description: editingService.description,
        icon: editingService.icon,
        features: editingService.features.join("\n"),
      });
    } else {
      form.reset(defaultServiceValues);
    }
  }, [editingService, form]);

  const metrics = useMemo(() => {
    const total = services?.length ?? 0;
    const categories = services ? new Set(services.map((service) => service.category)).size : 0;
    const avgFeatures = services && services.length
      ? Math.round(
          services.reduce((accumulator, service) => accumulator + service.features.length, 0) /
            services.length,
        )
      : 0;

    return [
      { label: "Serviços ativos", value: total, description: "Entradas disponíveis no catálogo" },
      { label: "Categorias", value: categories, description: "Segmentos atendidos" },
      { label: "Recursos médios", value: avgFeatures, description: "Itens listados por serviço" },
    ];
  }, [services]);

  const isSubmitting = createService.isPending || updateService.isPending;

  const handleSubmit = (values: ServiceFormValues) => {
    const features = values.features
      .split(/\n|;/)
      .map((feature) => feature.trim())
      .filter(Boolean);

    const payload = {
      title: values.title,
      category: values.category,
      slug: values.slug,
      summary: values.summary,
      description: values.description,
      icon: values.icon,
      features,
    };

    if (editingService) {
      updateService.mutate(
        { id: editingService.id, input: payload },
        {
          onSuccess: () => {
            setEditingService(null);
            form.reset(defaultServiceValues);
          },
        },
      );
    } else {
      createService.mutate(payload, {
        onSuccess: () => {
          form.reset(defaultServiceValues);
        },
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleDelete = (service: Service) => {
    deleteService.mutate(service.id, {
      onSuccess: () => {
        if (editingService?.id === service.id) {
          setEditingService(null);
          form.reset(defaultServiceValues);
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de serviços</h1>
          <p className="text-muted-foreground">
            Alinhe pipelines comerciais e operacionais para entregar experiências consistentes aos clientes Quantum.
          </p>
        </div>
        {editingService ? (
          <Button variant="ghost" size="sm" onClick={() => setEditingService(null)}>
            Cancelar edição
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingService ? "Editar serviço" : "Novo serviço"}</CardTitle>
          <CardDescription>
            {editingService
              ? `Atualize as informações do serviço “${editingService.title}”.`
              : "Cadastre uma nova oferta para o portfólio da Quantum."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Assistentes Virtuais com IA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Inteligência Artificial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="assistente-ia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícone (Lucide)</FormLabel>
                    <FormControl>
                      <Input placeholder="Bot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea rows={2} placeholder="Mensagem curta exibida na listagem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descrição detalhada</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Descrição exibida nas páginas internas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Recursos</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Liste um recurso por linha"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Você pode separar recursos por nova linha ou ponto e vírgula.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center justify-end">
                <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> {editingService ? "Atualizar serviço" : "Cadastrar serviço"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Serviços cadastrados</CardTitle>
          <CardDescription>Gerencie as ofertas apresentadas no site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="hidden lg:table-cell">Slug</TableHead>
                <TableHead>Recursos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">
                    Carregando serviços...
                  </TableCell>
                </TableRow>
              ) : services && services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.id} className={editingService?.id === service.id ? "bg-muted/40" : undefined}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{service.category}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{service.slug}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{service.features.length} itens</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          disabled={isSubmitting}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service)}
                          disabled={deleteService.isPending && deleteService.variables === service.id}
                        >
                          {deleteService.isPending && deleteService.variables === service.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">
                    Nenhum serviço cadastrado até o momento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManager;
