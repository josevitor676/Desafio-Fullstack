const url = import.meta.env.VITE_API_URL;
const base = "desenvolvedores";
import type { Desenvolvedor } from "@/interfaces/DesenvolvedorInterface";
import type { Page } from "@/interfaces/Page";
import type { DesenvolvedorEditPayload, DesenvolvedorPayload } from "@/schemas/desenvolvedor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export const criarDesenvolvedor = async (dto: DesenvolvedorPayload) => {
  const response = await axios.post(`${url}/${base}`, dto);

  return response.data;
}

export const deletarDesenvolvedor = async (id: string) => {
  const response = await axios.delete(`${url}/${base}/${id}`);

  return response.data;
}
export const editarDesenvolvedor = async (id: string, dto: DesenvolvedorEditPayload) => {
  const response = await axios.patch(`${url}/${base}/${id}`, dto);

  return response.data;
}

export const getDesenvolvedores = async (page = 1, per_page = 10, pesquisa = ''): Promise<Page<Desenvolvedor>> => {
  const response = await axios.get(`${url}/${base}`, {
    params: { page, per_page, pesquisa },
  });
  return response.data;
};

export const getDesenvolvedorById = async (id: string): Promise<Desenvolvedor> => {
  const response = await axios.get(`${url}/${base}/${id}`);
  return response.data;
}

export const useGetDesenvolvedores = (page = 1, per_page = 10, pesquisa = '') => {
  return useQuery<Page<Desenvolvedor>, Error>({
    queryKey: ["desenvolvedores", page, per_page, pesquisa],
    queryFn: () => getDesenvolvedores(page, per_page, pesquisa),
    refetchOnWindowFocus: false,
  });
};

export const useGetDesenvolvedorById = (id: string) => {
  return useQuery({
    queryKey: ["desenvolvedores", id],
    queryFn: () => getDesenvolvedorById(id),
    enabled: !!id,
  });
};

export const useCriarDesenvolvedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: criarDesenvolvedor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desenvolvedores"] });
    },
  });
};

export const useDeletarDesenvolvedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarDesenvolvedor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desenvolvedores"] });
    },
  });
};

export const useEditarDesenvolvedor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DesenvolvedorEditPayload }) => editarDesenvolvedor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desenvolvedores"] });
    },
  });
};