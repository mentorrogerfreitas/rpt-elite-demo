# 🚀 Setup Completo - RPT ELITE Live Demo

## ⚡ Resumo Executivo

Você tem um projeto **100% pronto para deploy**. Siga os passos abaixo para colocar online em 30 minutos.

---

## 📋 Passo 1: Criar Repositório GitHub

### 1.1 Criar novo repositório
1. Acesse [github.com/new](https://github.com/new)
2. Nome: `rpt-elite-demo`
3. Descrição: `RPT ELITE - Plataforma SaaS de Análise de RTP`
4. Selecione "Public" (para deploy mais fácil)
5. Clique em "Create repository"

### 1.2 Adicionar repositório remoto
```bash
cd /home/ubuntu/rpt_elite_demo
git remote add origin https://github.com/SEU_USERNAME/rpt-elite-demo.git
git branch -M main
git push -u origin main
```

---

## 🌐 Passo 2: Deploy em Vercel (Frontend)

### 2.1 Criar conta Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Selecione "Continue with GitHub"
4. Autorize Vercel

### 2.2 Importar projeto
1. Clique em "New Project"
2. Selecione seu repositório `rpt-elite-demo`
3. Clique em "Import"

### 2.3 Configurar variáveis de ambiente
Na página de configuração, adicione:

```
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=seu_api_key_aqui
VITE_APP_TITLE=RPT ELITE
VITE_APP_LOGO=https://seu-logo-url.com/logo.png
```

### 2.4 Deploy
Clique em "Deploy". Vercel fará o build e deploy automaticamente.

**Resultado:** URL como `https://rpt-elite-demo.vercel.app`

---

## 🚂 Passo 3: Deploy em Railway (Backend)

### 3.1 Criar conta Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em "Start a New Project"
3. Selecione "Deploy from GitHub repo"
4. Autorize Railway

### 3.2 Selecionar repositório
1. Procure por `rpt-elite-demo`
2. Clique em "Deploy"

### 3.3 Configurar variáveis de ambiente
No painel do Railway, vá para "Variables" e adicione:

```
NODE_ENV=production
DATABASE_URL=seu_banco_de_dados_mysql
JWT_SECRET=gere_uma_chave_aleatoria_aqui
VITE_APP_TITLE=RPT ELITE
VITE_APP_LOGO=https://seu-logo-url.com/logo.png
BUILT_IN_FORGE_API_KEY=seu_api_key_aqui
BUILT_IN_FORGE_API_URL=https://api.manus.im
```

### 3.4 Deploy
Railway fará o deploy automaticamente.

**Resultado:** URL como `https://rpt-elite-demo.up.railway.app`

---

## 🔗 Passo 4: Conectar Frontend e Backend

### 4.1 Atualizar URL do backend no Vercel
1. Vá para "Settings" → "Environment Variables"
2. Adicione:
```
VITE_API_URL=https://rpt-elite-demo.up.railway.app
```

### 4.2 Fazer novo deploy
Clique em "Deployments" → "Redeploy" para aplicar as mudanças.

---

## 🌍 Passo 5: Configurar Domínio Customizado (Opcional)

### 5.1 Comprar domínio
- GoDaddy, Namecheap, ou outro registrador
- Exemplo: `rtp-elite.com.br`

### 5.2 Apontar para Vercel
1. No Vercel, vá para "Settings" → "Domains"
2. Adicione seu domínio
3. Siga as instruções de DNS
4. Aguarde propagação (5-30 minutos)

### 5.3 Apontar para Railway (API)
1. No Railway, vá para "Settings" → "Custom Domain"
2. Adicione um subdomínio como `api.rtp-elite.com.br`
3. Siga as instruções de DNS

---

## ✅ Checklist Final

- [ ] Repositório GitHub criado
- [ ] Código feito push para GitHub
- [ ] Conta Vercel criada
- [ ] Projeto importado em Vercel
- [ ] Variáveis de ambiente configuradas em Vercel
- [ ] Deploy em Vercel concluído
- [ ] Conta Railway criada
- [ ] Projeto importado em Railway
- [ ] Variáveis de ambiente configuradas em Railway
- [ ] Deploy em Railway concluído
- [ ] Frontend e Backend conectados
- [ ] Teste da plataforma online
- [ ] Domínio customizado (opcional)

---

## 🧪 Teste a Plataforma

1. Acesse `https://rpt-elite-demo.vercel.app`
2. Clique em "Entrar"
3. Faça login com Manus OAuth
4. Navegue pelo Dashboard, Volatilidade e Alertas
5. Verifique se os dados estão carregando

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
cd /home/ubuntu/rpt_elite_demo
pnpm install
pnpm build
git add -A
git commit -m "Fix: Install dependencies"
git push
```

### Erro: "Database connection failed"
- Verifique se DATABASE_URL está correto
- Verifique se o banco de dados está online
- Verifique firewall/segurança

### Erro: "Build failed"
- Verifique logs no Vercel/Railway
- Tente fazer rebuild

---

## 📊 URLs Importantes

| Serviço | URL |
|---------|-----|
| **Frontend** | https://rpt-elite-demo.vercel.app |
| **Backend** | https://rpt-elite-demo.up.railway.app |
| **GitHub** | https://github.com/SEU_USERNAME/rpt-elite-demo |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Railway Dashboard** | https://railway.app/dashboard |

---

## 🎉 Próximos Passos

1. ✅ Deploy concluído
2. 📋 Testar a plataforma
3. 💰 Configurar Stripe (opcional)
4. 📢 Criar landing page
5. 🚀 Iniciar marketing e prospecção

---

## 📞 Suporte

Se tiver dúvidas:
1. Leia DEPLOYMENT.md
2. Verifique logs do Vercel/Railway
3. Consulte documentação oficial

---

**Status:** Pronto para Deploy ✅  
**Tempo Estimado:** 30 minutos  
**Dificuldade:** Fácil (clique e pronto)
