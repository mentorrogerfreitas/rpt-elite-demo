import { trpc } from "@/lib/trpc";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Bell, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AlertsPage() {
  const { data: alerts, isLoading } = trpc.alerts.list.useQuery();
  const { data: games } = trpc.games.list.useQuery();
  const [showNewAlert, setShowNewAlert] = useState(false);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </MainLayout>
    );
  }

  const alertsList = alerts || [];
  const gamesList = games || [];

  const mockAlerts = [
    {
      id: 1,
      gameId: 1,
      gameName: "Book of Ra",
      alertType: "rtp_change",
      threshold: 9600,
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      triggeredAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 2,
      gameId: 5,
      gameName: "Immortal Romance",
      alertType: "volatility_spike",
      threshold: 9650,
      isActive: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      triggeredAt: null,
    },
    {
      id: 3,
      gameId: 8,
      gameName: "Sweet Bonanza",
      alertType: "rtp_change",
      threshold: 9500,
      isActive: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      triggeredAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Alertas</h1>
            <p className="text-slate-400 mt-2">Gerencie seus alertas de RTP e volatilidade</p>
          </div>
          <Button onClick={() => setShowNewAlert(!showNewAlert)} className="bg-amber-500 hover:bg-amber-600">
            <Plus className="h-4 w-4 mr-2" />
            Novo Alerta
          </Button>
        </div>

        {/* New Alert Form */}
        {showNewAlert && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Criar Novo Alerta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Jogo</label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option>Selecione um jogo...</option>
                    {gamesList.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Alerta</label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option value="rtp_change">Mudança de RTP</option>
                    <option value="volatility_spike">Pico de Volatilidade</option>
                    <option value="price_drop">Queda de Preço</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Limite (RTP %)</label>
                  <input
                    type="number"
                    placeholder="96.50"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="bg-amber-500 hover:bg-amber-600">Criar Alerta</Button>
                  <Button variant="outline" onClick={() => setShowNewAlert(false)} className="border-slate-600">
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">Total de Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{mockAlerts.length}</div>
              <p className="text-xs text-slate-400 mt-1">Alertas configurados</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">Alertas Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {mockAlerts.filter(a => a.isActive).length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Monitorando em tempo real</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">Disparados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">
                {mockAlerts.filter(a => a.triggeredAt).length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Últimas 24 horas</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Seus Alertas</CardTitle>
            <CardDescription className="text-slate-400">Gerenciar e monitorar alertas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-amber-500/50 transition"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${alert.isActive ? "bg-green-900/30" : "bg-slate-600/30"}`}>
                      <Bell className={`h-5 w-5 ${alert.isActive ? "text-green-400" : "text-slate-400"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{alert.gameName}</h3>
                      <p className="text-sm text-slate-400">
                        {alert.alertType === "rtp_change"
                          ? "Mudança de RTP"
                          : alert.alertType === "volatility_spike"
                          ? "Pico de Volatilidade"
                          : "Queda de Preço"}{" "}
                        • Limite: {(alert.threshold / 100).toFixed(2)}%
                      </p>
                      {alert.triggeredAt && (
                        <p className="text-xs text-amber-400 mt-1">
                          Disparado há {Math.floor((Date.now() - alert.triggeredAt.getTime()) / 60000)} minutos
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        alert.isActive
                          ? "bg-green-900/30 text-green-300"
                          : "bg-slate-600/30 text-slate-400"
                      }`}
                    >
                      {alert.isActive ? "Ativo" : "Inativo"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Histórico de Disparos</CardTitle>
            <CardDescription className="text-slate-400">Alertas disparados nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAlerts
                .filter(a => a.triggeredAt)
                .map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{alert.gameName}</p>
                      <p className="text-xs text-slate-400">
                        {alert.triggeredAt?.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-amber-500 text-sm font-semibold">
                      {(alert.threshold / 100).toFixed(2)}%
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
