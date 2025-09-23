import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import SimpleBackground from "@/components/ui/SimpleBackground";
import { trackEvent } from "@/lib/analytics";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";

const Blog = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useBlogPosts();

  const highlightPosts = useMemo(() => posts?.slice(0, 4) ?? [], [posts]);

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <SimpleBackground className="opacity-90" />

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

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="mb-12 rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
            Não foi possível carregar os artigos do blog. Tente novamente em instantes.
          </div>
        )}

        {!isLoading && !isError && highlightPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {highlightPosts.map((post) => (
              <Card
                key={post.id}
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
                      trackEvent("blog_post_click", {
                        post_title: post.title,
                        post_category: post.category,
                      });
                      navigate(`/blog#${post.slug}`);
                    }}
                  >
                    Ler Artigo
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !isError && highlightPosts.length === 0 && (
          <div className="mb-12 rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Nenhum artigo foi publicado ainda. Utilize o painel administrativo para cadastrar novos conteúdos.
          </div>
        )}

        <div className="text-center">
          <Button
            variant="quantum"
            size="xl"
            className="track-link"
            onClick={() => {
              trackEvent("view_all_posts_click", {
                source: "blog_section",
              });
              navigate("/blog");
            }}
            disabled={isLoading || isError}
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
