import { useState } from 'react';

export default function PredictionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    LIMIT_BAL: 50000,
    SEX: 1,
    EDUCATION: 2,
    MARRIAGE: 1,
    AGE: 30,
    PAY_0: 0,
    PAY_2: 0,
    PAY_3: 0,
    PAY_4: 0,
    PAY_5: 0,
    PAY_6: 0,
    BILL_AMT1: 50000,
    BILL_AMT2: 45000,
    BILL_AMT3: 40000,
    BILL_AMT4: 35000,
    BILL_AMT5: 30000,
    BILL_AMT6: 25000,
    PAY_AMT1: 2000,
    PAY_AMT2: 2000,
    PAY_AMT3: 2000,
    PAY_AMT4: 2000,
    PAY_AMT5: 2000,
    PAY_AMT6: 2000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputField = ({ label, name, type = "number", min, max, step }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        min={min}
        max={max}
        step={step}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 shadow-sm transition-colors"
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  const SelectField = ({ label, name, options }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 shadow-sm bg-white"
        value={formData[name]}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card bg-white p-6 sm:p-8 space-y-8">
      {/* Datos Demográficos y Límite */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Datos Demográficos y de Crédito</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Límite de Crédito (NT$)" name="LIMIT_BAL" min="0" step="1000" />
          <InputField label="Edad" name="AGE" min="18" max="100" />
          <SelectField
            label="Género"
            name="SEX"
            options={[
              { value: 1, label: 'Masculino' },
              { value: 2, label: 'Femenino' },
            ]}
          />
          <SelectField
            label="Educación"
            name="EDUCATION"
            options={[
              { value: 1, label: 'Posgrado' },
              { value: 2, label: 'Universidad' },
              { value: 3, label: 'Secundaria' },
              { value: 4, label: 'Otros' },
            ]}
          />
          <SelectField
            label="Estado Civil"
            name="MARRIAGE"
            options={[
              { value: 1, label: 'Casado' },
              { value: 2, label: 'Soltero' },
              { value: 3, label: 'Otros' },
            ]}
          />
        </div>
      </section>

      {/* Historial de Pagos */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Historial de Pagos (Meses de Retraso)</h3>
        <p className="text-xs text-slate-500 mb-4">-1 = Pago a tiempo, 1+ = Meses de retraso</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InputField label="Sept (Mes 1)" name="PAY_0" min="-2" max="8" />
          <InputField label="Ago (Mes 2)" name="PAY_2" min="-2" max="8" />
          <InputField label="Jul (Mes 3)" name="PAY_3" min="-2" max="8" />
          <InputField label="Jun (Mes 4)" name="PAY_4" min="-2" max="8" />
          <InputField label="May (Mes 5)" name="PAY_5" min="-2" max="8" />
          <InputField label="Abr (Mes 6)" name="PAY_6" min="-2" max="8" />
        </div>
      </section>

      {/* Montos y Pagos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Montos Facturados</h3>
          <div className="space-y-4">
            <InputField label="Sept (Mes 1)" name="BILL_AMT1" />
            <InputField label="Ago (Mes 2)" name="BILL_AMT2" />
            <InputField label="Jul (Mes 3)" name="BILL_AMT3" />
            <InputField label="Jun (Mes 4)" name="BILL_AMT4" />
            <InputField label="May (Mes 5)" name="BILL_AMT5" />
            <InputField label="Abr (Mes 6)" name="BILL_AMT6" />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Pagos Realizados</h3>
          <div className="space-y-4">
            <InputField label="Sept (Mes 1)" name="PAY_AMT1" min="0" />
            <InputField label="Ago (Mes 2)" name="PAY_AMT2" min="0" />
            <InputField label="Jul (Mes 3)" name="PAY_AMT3" min="0" />
            <InputField label="Jun (Mes 4)" name="PAY_AMT4" min="0" />
            <InputField label="May (Mes 5)" name="PAY_AMT5" min="0" />
            <InputField label="Abr (Mes 6)" name="PAY_AMT6" min="0" />
          </div>
        </section>
      </div>

      <div className="pt-6 border-t flex justify-end">
        <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-3 text-lg">
          Generar Predicción
        </button>
      </div>
    </form>
  );
}
