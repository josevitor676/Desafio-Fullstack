import { Carregando } from "@/components/carregando/Carregando";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormDesenvolvedorEditSchemaProps } from "@/schemas/desenvolvedor";
import { useInfiniteNiveis } from "@/servicos/nivel.services";
import { Controller, type Control, type FieldErrors, type UseFormRegister, type UseFormWatch } from "react-hook-form";

interface FormularioEditarDesenvolvedorProps {
  onSubmit: () => void;
  onCancel: () => void;
  register: UseFormRegister<FormDesenvolvedorEditSchemaProps>;
  errors: FieldErrors<FormDesenvolvedorEditSchemaProps>;
  control: Control<FormDesenvolvedorEditSchemaProps>;
  watch: UseFormWatch<FormDesenvolvedorEditSchemaProps>;
  isEditarDesenvolvedorPending?: boolean;
}

export function FormularioEditarDesenvolvedor({ onSubmit, onCancel, register, errors, control, watch, isEditarDesenvolvedorPending }: FormularioEditarDesenvolvedorProps) {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteNiveis();

  const niveis = data?.pages.flatMap(page => page.data) ?? [];
  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-4">
        <div className="mb-2">
          <Label htmlFor="nome" className="text-right mb-2">
            Nome
          </Label>
          <Input id="nome" placeholder="Digite o nome" className="mt-2"  {...register("nome")} />
          {errors.nome && (
            <p className="text-red-500 text-xs mt-2">{errors.nome.message}</p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <Label htmlFor="nivel" className="text-right mb-2">
              Nivel
            </Label>

            <Controller
              control={control}
              name="nivel_id"
              render={({ field }) => (
                <div className="space-y-2">
                  <Select value={String(field.value)} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um nível" />
                    </SelectTrigger>
                    <SelectContent
                      onScroll={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
                          if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                          }
                        }
                      }}
                    >
                      <SelectGroup>
                        <SelectLabel>Nível</SelectLabel>
                        {niveis.map((nivel) => (
                          <SelectItem key={nivel.id} value={String(nivel.id)}>
                            {nivel.nivel}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      {isFetchingNextPage && (
                        <div className="text-center py-2 text-sm">Carregando mais...</div>
                      )}
                    </SelectContent>
                  </Select>

                  {errors.nivel_id && (
                    <p className="text-red-500 text-xs">{errors.nivel_id.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="sexo" className="text-right mb-2 ">
              Sexo
            </Label>
            <Controller
              control={control}
              name="sexo"
              render={({ field }) => (
                <div className="space-y-2">
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger >
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sexo</SelectLabel>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Feminino</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.sexo && (
                    <p className="text-red-500 text-xs">{errors.sexo.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <Label htmlFor="data_nascimento" className="text-right mb-2">
              Data Nascimento
            </Label>
            <Input
              id="data_nascimento"
              type="date"
              placeholder="Digite a data de nascimento"
              className="mt-2"
              {...register("data_nascimento", {
                setValueAs: (value) => value ? new Date(value) : undefined,
              })}
              value={watch("data_nascimento")?.toISOString().slice(0, 10)} // <- FORÇANDO
            />
            {errors.data_nascimento && (
              <p className="text-red-500 text-xs mt-2">{errors.data_nascimento.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <Label htmlFor="hobby" className="text-right mb-2">
              Hobby
            </Label>
            <Input id="hobby" type="text" placeholder="Digite seu hobby" className="mt-2" {...register("hobby")} />
            {errors.hobby && (
              <p className="text-red-500 text-xs mt-2">{errors.hobby.message}</p>
            )}
          </div>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" className='hover:border-none border-none'>{isEditarDesenvolvedorPending ? <Carregando/> : 'Salvar'}</Button>
        <Button type="button" className='hover:border-none border-none' onClick={onCancel}>Cancelar</Button>
      </DialogFooter>
    </form>
  )
}