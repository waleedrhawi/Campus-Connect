import { useState } from "react";
import { sendContact } from "../api.js";

const empty = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const change = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const found = {};
    if (!values.name.trim()) found.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      found.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      found.message = "Message should be at least 10 characters.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      await sendContact(values);
      setStatus({ type: "ok", text: "Thanks! Your message has been sent." });
      setValues(empty);
    } catch (err) {
      setStatus({ type: "err", text: err.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section container">
      <h1>Contact us</h1>
      <div className="contact">
        <div className="card">
          <h3>Contact details</h3>
          <ul className="meta">
            <li>✉️ events@campusconnect.edu</li>
            <li>📞 +961 00 000 000</li>
            <li>📍 Student Affairs Office, Main Campus</li>
          </ul>
        </div>

        <form className="card form" onSubmit={submit} noValidate>
          <h3>Send an inquiry</h3>
          {[
            ["name", "Name", "text"],
            ["email", "Email", "email"],
            ["subject", "Subject", "text"],
          ].map(([n, l, t]) => (
            <label className="field" key={n}>
              <span>{l}</span>
              <input
                name={n}
                type={t}
                value={values[n]}
                onChange={change}
                aria-invalid={!!errors[n]}
              />
              {errors[n] && <small className="error">{errors[n]}</small>}
            </label>
          ))}
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              value={values.message}
              onChange={change}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <small className="error">{errors.message}</small>
            )}
          </label>
          {status.text && (
            <p
              className={status.type === "ok" ? "success" : "error"}
              role="status"
            >
              {status.text}
            </p>
          )}
          <button className="btn" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
