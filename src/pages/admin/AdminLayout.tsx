import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Briefcase, FileText, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navigationItems = [
  { label: "Visão Geral", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Blog", to: "/admin/blog", icon: FileText },
  { label: "Serviços", to: "/admin/servicos", icon: Briefcase },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/20">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <Link to="/admin" className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <div className="grid h-9 w-9 place-content-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
                QT
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold leading-tight">Quantum Admin</span>
                <span className="text-xs text-muted-foreground">Painel de controle</span>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                Beta
              </Badge>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gestão</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact
                      ? location.pathname === item.to
                      : location.pathname.startsWith(item.to);

                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                          <Link to={item.to} className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <Button variant="ghost" size="sm" className="justify-start gap-2" asChild>
              <Link to="/">
                <Settings className="h-4 w-4" /> Preferências do site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-3 border-b bg-background/80 px-6 py-4 backdrop-blur">
            <SidebarTrigger />
            <div className="flex flex-col">
              <h1 className="text-base font-semibold leading-tight text-muted-foreground">Painel Administrativo</h1>
              <span className="text-xs text-muted-foreground/80">Bem-vindo de volta, equipe Quantum</span>
            </div>
            <Separator orientation="vertical" className="ml-auto h-8" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Avatar className="h-9 w-9 border">
              <AvatarFallback className="text-xs font-medium">QA</AvatarFallback>
            </Avatar>
          </header>
          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
