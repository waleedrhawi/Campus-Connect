import { Link } from "react-router-dom";
import { formatDate, spotsLeft } from "../utils.js";

export default function EventCard({ event }) {
  const left = spotsLeft(event);
  return (
    <article className="card event-card">
      <span className={"tag tag--" + event.category.toLowerCase()}>
        {event.category}
      </span>
      <h3>{event.title}</h3>
      <ul className="meta">
        <li>
          📅 {formatDate(event.date)} · {event.time}
        </li>
        <li>📍 {event.venue}</li>
      </ul>
      <p className={"spots" + (left === 0 ? " spots--full" : "")}>
        {left === 0 ? "Fully booked" : `${left} places left`}
      </p>
      <Link to={`/events/${event.id}`} className="btn btn--ghost">
        View details
      </Link>
    </article>
  );
}
