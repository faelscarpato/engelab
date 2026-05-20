# Instalação local

Este projeto deve instalar dependências pelo registry público do npm.

```bash
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Se aparecer erro tentando acessar `packages.applied-caas-gateway1.internal.api.openai.org`, remova o lock antigo e instale novamente:

```powershell
Remove-Item package-lock.json -Force
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force
npm config set registry https://registry.npmjs.org/
npm install
```
