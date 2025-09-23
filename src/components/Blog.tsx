import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";

const Blog = () => {
  const blogPosts = [
    {
      title: "Como a IA está Revolucionando o Atendimento ao Cliente",
      description: "Descubra como os assistentes virtuais com IA podem transformar completamente a experiência do seu cliente e aumentar a eficiência operacional.",
      author: "Equipe Quantum",
      date: "15 Jan 2025",
      readTime: "5 min",
      category: "Inteligência Artificial",
      image: "/api/placeholder/400/250",
      slug: "ia-revolucionando-atendimento"
    },
    {
      title: "Automação de Processos: O Futuro das Empresas",
      description: "Entenda como a automação pode eliminar tarefas repetitivas, reduzir erros e liberar sua equipe para atividades mais estratégicas.",
      author: "Equipe Quantum",
      date: "12 Jan 2025", 
      readTime: "7 min",
      category: "Automação",
      image: "/api/placeholder/400/250",
      slug: "automacao-processos-futuro"
    },
    {
      title: "CRM para Advogados: Gestão Eficiente de Escritórios",
      description: "Como um sistema CRM especializado pode otimizar a gestão de processos jurídicos e melhorar o relacionamento com clientes.",
      author: "Equipe Quantum",
      date: "10 Jan 2025",
      readTime: "6 min", 
      category: "CRM",
      image: "/api/placeholder/400/250",
      slug: "crm-advogados-gestao"
    },
    {
      title: "Desenvolvimento Sob Medida: Quando Escolher?",
      description: "Saiba quando investir em soluções personalizadas e como elas podem oferecer vantagem competitiva para seu negócio.",
      author: "Equipe Quantum",
      date: "08 Jan 2025",
      readTime: "4 min",
      category: "Desenvolvimento",
      image: "/api/placeholder/400/250", 
      slug: "desenvolvimento-sob-medida"
    }
  ];

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Network Background Effect */}
      <NetworkBackground className="opacity-80" particleCount={60} connectionDistance={150} />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
            Blog & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique por dentro das últimas tendências em tecnologia, automação e inovação. 
            Conteúdos exclusivos para impulsionar seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden bg-gradient-card border-quantum-light/20 hover:shadow-quantum transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-gradient-quantum relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-quantum-deep/80 to-quantum-bright/80 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-medium">{post.category}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                
                <CardTitle className="text-xl group-hover:text-quantum-bright transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button 
                  variant="outline_quantum" 
                  className="w-full group/btn track-link"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'blog_post_click', {
                        'post_title': post.title,
                        'post_category': post.category
                      });
                    }
                    // Future: Navigate to blog post page
                    console.log('Navigate to:', post.slug);
                  }}
                >
                  Ler Artigo
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="quantum" 
            size="xl"
            className="track-link"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'view_all_posts_click', {
                  'source': 'blog_section'
                });
              }
              // Future: Navigate to blog page
              console.log('Navigate to blog page');
            }}
          >
            Ver Todos os Artigos
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;