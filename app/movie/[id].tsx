import React, { useEffect, useState } from 'react'
import { Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { fetchMovie, Movie } from '@/services/api/moviesApi'

export default function MovieDetail() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
            ;(async () => {
            try {
                const movie = await fetchMovie(id)
                if (!movie) setError('Film introuvable')
                else setMovie(movie)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    if (loading) return <ActivityIndicator style={styles.center} />
    if (error) return <Text style={styles.center}>Erreur : {error}</Text>
    if (!movie) return null

    return (
        <>
            <Stack.Screen
                options={{
                    title: movie.title,
                    headerBackTitle: 'Retour',
                    headerStyle: { backgroundColor: '#d2d2d2' },
                    headerTintColor: '#fff',
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: movie.graphicUrl }} style={styles.image} />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.date}>Sortie : {movie.openingDate}</Text>
                <Text style={styles.desc}>{movie.description}</Text>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: 400, borderRadius: 12, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    date: { fontSize: 14, color: 'gray', marginBottom: 16 },
    desc: { fontSize: 16, lineHeight: 22 },
})
