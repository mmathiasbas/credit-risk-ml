import { Github, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Sobre el Proyecto</h1>
        <p className="text-xl text-slate-500">
          Arquitectura, modelos y stack tecnológico utilizado en Credit Risk Prediction.
        </p>
      </div>

      <div className="card p-8 space-y-6">
        <div className="flex items-center space-x-3 text-brand-600 border-b pb-4">
          <Database className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-slate-900">Problema de Negocio</h2>
        </div>
        <div className="text-slate-700 leading-relaxed text-lg">
          <p>
            El riesgo crediticio es la posibilidad de sufrir una pérdida debido al incumplimiento de un prestatario.
            Este proyecto desarrolla una solución proactiva mediante Machine Learning para predecir si un cliente caerá en default 
            (incumplimiento de tarjeta de crédito) el próximo mes basado en su demografía, historial de pagos y límites de crédito.
          </p>
        </div>
      </div>

      <div className="card p-8 space-y-6">
        <div className="flex items-center space-x-3 text-brand-600 border-b pb-4">
          <Layers className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-slate-900">Pipeline de Machine Learning</h2>
        </div>
        <ul className="space-y-4 text-slate-700">
          {[
            'Análisis Exploratorio de Datos (EDA)',
            'Preprocesamiento: Limpieza y validación',
            'Feature Engineering: Variables derivadas y comportamentales sobre tendencias de pago y morosidad.',
            'Entrenamiento de 4 algoritmos: LogReg, Random Forest, XGBoost y LightGBM.',
            'Alineado con métricas clave: Optimización de Recall y F1-Score.',
            'Interpretabilidad con SHAP.'
          ].map((item, i) => (
            <li key={i} className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Métricas del Modelo</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
              <span className="font-semibold text-slate-700">Algoritmo</span>
              <span className="text-brand-700 font-bold">Random Forest</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
              <span className="font-semibold text-slate-700">ROC-AUC</span>
              <span className="text-brand-700 font-bold">0.779</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
              <span className="font-semibold text-slate-700">Recall</span>
              <span className="text-brand-700 font-bold">65.9%</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
              <span className="font-semibold text-slate-700">F1 Score</span>
              <span className="text-brand-700 font-bold">51.9%</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
              <span className="font-semibold text-slate-700">Umbral Óptimo</span>
              <span className="text-brand-700 font-bold">0.42</span>
            </div>
          </div>
        </div>

        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Desarrollado con</h2>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">Python</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">FastAPI</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">React</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">Tailwind CSS</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">scikit-learn</span>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
              <span className="font-bold text-slate-800">SQLite</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-8">
        <a 
          href="https://github.com/mmathiasbas/credit-risk-ml" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary flex items-center space-x-2 px-6 py-3"
        >
          <Github className="w-5 h-5" />
          <span>Ver Repositorio en GitHub</span>
        </a>
      </div>
    </div>
  );
}
