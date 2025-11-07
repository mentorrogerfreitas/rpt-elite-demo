import { trpc } from "@/lib/trpc";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Loader2, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { data: games, isLoading } = trpc.games.list.useQuery();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </MainLayout>
    );
  }

  const gamesList = games || [];
  const avgRtp = gamesList.length > 0
    ? (gamesList.reduce((acc, game) => acc + game.currentRtp, 0) / gamesList.length / 100).toFixed(2)
    : "0.00";

  // Mock chart data
  const chartData = [
    { time: "00:00", rtp: 96.2 },
    { time: "04:00", rtp: 96.5 },
    { time: "08:00", rtp: 96.8 },
    { time: "12:00", rtp: 97.1 },
    { time: "16:00", rtp: 96.9 },
    { time: "20:00", rtp: 97.3 },
    { time: "24:00", rtp: 96.7 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Monitore o RTP e volatilidade em tempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">Total de Jogos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{gamesList.length}</div>
              <p className="text-xs text-slate-400 mt-1">Monitorados em tempo real</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">RTP Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">{avgRtp}%</div>
              <p className="text-xs text-slate-400 mt-1">Média de todos os jogos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">Volatilidade Alta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">
                {gamesList.filter(g => g.volatility === "high").length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Jogos com volatilidade alta</p>
            </CardContent>
          </Card>
        </div>

        {/* RTP Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">RTP Médio - Últimas 24h</CardTitle>
            <CardDescription className="text-slate-400">Evolução do RTP ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis domain={[95, 98]} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rtp"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 4 }}
                  name="RTP (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Games Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Jogos Monitorados</CardTitle>
            <CardDescription className="text-slate-400">Lista completa de jogos com RTP atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Jogo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Provedor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">RTP Atual</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Volatilidade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {gamesList.map((game) => (
                    <tr key={game.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-3 px-4 text-sm text-white font-medium">{game.name}</td>
                      <td className="py-3 px-4 text-sm text-slate-300">{game.provider}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="font-bold text-amber-500">{(game.currentRtp / 100).toFixed(2)}%</span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          game.volatility === "high"
                            ? "bg-red-900/30 text-red-300"
                            : game.volatility === "medium"
                            ? "bg-yellow-900/30 text-yellow-300"
                            : "bg-green-900/30 text-green-300"
                        }`}>
                          {game.volatility === "high" ? "Alta" : game.volatility === "medium" ? "Média" : "Baixa"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-900/30 text-green-300">
                          Ativo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
