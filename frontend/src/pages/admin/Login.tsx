import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { type AuthUser, useAuth } from "@/hooks/useAuth";
import { getAdminApiBaseUrl } from "@/utils/getAdminApiBaseUrl";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Informe um e-mail." })
    .min(1, "Informe um e-mail.")
    .email("Informe um e-mail válido."),
  password: z
    .string({ required_error: "Informe a sua senha." })
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

type AuthResponse = {
  token: string;
  user?: AuthUser | null;
};

type LocationState = {
  from?: { pathname?: string };
  unauthorized?: boolean;
};

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = useMemo(() => {
    const state = location.state as LocationState | null;
    return state?.from?.pathname ?? "/admin";
  }, [location.state]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const baseUrl = getAdminApiBaseUrl(import.meta.env.VITE_ADMIN_API_BASE_URL);
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let message = "Não foi possível realizar o login.";
        try {
          const payload = (await response.json()) as { message?: string } | null;
          if (payload?.message) {
            message = payload.message;
          }
        } catch (error) {
          console.warn("Erro ao interpretar a resposta de erro do login", error);
        }
        throw new Error(message);
      }

      const payload = (await response.json()) as AuthResponse;
      if (!payload?.token) {
        throw new Error("Resposta inválida do servidor: token ausente.");
      }

      return payload;
    },
    onSuccess: (data) => {
      login({ token: data.token, user: data.user ?? undefined });
      navigate(redirectPath, { replace: true });
      toast({
        title: "Login realizado com sucesso",
        description: "Você agora tem acesso ao painel administrativo.",
      });
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Não foi possível realizar o login.";
      toast({
        title: "Erro ao realizar login",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <CardTitle>Entrar no painel</CardTitle>
          <CardDescription>Acesse com suas credenciais administrativas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
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
                      <Input {...field} autoComplete="current-password" placeholder="••••••••" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={mutation.isPending} type="submit">
                {mutation.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <span className="mr-1">Ainda não tem acesso?</span>
            <Link className="text-primary underline-offset-2 hover:underline" to="/admin/register">
              Solicite um cadastro
            </Link>
          </p>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            <span className="mr-1">Precisa de ajuda?</span>
            <Link className="text-primary underline-offset-2 hover:underline" to="/#contato">
              Fale com o suporte
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
