interface UseSubmitDesenvolvedorDeleteProps {
  deletarDesenvolvedorMutation: {
    mutateAsync: (id: string) => Promise<void>;
  };
  toast: (options: { title: string; description: string; duration?: number }) => void;
  setOpen: (open: boolean) => void;
  handleApiError: (error: unknown, message: string) => void;
}

export function useSubmitDesenvolvedorDelete({
  deletarDesenvolvedorMutation,
  toast,
  setOpen,
  handleApiError
}: UseSubmitDesenvolvedorDeleteProps) {
  
  const handleSubmit = async (id: string) => {
    try {
      await deletarDesenvolvedorMutation.mutateAsync(id);
      toast({
        title: "Sucesso",
        description: "Desenvolvedor deletado com sucesso!",
        duration: 2000,
      });
    } catch (error) {
      handleApiError(error, "Erro ao deletar o desenvolvedor.");
    }
    setOpen(false);
  };

  return { handleSubmit };
}