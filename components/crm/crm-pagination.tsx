"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CrmPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function CrmPagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
  loading = false,
}: CrmPaginationProps) {
  const startRecord = totalPages > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endRecord = Math.min(currentPage * limit, total);

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 1) return pageNumbers;

    // Add first page
    pageNumbers.push(1);

    // Add ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Add pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // Add last page if not already included
    if (totalPages > 1 && pageNumbers[pageNumbers.length - 1] !== totalPages) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="px-4 sm:px-5 py-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-xs text-white/40">
        Zeige {startRecord} - {endRecord} von {total} Lead{total !== 1 ? "s" : ""}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || totalPages === 0 || loading}
          className="p-1.5 rounded-lg border border-white/10 hover:border-[#C8F135]/40 hover:bg-white/[0.03] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 text-white/60" />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            typeof page === "string" ? (
              <span key={`ellipsis-${index}`} className="px-2 text-white/30 text-xs">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  currentPage === page
                    ? "bg-[#C8F135] text-[#171717]"
                    : "border border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.03] disabled:cursor-not-allowed"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0 || loading}
          className="p-1.5 rounded-lg border border-white/10 hover:border-[#C8F135]/40 hover:bg-white/[0.03] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Next page"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4 text-white/60" />
        </button>
      </div>
    </div>
  );
}
