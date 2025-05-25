import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function useApiErrorHandler() {
  const { toast } = useToast();

  const handleApiError = (error: unknown, defaultMessage = "Ocorreu um erro.") => {
    let errorMessage = defaultMessage;

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (data?.error) {
        errorMessage = data.error;
      } else if (data?.erros) {
        const firstField = Object.keys(data.erros)[0];
        const firstError = data.erros[firstField][0];
        errorMessage = firstError;
      }
    }

    toast({
      variant: "destructive",
      title: "Erro",
      description: errorMessage,
      duration: 2000,
    });
  };

  return { handleApiError };
}
