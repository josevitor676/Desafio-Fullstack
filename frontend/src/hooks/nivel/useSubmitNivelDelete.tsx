interface UseSubmitNivelDeleteProps {
  deletarNivelMutation: {
    mutateAsync: (id: string) => Promise<void>;
  };
  toast: (options: { title: string; description: string; duration?: number }) => void;
  setOpen: (open: boolean) => void;
  handleApiError: (error: unknown, message: string) => void;
}

export function useSubmitNivelDelete({
  deletarNivelMutation,
  toast,
  setOpen,
  handleApiError,
}: UseSubmitNivelDeleteProps) {
  
  const handleSubmit = async (id: string) => {
    try {
      await deletarNivelMutation.mutateAsync(id);
      toast({
          title: "Sucesso",
          description: "Nível deletado com sucesso!",
          duration: 2000,
        });
    } catch (error) {
       handleApiError(error, "Erro ao deletar o nível.");
    }
    setOpen(false);
  };

  return { handleSubmit };
}