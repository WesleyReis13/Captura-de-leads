// types.ts - CORRIJA A INTERFACE
export interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  objective: string;    
  routine: string; 
  aceitaTermos: boolean;
}

export interface StepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}