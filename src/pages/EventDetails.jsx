import { Link, useParams } from "react-router-dom";
import { getEvent } from "../api.js";
import useAsync from "../hooks/useAsync.js";
import RegistrationForm from "../components/RegistrationForm.jsx";
import { Loading, ErrorMessage } from "../components/StateMessage.jsx";
import { formatDate, spotsLeft } from "../utils.js";

export default function EventDetails() {
  const { id } = useParams();
  const [{ data: event, loading, error }, setState] = useAsync(
    () => getEvent(id),
    [id],
  );

  if (loading)
    return (
      <section className="section container">
        <Loading />
      </section>
    );
  if (error)
    return (
      <section className="section container">
        <ErrorMessage message={error} />
        <p>
          <Link to="/events">← Back to events</Link>
        </p>
      </section>
    );

  const left = spotsLeft(event);
  const pct = Math.min(
    100,
    Math.round((event.registered / event.capacity) * 100),
  );
  const onRegistered = () =>
    setState((s) => ({
      ...s,
      data: { ...s.data, registered: s.data.registered + 1 },
    }));

  return (
    <section className="section container">
      <p>
        <Link to="/events">← Back to events</Link>
      </p>

      <div className="details">
        <div>
          <span className={"tag tag--" + event.category.toLowerCase()}>
            {event.category}
          </span>
          <h1>{event.title}</h1>
          <p className="lead lead--dark">{event.description}</p>

          <div className="info-grid">
            <div className="card">
              <small>Date</small>
              <strong>{formatDate(event.date)}</strong>
            </div>
            <div className="card">
              <small>Time</small>
              <strong>{event.time}</strong>
            </div>
            <div className="card">
              <small>Venue</small>
              <strong>{event.venue}</strong>
            </div>
          </div>

          <h2>Schedule</h2>
          <ol className="timeline">
            {(event.schedule || []).map((s) => (
              <li key={s.time + s.item}>
                <time>{s.time}</time>
                <span>{s.item}</span>
              </li>
            ))}
          </ol>

          <h2>Available places</h2>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div style={{ width: pct + "%" }} />
          </div>
          <p className="muted">
            {left} of {event.capacity} places left
          </p>
        </div>

        <aside>
          <RegistrationForm
            event={event}
            disabled={left === 0}
            onRegistered={onRegistered}
          />
        </aside>
      </div>
    </section>
  );
}
