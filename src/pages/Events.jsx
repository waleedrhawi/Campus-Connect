import { useMemo, useState } from "react";
import { getEvents } from "../api.js";
import useAsync from "../hooks/useAsync.js";
import EventCard from "../components/EventCard.jsx";
import EventFilters from "../components/EventFilters.jsx";
import { Loading, ErrorMessage, Empty } from "../components/StateMessage.jsx";

export default function Events() {
  const [{ data, loading, error }] = useAsync(getEvents, []);
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const events = data || [];
  const categories = useMemo(
    () => [...new Set(events.map((e) => e.category))].sort(),
    [events],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events
      .filter((e) => category === "All" || e.category === category)
      .filter((e) => !date || e.date >= date)
      .filter((e) => !q || (e.title + " " + e.venue).toLowerCase().includes(q))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, category, date, search]);

  const reset = () => {
    setCategory("All");
    setDate("");
    setSearch("");
  };

  return (
    <section className="section container">
      <h1>Upcoming events</h1>
      <p className="lead lead--dark">
        Filter by category or date to find what suits you.
      </p>

      <EventFilters
        categories={categories}
        category={category}
        onCategory={setCategory}
        date={date}
        onDate={setDate}
        search={search}
        onSearch={setSearch}
        onReset={reset}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && filtered.length === 0 && (
        <Empty>No events match your filters.</Empty>
      )}

      <div className="grid">
        {filtered.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}
