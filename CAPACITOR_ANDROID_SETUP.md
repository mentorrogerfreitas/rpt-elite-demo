# 📱 CAPACITOR + ANDROID - RPT ELITE APP NATIVO

## ⏱️ Tempo Total: 3 Dias

Este guia vai transformar sua plataforma web em um app nativo Android publicável na Play Store.

---

## 📋 Pré-requisitos

### Obrigatório:
- [ ] Node.js 18+ instalado
- [ ] Android Studio instalado (https://developer.android.com/studio)
- [ ] Java Development Kit (JDK) 11+
- [ ] Git instalado
- [ ] Código do projeto em `/home/ubuntu/rpt_elite_demo`

### Opcional:
- [ ] Conta Google Play Developer ($25 one-time)
- [ ] Certificado de assinatura Android

---

## DIA 1: Instalar e Configurar Capacitor

### 1.1 Instalar Capacitor
```bash
cd /home/ubuntu/rpt_elite_demo

# Instalar Capacitor e plugins
pnpm add -D @capacitor/core @capacitor/cli
pnpm add @capacitor/app @capacitor/haptics @capacitor/keyboard
pnpm add @capacitor/status-bar @capacitor/splash-screen
```

### 1.2 Inicializar Capacitor
```bash
npx cap init

# Quando perguntado:
# App name: RPT ELITE
# App Package: com.rpt.elite
# Web dir: dist
```

### 1.3 Adicionar Plataforma Android
```bash
npx cap add android
```

### 1.4 Fazer Build do Frontend
```bash
pnpm build
```

### 1.5 Copiar Assets para Android
```bash
npx cap copy android
```

---

## DIA 2: Configurar Android Studio

### 2.1 Abrir Android Studio
```bash
npx cap open android
```

### 2.2 Configurar Assinatura
1. No Android Studio, vá para "Build" > "Generate Signed Bundle / APK"
2. Selecione "APK"
3. Clique em "Next"

### 2.3 Criar Keystore
1. Clique em "Create new..."
2. Preencha os dados:
   - Key store path: `/home/seu_usuario/rpt-elite-release.keystore`
   - Password: `sua_senha_forte`
   - Confirm: `sua_senha_forte`
   - Alias: `rpt-elite-key`
   - Password: `sua_senha_forte`
   - Confirm: `sua_senha_forte`
   - Validity: 25 anos
   - First and Last Name: Seu Nome
3. Clique em "OK"

### 2.4 Configurar Build
1. Selecione "release"
2. Clique em "Next"
3. Clique em "Finish"

**Resultado:** APK gerado em `android/app/release/app-release.apk`

---

## DIA 3: Publicar na Play Store

### 3.1 Criar Conta Google Play Developer
1. Vá para https://play.google.com/console
2. Clique em "Create account"
3. Pague $25 (one-time)
4. Preencha informações

### 3.2 Criar Novo App
1. Clique em "Create app"
2. Preencha:
   - App name: RPT ELITE
   - Default language: Português (Brasil)
   - App category: Productivity
   - App type: Free
3. Clique em "Create app"

### 3.3 Configurar App Store Listing
1. Vá para "App content"
2. Preencha:
   - Title: RPT ELITE
   - Short description: Análise de RTP e Volatilidade
   - Full description: (use de `ANUNCIO_APPSUMO.md`)
   - Screenshots: (adicione 4-5 screenshots)
   - Feature graphic: (1024x500 px)

### 3.4 Configurar Preço e Distribuição
1. Vá para "Pricing and distribution"
2. Selecione "Free"
3. Selecione países onde quer distribuir
4. Clique em "Save"

### 3.5 Fazer Upload do APK
1. Vá para "Release" > "Production"
2. Clique em "Create new release"
3. Clique em "Browse files"
4. Selecione `app-release.apk`
5. Clique em "Upload"

### 3.6 Revisar e Publicar
1. Revise todas as informações
2. Clique em "Review release"
3. Clique em "Start rollout to Production"

**Resultado:** App na Play Store em 2-4 horas ✅

---

## 🔧 Configurações Importantes

### capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rpt.elite',
  appName: 'RPT ELITE',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
```

### AndroidManifest.xml
Adicione permissões necessárias:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

---

## 📱 Testar Localmente

### Emulador Android:
```bash
# Abrir Android Studio
npx cap open android

# No Android Studio:
# 1. Clique em "Run" > "Run 'app'"
# 2. Selecione um emulador
# 3. Clique em "OK"
```

### Dispositivo Real:
```bash
# Conectar Android via USB
# Ativar "Developer Mode" no dispositivo

# No Android Studio:
# 1. Clique em "Run" > "Run 'app'"
# 2. Selecione seu dispositivo
# 3. Clique em "OK"
```

---

## 🔄 Atualizar App

### Quando Fazer Mudanças:
```bash
# 1. Fazer mudanças no código
# 2. Fazer build
pnpm build

# 3. Copiar para Android
npx cap copy android

# 4. Sincronizar
npx cap sync android

# 5. Abrir Android Studio
npx cap open android

# 6. Gerar novo APK (seguir passos acima)
```

---

## 📊 Checklist Capacitor + Android

- [ ] Capacitor instalado
- [ ] Android Studio configurado
- [ ] Keystore criado
- [ ] APK gerado
- [ ] Conta Google Play Developer criada
- [ ] App listing configurado
- [ ] APK enviado para Play Store
- [ ] App publicado na Play Store

---

## 🆘 Troubleshooting

### "Gradle build failed":
```bash
# Limpar cache
cd android
./gradlew clean
cd ..

# Tentar novamente
npx cap sync android
```

### "APK not signed":
1. Verifique se o keystore foi criado
2. Verifique se a senha está correta
3. Tente gerar novamente

### "App não aparece na Play Store":
1. Verifique se o app foi aprovado (pode levar 2-4 horas)
2. Verifique se está visível em "Release" > "Production"
3. Tente buscar por "RPT ELITE" na Play Store

---

## 📞 Links Úteis

- Capacitor Docs: https://capacitorjs.com/docs
- Android Studio: https://developer.android.com/studio
- Google Play Console: https://play.google.com/console
- Capacitor Android: https://capacitorjs.com/docs/android

---

## 🎉 Você Tem um App Nativo!

Seu app está na Play Store e pronto para download.

**Próximos Passos:**
1. Compartilhe o link da Play Store
2. Comece a vender
3. Receba avaliações e feedback
4. Atualize conforme necessário

---

**Desenvolvido por:** Manus AI  
**Data:** Novembro 2025  
**Status:** Production Ready ✅
