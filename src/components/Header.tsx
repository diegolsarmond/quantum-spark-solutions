import { Button } from "@/components/ui/button";
import quantumLogo from "@/assets/quantum-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src={quantumLogo} alt="Quantum Tecnologia" className="h-10 w-10" />
          <span className="text-xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Quantum Tecnologia
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#inicio" className="text-foreground hover:text-primary transition-smooth">
            Início
          </a>
          <a href="#servicos" className="text-foreground hover:text-primary transition-smooth">
            Serviços
          </a>
          <a href="#crm-advogados" className="text-foreground hover:text-primary transition-smooth">
            CRM Advogados
          </a>
          <a href="#sobre" className="text-foreground hover:text-primary transition-smooth">
            Sobre
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-smooth">
            Contato
          </a>
        </nav>

        <Button 
          variant="quantum" 
          size="lg"
          className="track-link"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'header_contact_click', {
                'source': 'header'
              });
            }
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Fale Conosco
        </Button>
      </div>
    </header>
  );
};

export default Header;