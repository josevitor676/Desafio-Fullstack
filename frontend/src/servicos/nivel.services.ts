import type { Nivel } from "@/interfaces/NivelInterface";
import type { Page } from "@/interfaces/Page";
import type { FormNivelSchemaProps } from "@/schemas/nivel";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const base = "niveis";

export const criarNivel = async (dto: FormNivelSchemaProps) => {
  const response = await axios.post(`${url}/${base}`, dto);

  return response.data;
}

export const deletarNivel = async (id: string) => {
  const response = await axios.delete(`${url}/${base}/${id}`);

  return response.data;
}
export const editarNivel = async (id: string, dto: FormNivelSchemaProps) => {
  const response = await axios.put(`${url}/${base}/${id}`, dto);

  return response.data;
}

export const getNiveis = async (page = 1, per_page = 10): Promise<Page<Nivel>> => {
  const response = await axios.get(`${url}/${base}`, {
    params: { page, per_page },
  });
  return response.data;
};

export const getNivelById = async (id: string): Promise<Nivel> => {
  const response = await axios.get(`${url}/${base}/${id}`);
  return response.data;
};


export const useGetNiveis = (page = 1, per_page = 10) => {
  return useQuery<Page<Nivel>, Error>({
    queryKey: ["niveis", page, per_page],
    queryFn: () => getNiveis(page, per_page),
    refetchOnWindowFocus: false,
  });
};

export const useGetNivelById = (id: string) => {
  return useQuery({
    queryKey: ["nivel", id],
    queryFn: () => getNivelById(id),
    enabled: !!id,
  });
};

export const useCriarNivel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: criarNivel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["niveis"] });
    },
  });
};

export const useEditarNivel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormNivelSchemaProps }) => editarNivel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["niveis"] });
    },
  });
};

export const useDeletarNivel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarNivel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["niveis"] });
    },
  });
};

export function useInfiniteNiveis() {
  return useInfiniteQuery({
    queryKey: ['niveis'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<Page<Nivel>>(`${url}/${base}`, {
        params: { page: pageParam, per_page: 10 },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}