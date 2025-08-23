import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Database, 
  Bot, 
  Users,
  Bell,
  Lock,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle,
  Settings as SettingsIcon,
  Cloud,
  Key,
  FileText
} from "lucide-react";

const Settings = () => {
  const complianceItems = [
    {
      title: "Conformidade LGPD",
      description: "Proteção de dados pessoais conforme Lei Geral de Proteção de Dados",
      status: "active",
      icon: Shield
    },
    {
      title: "Acessibilidade WCAG 2.1 AA",
      description: "Interface acessível para pessoas com deficiência",
      status: "active",
      icon: Eye
    },
    {
      title: "Criptografia de Dados",
      description: "Dados sensíveis criptografados em trânsito e em repouso",
      status: "active",
      icon: Lock
    },
    {
      title: "Anonimização Automática",
      description: "Dados pessoais anonimizados após período determinado",
      status: "pending",
      icon: Trash2
    }
  ];

  const aiFeatures = [
    {
      title: "Processamento de Linguagem Natural (NLP)",
      description: "Compreensão avançada de linguagem para melhor atendimento",
      enabled: true
    },
    {
      title: "IA Explicável (XAI)",
      description: "Decisões automáticas auditáveis e transparentes",
      enabled: true
    },
    {
      title: "Aprendizado Contínuo",
      description: "Modelo se adapta com base nas interações",
      enabled: false
    },
    {
      title: "Fallback Inteligente",
      description: "Transferência automática para atendimento humano",
      enabled: true
    }
  ];

  const systemMetrics = [
    { label: "SLA Disponibilidade", value: "99,8%", target: "99,5%", status: "good" },
    { label: "Tempo de Resposta", value: "1.2s", target: "< 2s", status: "good" },
    { label: "Taxa de Resolução IA", value: "95.4%", target: "> 90%", status: "good" },
    { label: "Uptime Mensal", value: "29d 23h", target: "29d 16h", status: "good" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <SettingsIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Configurações do Sistema
            </h1>
            <p className="text-muted-foreground">
              Gerencie conformidade, IA e configurações técnicas
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="compliance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compliance">Conformidade</TabsTrigger>
            <TabsTrigger value="ai">IA & Automação</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* LGPD Compliance */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Conformidade LGPD</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                        <item.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{item.title}</h4>
                            <Badge variant={item.status === "active" ? "secondary" : "outline"} 
                                   className={item.status === "active" 
                                     ? "bg-success/10 text-success border-success/20" 
                                     : "bg-warning/10 text-warning border-warning/20"}>
                              {item.status === "active" ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <AlertCircle className="mr-1 h-3 w-3" />
                              )}
                              {item.status === "active" ? "Ativo" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Gestão de Dados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Consentimento Explícito</h4>
                        <p className="text-sm text-muted-foreground">Coleta consentimento antes de processar dados</p>
                      </div>
                      <Switch checked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Política de Privacidade</h4>
                        <p className="text-sm text-muted-foreground">Política embutida no sistema</p>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Ativa
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Exclusão Automatizada</h4>
                        <p className="text-sm text-muted-foreground">Dados removidos após 24 meses</p>
                      </div>
                      <Switch checked />
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Gerar Relatório de Conformidade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* AI Features */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span>Recursos de IA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <h4 className="font-medium text-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                        <Switch checked={feature.enabled} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Training & Monitoring */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Treinamento & Monitoramento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Análise Semântica</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Perguntas não respondidas para melhoria do modelo
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Questões pendentes:</span>
                        <Badge variant="outline">47</Badge>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Treinamento Supervisionado</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Última atualização do modelo
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Última sessão:</span>
                        <span className="text-sm font-medium">14/01/2024</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Bot className="mr-2 h-4 w-4" />
                      Iniciar Sessão de Treinamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* System Metrics */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    <span>Métricas do Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <h4 className="font-medium text-foreground">{metric.label}</h4>
                          <p className="text-sm text-muted-foreground">Meta: {metric.target}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{metric.value}</div>
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            OK
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notificações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Alertas de Sistema</h4>
                        <p className="text-sm text-muted-foreground">Notificar sobre indisponibilidade</p>
                      </div>
                      <Switch checked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Relatórios Mensais</h4>
                        <p className="text-sm text-muted-foreground">Enviar métricas por email</p>
                      </div>
                      <Switch checked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-foreground">Auditoria LGPD</h4>
                        <p className="text-sm text-muted-foreground">Alertas de conformidade</p>
                      </div>
                      <Switch checked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-primary" />
                  <span>Integrações & APIs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-primary p-6 rounded-xl text-primary-foreground text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">
                    Funcionalidades Avançadas Disponíveis
                  </h3>
                  <p className="opacity-90 mb-6">
                    Para ativar integrações com Supabase, N8N, Google Calendar, WhatsApp e 
                    outras APIs, conecte seu projeto ao Supabase usando nossa integração nativa.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-foreground/10 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Backend Completo</h4>
                      <ul className="text-sm opacity-90 space-y-1">
                        <li>• Autenticação segura</li>
                        <li>• Banco de dados</li>
                        <li>• Edge Functions</li>
                        <li>• APIs REST</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary-foreground/10 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Automação N8N</h4>
                      <ul className="text-sm opacity-90 space-y-1">
                        <li>• Fluxos inteligentes</li>
                        <li>• Webhooks</li>
                        <li>• RAG (Retrieval-Augmented Generation)</li>
                        <li>• Google Calendar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;