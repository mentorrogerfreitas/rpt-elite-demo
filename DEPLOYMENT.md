# 🚀 Guia de Deployment - RPT ELITE

## Opção 1: Vercel + Railway (Recomendado)

### 1. Deploy do Backend em Railway

#### Passo 1: Criar conta em Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em "Start a New Project"
3. Faça login com GitHub

#### Passo 2: Conectar repositório
1. Clique em "Deploy from GitHub"
2. Selecione seu repositório
3. Autorize Railway

#### Passo 3: Configurar variáveis de ambiente
No painel do Railway, adicione:
```
NODE_ENV=production
DATABASE_URL=seu_banco_de_dados
JWT_SECRET=sua_chave_secreta
VITE_APP_TITLE=RPT ELITE
VITE_APP_LOGO=seu_logo_url
```

#### Passo 4: Deploy
Railway fará o deploy automaticamente quando você fazer push no GitHub.

### 2. Deploy do Frontend em Vercel

#### Passo 1: Criar conta em Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Faça login com GitHub

#### Passo 2: Importar projeto
1. Clique em "New Project"
2. Selecione seu repositório
3. Clique em "Import"

#### Passo 3: Configurar variáveis de ambiente
```
VITE_FRONTEND_FORGE_API_URL=sua_api_url
VITE_FRONTEND_FORGE_API_KEY=sua_api_key
```

#### Passo 4: Deploy
Clique em "Deploy". Vercel fará o deploy automaticamente.

---

## Opção 2: AWS (Para Escala)

### Backend em EC2 + RDS
```bash
# 1. Criar instância EC2
# 2. Instalar Node.js e PM2
# 3. Fazer deploy com PM2
pm2 start dist/index.js --name "rpt-elite"
pm2 save
pm2 startup
```

### Frontend em CloudFront + S3
```bash
# 1. Build
pnpm build

# 2. Upload para S3
aws s3 sync dist s3://seu-bucket

# 3. Configurar CloudFront
# Apontar para seu bucket S3
```

---

## Opção 3: Docker (Qualquer Servidor)

### Build Docker
```bash
docker build -t rpt-elite .
docker run -p 3000:3000 rpt-elite
```

### Docker Compose
```bash
docker-compose up -d
```

---

## Configuração de Domínio

### 1. Comprar domínio
- GoDaddy, Namecheap, ou outro registrador

### 2. Apontar para Vercel
No painel do Vercel:
1. Vá para "Settings" → "Domains"
2. Adicione seu domínio
3. Siga as instruções de DNS

### 3. Apontar para Railway
No painel do Railway:
1. Vá para "Settings" → "Custom Domain"
2. Adicione seu domínio
3. Atualize DNS

---

## Checklist de Deploy

- [ ] Banco de dados criado e migrado
- [ ] Variáveis de ambiente configuradas
- [ ] Build local testado
- [ ] Repositório GitHub pronto
- [ ] Conta Vercel criada
- [ ] Conta Railway criada
- [ ] Domínio comprado
- [ ] DNS configurado
- [ ] Stripe integrado
- [ ] Email de suporte configurado
- [ ] SSL/HTTPS ativado
- [ ] Backups configurados

---

## Monitoramento Pós-Deploy

### Logs
```bash
# Railway
railway logs

# Vercel
vercel logs
```

### Performance
- Monitorar tempo de resposta
- Verificar taxa de erro
- Acompanhar uso de recursos

### Backups
- Configurar backups automáticos do banco de dados
- Testar restauração regularmente

---

## Troubleshooting

### Erro: "Cannot find module"
```bash
pnpm install
pnpm build
```

### Erro: "Database connection failed"
Verifique:
- DATABASE_URL está correto
- Banco de dados está online
- Firewall permite conexão

### Erro: "Build failed"
```bash
# Limpar cache
rm -rf node_modules .next dist
pnpm install
pnpm build
```

---

## Custos Estimados

| Serviço | Custo Mensal |
|---------|------------|
| Vercel | R$ 20-50 |
| Railway | R$ 50-200 |
| Domínio | R$ 50-100 |
| Email | R$ 20-50 |
| **Total** | **R$ 140-400** |

---

## Próximos Passos

1. Deploy em Vercel + Railway
2. Testar a plataforma online
3. Configurar Stripe
4. Criar landing page
5. Iniciar marketing
