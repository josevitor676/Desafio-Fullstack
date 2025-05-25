import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";

export function ModalExcluirDesenvolvedor(){
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
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
          <DialogTitle className="font-bold text-xl">Excluir Desenvolvedor</DialogTitle>
        </DialogHeader>
        
        <div className="flex w-full flex-col gap-4">
          <p>Tem certeza que desejar excluir um desenvolvedor.</p>
        </div>
        <DialogFooter>
          <Button type="submit" className='hover:border-none border-none' onClick={handleSubmit}>Excluir</Button>
          <Button type="button" className='hover:border-none border-none' onClick={handleCancel}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}