import { useState } from "react";
import { registerForEvent } from "../api.js";

const empty = { fullName: "", studentId: "", email: "", department: "" };

function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 3) e.fullName = "Please enter your full name.";
  if (!/^\d{6,10}$/.test(v.studentId.trim()))
    e.studentId = "Student ID should be 6–10 digits.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.department.trim()) e.department = "Please enter your department.";
  return e;
}

export default function RegistrationForm({ event, disabled, onRegistered }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const change = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    setServerError("");
    try {
      const res = await registerForEvent({ eventId: event.id, ...values });
      setConfirmation(res.confirmationCode);
      onRegistered?.();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="card confirmation" role="status">
        <h3>You're registered! 🎉</h3>
        <p>
          Thanks, {values.fullName.split(" ")[0]}. We've saved your place for{" "}
          <strong>{event.title}</strong>.
        </p>
        <p className="code">{confirmation}</p>
        <p className="muted">
          Keep this confirmation code, you may be asked for it at the entrance.
        </p>
      </div>
    );
  }

  if (disabled) {
    return (
      <div className="card">
        <h3>Registration closed</h3>
        <p className="muted">This event is fully booked.</p>
      </div>
    );
  }

  const fields = [
    ["fullName", "Full name", "text", "name"],
    ["studentId", "Student ID", "text", "off"],
    ["email", "University email", "email", "email"],
    ["department", "Department", "text", "off"],
  ];

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h3>Register for this event</h3>
      {fields.map(([name, label, type, auto]) => (
        <label className="field" key={name}>
          <span>{label}</span>
          <input
            name={name}
            type={type}
            autoComplete={auto}
            value={values[name]}
            onChange={change}
            aria-invalid={!!errors[name]}
          />
          {errors[name] && <small className="error">{errors[name]}</small>}
        </label>
      ))}
      {serverError && (
        <p className="error" role="alert">
          {serverError}
        </p>
      )}
      <button className="btn" disabled={submitting}>
        {submitting ? "Submitting…" : "Confirm registration"}
      </button>
    </form>
  );
}
