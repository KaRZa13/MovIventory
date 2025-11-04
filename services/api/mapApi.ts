const BASE_URL = 'https://api.jsonbin.io/v3/b/68ddb860ae596e708f02f1ca'

export interface Location {
  id: string
  name: string
  address1: string
  address2: string
  city: string
  latitude: number
  longitude: number
  parkingInfo: string
  description: string
  publicTransportInfo: string
}

export interface ApiResponse {
  record: Location[]
  metadata?: {
    id: string
    private: boolean
    createdAt: string
  }
}

export async function fetchLocation(id: string): Promise<Location | undefined> {
  const res = await fetchLocations()
  return res.record.find(m => m.id === id)
}

export async function fetchLocations(): Promise<ApiResponse> {
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