const BASE_URL = 'https://api.jsonbin.io/v3/b/68ddb21643b1c97be9573412'

export interface Movie {
    id: string
    title: string
    description: string
    runTime: number
    openingDate: string
    graphicUrl: string
    backdropUrl: string
    trailerUrl: string
}

export interface ApiResponse {
    record: Movie[]
    metadata?: {
        id: string
        private: boolean
        createdAt: string
    }
}

export async function fetchMovie(id: string): Promise<Movie | undefined> {
    const res = await fetchMovies()
    return res.record.find(m => m.id === id)
}

export async function fetchMovies(): Promise<ApiResponse> {
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
