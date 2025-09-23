import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import RequireAuth from "@/components/RequireAuth";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AssistenteIA from "./pages/services/AssistenteIA";
import Automacoes from "./pages/services/Automacoes";
import CRM from "./pages/services/CRM";
import CRMAdvocacia from "./pages/services/CRMAdvocacia";
import Desenvolvimento from "./pages/services/Desenvolvimento";
import ServicesPage from "./pages/Services";
import NossaHistoria from "./pages/NossaHistoria";
import BlogPage from "./pages/Blog";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import BlogManager from "./pages/admin/BlogManager";
import ServiceManager from "./pages/admin/ServiceManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/nossa-historia" element={<NossaHistoria />} />
            <Route path="/servicos/assistente-ia" element={<AssistenteIA />} />
            <Route path="/servicos/automacoes" element={<Automacoes />} />
            <Route path="/servicos/crm" element={<CRM />} />
            <Route path="/servicos/crm/advocacia" element={<CRMAdvocacia />} />
            <Route path="/servicos/desenvolvimento" element={<Desenvolvimento />} />

            <Route path="/admin">
              <Route path="register" element={<AdminRegister />} />
              <Route path="login" element={<AdminLogin />} />
              <Route
                element={
                  <RequireAuth permissions={["admin:access"]}>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="servicos" element={<ServiceManager />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
