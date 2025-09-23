import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, blogPostKeys, type BlogPost, type BlogPostInput } from "@/lib/adminApi";
import { toast } from "@/components/ui/use-toast";

export const useBlogPosts = () =>
  useQuery({
    queryKey: blogPostKeys.list(),
    queryFn: () => adminApi.listPosts(),
  });

export const useBlogPostBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: slug ? blogPostKeys.detailBySlug(slug) : blogPostKeys.list(),
    queryFn: () => {
      if (!slug) {
        return Promise.reject(new Error("Slug é obrigatório"));
      }
      return adminApi.getPostBySlug(slug).then((post) => {
        if (!post) {
          throw new Error("Post não encontrado");
        }
        return post;
      });
    },
    enabled: Boolean(slug),
  });

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: BlogPostInput) => adminApi.createPost(input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: blogPostKeys.list() });
      toast({
        title: "Post criado",
        description: `O artigo “${data.title}” foi criado com sucesso.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao criar post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: BlogPostInput }) => adminApi.updatePost(id, input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: blogPostKeys.list() });
      void queryClient.invalidateQueries({ queryKey: blogPostKeys.detail(data.id) });
      toast({
        title: "Post atualizado",
        description: `O artigo “${data.title}” foi atualizado.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao atualizar post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.deletePost(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: blogPostKeys.list() });
      toast({
        title: "Post removido",
        description: "O artigo foi removido do catálogo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao remover post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export type { BlogPost, BlogPostInput };
