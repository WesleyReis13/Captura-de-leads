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

  
  const urlParams = new URLSearchParams(window.location.search);
  const leadId = urlParams.get('leadId');
  const customerEmail = urlParams.get('email');

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

  
  if (!leadId || !customerEmail) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-red-600 text-xl font-bold mb-2">Link inválido ou expirado</h2>
          <p className="text-gray-600">Por favor, use o link enviado por WhatsApp para acessar esta página.</p>
        </div>
      </div>
    );
  }

 const handleSubscribe = async (): Promise<void> => {
  setIsLoading(true);
  try {
    console.log('📦 Enviando para API:', {
      planType: selectedPlan,
      customerEmail: customerEmail,
      leadId: parseInt(leadId)
    });

    
    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planType: selectedPlan,
        customerEmail: customerEmail,
        leadId: parseInt(leadId)
      })
    });

    console.log('📡 Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API:', errorText);
      throw new Error(`Erro ao criar sessão: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Resposta da API:', data);
    
    if (data.url) {
      console.log('🔗 Redirecionando para:', data.url);
      window.location.href = data.url;
    } else {
      throw new Error('URL não retornada pela API');
    }
  } catch (error) {
    console.error('💥 Erro completo:', error);
    setIsLoading(false);
  }
};

  const handlePlanSelect = (planId: string): void => {
    setSelectedPlan(planId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Escolha seu Plano</h1>
      
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
        <p className="text-blue-700 text-sm">
          Cadastro: <strong>{customerEmail}</strong>
        </p>
      </div>
      
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