import {ThemedView} from '@/components/themed-view'
import {ThemedText} from '@/components/themed-text'
import {Colors} from "@/constants/theme"
import {Button, StyleSheet, useColorScheme} from "react-native"
import {useTranslation} from "react-i18next"
import '@/language/index'

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const {t, i18n} = useTranslation()

  return (
    <>
      <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText type="title">{t('welcome')}</ThemedText>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({

});