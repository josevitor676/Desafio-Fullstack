import { FormularioEditarDesenvolvedor } from "@/components/formulario/desenvolvedor/FormularioEditarDesenvolvedor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSubmitDesenvolvedorEdit } from "@/hooks/desenvolvedor/useSubmitDesenvolvedorEdit";
import { useToast } from "@/hooks/use-toast";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import type { Desenvolvedor } from "@/interfaces/DesenvolvedorInterface";
import { FormDesenvolvedorEditSchema, type FormDesenvolvedorEditSchemaProps } from "@/schemas/desenvolvedor";
import { useEditarDesenvolvedor } from "@/servicos/desenvolvedor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ModalEditarDesenvolvedorProps {
  desenvolvedor: Desenvolvedor;
}

export const ModalEditarDesenvolvedor = ({ desenvolvedor }: ModalEditarDesenvolvedorProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { handleApiError } = useApiErrorHandler();
  const editarDesenvolvedorMutation = useEditarDesenvolvedor();

  const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormDesenvolvedorEditSchemaProps>({
    resolver: zodResolver(FormDesenvolvedorEditSchema),
    defaultValues: {}
  })


  const { onSubmit } = useSubmitDesenvolvedorEdit({
    editarDesenvolvedorMutation,
    toast,
    reset,
    setOpen,
    handleApiError,
    desenvolvedor
  });

  const handleCancel = () => {
    reset();
    setOpen(false);
  };


  useEffect(() => {
    if (open && desenvolvedor) {
      reset({
        nome: desenvolvedor.nome,
        nivel_id: desenvolvedor.nivel.id,
        sexo: desenvolvedor.sexo === "M" || desenvolvedor.sexo === "F" ? desenvolvedor.sexo : undefined,
        data_nascimento: desenvolvedor.data_nascimento
          ? new Date(desenvolvedor.data_nascimento)
          : undefined,
        hobby: desenvolvedor.hobby,
      });
    }
  }, [open, desenvolvedor, reset]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:border-none border-none"><Pencil className="w-4 h-4" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Editar Desenvolvedor</DialogTitle>
        </DialogHeader>

        <FormularioEditarDesenvolvedor
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          register={register}
          control={control}
          watch={watch}
        />
      </DialogContent>
    </Dialog>
  )
}