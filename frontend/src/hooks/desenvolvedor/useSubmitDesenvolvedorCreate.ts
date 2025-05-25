import { format } from "date-fns";
import type { DesenvolvedorPayload, FormDesenvolvedorSchemaProps } from "@/schemas/desenvolvedor";

interface UseSubmitDesenvolvedorCreateProps {
  criarDesenvolvedorMutation: {
    mutateAsync: (payload: DesenvolvedorPayload) => Promise<any>;
  };
  toast: (options: { title: string; description: string; duration?: number }) => void;
  reset: () => void;
  setOpen: (open: boolean) => void;
  handleApiError: (error: unknown, message: string) => void;
}

export function useSubmitDesenvolvedorCreate({
  criarDesenvolvedorMutation,
  toast,
  reset,
  setOpen,
  handleApiError
}: UseSubmitDesenvolvedorCreateProps) {

  const onSubmit = async (data: FormDesenvolvedorSchemaProps) => {
    try {
      const payload: DesenvolvedorPayload = {
        ...data,
        data_nascimento: format(data.data_nascimento, "yyyy-MM-dd"),
      };

      await criarDesenvolvedorMutation.mutateAsync(payload);

      toast({
        title: "Sucesso",
        description: "Desenvolvedor adicionado com sucesso!",
        duration: 2000,
      });

      reset();
      setOpen(false);

    } catch (error) {
      handleApiError(error, "Erro ao salvar o desenvolvedor.");
    }
  };

  return { onSubmit };
}