import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/config/db/schema.ts', // Onde vamos criar nossas tabelas logo menos
  out: './drizzle',                     // Pasta onde o Drizzle vai gerar os scripts SQL
  dialect: 'sqlite',                   // O D1 roda em cima de SQLite
  dbCredentials: {
    // Aponta para a pasta padrão que o Wrangler cria o banco SQLite localmente
    url: '.wrangler/state/v3/d1/miniflare-D1Database/db.sqlite'
  }
})