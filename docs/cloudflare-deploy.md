# Deploy na Cloudflare Pages

## Comandos locais

```bash
npm install
npm run build
npm run build:cf
npm run preview:cf
```

No Windows, se o Wrangler tentar gravar logs fora da pasta do projeto e falhar,
rode antes:

```powershell
$env:XDG_CONFIG_HOME = (Join-Path (Get-Location).Path '.wrangler-config')
```

## Deploy

```bash
npm run deploy:cf
```

## Variáveis obrigatórias

Configure em **Settings > Environment variables** no projeto Pages:

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

## Configuração do Cloudflare Pages

Use exatamente:

```txt
Build command:
npx @cloudflare/next-on-pages@1

Build output directory:
.vercel/output/static

Root directory:
vazio
```

O arquivo `wrangler.toml` já contém `pages_build_output_dir = ".vercel/output/static"`.
