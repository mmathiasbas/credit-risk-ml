import { ShieldCheck, AlertTriangle, XCircle, RotateCcw } from 'lucide-react';

export default function ScoreResult({ result, onReset }) {
  const { probability, segment, segment_color, message, threshold_used } = result;
  
  const percentage = (probability * 100).toFixed(1);
  
  const colorMap = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      fill: 'fill-green-500',
      stroke: 'stroke-green-600',
      icon: ShieldCheck,
      gradient: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/30'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      fill: 'fill-yellow-500',
      stroke: 'stroke-yellow-600',
      icon: AlertTriangle,
      gradient: 'from- желтый-500 to-yellow-600',
      shadow: 'shadow-yellow-500/30'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      fill: 'fill-red-500',
      stroke: 'stroke-red-600',
      icon: XCircle,
      gradient: 'from-red-500 to-red-600',
      shadow: 'shadow-red-500/30'
    }
  };

  const theme = colorMap[segment_color] || colorMap.yellow;
  const Icon = theme.icon;

  return (
    <div className={`card overflow-hidden border-t-8 border-t-[${theme.stroke}]`}>
      <div className={`p-8 ${theme.bg}`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Icon className={`w-10 h-10 ${theme.stroke}`} />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900">
            Score de Riesgo: <span className={theme.text}>{percentage}%</span>
          </h2>
          
          <div className={`px-4 py-1 rounded-full font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r ${theme.gradient} shadow-lg ${theme.shadow}`}>
            Riesgo {segment}
          </div>
          
          <p className="text-lg text-slate-700 max-w-lg mt-4 font-medium">
            {message}
          </p>
          
          <div className="text-sm text-slate-500 mt-2">
            Umbral de decisión para riesgo alto: {threshold_used * 100}%
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 border-t border-slate-100 flex justify-center">
        <button onClick={onReset} className="btn-secondary flex items-center space-x-2">
          <RotateCcw className="w-4 h-4" />
          <span>Evaluar Nuevo Cliente</span>
        </button>
      </div>
    </div>
  );
}
