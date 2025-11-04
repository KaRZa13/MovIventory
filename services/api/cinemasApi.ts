const BASE_URL = 'https://api.jsonbin.io/v3/b/68ddb860ae596e708f02f1ca'

export interface Cinema {
  id: string
  name: string
  address1: string
  address2: string
  city: string
  latitude: number
  longitude: number
  parkingInfo: string
  description: string
  publicTransport: string
}

export interface ApiResponse {
  record: Cinema[]
  metadata?: {
    id: string
    private: boolean
    createdAt: string
  }
}

export async function fetchCinema(id: string): Promise<Cinema | undefined> {
  const res = await fetchCinemas()
  return res.record.find(m => m.id === id)
}

export async function fetchCinemas(): Promise<ApiResponse> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la récupération : ${error}`)
    throw error
  }
}