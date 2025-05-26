import { FormularioNivel } from "@/components/formulario/nivel/FormularioNivel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useSubmitNivelCreateEdit } from "@/hooks/nivel/useSubmitNivelCreateEdit"
import { useToast } from "@/hooks/use-toast"
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler"
import type { Nivel } from "@/interfaces/NivelInterface"
import { FormNivelSchema, type FormNivelSchemaProps } from "@/schemas/nivel"
import { useCriarNivel, useEditarNivel } from "@/servicos/nivel.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
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
  const { isPending: isCriarNivelPending } = criarNivelMutation;
  const { isPending: isEditarNivelPending } = editarNivelMutation;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormNivelSchemaProps>({
    resolver: zodResolver(FormNivelSchema),
  });

  const handleCancel = () => {
    reset();
    setOpen(false);
  };


  const { onSubmit } = useSubmitNivelCreateEdit({
    criarNivelMutation,
    editarNivelMutation,
    toast,
    reset,
    setOpen,
    handleApiError,
    tipo,
    nivel
  });

  useEffect(() => {
    if (open && nivel) {
      reset({
        nivel: nivel.nivel,
      });
    }
  }, [open, nivel, reset]);

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
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          register={register}
          isCriarNivelPending={isCriarNivelPending}
          isEditarNivelPending={isEditarNivelPending}
        />
      </DialogContent>
    </Dialog>
  )
}
