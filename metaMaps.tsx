// Local stand-in for "@meta-ai/artifact-maps".
// That package only exists inside Meta's artifact runtime (container:// URLs),
// so this module reproduces the two helpers App.tsx uses:
//   - mapsDirectionsUrl(place)  -> Google Maps directions link
//   - mountPlaceListMap(el, { places, rows }, onUnavailable)
//     -> renders an OpenStreetMap embed and keeps the place rows in sync.

export type MapPlace = {
  label: string;
  lat: number;
  lng: number;
};

type MountOptions = {
  places: MapPlace[];
  rows: HTMLElement[];
};

export type MapInstance = {
  destroy: () => void;
};

/** Google Maps "itinerary" deep link for one place. */
export function mapsDirectionsUrl(place: {
  label?: string;
  lat: number;
  lng: number;
}): string {
  const destination = `${place.lat},${place.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination,
  )}`;
}

function embedUrl(place: MapPlace): string {
  const latSpan = 0.006;
  const lngSpan = 0.009;
  const bbox = [
    place.lng - lngSpan,
    place.lat - latSpan,
    place.lng + lngSpan,
    place.lat + latSpan,
  ]
    .map((n) => n.toFixed(5))
    .join("%2C");

  return (
    "https://www.openstreetmap.org/export/embed.html" +
    `?bbox=${bbox}&layer=mapnik&marker=${place.lat}%2C${place.lng}`
  );
}

export function mountPlaceListMap(
  container: HTMLElement | null,
  options: MountOptions,
  onUnavailable?: () => void,
): MapInstance {
  const noop: MapInstance = { destroy: () => {} };
  const places = options?.places ?? [];
  const rows = (options?.rows ?? []).filter(Boolean) as HTMLElement[];

  if (!container || places.length === 0) {
    onUnavailable?.();
    return noop;
  }

  let current = 0;
  const frame = document.createElement("iframe");
  frame.title = `Carte – ${places[0].label}`;
  frame.loading = "lazy";
  frame.referrerPolicy = "no-referrer-when-downgrade";
  frame.style.cssText =
    "display:block;width:100%;height:100%;border:0;border-radius:14px;background:#eef2f7";
  frame.src = embedUrl(places[0]);
  container.replaceChildren(frame);

  const select = (index: number) => {
    if (index === current) return;
    current = index;
    frame.src = embedUrl(places[index]);
    rows.forEach((row, i) => {
      row.classList.toggle("map-selected", i === index);
      row.querySelector(".pin")?.classList.toggle("pin--on", i === index);
    });
  };

  const listeners: Array<() => void> = [];
  rows.forEach((row, index) => {
    const onClick = () => select(index);
    row.style.cursor = "pointer";
    row.addEventListener("click", onClick);
    listeners.push(() => row.removeEventListener("click", onClick));
  });

  return {
    destroy() {
      listeners.forEach((remove) => remove());
      container.replaceChildren();
    },
  };
}
