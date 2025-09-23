import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import quantumLogo from "@/assets/quantum-logo.png";

const Footer = () => {
  return (
    <footer className="bg-quantum-deep text-white py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={quantumLogo} alt="Quantum Tecnologia" className="h-8 w-8" />
              <span className="text-xl font-bold">Quantum Tecnologia</span>
            </div>
            <p className="text-white/80 text-sm">
              Transformando negócios através da tecnologia, com soluções inovadoras em IA, 
              automações e desenvolvimento sob medida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-quantum-cyan transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-quantum-cyan transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-quantum-cyan transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-quantum-cyan">Serviços</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/#servicos" className="hover:text-white transition-colors">Assistentes Virtuais com IA</a></li>
              <li><a href="/servicos/assistente-ia" className="hover:text-white transition-colors">→ Assistente IA</a></li>
              <li><a href="/servicos/automacoes" className="hover:text-white transition-colors">→ Automações</a></li>
              <li><a href="/servicos/desenvolvimento" className="hover:text-white transition-colors">→ Desenvolvimento</a></li>
              <li><a href="/#servicos" className="hover:text-white transition-colors">Consultoria em TI</a></li>
              <li><a href="/#servicos" className="hover:text-white transition-colors">Infraestrutura e Servidores</a></li>
            </ul>
          </div>

          {/* CRM Plans */}
          <div>
            <h3 className="font-semibold mb-4 text-quantum-cyan">CRM</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/servicos/crm#crm-advogados" className="hover:text-white transition-colors">Plano Starter</a></li>
              <li><a href="/servicos/crm#crm-advogados" className="hover:text-white transition-colors">Plano Professional</a></li>
              <li><a href="/servicos/crm#crm-advogados" className="hover:text-white transition-colors">Plano Enterprise</a></li>
              <li><a href="/servicos/crm#crm-advogados" className="hover:text-white transition-colors">Soluções Personalizadas</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-quantum-cyan">Contato</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contato@quantumtecnologia.com.br" className="hover:text-quantum-cyan transition-colors">
                  contato@quantumtecnologia.com.br
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:5531993054200" className="hover:text-quantum-cyan transition-colors">
                  (31) 99305-4200
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>R. Antônio de Albuquerque, 330 - Sala 901<br />
                Savassi Canopus Corporate<br />
                Belo Horizonte - MG, 30112-010</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Quantum Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;