import PropTypes from "prop-types";
import Icon from "./Icon";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const group = Math.floor(Math.min(page, totalPages - 1) / 10);
  const firstPage = Math.max(1, group * 10);
  const lastPage = Math.min(totalPages, (group + 1) * 10);
  const pages = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );
  return (
    <nav className="pagination flex flex-wrap items-center justify-center mt-[45px] pt-[25px] [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--line)] gap-4 [&_button]:inline-flex [&_button]:items-center [&_button]:justify-center [&_button]:min-w-9 [&_button]:min-h-[38px] [&_button]:text-[12px] [&_button]:py-2 [&_button]:px-[11px] [&_button]:border [&_button]:border-[color:var(--line)] [&_button]:border-solid [&_button]:rounded-[6px] [&_button]:gap-2 [&_button:hover:not(:disabled)]:bg-[color:#e4f1f6] [&_button:hover:not(:disabled)]:text-[color:var(--blue)] [&_button[aria-current=page]]:bg-[color:var(--blue)] [&_button[aria-current=page]]:text-white [&_button[aria-current=page]]:border-[color:var(--blue)] mobile:gap-2 mobile:[&_button]:min-w-8 mobile:[&_button]:text-[11px] mobile:[&_button]:px-2" aria-label="Kitab səhifələri">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Əvvəlki səhifə">
        <Icon name="chevron" size={16} className="previous-chevron [transform:rotate(180deg)]" /><span>Əvvəlki</span>
      </button>
      <div className="pagination-pages flex flex-wrap items-center justify-center gap-1.5 mobile:order-first mobile:grid mobile:w-full mobile:grid-cols-6">
        {pages.map((value) => (
          <button key={value} type="button" aria-label={`Səhifə ${value}`} aria-current={page === value ? "page" : undefined} onClick={() => onChange(value)}>
            {value.toLocaleString("az")}
          </button>
        ))}
      </div>
      <button type="button" disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Növbəti səhifə">
        <span>Növbəti</span><Icon name="chevron" size={16} />
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
