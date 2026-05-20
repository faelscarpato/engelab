# Deploy na Cloudflare

Este projeto usa Next.js com SSR, middleware, cookies, Server Actions e Supabase Admin API. Por isso o deploy correto na Cloudflare é com o adapter OpenNext no runtime de Workers. Um deploy estático do Cloudflare Pages não suporta a área `/app/admin` nem o login real.

## Comandos locais

```bash
npm install
npm run build
npm run build:cf
npm run preview:cf
```

## Deploy

```bash
npm run deploy:cf
```

O script usa `--keep-vars` para não apagar variáveis/secrets configuradas no dashboard da Cloudflare.

## Variáveis obrigatórias

Configure as mesmas variáveis em:

- Cloudflare Workers/Builds: Build variables and secrets
- Cloudflare Worker: Variables and Secrets de runtime

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

`SUPABASE_SERVICE_ROLE_KEY` deve ser Secret e nunca pode ter prefixo `NEXT_PUBLIC_`.

## Supabase Auth

No Supabase, configure:

- Site URL: URL pública do app na Cloudflare
- Redirect URL: `https://seu-dominio.com/redefinir-senha`

Para liberar a página admin, defina o usuário administrador:

```sql
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'seu-email@dominio.com';
```

## Cloudflare

O arquivo `wrangler.jsonc` já aponta para:

- Worker: `engelab-next`
- output do OpenNext: `.open-next/worker.js`
- assets: `.open-next/assets`
- `nodejs_compat`

Se quiser trocar o nome do app, altere `name` em `wrangler.jsonc`.
