import type { Desenvolvedor } from "@/interfaces/DesenvolvedorInterface";
import type { DesenvolvedorEditPayload, FormDesenvolvedorEditSchemaProps } from "@/schemas/desenvolvedor";
import { format } from "date-fns";

interface UseSubmitDesenvolvedorEditProps {
  editarDesenvolvedorMutation: {
    mutateAsync: (variables: { id: string; data: DesenvolvedorEditPayload }) => Promise<any>;
  };
  toast: (options: { title: string; description: string; duration?: number }) => void;
  reset: () => void;
  setOpen: (open: boolean) => void;
  handleApiError: (error: unknown, message: string) => void;
  desenvolvedor: Desenvolvedor;
}

export function useSubmitDesenvolvedorEdit({
  editarDesenvolvedorMutation,
  toast,
  reset,
  setOpen,
  handleApiError,
  desenvolvedor
}: UseSubmitDesenvolvedorEditProps) {

  const onSubmit = async (data: FormDesenvolvedorEditSchemaProps) => {
    try {
      const payload: DesenvolvedorEditPayload = {
        ...data,
        data_nascimento: data.data_nascimento ? format(data.data_nascimento, "yyyy-MM-dd") : undefined,
      };
      await editarDesenvolvedorMutation.mutateAsync({
        id: desenvolvedor.id.toString(),
        data: payload
      });
      toast({
        title: "Sucesso",
        description: "Desenvolvedor editado com sucesso!",
        duration: 2000,
      });
      reset();
      setOpen(false);
    } catch (error) {
      handleApiError(error, "Erro ao editar o desenvolvedor.");
    }
    reset();
    setOpen(false);
  };

  return { onSubmit };
}