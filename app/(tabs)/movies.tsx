import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { fetchMovies, Movie } from "@/services/api/moviesApi"
import { useRouter } from "expo-router"

export default function MoviesScreen() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchMovies()
                setMovies(result.record)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    if (loading) return <ActivityIndicator size="large" style={styles.center} />
    if (error) return <Text style={styles.center}>Erreur : {error}</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des films :</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.card}
                        onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id }})}
                    >
                        <View style={styles.card}>
                            <Image source={{ uri: item.graphicUrl }} style={styles.image} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Text numberOfLines={3}>{item.description}</Text>
                                <Text style={styles.date}>Sortie : {item.openingDate}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
    card: { flexDirection: "row", marginBottom: 15, alignItems: "center" },
    image: { width: 80, height: 120, borderRadius: 8 },
    movieTitle: { fontSize: 16, fontWeight: "bold" },
    date: { fontSize: 12, color: "gray", marginTop: 4 },
});