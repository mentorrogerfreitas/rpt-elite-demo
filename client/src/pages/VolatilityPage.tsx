import { trpc } from "@/lib/trpc";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Loader2 } from "lucide-react";

export default function VolatilityPage() {
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

  // Prepare data for volatility chart
  const volatilityData = gamesList.map((game) => ({
    name: game.name.substring(0, 10),
    rtp: game.currentRtp / 100,
    volatility: game.volatility === "high" ? 3 : game.volatility === "medium" ? 2 : 1,
  }));

  const volatilityStats = [
    { name: "Alta", value: gamesList.filter(g => g.volatility === "high").length, color: "bg-red-500" },
    { name: "Média", value: gamesList.filter(g => g.volatility === "medium").length, color: "bg-yellow-500" },
    { name: "Baixa", value: gamesList.filter(g => g.volatility === "low").length, color: "bg-green-500" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Análise de Volatilidade</h1>
          <p className="text-slate-400 mt-2">Compreenda o padrão de volatilidade dos jogos</p>
        </div>

        {/* Volatility Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {volatilityStats.map((stat) => (
            <Card key={stat.name} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-300 text-sm font-medium">{stat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className={`h-12 w-12 rounded ${stat.color} opacity-20`}></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Jogos com volatilidade {stat.name.toLowerCase()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Volatility Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Volatilidade</CardTitle>
            <CardDescription className="text-slate-400">RTP vs Volatilidade por Jogo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volatilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
                <Bar dataKey="rtp" fill="#f59e0b" name="RTP (%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volatility Details Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Detalhes de Volatilidade</CardTitle>
            <CardDescription className="text-slate-400">Análise detalhada de cada jogo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Jogo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Provedor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">RTP</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Volatilidade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Nível de Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {gamesList.map((game) => {
                    const riskLevel = game.volatility === "high" ? "Alto" : game.volatility === "medium" ? "Médio" : "Baixo";
                    const riskColor = game.volatility === "high" ? "text-red-400" : game.volatility === "medium" ? "text-yellow-400" : "text-green-400";
                    
                    return (
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
                        <td className={`py-3 px-4 text-sm font-semibold ${riskColor}`}>
                          {riskLevel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>{gamesList.filter(g => g.volatility === "high").length} jogos com volatilidade alta - maior potencial de ganho/perda</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>RTP médio de {(gamesList.reduce((acc, g) => acc + g.currentRtp, 0) / gamesList.length / 100).toFixed(2)}% indica mercado equilibrado</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Monitore jogos com volatilidade alta para oportunidades de lucro rápido</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
