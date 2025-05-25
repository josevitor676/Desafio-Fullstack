import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { useApiErrorHandler } from "@/hooks/UseApiErrorHandler";
import { useDeletarNivel } from "@/servicos/nivel.services";
import { Trash } from "lucide-react"
import { useState } from "react"

interface ModalExcluirNivelProps {
  id: string;
}

export function ModalExcluirNivel({id}: ModalExcluirNivelProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { handleApiError } = useApiErrorHandler();
  const  deletarNivelMutation = useDeletarNivel();

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

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:border-none border-none hover:bg-red-500"><Trash className="w-4 h-4" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Excluir Nivel</DialogTitle>
        </DialogHeader>
        
        <div className="flex w-full flex-col gap-4">
          <p>Tem certeza que desejar excluir um nivel.</p>
        </div>
        <DialogFooter>
          <Button type="submit" className='hover:border-none border-none' onClick={() => handleSubmit(id)}>Excluir</Button>
          <Button type="button" className='hover:border-none border-none' onClick={handleCancel}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
