import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Clock,
  MapPin,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Filter
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total de Atendimentos",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: MessageCircle,
      color: "text-primary"
    },
    {
      title: "Consultas Agendadas",
      value: "1,523",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-secondary"
    },
    {
      title: "Usuários Ativos",
      value: "3,194",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Taxa de Satisfação",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "Maria Silva Santos",
      cpf: "123.456.789-01",
      specialty: "Cardiologia",
      unit: "UBS Centro",
      date: "2024-01-15",
      time: "14:30",
      status: "agendado"
    },
    {
      id: 2,
      patient: "João Oliveira Lima",
      cpf: "987.654.321-02",
      specialty: "Pediatria",
      unit: "UBS Vila Nova",
      date: "2024-01-15",
      time: "09:15",
      status: "confirmado"
    },
    {
      id: 3,
      patient: "Ana Costa Ferreira",
      cpf: "456.789.123-03",
      specialty: "Dermatologia",
      unit: "Hospital Municipal",
      date: "2024-01-16",
      time: "16:00",
      status: "reagendado"
    },
    {
      id: 4,
      patient: "Carlos Mendes Rocha",
      cpf: "321.654.987-04",
      specialty: "Ortopedia",
      unit: "UBS Centro",
      date: "2024-01-16",
      time: "11:45",
      status: "cancelado"
    }
  ];

  const channelMetrics = [
    { channel: "WhatsApp", interactions: 1847, percentage: 65 },
    { channel: "Web Chat", interactions: 823, percentage: 29 },
    { channel: "Telefone", interactions: 177, percentage: 6 }
  ];

  const ageGroups = [
    { range: "18-25", count: 543, percentage: 19 },
    { range: "26-40", count: 892, percentage: 31 },
    { range: "41-60", count: 967, percentage: 34 },
    { range: "60+", count: 445, percentage: 16 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "agendado":
        return <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
          <Clock className="mr-1 h-3 w-3" />
          Agendado
        </Badge>;
      case "confirmado":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmado
        </Badge>;
      case "reagendado":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
          <AlertCircle className="mr-1 h-3 w-3" />
          Reagendado
        </Badge>;
      case "cancelado":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelado
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Administrativo
            </h1>
            <p className="text-muted-foreground">
              Visão geral dos atendimentos e métricas do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="demographics">Demografia</TabsTrigger>
            <TabsTrigger value="units">Unidades</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Agendamentos Recentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Paciente</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">CPF</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Especialidade</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Unidade</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Data/Hora</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-4 text-sm font-medium text-foreground">
                            {appointment.patient}
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {appointment.cpf}
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {appointment.specialty}
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{appointment.unit}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {appointment.date} • {appointment.time}
                          </td>
                          <td className="py-4">
                            {getStatusBadge(appointment.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Interações por Canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelMetrics.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{channel.channel}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${channel.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-16 text-right">
                            {channel.interactions}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Métricas de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <Activity className="h-8 w-8 text-success mx-auto mb-2" />
                      <div className="text-2xl font-bold text-success">99.8%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent">1.2s</div>
                      <div className="text-sm text-muted-foreground">Tempo Resposta</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">95.4%</div>
                      <div className="text-sm text-muted-foreground">Resolução IA</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-secondary">94.2%</div>
                      <div className="text-sm text-muted-foreground">Satisfação</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Distribuição por Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{group.range} anos</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-muted rounded-full h-3">
                          <div 
                            className="bg-gradient-primary h-3 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {group.count}
                        </span>
                        <span className="text-sm font-medium w-8 text-right">
                          {group.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Units Tab */}
          <TabsContent value="units">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["UBS Centro", "UBS Vila Nova", "Hospital Municipal"].map((unit, index) => (
                <Card key={index} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{unit}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Atendimentos hoje</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Consultas agendadas</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Ativo
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Integration Notice */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-elegant">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 opacity-90" />
            <h3 className="text-lg font-semibold mb-2">
              Dashboard com Dados Simulados
            </h3>
            <p className="opacity-90">
              Para acesso aos dados reais e funcionalidades completas de auditoria, 
              conecte seu projeto ao Supabase para ativar o backend completo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;