import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { memo, useState } from "react";
import Search from "../../Search";

const TableSearch = ({ tabelInfo,searchTableParams }) => {
  const [value, setValue] = useState(searchTableParams || "");
  const [search] = useDebouncedValue(value, 500);
  useDidUpdate(() => {
    tabelInfo.routerSyncParams({ search, page: 1 });
  }, [search]);
  return (
    <div className="mb-4 max-w-xs [&>div]:pt-0">
      <Search value={value} setValue={setValue} />
    </div>
  );
};

export default memo(TableSearch);
