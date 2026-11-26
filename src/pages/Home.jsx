import { Link } from "react-router-dom";
import { getEvents } from "../api.js";
import useAsync from "../hooks/useAsync.js";
import EventCard from "../components/EventCard.jsx";
import { Loading, ErrorMessage } from "../components/StateMessage.jsx";

const steps = [
  ["Discover", "Browse upcoming events and filter by category or date."],
  [
    "Explore",
    "Open an event to view its venue, schedule, and available places.",
  ],
  ["Register", "Submit a registration form and receive a confirmation."],
];

export default function Home() {
  const [{ data, loading, error }] = useAsync(getEvents, []);
  const featured = (data || [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">Web project · CampusConnect</p>
          <h1>A single place to find campus events.</h1>
          <p className="lead">
            Stop checking posters, social media and group chats. Discover what's
            happening on campus and register in under a minute.
          </p>
          <div className="hero__actions">
            <Link to="/events" className="btn btn--mint">
              Browse events
            </Link>
            <Link to="/features" className="btn btn--outline-light">
              See features
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <h2>Featured events</h2>
          <Link to="/events">View all →</Link>
        </div>
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <div className="grid">
          {featured.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid">
            {steps.map(([title, text], i) => (
              <div className="card step" key={title}>
                <span className="step__n">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
