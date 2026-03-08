import { useEffect, useState } from 'react';
import { getTargetDistribution, getFeaturesImportance, getCorrelation } from '../services/api';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [targetData, setTargetData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [corrData, setCorrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [target, features, corrs] = await Promise.all([
          getTargetDistribution(),
          getFeaturesImportance(),
          getCorrelation()
        ]);
        setTargetData(target);
        
        // Formatear features para Recharts
        setFeaturesData(features.map(f => ({
          name: f.name.length > 15 ? f.name.substring(0, 15) + '...' : f.name,
          fullname: f.name,
          importance: parseFloat(f.importance.toFixed(4))
        })));
        
        setCorrData(corrs.map(c => ({
          name: c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name,
          fullname: c.name,
          correlation: parseFloat(c.correlation.toFixed(4)),
          is_positive: c.is_positive
        })));
      } catch (err) {
        console.error("Error loading charts data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard de Análisis</h1>
        <p className="text-slate-500 mt-2">Exploración del dataset, importancia de las variables y correlaciones descubiertas por el modelo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Distribución del Target */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Distribución del Target (Variables a Predecir)</h2>
          <div className="h-80 w-full relative">
            {targetData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={targetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {targetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => new Intl.NumberFormat('es-MX').format(value)}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
               <div className="flex h-full items-center justify-center text-slate-400">Sin datos</div>
            )}
          </div>
        </div>

        {/* Top 10 Correlaciones */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Top 10 Correlaciones con Default</h2>
          <div className="h-80 w-full relative">
            {corrData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={corrData}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                  <Tooltip 
                    formatter={(value) => value.toFixed(3)}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="correlation" radius={[0, 4, 4, 0]}>
                    {corrData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.is_positive ? '#ef4444' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
               <div className="flex h-full items-center justify-center text-slate-400">Sin datos</div>
            )}
          </div>
        </div>

        {/* Feature Importance */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Top 15 Features por Importancia (Random Forest)</h2>
          <div className="h-[400px] w-full relative">
            {featuresData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featuresData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => value.toFixed(4)}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="importance" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
               <div className="flex h-full items-center justify-center text-slate-400">Sin datos</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
