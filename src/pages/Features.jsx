import { Link } from "react-router-dom";

const features = [
  [
    "🔎",
    "Event browsing",
    "See all upcoming events in a clean, responsive list.",
  ],
  [
    "🏷️",
    "Category & date filters",
    "Narrow the list by category, start date or keyword.",
  ],
  [
    "📋",
    "Event details",
    "Venue, schedule and remaining places for every event.",
  ],
  [
    "✅",
    "Online registration",
    "Fill in a short form and get a confirmation code instantly.",
  ],
  [
    "📱",
    "Responsive design",
    "Works on phones, tablets and desktops with mobile navigation.",
  ],
  [
    "✉️",
    "Contact form",
    "Send questions or suggestions straight to the organisers.",
  ],
];

export default function Features() {
  return (
    <section className="section container">
      <h1>Features</h1>
      <p className="lead lead--dark">
        Event browsing, filters, and registration.
      </p>
      <div className="grid">
        {features.map(([icon, title, text]) => (
          <div className="card" key={title}>
            <span className="icon" aria-hidden="true">
              {icon}
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <p className="center">
        <Link to="/events" className="btn">
          Try it now
        </Link>
      </p>
    </section>
  );
}
