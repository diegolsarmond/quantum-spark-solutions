import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const displayName = user?.name ?? user?.email ?? "Administrador";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Dashboard administrativo</CardTitle>
          <CardDescription>Bem-vindo, {displayName}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Utilize o menu lateral do painel para navegar entre as funcionalidades disponíveis. Suas permissões
            determinam quais seções do sistema estão habilitadas.
          </p>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Funções</p>
            <p className="text-sm">
              {user?.roles?.length ? user.roles.join(", ") : "Nenhuma função registrada."}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Permissões</p>
            <p className="text-sm">
              {user?.permissions?.length ? user.permissions.join(", ") : "Nenhuma permissão registrada."}
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
