import {ThemedView} from '@/components/themed-view'
import {ThemedText} from '@/components/themed-text'
import {Colors} from "@/constants/theme"
import {Button, StyleSheet, useColorScheme, View} from "react-native"
import {Barcode} from "expo-barcode-generator"
import {useTranslation} from "react-i18next"
import {getCurrentUser} from "@/lib/storage"
import '@/language/index'
import {useCallback, useEffect, useState} from "react"
import type {User} from "@/types/user"
import {useFocusEffect} from "expo-router";

export default function HomeScreen() {
    const colorScheme = useColorScheme()
    const {t, i18n} = useTranslation()
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const user = await getCurrentUser()
                setCurrentUser(user)
            })()
        }, [])
    )

    const numericCardRef =
        currentUser?.cardRef && !Number.isNaN(Number(currentUser.cardRef))
            ? Number(currentUser.cardRef)
            : 0

    return (
        <>
            <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ThemedText style={[styles.title, {color: Colors[colorScheme ?? 'light'].textPrimary}]}
                            type="title">{t('welcome') + " " + currentUser?.firstName}</ThemedText>

                <View
                    style={styles.barcodeContainer}>
                    <Barcode
                        value={numericCardRef}
                        options={{format: 'MSI', width: 2, height: 75, displayValue: true, fontSize: 16}}
                        style={{marginVertical: 20}}
                    />
                </View>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    barcodeContainer: {
        backgroundColor: '#F2F4F3',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontFamily: "LuckiestGuy",
        marginBottom: 22,
    }
})