import { useGetNiveis } from "@/servicos/nivel.services";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ModalAdicionarEdital } from "../modal/nivel/ModalAdicionarEditar";
import { ModalExcluirNivel } from "../modal/nivel/ModalExcluirNivel";
import { Paginacao } from "../paginacao/Paginacao";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TabsContent } from "../ui/tabs";
import { Carregando } from "../carregando/Carregando";

export function TabelaNivel() {

  const [page, setPage] = useState(1);
  const per_page = 8;

  const { data, isLoading, error } = useGetNiveis(page, per_page);

  const niveis = data?.data ?? [];
  const meta = data?.meta;

  return (
    <TabsContent value="niveis" className="p-3  mt-4">
      <div className='flex gap-2 mb-3 justify-between'>
        <div className="w-2/4 gap-2 flex flex-col">
          <Input placeholder='Pesquisar Nível' />
          <span className="text-xs text-gray-500">Total de {meta?.total ?? 0} itens</span>
        </div>
        <ModalAdicionarEdital tipo='adicionar' title='Adicionar Nivel' />
      </div>

      {isLoading && <Carregando />}
      {error && <p>Erro ao carregar níveis.</p>}

      {!isLoading && !error && (
        <>
          <Table className='border border-black p-4 rounded-[8px]'>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 font-medium text-l">Nivel</TableHead>
                <TableHead className="w-1/3 font-medium text-l text-center">Quantidade Desenvolvedores</TableHead>
                <TableHead className="text-right font-medium text-l">Editar/Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {niveis.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum nível encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                niveis.map((nivel) => (
                  <TableRow key={nivel.id}>
                    <TableCell className="font-medium">{nivel.nivel}</TableCell>
                    <TableCell className="font-medium text-center">
                      {nivel.desenvolvedores_count}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-2 justify-end">
                        <ModalAdicionarEdital tipo='editar' icon={<Pencil />} nivel={nivel} />
                        <ModalExcluirNivel  id={nivel.id.toString()}/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Paginacao
            page={page}
            setPage={setPage}
            meta={meta}
          />
        </>
      )}
    </TabsContent>
  )
}