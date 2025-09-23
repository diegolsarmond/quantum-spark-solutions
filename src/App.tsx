import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import BlogPage from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/servicos/assistente-ia" element={<AssistenteIA />} />
          <Route path="/servicos/automacoes" element={<Automacoes />} />
          <Route path="/servicos/crm" element={<CRM />} />
          <Route path="/servicos/crm/advocacia" element={<CRMAdvocacia />} />
          <Route path="/servicos/desenvolvimento" element={<Desenvolvimento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
