import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TablePagination({ tableInfo }) {
  const { selectedRows, pagination, routerSyncParams } = tableInfo;
  const { page, per_page, previousPage, nextPage, totalPages, totalItems } =
    pagination;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        Products {selectedRows.length} of {totalItems} row(s) selected.
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${per_page}`}
            onValueChange={(value) => {
              routerSyncParams({
                per_page: Number(value),
                ...(page !== 1 && { page: 1 }),
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={per_page} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => routerSyncParams({ page: 1 })}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <p><DoubleArrowLeftIcon className="h-4 w-4" /></p>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => routerSyncParams({ page: page - 1 })}
            disabled={page === previousPage || !previousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <p><ChevronLeftIcon className="h-4 w-4" /></p>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => routerSyncParams({ page: page + 1 })}
            disabled={page === nextPage || !nextPage}
          >
            <span className="sr-only">Go to next page</span>
            <p><ChevronRightIcon className="h-4 w-4" /></p>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => routerSyncParams({ page: totalPages })}
            disabled={page === totalPages || !totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <p><DoubleArrowRightIcon className="h-4 w-4" /></p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
