import { FormularioAdicionarDesenvolvedor } from "@/components/formulario/desenvolvedor/FormularioAdicionarDesenvolvedor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormDesenvolvedorSchema, type FormDesenvolvedorSchemaProps } from "@/schemas/desenvolvedor";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const ModalAdicionarDesenvolvedor = () => {
  const [open, setOpen] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormDesenvolvedorSchemaProps>({
    resolver: zodResolver(FormDesenvolvedorSchema),
  });

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: FormDesenvolvedorSchemaProps) => {
    console.log(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:border-none border-none">Adicionar Desenvolvedor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Adicionar Desenvolvedor</DialogTitle>
        </DialogHeader>

        <FormularioAdicionarDesenvolvedor
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          register={register}
          control={control}
        />
      </DialogContent>
    </Dialog>
  )
}