const BASE_URL = "http://localhost:3002/api/subscriptions";

export const subscribe = async (email) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Subscription failed");
  }
  return res.json();
};