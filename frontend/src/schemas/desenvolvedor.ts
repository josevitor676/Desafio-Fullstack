import { z } from "zod";

export const FormDesenvolvedorSchema = z.object({
  nome:z.string().min(1, "Nome é obrigatório"),
  nivel_id: z.coerce.number({
    required_error: "Selecione um nível",
    invalid_type_error: "Selecione um nível",
  }),
  sexo: z.enum(["M", "F"], {
    errorMap: () => ({ message: "Selecione um sexo" }),
  }),
  data_nascimento: z.date({
    invalid_type_error: "Data de nascimento é obrigatória",
    required_error: "Data de nascimento é obrigatória",
  }).refine((date) => date <= new Date(), {
    message: "Data de nascimento deve ser menor ou igual a data atual",
  }),
  hobby:z.string().min(1, "Hobby é obrigatório"),
})

export type FormDesenvolvedorSchemaProps = z.infer<
  typeof FormDesenvolvedorSchema
>;

export type DesenvolvedorPayload = Omit<FormDesenvolvedorSchemaProps, "data_nascimento"> & {
  data_nascimento: string;
}

export const FormDesenvolvedorEditSchema = FormDesenvolvedorSchema.partial();

export type FormDesenvolvedorEditSchemaProps = z.infer<typeof FormDesenvolvedorEditSchema>;

export type DesenvolvedorEditPayload = Omit<FormDesenvolvedorEditSchemaProps, "data_nascimento"> & {
  data_nascimento?: string;
}