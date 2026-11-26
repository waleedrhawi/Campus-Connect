export function Loading({ label = "Loading…" }) {
  return (
    <div className="state" role="status">
      <span className="spinner" aria-hidden="true" /> {label}
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="state state--error" role="alert">
      {message || "Something went wrong."}
    </div>
  );
}

export function Empty({ children }) {
  return <div className="state">{children}</div>;
}
