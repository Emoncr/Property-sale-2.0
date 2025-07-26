import { memo } from "react";
import Table from "./Table";
import TableLoading from "./TableLoading";
import TablePagination from "./TablePagination";

const TableMaker = memo(
  ({ columns, enableSelect = true, render = () => null, tabelInfo }) => {
    return (
      <>
        {render(tabelInfo)}

        {tabelInfo?.isLoading ? (
          <TableLoading columnCount={columns.length} />
        ) : (
          <>
            <Table
              enableSelect={enableSelect}
              columns={columns}
              data={tabelInfo?.data?.data}
              tabelInfo={tabelInfo}
            />
            <TablePagination tableInfo={tabelInfo} />
          </>
        )}
      </>
    );
  }
);
TableMaker.displayName = "TableMaker";

export default TableMaker;
