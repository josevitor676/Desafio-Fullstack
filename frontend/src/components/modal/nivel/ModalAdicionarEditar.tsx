import { FormularioNivel } from "@/components/formulario/nivel/FormularioNivel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useApiErrorHandler } from "@/hooks/UseApiErrorHandler"
import type { Nivel } from "@/interfaces/NivelInterface"
import { FormNivelSchema, type FormNivelSchemaProps } from "@/schemas/nivel"
import { useCriarNivel, useEditarNivel } from "@/servicos/nivel.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"


interface ModalAdicionarEditarProps {
  tipo: "adicionar" | "editar",
  title?: string,
  icon?: React.ReactNode,
  nivel?: Nivel
}

export function ModalAdicionarEdital({ tipo, title, icon, nivel }: ModalAdicionarEditarProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { handleApiError } = useApiErrorHandler();
  const criarNivelMutation = useCriarNivel();
  const editarNivelMutation = useEditarNivel();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormNivelSchemaProps>({
    resolver: zodResolver(FormNivelSchema),
  });


  const handleCancel = () => {
    reset();
    setOpen(false);
  };

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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:border-none border-none">{tipo == 'adicionar' ? title : icon}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">{tipo == 'adicionar' ? 'Adicionar Nivel' : 'Editar Nivel'}</DialogTitle>
        </DialogHeader>

        <FormularioNivel
          nivel={tipo == 'editar' ? nivel : null}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          register={register}
        />
      </DialogContent>
    </Dialog>
  )
}
