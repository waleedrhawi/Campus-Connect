export default function EventFilters({
  categories,
  category,
  onCategory,
  date,
  onDate,
  search,
  onSearch,
  onReset,
}) {
  return (
    <section className="filters" aria-label="Filter events">
      <div className="filters__row">
        <label className="field">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search by title or venue"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>
        <label className="field">
          <span>From date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => onDate(e.target.value)}
          />
        </label>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="pills" role="group" aria-label="Category">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            className={"pill" + (category === c ? " is-active" : "")}
            aria-pressed={category === c}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}
