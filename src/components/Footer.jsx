import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} CampusConnect. Campus events discovery
          and registration.
        </p>
        <p>
          <Link to="/events">Events</Link> · <Link to="/contact">Contact</Link>
        </p>
      </div>
    </footer>
  );
}
