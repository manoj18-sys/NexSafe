// Coordinates for the same node names used in the backend's
// NetworkX graph (backend/app/services/graph_service.py).
// Keep these two lists in sync — the map looks up city names
// returned by /route/analyze against this table.

export type Coordinate = [number, number]; // [lng, lat]

export const LOCATIONS: Record<string, Coordinate> = {
  Guwahati: [91.7362, 26.1445],
  Shillong: [91.8933, 25.5788],
  Silchar: [92.7789, 24.8333],
  Aizawl: [92.7176, 23.7271],
  Agartala: [91.2868, 23.8315],
  Imphal: [93.9063, 24.817],
};

export function getCoordinate(name: string): Coordinate | null {
  return LOCATIONS[name] ?? null;
}

export function pathToCoordinates(path: string[]): Coordinate[] {
  return path
    .map((stop) => getCoordinate(stop))
    .filter((coord): coord is Coordinate => coord !== null);
}