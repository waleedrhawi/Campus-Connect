import { mockEvents } from "./data/mockEvents.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const BASE = import.meta.env.VITE_API_URL || "/api";

const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms));
const normalize = (e) => ({ ...e, id: String(e.id ?? e._id) });

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok)
    throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

const mockDb = mockEvents.map((e) => ({ ...e }));

export async function getEvents() {
  if (USE_MOCK) {
    await wait();
    return mockDb.map(normalize);
  }
  return (await request("/events")).map(normalize);
}

export async function getEvent(id) {
  if (USE_MOCK) {
    await wait();
    const found = mockDb.find((e) => e.id === String(id));
    if (!found) throw new Error("Event not found.");
    return normalize(found);
  }
  return normalize(await request(`/events/${encodeURIComponent(id)}`));
}

export async function registerForEvent(payload) {
  if (USE_MOCK) {
    await wait(700);
    const ev = mockDb.find((e) => e.id === String(payload.eventId));
    if (!ev) throw new Error("Event not found.");
    if (ev.registered >= ev.capacity)
      throw new Error("Sorry, this event is full.");
    ev.registered += 1;
    return {
      confirmationCode:
        "CC-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
  }
  return request("/registrations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function sendContact(payload) {
  if (USE_MOCK) {
    await wait(600);
    return { message: "Message received." };
  }
  return request("/contact", { method: "POST", body: JSON.stringify(payload) });
}
