# Engelab IA – MVP com Next.js

Este repositório contém a implementação inicial da plataforma **Engelab IA**
usando **Next.js (App Router)**, **React**, **TypeScript** e **Tailwind CSS**.
O foco deste MVP é oferecer uma experiência web vendável e educacional
baseada em dados mockados e com persistência local (via `localStorage`).

## Como rodar localmente

1. Certifique‑se de ter **Node.js** instalado (versão 18 ou superior).
2. Na raiz do projeto (`engelab-next`), instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000` no navegador para visualizar a aplicação.

> **Nota:** O projeto utiliza a App Router do Next.js. As rotas internas da
> plataforma estão sob `/app`. A autenticação é simulada nas telas de
> cadastro e login; ao submeter o formulário, o usuário é redirecionado
> automaticamente para `/app`.

## Estrutura principal

- **app/** – Contém as páginas e o layout do Next.js.
  - `page.tsx` – Landing page pública com descrição do produto.
  - `login/page.tsx` – Tela de login mockada.
  - `cadastro/page.tsx` – Tela de cadastro mockada.
  - `app/page.tsx` – Dashboard do aluno.
  - Demais rotas em `app/app/*` – Implementam as seções internas: trilha inicial, biblioteca, projetos individuais, laboratório de prompts, checklists, agentes, downloads, progresso, trilhas, módulos plus e responsabilidade técnica.
- **components/** – Componentes reutilizáveis como `Sidebar` e `Header`.
- **data/** – Conjunto de arquivos TypeScript com dados mockados (projetos, aulas, trilhas, prompts, checklists, agentes, downloads e módulos plus).
- **docs/** – Documentação do esquema de banco de dados (`database-schema.md`).
- **supabase/** – Esquema SQL (`schema.sql`) para futura integração com Supabase.

## Próximos passos

- **Integrar Supabase:** utilizar o esquema SQL presente em `supabase/schema.sql` para criar as tabelas no Supabase e conectar o frontend usando as APIs de banco de dados e autenticação.
- **Autenticação real:** substituir a simulação de login/cadastro por Supabase Auth para registrar e autenticar usuários.
- **Persistir dados:** mover o armazenamento de progresso e favoritos do `localStorage` para tabelas do banco, permitindo sincronização entre dispositivos.
- **Uploads e downloads reais:** usar o Supabase Storage para hospedar arquivos de projetos, checklists e materiais complementares, substituindo os links mockados.
- **Planos de assinatura:** implementar a gestão de planos e pagamento (por exemplo, via Stripe) e liberar acesso aos Módulos Plus de acordo com a assinatura.

Este MVP serve como base para evoluções futuras da plataforma, mantendo a
arquitetura modular, tipada e preparada para integrações externas.