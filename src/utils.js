export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const spotsLeft = (e) => Math.max(0, e.capacity - e.registered);
