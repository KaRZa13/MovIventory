import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Text, Modal, View, useColorScheme} from 'react-native'
import {ThemedText} from '@/components/themed-text'
import {ThemedView} from '@/components/themed-view'
import {CameraView, useCameraPermissions} from "expo-camera"
import {Colors} from '@/constants/theme'
import {Ionicons} from "@expo/vector-icons"
import {registerUser} from "@/lib/storage"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import {useTranslation} from "react-i18next"

export default function SignUp({onSwitchToLogin}: { onSwitchToLogin: () => void }) {
  const colorScheme = useColorScheme()
  const {t} = useTranslation()
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [city, setCity] = useState('')
  const [cardRef, setCardRef] = useState('')
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const handleSignUp = async () => {
    try {
      if (!email || !password || !firstName || !lastName) {
        console.error('Veuillez remplir tous les champs obligatoires')
        return;
      }

      const newId = id?.trim() || uuidv4()

      const userData = {
        id: newId,
        email,
        password,
        firstName,
        lastName,
        address,
        zipcode,
        city,
        cardRef,
        createdAt: new Date().toISOString()
      }

      await registerUser(userData)

      setId('')
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setAddress('')
      setZipcode('')
      setCity('')
      setCardRef('')

      onSwitchToLogin()

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
    }
  }

  const handleQRCodeScanned = ({data}: { data: string }) => {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.email) setEmail(parsedData.email)
      if (parsedData.firstName) setFirstName(parsedData.firstName)
      if (parsedData.lastName) setLastName(parsedData.lastName)
      if (parsedData.address) setAddress(parsedData.address)
      if (parsedData.zipcode) setZipcode(parsedData.zipcode)
      if (parsedData.city) setCity(parsedData.city)
      if (parsedData.cardRef) setCardRef(parsedData.cardRef)

      setShowQRScanner(false)
    } catch (e) {
      console.error('Erreur lors de l\'analyse du QR code:', e)
    }
  }

  const openQRScanner = async () => {
    if (!permission || !permission.granted) {
      await requestPermission()
    }
    setShowQRScanner(true)
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedView style={styles.header}>
        <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>{t('signup.title_signup')}</Text>

        <TouchableOpacity style={styles.qrIconButton} onPress={openQRScanner}>
          <Ionicons name="qr-code" size={32} color={Colors[colorScheme ?? 'light'].textPrimary}/>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput, {
            backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
            color: Colors[colorScheme ?? 'light'].textPrimary
          }]}
          placeholder={t('signup.firstname_placeholder')}
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={[styles.input, styles.halfInput, {
            backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
            color: Colors[colorScheme ?? 'light'].textPrimary
          }]}
          placeholder={t('signup.lastname_placeholder')}
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={lastName}
          onChangeText={setLastName}
        />
      </ThemedView>

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.mail_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.password_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.address_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.zipcode_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={zipcode}
        onChangeText={setZipcode}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.city_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          color: Colors[colorScheme ?? 'light'].textPrimary
        }]}
        placeholder={t('signup.fidelity_card_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={cardRef}
        onChangeText={setCardRef}
      />

      <TouchableOpacity style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].primaryAccent}]}
                        onPress={handleSignUp}>
        <ThemedText style={styles.buttonText}>{t('signup.button_signup')}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToLogin}>
        <ThemedText style={[styles.switchText, {color: Colors[colorScheme ?? 'light'].primaryAccent}]}>{t('signup.have_account')}</ThemedText>
      </TouchableOpacity>

      <Modal visible={showQRScanner} animationType="slide">
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleQRCodeScanned}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowQRScanner(false)}
          >
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfInput: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'LuckiestGuy',
    fontSize: 32,
  },
  qrIconButton: {
    padding: 5,
  },
  input: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  switchText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginTop: 20,
    color: '#007AFF',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
