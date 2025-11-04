import {useState} from 'react'
import {StyleSheet, TextInput, TouchableOpacity, useColorScheme} from 'react-native'
import {ThemedText} from '@/components/themed-text'
import {ThemedView} from '@/components/themed-view'
import SignUp from './signUp'
import {Colors} from '@/constants/theme'

type AuthScreenProps = {
  loginCredential: (email: string, password: string) => void | Promise<void>
}
export default function AuthForm({loginCredential}: AuthScreenProps) {
  const colorScheme = useColorScheme()
  const [register, setRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      loginCredential(email, password)
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
    }
  }

  if (register) {
    return <SignUp onSwitchToLogin={() => setRegister(false)}/>
  }

  return (
    <ThemedView style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <ThemedText style={[styles.title, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>Connexion</ThemedText>

      <TextInput
        style={[styles.input, {backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary}, {color: Colors[colorScheme ?? 'light'].textPrimary}]}
        placeholder="Email"
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, {backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary}, {color: Colors[colorScheme ?? 'light'].textPrimary}]}
        placeholder="Mot de passe"
        placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].primaryAccent}]}
                        onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Se connecter</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setRegister(true)}>
        <ThemedText style={[styles.switchText, {color: Colors[colorScheme ?? 'light'].primaryAccent}]}>Pas de compte ?
          S&#39;inscrire</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'LuckiestGuy',
    fontSize: 32,
    padding: 4,
    marginBottom: 40,
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
  },
})
