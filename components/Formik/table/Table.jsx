import React from "react";
import {
  Table as TableWrap,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/useRequest";

const selectColumn = {
  classHeader: "w-[2.5%]",
  header: ({ tabelInfo }) => (
    <div className="flex items-center">
      <Checkbox
        checked={
          tabelInfo?.data?.items?.length &&
          tabelInfo?.selectedRows?.length === tabelInfo?.data?.items?.length
        }
        onCheckedChange={() =>
          tabelInfo.handleSelectAll(tabelInfo?.data?.items)
        }
        aria-label="Select all"
      />
    </div>
  ),
  cell: ({ row, tabelInfo }) => (
    <div className="flex items-center">
      <Checkbox
        checked={tabelInfo?.selectedRows.includes(row?._id)}
        onCheckedChange={() => tabelInfo?.handleRowSelect(row?._id)}
        aria-label="Select row"
      />
    </div>
  ),
};

const Table = ({ data, columns, tabelInfo = {}, enableSelect }) => {
  const { toast } = useToast();
  const allColumns = [enableSelect && selectColumn, ...columns];

  const router = useRouter();

  const { handleRequest } = useRequest();




  return (
    <div className="rounded-md border mb-4">
      <TableWrap>
        <TableHeader>
          <TableRow>
            {allColumns.map((item, i) => (
              <TableHead key={i} className={cn(item?.classHeader)}>
                {item.header instanceof Function
                  ? item.header({ tabelInfo })
                  : item.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length ? (
            data?.map((row) => (
              <TableRow key={row._id}>
                {allColumns.map((item, i) => (
                  <TableCell key={i} className={cn(item?.classCell)}>
                    {item.cell
                      ? item.cell({ row, tabelInfo, toast, router, handleRequest })
                      : row[item.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={allColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableWrap>
    </div>
  );
};

export default Table;
