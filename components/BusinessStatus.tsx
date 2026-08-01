"use client";

const formatter = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hour12: false });

export default function BusinessStatus() {
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(part => [part.type, part.value]));
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const open = parts.weekday !== "Sun" && minutes >= 11 * 60 && minutes < 22 * 60;
  return <p><span className={`status-dot ${open ? "" : "status-dot-closed"}`} />{open ? "Open now · until 10 PM" : parts.weekday === "Sun" ? "Closed Sunday" : minutes < 11 * 60 ? "Closed now · opens at 11 AM" : "Closed now · opens tomorrow at 11 AM"}</p>;
}
