"use client";

import * as React from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base_url } from "@/utils/apiMaker";
import { toast } from "sonner";

const DonationExport = ({
  filters = {},
  searchValue = "",
  pagination = { pageIndex: 0, pageSize: 10 },
  className = "",
}) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const buildExportPath = () => {
    let path = `/donations/export/csv?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize
      }`;

    // Add search parameter
    if (searchValue) {
      path += `&search=${encodeURIComponent(searchValue)}`;
    }

    // Add all filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        path += `&filters[${key}]=${encodeURIComponent(value)}`;
      }
    });

    return path;
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const exportPath = buildExportPath();
      const response = await fetch(`${base_url}${exportPath}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text(); // Get the response as text
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `donations_export_${new Date().toISOString().split("T")[0]
        }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("An error occurred while exporting.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className={className}
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <FileDown className="size-4 mr-2" />
          Export CSV
        </>
      )}
    </Button>
  );
};

export default DonationExport;

// Usage in your DonationsTable component:
// Replace the existing export button section with:
/*
<div className="flex items-center gap-2">
  <DonationExport
    filters={filters}
    searchValue={searchValue}
    pagination={pagination}
  />
</div>
*/

// Don't forget to add the import at the top of your file:
// import DonationExport from "./DonationExport";
