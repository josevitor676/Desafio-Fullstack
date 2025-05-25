import { Button } from "@/components/ui/button";
import type { Meta } from "@/interfaces/Page";

interface PaginacaoProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta?: Meta;
}

export function Paginacao({ page, setPage, meta }: PaginacaoProps) {
  const isFirstPage = page <= 1;
  const isLastPage = meta ? page >= meta.last_page : false;

  return (
    <div className="flex justify-between items-center mt-4">
      <span>
        Página {meta?.current_page ?? page} de {meta?.last_page ?? "?"}
      </span>


      <div className="flex gap-2">
        {!isFirstPage && (
          <Button onClick={() => setPage((prev) => prev - 1)}>
            Anterior
          </Button>
        )}

        {!isLastPage && (
          <Button onClick={() => setPage((prev) => prev + 1)}>
            Próxima
          </Button>
        )}
      </div>
    </div>
  )
}
