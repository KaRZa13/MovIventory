import {ActivityIndicator, useColorScheme, StyleSheet, ScrollView} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {Cinema, fetchCinema} from "@/services/api/cinemasApi";
import {Colors} from "@/constants/theme";
import {ThemedView} from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";


export default function CinemaDetail() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const {id} = useLocalSearchParams<{ id: string }>()
  const [cinema, setCinema] = useState<Cinema | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    (async () => {
      try {
        const cinema = await fetchCinema(id)
        if (!cinema) setError('Cinéma introuvable')
        else setCinema(cinema)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <ActivityIndicator style={styles.center}/>
  if (error) return <ThemedText style={styles.center}>Erreur : {error}</ThemedText>
  if (!cinema) return null

  return (
    <>
      <Stack.Screen
        options={{
          title: cinema.name,
          headerBackTitle: 'Retour',
          headerStyle: {backgroundColor: colors.headerBackground},
          headerTintColor: '#fff',
        }}
      />
      <ScrollView style={{backgroundColor: colors.background}}>
        <ThemedView style={styles.container}>
          <ThemedView style={[styles.section, {backgroundColor: colors.backgroundSecondary}]}>
            <ThemedText style={[styles.sectionTitle, {color: colors.primaryAccent}]}>
              Adresse
            </ThemedText>
            <ThemedText style={[styles.text, {color: colors.textPrimary}]}>
              {cinema.address1}
            </ThemedText>
            {cinema.address2 && (
              <ThemedText style={[styles.text, {color: colors.textPrimary}]}>
                {cinema.address2}
              </ThemedText>
            )}
            <ThemedText style={[styles.text, {color: colors.textPrimary}]}>
              {cinema.city}
            </ThemedText>
          </ThemedView>

          {cinema.description && (
            <ThemedView style={[styles.section, {backgroundColor: colors.backgroundSecondary}]}>
              <ThemedText style={[styles.sectionTitle, {color: colors.primaryAccent}]}>
                Description
              </ThemedText>
              <ThemedText style={[styles.text, {color: colors.textSecondary}]}>
                {cinema.description}
              </ThemedText>
            </ThemedView>
          )}

          {cinema.parkingInfo && (
            <ThemedView style={[styles.section, {backgroundColor: colors.backgroundSecondary}]}>
              <ThemedText style={[styles.sectionTitle, {color: colors.primaryAccent}]}>
                Parking
              </ThemedText>
              <ThemedText style={[styles.text, {color: colors.textSecondary}]}>
                {cinema.parkingInfo}
              </ThemedText>
            </ThemedView>
          )}

          {cinema.publicTransport && (
            <ThemedView style={[styles.section, {backgroundColor: colors.backgroundSecondary}]}>
              <ThemedText style={[styles.sectionTitle, {color: colors.primaryAccent}]}>
                Transports en commun
              </ThemedText>
              <ThemedText style={[styles.text, {color: colors.textSecondary}]}>
                {cinema.publicTransport}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})