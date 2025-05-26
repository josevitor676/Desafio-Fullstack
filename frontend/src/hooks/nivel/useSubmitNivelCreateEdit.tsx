import type { FormNivelSchemaProps } from "@/schemas/nivel";
import type { Nivel, NivelResponse } from "@/interfaces/NivelInterface";

interface UseSubmitNivelCreateEditProps {
  criarNivelMutation: {
    mutateAsync: (data: FormNivelSchemaProps) => Promise<NivelResponse>;
  };
  editarNivelMutation: {
    mutateAsync: (variables: { id: string; data: FormNivelSchemaProps }) => Promise<NivelResponse>;
  };
  toast: (options: { title: string; description: string; duration?: number }) => void;
  reset: () => void;
  setOpen: (open: boolean) => void;
  handleApiError: (error: unknown, message: string) => void;
  tipo: 'adicionar' | 'editar';
  nivel?: Nivel;
}

export function useSubmitNivelCreateEdit({
  criarNivelMutation,
  editarNivelMutation,
  toast,
  reset,
  setOpen,
  handleApiError,
  tipo,
  nivel
}: UseSubmitNivelCreateEditProps) {

  const onSubmit = async (data: FormNivelSchemaProps) => {
    try {
      if (tipo === 'adicionar') {
        await criarNivelMutation.mutateAsync(data);
        toast({
          title: "Sucesso",
          description: "Nível adicionado com sucesso!",
          duration: 2000,
        });
      } else if (tipo === 'editar' && nivel) {
        await editarNivelMutation.mutateAsync({ id: nivel.id.toString(), data });
        toast({
          title: "Sucesso",
          description: "Nível editado com sucesso!",
          duration: 2000,
        });
      }
      reset();
      setOpen(false);
    } catch (error) {
      handleApiError(error, "Erro ao salvar o nível.");
    }
  };

  return { onSubmit };
}