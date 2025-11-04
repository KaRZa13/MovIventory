import {ThemedView} from '@/components/themed-view'
import {ThemedText} from '@/components/themed-text'
import {Colors} from "@/constants/theme"
import {StyleSheet, useColorScheme} from "react-native"

export default function HomeScreen() {
  const colorScheme = useColorScheme()

  return (
    <>
      <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText type="title">Bienvenue !</ThemedText>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({

});