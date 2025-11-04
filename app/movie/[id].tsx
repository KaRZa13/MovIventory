import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, ActivityIndicator, ScrollView, useColorScheme, TouchableOpacity, Linking, Alert} from 'react-native'
import {Stack, useLocalSearchParams} from 'expo-router'
import {fetchMovie, Movie} from '@/services/api/moviesApi'
import { Colors } from '@/constants/theme'
import {ThemedView} from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";

export default function MovieDetail() {
  const colorScheme = useColorScheme()

  const {id} = useLocalSearchParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    (async () => {
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

  const openYoutubeTrailer = async () => {
    if (!movie?.trailerUrl) {
      Alert.alert("Aucune bande-annonce disponible pour ce film.")
      return
    }

    const supported = await Linking.canOpenURL(movie.trailerUrl)

    if (supported) {
      await Linking.openURL(movie.trailerUrl)
    } else {
      Alert.alert("Impossible d’ouvrir le lien YouTube.")
    }
  }

  if (loading) return <ActivityIndicator style={styles.center}/>
  if (error) return <ThemedText style={styles.center}>Erreur : {error}</ThemedText>
  if (!movie) return null

  return (
    <>
      <Stack.Screen
        options={{
          title: movie.title,
          headerBackTitle: 'Retour',
          headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].headerBackground},
          headerTintColor: '#fff',
        }}
      />
      <ScrollView contentContainerStyle={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
        <Image source={{uri: movie.graphicUrl}} style={styles.image}/>
        <ThemedView style={styles.row}>
          <ThemedText style={[styles.date, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Sortie : {movie.openingDate}</ThemedText>
          <ThemedText style={[styles.date, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Durée : {movie.runTime}min</ThemedText>
        </ThemedView>
        {movie.trailerUrl && (
          <TouchableOpacity style={[styles.trailerButton, {backgroundColor: Colors[colorScheme ?? 'light'].primaryAccent}]} onPress={openYoutubeTrailer}>
            <ThemedText style={[styles.trailerText, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>🎬 Voir la bande-annonce</ThemedText>
          </TouchableOpacity>
        )}
        <ThemedText style={[styles.desc, {color: Colors[colorScheme ?? 'light'].textTertiary}]}>{movie.description}</ThemedText>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 20
  },
  title: {
    fontFamily: "Poppins",
    color: "#f2f4f3",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  date: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginBottom: 16
  },
  desc: {
    fontFamily: "Poppins",
    fontSize: 16,
    lineHeight: 22
  },
  trailerButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  trailerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
