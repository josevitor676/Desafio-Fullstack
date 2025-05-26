export interface Nivel {
  id: number;
  nivel: string;
  desenvolvedores_count: number;
}

export interface NivelResponse {
  data: Nivel;
}