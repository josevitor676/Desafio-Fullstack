import type { Nivel } from "./NivelInterface";

export interface Desenvolvedor {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  nivel: Nivel;
}

export interface DesenvolvedorResponse {
  data: Desenvolvedor;
}