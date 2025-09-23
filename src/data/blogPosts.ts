export type BlogPost = {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  tags: string[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Como a IA está Revolucionando o Atendimento ao Cliente",
    description:
      "Descubra como os assistentes virtuais com IA podem transformar a experiência do cliente e aumentar a eficiência operacional da sua equipe.",
    author: "Equipe Quantum",
    date: "22 Jan 2025",
    readTime: "5 min",
    category: "Inteligência Artificial",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    slug: "ia-revolucionando-atendimento",
    tags: ["IA", "Atendimento", "Automação"],
    featured: true,
  },
  {
    title: "Automação de Processos: O Futuro das Empresas",
    description:
      "Entenda como automatizar tarefas repetitivas elimina gargalos, reduz erros e libera sua equipe para iniciativas estratégicas.",
    author: "Equipe Quantum",
    date: "18 Jan 2025",
    readTime: "7 min",
    category: "Automação",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    slug: "automacao-processos-futuro",
    tags: ["Automação", "Produtividade", "Estratégia"],
  },
  {
    title: "CRM para Advogados: Gestão Eficiente de Escritórios",
    description:
      "Como um CRM especializado otimiza o relacionamento com clientes, organiza processos jurídicos e melhora a previsibilidade de resultados.",
    author: "Equipe Quantum",
    date: "14 Jan 2025",
    readTime: "6 min",
    category: "CRM",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    slug: "crm-advogados-gestao",
    tags: ["CRM", "Advocacia", "Gestão"],
  },
  {
    title: "Desenvolvimento Sob Medida: Quando Escolher?",
    description:
      "Saiba em quais cenários investir em soluções personalizadas gera vantagem competitiva e acelera a inovação.",
    author: "Equipe Quantum",
    date: "10 Jan 2025",
    readTime: "4 min",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    slug: "desenvolvimento-sob-medida",
    tags: ["Desenvolvimento", "Inovação", "Software"],
  },
  {
    title: "Chatbots com IA: 7 Exemplos que Encantam Clientes",
    description:
      "Conheça aplicações reais de chatbots inteligentes e como eles elevam a percepção de marca ao criar experiências conversacionais.",
    author: "Equipe Quantum",
    date: "06 Jan 2025",
    readTime: "8 min",
    category: "Inteligência Artificial",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    slug: "chatbots-ia-exemplos",
    tags: ["Chatbot", "CX", "IA"],
  },
  {
    title: "LGPD na Prática: Como Manter a Conformidade Digital",
    description:
      "Implementações e processos essenciais para garantir que seus dados estejam protegidos e em conformidade com a legislação.",
    author: "Equipe Quantum",
    date: "03 Jan 2025",
    readTime: "9 min",
    category: "Segurança",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
    slug: "lgpd-na-pratica",
    tags: ["LGPD", "Segurança", "Compliance"],
  },
  {
    title: "Integração de Sistemas: O Guia Definitivo",
    description:
      "Descubra os padrões e ferramentas que conectam sua stack tecnológica para gerar dados consistentes e fluxos automatizados.",
    author: "Equipe Quantum",
    date: "28 Dez 2024",
    readTime: "11 min",
    category: "Integração",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80",
    slug: "integracao-de-sistemas",
    tags: ["Integração", "APIs", "Arquitetura"],
  },
  {
    title: "Analytics Inteligente: Decisões Guiadas por Dados",
    description:
      "Como implantar análises avançadas para identificar oportunidades e criar jornadas altamente personalizadas.",
    author: "Equipe Quantum",
    date: "20 Dez 2024",
    readTime: "6 min",
    category: "Data & Analytics",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    slug: "analytics-inteligente",
    tags: ["Analytics", "Dados", "BI"],
  },
];
