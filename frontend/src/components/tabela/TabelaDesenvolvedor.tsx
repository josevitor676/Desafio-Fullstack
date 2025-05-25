import { useGetDesenvolvedores } from "@/servicos/desenvolvedor.services";
import { useState } from "react";
import { Carregando } from "../carregando/Carregando";
import { ModalAdicionarDesenvolvedor } from "../modal/desenvolvedor/ModalAdicionarDesenvolvedor";
import { ModalEditarDesenvolvedor } from "../modal/desenvolvedor/ModalEditarDesenvolvedor";
import { ModalExcluirDesenvolvedor } from "../modal/desenvolvedor/ModalExcluirDesenvolvedor";
import { Paginacao } from "../paginacao/Paginacao";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TabsContent } from "../ui/tabs";
import { useDebounce } from "@/lib/utils";

export function TabelaDesenvolvedor() {
  const [pesquisaDesenvolvedor, setPesquisaDesenvolvedor] = useState("")
  const [page, setPage] = useState(1);
  const per_page = 8;
  const debouncedSearch = useDebounce(pesquisaDesenvolvedor, 500);
  const { data, isLoading, error } = useGetDesenvolvedores(page, per_page, debouncedSearch);
  const desenvolvedores = data?.data ?? [];
  const meta = data?.meta;

  return (
    <TabsContent value="desenvolvedores" className="p-3  mt-4">
      <div className='flex gap-2 mb-3 justify-between'>
        <div className="w-2/4 gap-2 flex flex-col">
          <Input placeholder='Pesquisar Desenvolvedor' value={pesquisaDesenvolvedor} onChange={(e) => setPesquisaDesenvolvedor(e.target.value)} />
          <span className="text-xs text-gray-500">Total de {meta?.total ?? 0} itens</span>
        </div>
        <ModalAdicionarDesenvolvedor />
      </div>

      {isLoading && <Carregando />}
      {error && <p>Erro ao carregar níveis.</p>}


      {!isLoading && !error && (
        <>
          <Table className='border border-black p-4 rounded-[8px]'>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5 font-medium text-l">Nome</TableHead>
                <TableHead className="w-1/5 font-medium text-l text-center">Nivel</TableHead>
                <TableHead className="w-1/5 font-medium text-l text-center">Sexo</TableHead>
                <TableHead className="w-1/5 font-medium text-l text-center">Data Nascimento</TableHead>
                <TableHead className="w-1/5 font-medium text-l text-center">Hobby</TableHead>
                <TableHead className="text-right font-medium text-l">Editar/Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {desenvolvedores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum nível encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                desenvolvedores.map((desenvolvedor) => (
                  <TableRow key={desenvolvedor.id}>
                    <TableCell className="font-medium">{desenvolvedor.nome}</TableCell>
                    <TableCell className="font-medium text-center">{desenvolvedor.nivel.nivel}</TableCell>
                    <TableCell className="font-medium text-center">{desenvolvedor.sexo}</TableCell>
                    <TableCell className="font-medium text-center">{desenvolvedor.data_nascimento.toString()}</TableCell>
                    <TableCell className="font-medium text-center">{desenvolvedor.hobby}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-2 justify-end">
                        <ModalEditarDesenvolvedor desenvolvedor={desenvolvedor} />
                        <ModalExcluirDesenvolvedor id={desenvolvedor.id.toString()}/>
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
  );
}