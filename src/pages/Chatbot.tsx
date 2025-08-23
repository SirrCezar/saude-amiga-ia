import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  User, 
  Bot, 
  Calendar, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import chatbotIcon from "@/assets/chatbot-icon.jpg";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "info" | "success" | "warning";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou a Saúde Amiga IA, sua assistente virtual do SUS. Como posso ajudá-lo hoje? 🏥",
      sender: "bot",
      timestamp: new Date(),
      type: "info"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("agendar") || lowerMessage.includes("consulta") || lowerMessage.includes("marcar")) {
      return "📅 Para agendar uma consulta, preciso de algumas informações:\n\n1. Qual especialidade médica você precisa?\n2. Qual unidade de saúde prefere?\n3. Tem algum dia de preferência?\n\nVou verificar a disponibilidade para você!";
    }
    
    if (lowerMessage.includes("horário") || lowerMessage.includes("funcionamento")) {
      return "🕐 Horários de funcionamento das unidades:\n\n• UBS Centro: 7h às 17h\n• UBS Vila Nova: 7h às 17h\n• Hospital Municipal: 24h\n• Pronto Socorro: 24h\n\nDeseja mais informações sobre alguma unidade específica?";
    }
    
    if (lowerMessage.includes("especialidade") || lowerMessage.includes("médico")) {
      return "👨‍⚕️ Especialidades disponíveis:\n\n• Clínica Geral\n• Pediatria\n• Ginecologia\n• Cardiologia\n• Dermatologia\n• Ortopedia\n\nQual especialidade você precisa? Posso verificar as unidades com esses profissionais.";
    }
    
    if (lowerMessage.includes("documento") || lowerMessage.includes("cpf") || lowerMessage.includes("cartão")) {
      return "📋 Documentos necessários para atendimento:\n\n✅ Cartão SUS\n✅ Documento com foto (RG/CNH)\n✅ CPF\n✅ Comprovante de residência\n\nSe não tiver o Cartão SUS, pode fazer na hora do atendimento!";
    }
    
    if (lowerMessage.includes("localização") || lowerMessage.includes("endereço") || lowerMessage.includes("onde")) {
      return "📍 Unidades de saúde próximas:\n\n• UBS Centro - Rua das Flores, 123\n• UBS Vila Nova - Av. Brasil, 456\n• Hospital Municipal - Rua da Saúde, 789\n\nPosso ajudar com direções para alguma unidade específica?";
    }
    
    if (lowerMessage.includes("obrigado") || lowerMessage.includes("obrigada")) {
      return "😊 Por nada! Estou aqui para ajudar sempre que precisar. Sua saúde é nossa prioridade!\n\nSe precisar de mais alguma coisa, é só chamar. Tenha um ótimo dia!";
    }
    
    return "🤖 Entendi sua pergunta! Posso ajudar com:\n\n• Agendamento de consultas\n• Horários de funcionamento\n• Especialidades disponíveis\n• Documentos necessários\n• Localização das unidades\n\nSobre o que você gostaria de saber mais?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: simulateResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        type: "info"
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: "Agendar Consulta", icon: Calendar },
    { label: "Ver Horários", icon: Clock },
    { label: "Unidades Próximas", icon: MapPin },
    { label: "Documentos Necessários", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-elegant">
                <img 
                  src={chatbotIcon} 
                  alt="Saúde Amiga IA" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <CardTitle className="text-2xl text-foreground">
              Saúde Amiga IA
            </CardTitle>
            <div className="flex justify-center space-x-2 mt-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="mr-1 h-3 w-3" />
                Online
              </Badge>
              <Badge variant="outline">
                Tempo de resposta: &lt; 2s
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 justify-start h-auto p-3"
                  onClick={() => {
                    setInputMessage(action.label);
                    handleSendMessage();
                  }}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="shadow-elegant">
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                      }
                    `}>
                      {message.sender === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className={`
                      max-w-[80%] rounded-lg p-3 shadow-sm
                      ${message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card border border-border"
                      }
                    `}>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.text}
                      </div>
                      <div className={`
                        text-xs mt-2 opacity-70
                        ${message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"}
                      `}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua pergunta sobre saúde..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                Esta é uma simulação. Para funcionalidade completa, conecte ao Supabase.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;