import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { BarChart3, TrendingUp, AlertCircle, Zap } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated && user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />}
            <span className="text-xl font-bold text-white">{APP_TITLE}</span>
          </div>
          <Button onClick={() => window.location.href = getLoginUrl()} className="bg-amber-500 hover:bg-amber-600">
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
          Análise de RTP em Tempo Real
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Monitore a volatilidade e RTP de milhares de jogos online. Tome decisões baseadas em dados reais.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => window.location.href = getLoginUrl()} className="bg-amber-500 hover:bg-amber-600">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Funcionalidades Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-white">RTP em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Monitore o RTP de jogos com atualização contínua</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-white">Análise de Volatilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Identifique padrões de volatilidade em segundos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition">
            <CardHeader>
              <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-white">Alertas Personalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Receba notificações de mudanças importantes</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-amber-500 transition">
            <CardHeader>
              <Zap className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Infraestrutura otimizada para alta velocidade</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-800/50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-amber-500">10,000+</p>
            <p className="text-slate-300 mt-2">Jogos Monitorados</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-amber-500">24/7</p>
            <p className="text-slate-300 mt-2">Monitoramento Contínuo</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-amber-500">99.9%</p>
            <p className="text-slate-300 mt-2">Uptime Garantido</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Pronto para Começar?</h2>
        <p className="text-xl text-slate-300 mb-8">Acesse a demo agora e veja o poder do RTP ELITE</p>
        <Button size="lg" onClick={() => window.location.href = getLoginUrl()} className="bg-amber-500 hover:bg-amber-600">
          Entrar na Plataforma
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>&copy; 2025 {APP_TITLE}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
