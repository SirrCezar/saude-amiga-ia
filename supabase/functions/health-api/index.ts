import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          phone: string | null
          birth_date: string | null
          gender: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          phone?: string | null
          birth_date?: string | null
          gender?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
          birth_date?: string | null
          gender?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          appointment_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          appointment_date: string
          status?: string
        }
        Update: {
          title?: string
          description?: string | null
          appointment_date?: string
          status?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
        }
        Update: {
          title?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          sender_type: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          sender_type: string
        }
      }
      health_data: {
        Row: {
          id: string
          user_id: string
          data_type: string
          value: string
          unit: string | null
          recorded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          data_type: string
          value: string
          unit?: string | null
          recorded_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          key: string
          value: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          description?: string | null
        }
        Update: {
          value?: string
          description?: string | null
        }
      }
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/health-api', '')
    const method = req.method

    console.log(`${method} ${path}`)

    // Routes
    switch (true) {
      // Profiles endpoints
      case path === '/profiles' && method === 'GET':
        return await getProfiles(supabaseClient)
      case path === '/profiles' && method === 'POST':
        return await createProfile(supabaseClient, req)
      case path.startsWith('/profiles/') && method === 'GET':
        return await getProfile(supabaseClient, path.split('/')[2])
      case path.startsWith('/profiles/') && method === 'PUT':
        return await updateProfile(supabaseClient, path.split('/')[2], req)
      case path.startsWith('/profiles/') && method === 'DELETE':
        return await deleteProfile(supabaseClient, path.split('/')[2])

      // Appointments endpoints
      case path === '/appointments' && method === 'GET':
        return await getAppointments(supabaseClient)
      case path === '/appointments' && method === 'POST':
        return await createAppointment(supabaseClient, req)
      case path.startsWith('/appointments/') && method === 'GET':
        return await getAppointment(supabaseClient, path.split('/')[2])
      case path.startsWith('/appointments/') && method === 'PUT':
        return await updateAppointment(supabaseClient, path.split('/')[2], req)
      case path.startsWith('/appointments/') && method === 'DELETE':
        return await deleteAppointment(supabaseClient, path.split('/')[2])

      // Chat conversations endpoints
      case path === '/conversations' && method === 'GET':
        return await getConversations(supabaseClient)
      case path === '/conversations' && method === 'POST':
        return await createConversation(supabaseClient, req)
      case path.startsWith('/conversations/') && method === 'GET':
        return await getConversation(supabaseClient, path.split('/')[2])
      case path.startsWith('/conversations/') && method === 'PUT':
        return await updateConversation(supabaseClient, path.split('/')[2], req)
      case path.startsWith('/conversations/') && method === 'DELETE':
        return await deleteConversation(supabaseClient, path.split('/')[2])

      // Chat messages endpoints
      case path.startsWith('/conversations/') && path.endsWith('/messages') && method === 'GET':
        return await getMessages(supabaseClient, path.split('/')[2])
      case path.startsWith('/conversations/') && path.endsWith('/messages') && method === 'POST':
        return await createMessage(supabaseClient, path.split('/')[2], req)
      case path.startsWith('/messages/') && method === 'DELETE':
        return await deleteMessage(supabaseClient, path.split('/')[2])

      // Health data endpoints
      case path === '/health-data' && method === 'GET':
        return await getHealthData(supabaseClient, url.searchParams)
      case path === '/health-data' && method === 'POST':
        return await createHealthData(supabaseClient, req)
      case path.startsWith('/health-data/') && method === 'DELETE':
        return await deleteHealthData(supabaseClient, path.split('/')[2])

      // System settings endpoints
      case path === '/settings' && method === 'GET':
        return await getSettings(supabaseClient)
      case path === '/settings' && method === 'POST':
        return await createSetting(supabaseClient, req)
      case path.startsWith('/settings/') && method === 'PUT':
        return await updateSetting(supabaseClient, path.split('/')[2], req)
      case path.startsWith('/settings/') && method === 'DELETE':
        return await deleteSetting(supabaseClient, path.split('/')[2])

      // N8N Integration endpoints
      case path === '/n8n/webhook/chat' && method === 'POST':
        return await n8nChatWebhook(supabaseClient, req)
      case path === '/n8n/user-context' && method === 'GET':
        return await n8nUserContext(supabaseClient, url.searchParams)

      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Profile functions
async function getProfiles(supabase: any) {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createProfile(supabase: any, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('profiles').insert(body).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getProfile(supabase: any, id: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function updateProfile(supabase: any, id: string, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('profiles').update(body).eq('id', id).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteProfile(supabase: any, id: string) {
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Appointment functions
async function getAppointments(supabase: any) {
  const { data, error } = await supabase.from('appointments').select('*').order('appointment_date', { ascending: true })
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createAppointment(supabase: any, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('appointments').insert(body).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getAppointment(supabase: any, id: string) {
  const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single()
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function updateAppointment(supabase: any, id: string, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('appointments').update(body).eq('id', id).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteAppointment(supabase: any, id: string) {
  const { error } = await supabase.from('appointments').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Conversation functions
async function getConversations(supabase: any) {
  const { data, error } = await supabase.from('chat_conversations').select('*').order('updated_at', { ascending: false })
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createConversation(supabase: any, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('chat_conversations').insert(body).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getConversation(supabase: any, id: string) {
  const { data, error } = await supabase.from('chat_conversations').select('*').eq('id', id).single()
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function updateConversation(supabase: any, id: string, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('chat_conversations').update(body).eq('id', id).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteConversation(supabase: any, id: string) {
  const { error } = await supabase.from('chat_conversations').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Message functions
async function getMessages(supabase: any, conversationId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createMessage(supabase: any, conversationId: string, req: Request) {
  const body = await req.json()
  const messageData = { ...body, conversation_id: conversationId }
  const { data, error } = await supabase.from('chat_messages').insert(messageData).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteMessage(supabase: any, id: string) {
  const { error } = await supabase.from('chat_messages').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Health data functions
async function getHealthData(supabase: any, searchParams: URLSearchParams) {
  let query = supabase.from('health_data').select('*')
  
  const dataType = searchParams.get('type')
  if (dataType) {
    query = query.eq('data_type', dataType)
  }
  
  const startDate = searchParams.get('start_date')
  if (startDate) {
    query = query.gte('recorded_at', startDate)
  }
  
  const endDate = searchParams.get('end_date')
  if (endDate) {
    query = query.lte('recorded_at', endDate)
  }
  
  query = query.order('recorded_at', { ascending: false })
  
  const { data, error } = await query
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createHealthData(supabase: any, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('health_data').insert(body).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteHealthData(supabase: any, id: string) {
  const { error } = await supabase.from('health_data').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// System settings functions
async function getSettings(supabase: any) {
  const { data, error } = await supabase.from('system_settings').select('*').order('key')
  if (error) throw error
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function createSetting(supabase: any, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('system_settings').insert(body).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function updateSetting(supabase: any, id: string, req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('system_settings').update(body).eq('id', id).select()
  if (error) throw error
  return new Response(JSON.stringify(data[0]), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function deleteSetting(supabase: any, id: string) {
  const { error } = await supabase.from('system_settings').delete().eq('id', id)
  if (error) throw error
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// N8N Integration functions
async function n8nChatWebhook(supabase: any, req: Request) {
  const body = await req.json()
  const { conversation_id, user_message, bot_response } = body
  
  console.log('N8N Chat Webhook:', { conversation_id, user_message, bot_response })
  
  // Insert user message if provided
  if (user_message) {
    await supabase.from('chat_messages').insert({
      conversation_id,
      content: user_message,
      sender_type: 'user'
    })
  }
  
  // Insert bot response
  if (bot_response) {
    await supabase.from('chat_messages').insert({
      conversation_id,
      content: bot_response,
      sender_type: 'bot'
    })
  }
  
  // Update conversation timestamp
  await supabase.from('chat_conversations').update({
    updated_at: new Date().toISOString()
  }).eq('id', conversation_id)
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function n8nUserContext(supabase: any, searchParams: URLSearchParams) {
  const userId = searchParams.get('user_id')
  if (!userId) {
    throw new Error('user_id parameter is required')
  }
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  // Get recent appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('appointment_date', { ascending: false })
    .limit(5)
  
  // Get recent health data
  const { data: healthData } = await supabase
    .from('health_data')
    .select('*')
    .eq('user_id', userId)
    .order('recorded_at', { ascending: false })
    .limit(10)
  
  const context = {
    profile,
    appointments,
    healthData,
    timestamp: new Date().toISOString()
  }
  
  return new Response(JSON.stringify(context), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}