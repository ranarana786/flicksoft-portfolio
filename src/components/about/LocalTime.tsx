"use client";

import { useEffect, useState } from "react";

/**
 * Live local time for an office. Rendered on the client only (the server
 * doesn't know the visitor's "now"), refreshed every 30 seconds.
 */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      timeZoneName: "short",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}
