import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Database, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="text-center max-w-3xl space-y-6 animate-fade-in-up">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Predicción de <span className="text-brand-600">Riesgo Crediticio</span>
        </h1>
        <p className="text-xl text-slate-600">
          Una solución end-to-end de Data Science para evaluar la probabilidad de incumplimiento de pagos utilizando Machine Learning avanzado.
        </p>
        <div className="flex justify-center pt-4">
          <Link to="/predict" className="btn-primary space-x-2 text-lg px-8 py-3">
            <span>Evaluar Cliente</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
        <div className="card p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Activity className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Precisión Probada</h3>
          <p className="text-sm text-slate-600">
            Modelo Random Forest con ROC-AUC de 0.779 y Recall estratégico de 65.9% (Umbral 0.42).
          </p>
        </div>
        <div className="card p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Interpretabilidad</h3>
          <p className="text-sm text-slate-600">
            Pipeline completo con ingeniería de características y transformación robusta de datos.
          </p>
        </div>
        <div className="card p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">API en Tiempo Real</h3>
          <p className="text-sm text-slate-600">
            FastAPI backend sirviendo predicciones instantáneas y almacenando histórico con SQLite.
          </p>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-6">Stack Tecnológico</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">Python</span>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">FastAPI</span>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">React</span>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">Tailwind CSS</span>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">scikit-learn</span>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">Random Forest</span>
        </div>
      </div>
    </div>
  );
}
