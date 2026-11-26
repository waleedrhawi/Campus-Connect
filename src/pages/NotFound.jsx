import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section container center">
      <h1>404</h1>
      <p className="lead lead--dark">We couldn't find that page.</p>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </section>
  );
}
