import { Carregando } from "@/components/carregando/Carregando";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormularioNivelData {
  nivel: string;
}


interface FormularioNivelProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  register: UseFormRegister<FormularioNivelData>;
  errors: FieldErrors<FormularioNivelData>;
  isCriarNivelPending?: boolean;
  isEditarNivelPending?: boolean;
}
export function FormularioNivel({ onSubmit, onCancel, register, errors, isCriarNivelPending, isEditarNivelPending }: FormularioNivelProps) {


  return (
    <form onSubmit={onSubmit}>
      <div className="gap-4 py-4 space-y-4">
        <div className="mb-2">
          <Label htmlFor="nivel" className="text-right mb-2">
            Nivel
          </Label>
          <Input id="nivel" placeholder="Digite o nivel" className="mt-2" {...register("nivel")}/>
          {errors.nivel && (
            <p className="text-red-500 text-xs mt-2">{errors.nivel.message}</p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className='hover:border-none border-none'>{isCriarNivelPending || isEditarNivelPending ? <Carregando/> : 'Salvar'}</Button>
        <Button type="button" className='hover:border-none border-none' onClick={onCancel}>Cancelar</Button>
      </DialogFooter>
    </form>
  )
}