"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Download, ArrowUpDown } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKeys?: Array<keyof T | string>;
  searchPlaceholder?: string;
  filterOptions?: {
    label: string;
    key: keyof T | string;
    options: { label: string; value: string }[];
  }[];
  itemsPerPage?: number;
  exportFilename?: string;
  actionsHeader?: string;
  renderActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchKeys = [],
  searchPlaceholder = "Search records...",
  filterOptions = [],
  itemsPerPage = 10,
  exportFilename,
  actionsHeader = "Actions",
  renderActions,
  emptyMessage = "No matching records found in atelier ledger.",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // 1. Text Search across searchKeys
      if (searchQuery.trim() && searchKeys.length > 0) {
        const query = searchQuery.toLowerCase();
        const matches = searchKeys.some((k) => {
          const val = row[k];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(query);
        });
        if (!matches) return false;
      }

      // 2. Dropdown Filters
      for (const [filterKey, filterValue] of Object.entries(selectedFilters)) {
        if (filterValue && filterValue !== "ALL") {
          const rowVal = String(row[filterKey] || "").toLowerCase();
          if (rowVal !== filterValue.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchQuery, searchKeys, selectedFilters]);

  // Sort Logic
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortDirection === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const headers = columns.map((c) => c.header).join(",");
    const rows = sortedData.map((row) => {
      return columns
        .map((col) => {
          const val = row[col.key];
          const stringVal = val === null || val === undefined ? "" : String(val).replace(/"/g, '""');
          return `"${stringVal}"`;
        })
        .join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${exportFilename || "fragology_export"}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-brand-espresso border border-border-subtle px-4 py-2.5 pl-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors rounded-xs"
          />
          <Search size={15} className="absolute left-3.5 top-3 text-neutral-muted" />
        </div>

        {/* Filters & Export */}
        <div className="flex flex-wrap items-center gap-3">
          {filterOptions.map((filter) => (
            <div key={String(filter.key)} className="flex items-center space-x-1.5 text-xs">
              <span className="text-neutral-muted text-[11px] uppercase tracking-wider hidden md:inline">
                {filter.label}:
              </span>
              <select
                value={selectedFilters[String(filter.key)] || "ALL"}
                onChange={(e) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    [String(filter.key)]: e.target.value,
                  });
                  setCurrentPage(1);
                }}
                className="bg-brand-espresso border border-border-subtle px-3 py-2 text-xs text-neutral-ivory rounded-xs focus:outline-hidden focus:border-gold-primary transition-colors"
              >
                <option value="ALL">All {filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {exportFilename && (
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-xs uppercase tracking-wider text-neutral-ivory flex items-center space-x-1.5 rounded-xs transition-colors"
              title="Export authorized records as CSV"
            >
              <Download size={13} className="text-gold-primary" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-border-subtle bg-brand-rich rounded-xs overflow-hidden shadow-luxury-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-espresso border-b border-border-subtle text-[10px] uppercase font-mono tracking-wider text-neutral-muted">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`py-3.5 px-4 font-medium ${
                      col.sortable ? "cursor-pointer hover:text-gold-champagne select-none" : ""
                    } ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${col.className || ""}`}
                  >
                    <div className={`inline-flex items-center space-x-1 ${col.align === "right" ? "justify-end" : ""}`}>
                      <span>{col.header}</span>
                      {col.sortable && <ArrowUpDown size={11} className="opacity-50" />}
                    </div>
                  </th>
                ))}
                {renderActions && (
                  <th className="py-3.5 px-4 text-right font-medium">{actionsHeader}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/40 text-xs">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (renderActions ? 1 : 0)}
                    className="p-12 text-center text-neutral-muted font-light"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr
                    key={(row.id as string) || idx}
                    className="hover:bg-brand-espresso/50 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 text-neutral-ivory font-light ${
                          col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                        } ${col.className || ""}`}
                      >
                        {col.render ? col.render(row) : String(row[col.key] ?? "-")}
                      </td>
                    ))}
                    {renderActions && (
                      <td className="py-3.5 px-4 text-right">{renderActions(row)}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-brand-deep/80 border-t border-border-subtle flex items-center justify-between text-xs text-neutral-muted">
          <span>
            Showing <strong className="text-neutral-ivory">{paginatedData.length}</strong> of{" "}
            <strong className="text-neutral-ivory">{sortedData.length}</strong> records
          </span>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-[11px]">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 border border-border-subtle rounded-xs hover:border-gold-primary disabled:opacity-30 disabled:hover:border-border-subtle text-neutral-ivory transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 border border-border-subtle rounded-xs hover:border-gold-primary disabled:opacity-30 disabled:hover:border-border-subtle text-neutral-ivory transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
