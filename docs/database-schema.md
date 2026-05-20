# Esquema de banco de dados proposto

O objetivo deste esquema é orientar a futura migração do MVP estático para um
ambiente com backend real, utilizando o Supabase como plataforma de banco de
dados e autenticação. O esquema contempla entidades necessárias para
armazenar usuários, conteúdos educacionais, progresso e planos de
assinatura.

## Tabelas principais

| Tabela | Descrição |
|-------|-----------|
| `profiles` | Armazena os perfis de usuário, incluindo nome, e‑mail e data de criação. |
| `courses` | Representa cursos ou trilhas completos disponíveis na plataforma. |
| `modules` | Módulos ou seções dentro de um curso. |
| `lessons` | Aulas individuais pertencentes a um módulo. |
| `projects` | Projetos‑modelo disponíveis para estudo. |
| `project_files` | Registra os arquivos associados a cada projeto. |
| `disciplines` | Lista de disciplinas (Estrutural, Elétrica, etc.) para normalização. |
| `prompts` | Armazena prompts base e personalizados. |
| `prompt_versions` | Histórico de versões de um prompt personalizado pelo usuário. |
| `checklists` | Checklists reutilizáveis com seus itens. |
| `agents` | Definições de agentes disponíveis na plataforma. |
| `downloads` | Materiais para download. |
| `favorites` | Relação entre usuários e projetos/prompt favoritos. |
| `user_progress` | Progresso do usuário em aulas, projetos e checklists. |
| `user_notes` | Notas pessoais associadas a aulas ou projetos. |
| `technical_acknowledgements` | Registra se o usuário aceitou o aviso de responsabilidade. |
| `plans` | Planos de assinatura da plataforma. |
| `subscriptions` | Assinaturas ativas dos usuários. |

Cada tabela possui campos adicionais que estabelecem relações (chaves
estrangeiras) e metadados (datas de criação/atualização). Consulte o arquivo
`supabase/schema.sql` para ver os detalhes.