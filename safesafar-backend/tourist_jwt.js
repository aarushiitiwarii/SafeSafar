import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://blmdribxvczlzglskyre.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbWRyaWJ4dmN6bHpnbHNreXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODY3MTAsImV4cCI6MjA3NDM2MjcxMH0.IniFbKNOVOgv3JLNms1Km6fPHOt7D335BjzcyFttHoI'  // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey)

async function loginTourist() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'tourism@safesafar.com',
    password: 'Tourism@123'
  })

  if (error) console.error('Login error:', error.message)
  else console.log('Tourist JWT:', data.session.access_token)
}

loginTourist()
