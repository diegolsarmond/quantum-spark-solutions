import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, serviceKeys, type Service, type ServiceInput } from "@/lib/adminApi";
import { toast } from "@/components/ui/use-toast";

export const useServices = () =>
  useQuery({
    queryKey: serviceKeys.list(),
    queryFn: () => adminApi.listServices(),
  });

export const useServiceBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: slug ? serviceKeys.detailBySlug(slug) : serviceKeys.list(),
    queryFn: () => {
      if (!slug) {
        return Promise.reject(new Error("Slug é obrigatório"));
      }
      return adminApi.getServiceBySlug(slug).then((service) => {
        if (!service) {
          throw new Error("Serviço não encontrado");
        }
        return service;
      });
    },
    enabled: Boolean(slug),
  });

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ServiceInput) => adminApi.createService(input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      toast({
        title: "Serviço criado",
        description: `O serviço “${data.title}” foi cadastrado.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao criar serviço",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ServiceInput }) => adminApi.updateService(id, input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      void queryClient.invalidateQueries({ queryKey: serviceKeys.detail(data.id) });
      toast({
        title: "Serviço atualizado",
        description: `O serviço “${data.title}” foi atualizado.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao atualizar serviço",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.deleteService(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      toast({
        title: "Serviço removido",
        description: "O serviço foi removido do catálogo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Falha ao remover serviço",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export type { Service, ServiceInput };
