import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import ScoreResult from '../components/ScoreResult';
import { predictRisk } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function Predict() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictRisk(formData);
      setResult(response);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al conectar con la API.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Evaluación de Riesgo Crediticio</h1>
        <p className="text-slate-500">
          Ingrese los datos del cliente para evaluar su probabilidad de incumplimiento (default) en el próximo pago.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="card p-12 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
          <p className="text-lg font-medium text-slate-600">Procesando datos con el modelo de ML...</p>
        </div>
      ) : result ? (
        <ScoreResult result={result} onReset={handleReset} />
      ) : (
        <PredictionForm onSubmit={handlePredict} />
      )}
    </div>
  );
}
