import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
}

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('ESSENTIAL');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const plans: Plan[] = [
    {
      id: 'ESSENTIAL',
      name: 'Plano Essencial',
      price: 'R$ 97/mês',
      features: ['Treino personalizado', 'Dieta básica', 'Suporte por WhatsApp']
    },
    {
      id: 'ADVANCED', 
      name: 'Plano Avançado',
      price: 'R$ 197/mês',
      features: ['Treino + dieta', 'Acompanhamento semanal', 'Suporte prioritário']
    },
    {
      id: 'PREMIUM',
      name: 'Plano Premium', 
      price: 'R$ 297/mês',
      features: ['Treino + dieta + suplementação', 'Acompanhamento diário', 'Suporte 24/7']
    }
  ];

  const handleSubscribe = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: selectedPlan,
          customerEmail: 'cliente@email.com',
          leadId: 123
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL não retornada pela API');
      }
    } catch (error) {
      console.error('Erro:', error);
      setIsLoading(false);
    }
  };

  const handlePlanSelect = (planId: string): void => {
    setSelectedPlan(planId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Escolha seu Plano</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 px-4 rounded font-semibold ${
                selectedPlan === plan.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Selecionar Plano'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}