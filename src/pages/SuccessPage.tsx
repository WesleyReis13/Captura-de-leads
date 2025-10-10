import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    setSessionId(session);
    
    
    if (session) {
      console.log('✅ Pagamento confirmado - Session ID:', session);
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Parabéns! Assinatura Confirmada
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Seu pagamento foi processado com sucesso e sua assinatura está ativa.
        </p>
        <p className="text-gray-600 mb-4">
          Em instantes você receberá um WhatsApp com os próximos passos.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500">
            ID da transação: {sessionId}
          </p>
        )}
      </div>
    </div>
  );
}