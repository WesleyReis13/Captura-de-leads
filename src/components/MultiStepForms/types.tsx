export interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  idade: string;
  cidade: string;
  profissao: string;
  aceitaTermos: boolean;
}

export interface StepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}
