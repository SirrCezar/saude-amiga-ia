# Health API - Documentação Completa

API REST completa para aplicação de saúde, pronta para integração com N8N.

## Base URL
```
https://xvfbssrejzvjioexykuj.supabase.co/functions/v1/health-api
```

## Autenticação
Todos os endpoints (exceto webhooks N8N) requerem autenticação via header:
```
Authorization: Bearer <supabase_jwt_token>
```

## Endpoints Disponíveis

### 👤 Perfis de Usuário

#### GET /profiles
Lista todos os perfis
```bash
curl -X GET "https://xvfbssrejzvjioexykuj.supabase.co/functions/v1/health-api/profiles" \
  -H "Authorization: Bearer <token>"
```

#### POST /profiles
Cria novo perfil
```bash
curl -X POST "https://xvfbssrejzvjioexykuj.supabase.co/functions/v1/health-api/profiles" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "uuid",
    "full_name": "João Silva",
    "phone": "+5511999999999",
    "birth_date": "1990-01-01",
    "gender": "masculino"
  }'
```

#### GET /profiles/{id}
Busca perfil específico

#### PUT /profiles/{id}
Atualiza perfil

#### DELETE /profiles/{id}
Remove perfil

### 📅 Consultas

#### GET /appointments
Lista todas as consultas (ordenadas por data)

#### POST /appointments
Cria nova consulta
```json
{
  "user_id": "uuid",
  "title": "Consulta Cardiologista",
  "description": "Consulta de rotina",
  "appointment_date": "2024-03-15T10:00:00Z",
  "status": "agendada"
}
```

#### GET /appointments/{id}
Busca consulta específica

#### PUT /appointments/{id}
Atualiza consulta

#### DELETE /appointments/{id}
Remove consulta

### 💬 Conversas de Chat

#### GET /conversations
Lista todas as conversas (ordenadas por data de atualização)

#### POST /conversations
Cria nova conversa
```json
{
  "user_id": "uuid",
  "title": "Consulta sobre sintomas"
}
```

#### GET /conversations/{id}
Busca conversa específica

#### PUT /conversations/{id}
Atualiza conversa

#### DELETE /conversations/{id}
Remove conversa

### 📨 Mensagens de Chat

#### GET /conversations/{id}/messages
Lista mensagens de uma conversa (ordenadas cronologicamente)

#### POST /conversations/{id}/messages
Adiciona mensagem à conversa
```json
{
  "content": "Olá, preciso de ajuda",
  "sender_type": "user"
}
```

#### DELETE /messages/{id}
Remove mensagem

### 🏥 Dados de Saúde

#### GET /health-data
Lista dados de saúde com filtros opcionais:
- `?type=pressao_arterial` - Filtra por tipo de dado
- `?start_date=2024-01-01` - Data inicial
- `?end_date=2024-12-31` - Data final

#### POST /health-data
Adiciona novo dado de saúde
```json
{
  "user_id": "uuid",
  "data_type": "pressao_arterial",
  "value": "120/80",
  "unit": "mmHg",
  "recorded_at": "2024-03-15T08:00:00Z"
}
```

#### DELETE /health-data/{id}
Remove dado de saúde

### ⚙️ Configurações do Sistema

#### GET /settings
Lista todas as configurações

#### POST /settings
Cria nova configuração
```json
{
  "key": "max_appointments_per_day",
  "value": "10",
  "description": "Máximo de consultas por dia"
}
```

#### PUT /settings/{id}
Atualiza configuração

#### DELETE /settings/{id}
Remove configuração

## 🤖 Integração N8N

### POST /n8n/webhook/chat
Webhook para receber respostas do chatbot N8N
```json
{
  "conversation_id": "uuid",
  "user_message": "Como está minha pressão?",
  "bot_response": "Sua pressão está normal baseada nos últimos dados."
}
```

### GET /n8n/user-context
Busca contexto completo do usuário para o N8N
```
GET /n8n/user-context?user_id=uuid
```

Retorna:
```json
{
  "profile": { /* dados do perfil */ },
  "appointments": [ /* últimas 5 consultas */ ],
  "healthData": [ /* últimos 10 dados de saúde */ ],
  "timestamp": "2024-03-15T10:00:00Z"
}
```

## 📊 Tipos de Dados de Saúde Suportados

- `pressao_arterial` - Pressão arterial
- `peso` - Peso corporal
- `altura` - Altura
- `temperatura` - Temperatura corporal
- `glicemia` - Nível de glicose
- `frequencia_cardiaca` - Batimentos cardíacos
- `oximetria` - Saturação de oxigênio
- `outros` - Outros tipos de dados

## 📋 Status de Consultas

- `agendada` - Consulta marcada
- `confirmada` - Consulta confirmada
- `em_andamento` - Consulta em curso
- `concluida` - Consulta finalizada
- `cancelada` - Consulta cancelada
- `reagendada` - Consulta remarcada

## 🔒 Segurança

- Todas as operações respeitam RLS (Row Level Security)
- Usuários só acessam seus próprios dados
- Webhooks N8N não requerem autenticação (para automação)
- Logs detalhados para debugging

## 🚀 Como Integrar com N8N

1. **Configurar Webhook no N8N:**
   - URL: `https://xvfbssrejzvjioexykuj.supabase.co/functions/v1/health-api/n8n/webhook/chat`
   - Método: POST

2. **Buscar contexto do usuário:**
   - Use `/n8n/user-context?user_id=xxx` para obter dados completos

3. **Enviar resposta do bot:**
   - POST para `/n8n/webhook/chat` com a resposta gerada

## 📝 Exemplo de Fluxo N8N

1. Usuário envia mensagem pelo frontend
2. Frontend chama `POST /conversations/{id}/messages`
3. N8N recebe trigger e busca contexto em `/n8n/user-context`
4. N8N processa com IA e envia resposta via `/n8n/webhook/chat`
5. Frontend atualiza conversa em tempo real