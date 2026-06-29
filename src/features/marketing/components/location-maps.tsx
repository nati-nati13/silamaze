"use client";

import { useState } from "react";

const BRANCHES = [
  {
    city: "თბილისი",
    address: "ვაჟა-ფშაველას გამზირი 8",
    query: "41.7270835,44.764282",
  },
  {
    city: "საგარეჯო",
    address: "ერეკლე II-ის ქუჩა 49",
    query: "41.729772,45.331504",
  },
];

export function LocationMaps() {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {BRANCHES.map((b, i) => (
          <button
            key={b.city}
            type="button"
            onClick={() => setActive(i)}
            className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-left transition ${
              active === i
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-muted/50"
            }`}
          >
            <span className="font-semibold">{b.city}</span>
            <span className="text-sm text-muted-foreground">{b.address}</span>
          </button>
        ))}
      </div>

      <iframe
        key={BRANCHES[active].query}
        title={`Dermako Academy — ${BRANCHES[active].city}`}
        src={`https://maps.google.com/maps?q=${BRANCHES[active].query}&hl=ka&z=16&output=embed`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-lg"
      />
    </div>
  );
}
