
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (sessionId) {
      console.log('Compra realizada com sucesso! Session ID:', sessionId);
      
      fetchSessionDetails(sessionId);
    }
  }, [sessionId]);

  const fetchSessionDetails = async (sessionId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/api/session-details?session_id=${sessionId}`);
      if (response.ok) {
        const sessionData = await response.json();
        console.log('Detalhes da sessão:', sessionData);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da sessão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Parabéns!</h1>
        <p className="text-gray-600 mb-6">Sua assinatura foi ativada com sucesso.</p>
        <p className="text-sm text-gray-500 mb-6">
          Em instantes você receberá uma mensagem no WhatsApp com os próximos passos.
        </p>
        
        {sessionId && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <p className="text-gray-500">ID da Sessão:</p>
            <code className="text-gray-700 break-all">{sessionId}</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;