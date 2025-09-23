import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost, type BlogPost } from "@/hooks/useBlogPosts";

const blogPostFormSchema = z.object({
  title: z.string().min(1, "Informe o título"),
  description: z.string().min(1, "Descreva o conteúdo"),
  author: z.string().min(1, "Informe o autor"),
  category: z.string().min(1, "Informe a categoria"),
  date: z.string().min(1, "Informe a data"),
  readTime: z.string().min(1, "Informe o tempo de leitura"),
  slug: z.string().min(1, "Informe o slug"),
  tags: z.string().min(1, "Informe ao menos uma tag"),
  image: z.string().optional(),
  featured: z.boolean().default(false),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

const defaultValues: BlogPostFormValues = {
  title: "",
  description: "",
  author: "",
  category: "",
  date: "",
  readTime: "",
  slug: "",
  tags: "",
  image: "",
  featured: false,
};

const BlogManager = () => {
  const { data: posts, isLoading: isFetching } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (editingPost) {
      form.reset({
        title: editingPost.title,
        description: editingPost.description,
        author: editingPost.author,
        category: editingPost.category,
        date: editingPost.date,
        readTime: editingPost.readTime,
        slug: editingPost.slug,
        tags: editingPost.tags.join(", "),
        image: editingPost.image ?? "",
        featured: editingPost.featured ?? false,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editingPost, form]);

  const metrics = useMemo(() => {
    const total = posts?.length ?? 0;
    const featured = posts?.filter((post) => post.featured).length ?? 0;
    const categories = posts ? new Set(posts.map((post) => post.category)).size : 0;

    return [
      { label: "Conteúdos", value: total, trend: "Artigos cadastrados" },
      { label: "Em destaque", value: featured, trend: "Publicações marcadas como destaque" },
      { label: "Categorias", value: categories, trend: "Temas únicos publicados" },
    ];
  }, [posts]);

  const isSubmitting = createPost.isPending || updatePost.isPending;

  const handleSubmit = (values: BlogPostFormValues) => {
    const tags = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      title: values.title,
      description: values.description,
      author: values.author,
      category: values.category,
      date: values.date,
      readTime: values.readTime,
      slug: values.slug,
      tags,
      image: values.image?.trim() ? values.image.trim() : undefined,
      featured: values.featured,
    };

    if (editingPost) {
      updatePost.mutate(
        { id: editingPost.id, input: payload },
        {
          onSuccess: () => {
            setEditingPost(null);
            form.reset(defaultValues);
          },
        },
      );
    } else {
      createPost.mutate(payload, {
        onSuccess: () => {
          form.reset(defaultValues);
        },
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleDelete = (post: BlogPost) => {
    deletePost.mutate(post.id, {
      onSuccess: () => {
        if (editingPost?.id === post.id) {
          setEditingPost(null);
          form.reset(defaultValues);
        }
      },
    });
  };

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
          {editingPost ? (
            <Button variant="ghost" size="sm" onClick={() => setEditingPost(null)}>
              Cancelar edição
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
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
          <CardTitle>{editingPost ? "Editar artigo" : "Novo artigo"}</CardTitle>
          <CardDescription>
            {editingPost
              ? `Atualize os dados do post “${editingPost.title}”.`
              : "Cadastre um novo conteúdo para o blog da Quantum."}
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
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Como a IA está transformando o atendimento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do autor" {...field} />
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
                      <Input placeholder="slug-do-artigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input placeholder="20 Jan 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo de leitura</FormLabel>
                    <FormControl>
                      <Input placeholder="6 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Imagem de capa (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="IA, Automação, Atendimento" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Separe as tags por vírgula.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Resumo curto do artigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:col-span-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div>
                      <FormLabel className="text-sm font-medium">Destacar artigo</FormLabel>
                      <CardDescription>Artigos em destaque aparecem em locais privilegiados no site.</CardDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[160px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando
                    </>
                  ) : editingPost ? (
                    "Atualizar artigo"
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Publicar artigo
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
          <CardTitle>Conteúdos cadastrados</CardTitle>
          <CardDescription>Edite ou remova artigos do catálogo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="hidden lg:table-cell">Autor</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                    Carregando artigos...
                  </TableCell>
                </TableRow>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.id} className={editingPost?.id === post.id ? "bg-muted/40" : undefined}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{post.category}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{post.author}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{post.date}</TableCell>
                    <TableCell>
                      {post.featured ? (
                        <Badge variant="default">Em destaque</Badge>
                      ) : (
                        <Badge variant="outline">Regular</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          disabled={isSubmitting}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post)}
                          disabled={deletePost.isPending && deletePost.variables === post.id}
                        >
                          {deletePost.isPending && deletePost.variables === post.id ? (
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
                  <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                    Nenhum artigo cadastrado até o momento.
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

export default BlogManager;
