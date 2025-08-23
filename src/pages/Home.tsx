import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  Shield, 
  Activity, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-saude.jpg";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Chatbot Inteligente",
      description: "Atendimento 24/7 com IA explicável e processamento de linguagem natural"
    },
    {
      icon: Calendar,
      title: "Agendamento Automático",
      description: "Marcação e reagendamento de consultas de forma inteligente"
    },
    {
      icon: Shield,
      title: "Conformidade LGPD",
      description: "Proteção total de dados com criptografia e anonimização automática"
    },
    {
      icon: Activity,
      title: "Dashboard Analítico",
      description: "Métricas por canal, horário, bairro e faixa etária em tempo real"
    }
  ];

  const stats = [
    { label: "Disponibilidade", value: "99,5%", icon: CheckCircle },
    { label: "Canais Integrados", value: "Web + WhatsApp", icon: MessageCircle },
    { label: "Acessibilidade", value: "WCAG 2.1 AA", icon: Users },
    { label: "Tempo de Resposta", value: "< 2s", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  Sistema Único de Saúde - SUS
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Saúde Amiga{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    IA
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Sistema inteligente de atendimento para o SUS com IA explicável, 
                  agendamento automático e conformidade total com LGPD.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chatbot">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Iniciar Atendimento
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    Ver Dashboard
                  </Button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="Sistema de saúde digital inteligente"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-health opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistema completo com IA, automação e conformidade para modernizar o atendimento do SUS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-primary p-8 rounded-2xl text-primary-foreground shadow-elegant">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Sistema Completo de Saúde Digital
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Para ativar todas as funcionalidades (autenticação, banco de dados, APIs e automação), 
              conecte seu projeto ao Supabase usando nossa integração nativa.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                <Users className="mr-1 h-3 w-3" />
                Autenticação Segura
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                <Shield className="mr-1 h-3 w-3" />
                Conformidade LGPD
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                APIs Integradas
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;