//import para el env, express y el supabase

import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(express.json())

//crear el cliente
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

//testing productos
app.get('/productos', async (req, res) => {
  const { data, error } = await supabase.from('productos').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

//confirmacion de que esta corriendo
app.listen(3000, () => console.log('✅ Backend running on port 3000'))