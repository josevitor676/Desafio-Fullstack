import { z } from "zod";

export const FormNivelSchema = z.object({
  nivel:z.string().min(1, "Nível é obrigatório"),
})

export type FormNivelSchemaProps = z.infer<
  typeof FormNivelSchema
>;