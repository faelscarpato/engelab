-- Esquema de banco de dados para Engelab IA
-- As tabelas definidas aqui servem como base para integrar o MVP ao
-- Supabase. Os tipos e restrições podem ser ajustados conforme as
-- necessidades de produção.

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Perfis de usuário (relacionado a auth.users via user_id)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cursos ou trilhas
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Módulos dentro de um curso
CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Aulas pertencentes a um módulo
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES modules ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  content TEXT,
  video_url TEXT,
  estimated_minutes INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Disciplinas (Estrutural, Elétrica, etc.)
CREATE TABLE IF NOT EXISTS disciplines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projetos‑modelo
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  project_number INTEGER NOT NULL,
  discipline_id INTEGER REFERENCES disciplines,
  description TEXT,
  learning_goal TEXT,
  level TEXT,
  estimated_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Arquivos associados aos projetos
CREATE TABLE IF NOT EXISTS project_files (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prompts base
CREATE TABLE IF NOT EXISTS prompts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  discipline_id INTEGER REFERENCES disciplines,
  prompt_type TEXT,
  content TEXT NOT NULL,
  how_to_use TEXT,
  level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Versões de prompts personalizadas pelos usuários
CREATE TABLE IF NOT EXISTS prompt_versions (
  id SERIAL PRIMARY KEY,
  prompt_id INTEGER REFERENCES prompts ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Checklists reutilizáveis
CREATE TABLE IF NOT EXISTS checklists (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Itens pertencentes a um checklist
CREATE TABLE IF NOT EXISTS checklist_items (
  id SERIAL PRIMARY KEY,
  checklist_id INTEGER REFERENCES checklists ON DELETE CASCADE,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

-- Agentes da plataforma
CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  when_to_use TEXT,
  delivers TEXT,
  recommended_level TEXT,
  initial_prompt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Downloads disponíveis
CREATE TABLE IF NOT EXISTS downloads (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  when_to_use TEXT,
  how_to_study TEXT,
  related_trail_id INTEGER REFERENCES courses,
  technical_notice TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Favoritos (relaciona usuários a projetos ou prompts)
CREATE TYPE favorite_type AS ENUM ('project', 'prompt');
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  favorite_type favorite_type NOT NULL,
  favorite_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Progresso do usuário em aulas, projetos e checklists
CREATE TYPE progress_status AS ENUM ('not-started', 'in-progress', 'completed');
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons,
  project_id INTEGER REFERENCES projects,
  checklist_id INTEGER REFERENCES checklists,
  status progress_status NOT NULL DEFAULT 'not-started',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notas pessoais associadas a aulas ou projetos
CREATE TYPE note_target AS ENUM ('lesson', 'project');
CREATE TABLE IF NOT EXISTS user_notes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  target_type note_target NOT NULL,
  target_id INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registro de aceites de responsabilidade técnica
CREATE TABLE IF NOT EXISTS technical_acknowledgements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Planos de assinatura
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assinaturas ativas
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status') THEN
    CREATE TYPE subscription_status AS ENUM ('active', 'canceled');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  plan_id INTEGER REFERENCES plans,
  status subscription_status NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL DEFAULT current_date,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON profiles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON plans TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON subscriptions TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
