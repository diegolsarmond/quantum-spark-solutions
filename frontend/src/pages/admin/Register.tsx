import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getAdminApiBaseUrl } from "@/utils/getAdminApiBaseUrl";

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Informe o seu nome." })
      .min(3, "O nome deve ter no mínimo 3 caracteres."),
    email: z
      .string({ required_error: "Informe um e-mail." })
      .min(1, "Informe um e-mail.")
      .email("Informe um e-mail válido."),
    password: z
      .string({ required_error: "Informe uma senha." })
      .min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z
      .string({ required_error: "Confirme a sua senha." })
      .min(8, "A confirmação deve ter no mínimo 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam coincidir.",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterResponse = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const baseUrl = getAdminApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        let message = "Não foi possível criar a conta.";
        try {
          const payload = (await response.json()) as { message?: string } | null;
          if (payload?.message) {
            message = payload.message;
          }
        } catch (error) {
          console.warn("Erro ao interpretar a resposta de erro do cadastro", error);
        }
        throw new Error(message);
      }

      return (await response.json()) as RegisterResponse;
    },
    onSuccess: () => {
      toast({
        title: "Conta criada com sucesso",
        description: "Você já pode acessar o painel com suas credenciais.",
      });
      navigate("/admin/login", { replace: true });
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Não foi possível criar a conta.";
      toast({
        title: "Erro ao criar conta",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <CardTitle>Criar uma conta administrativa</CardTitle>
          <CardDescription>Cadastre-se para acessar o painel de administração.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" placeholder="Seu nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="email" placeholder="seu-email@empresa.com" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="new-password" placeholder="••••••••" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="new-password" placeholder="••••••••" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={mutation.isPending} type="submit">
                {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <span className="mr-1">Já possui uma conta?</span>
            <Link className="text-primary underline-offset-2 hover:underline" to="/admin/login">
              Acesse o painel
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
