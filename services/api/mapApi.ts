const BASE_URL = "https://api.jsonbin.io/v3/b/68ddb860ae596e708f02f1ca";

export interface MapData {
  id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  latitude: number;
  longitude: number;
  parkingInfo: string;
  description: string;
  publicTransportInfo: string;
}

export interface MapResponse {
  record: MapData[];
  metadata?: {
    id: string;
    private: boolean;
    createdAt: string;
  };
}

export async function fetchCinemaById(id: string): Promise<MapData | null> {
  const list = await fetchAllCinemas();
  return list.find((m) => m.id === id) ?? null;
}

export async function fetchAllCinemas(): Promise<MapData[]> {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const raw = await response.json();
    const record = (raw as any)?.record ?? raw;

    const arr = Array.isArray(record)
      ? record
      : typeof record === "object"
      ? Object.values(record)
      : [];

    const cleaned: MapData[] = arr
      .filter(
        (item: any) =>
          item &&
          typeof item.latitude === "number" &&
          typeof item.longitude === "number"
      )
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        address1: item.address1,
        address2: item.address2,
        city: item.city,
        latitude: item.latitude,
        longitude: item.longitude,
        parkingInfo: item.parkingInfo,
        description: item.description,
        publicTransportInfo: item.publicTransport,
      }));

    return cleaned;
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    throw error;
  }
}
