import AuthForm from '@/components/custom-components/authForm'
import {useState} from 'react'
import {ThemedView} from '@/components/themed-view'
import {ThemedText} from '@/components/themed-text'
import {Alert, Modal, StyleSheet, TextInput, TouchableOpacity, useColorScheme} from "react-native"
import {Colors} from "@/constants/theme"
import {Ionicons} from "@expo/vector-icons"
import type {User} from "@/types/user"
import {logoutUser, loginUser, updateCurrentUser} from '@/lib/storage'
import {useAuth} from '@/contexts/auth-context'
import {router} from "expo-router"


export default function Profile() {
  const colorScheme = useColorScheme()
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const {isAuthenticated, setIsAuthenticated} = useAuth()
  const [showModificationModal, setShowModificationModal] = useState(false)
  const [editedProfile, setEditedProfile] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    zipcode: '',
    city: '',
    cardRef: ''
  })

  const handleLogin = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        console.error('Veuillez remplir tous les champs')
        return
      }

      const response = await loginUser(email, password)
      if (!response.success || !response.user) {
        console.error('Échec de la connexion:', response.message)
        return
      }

      const userData = response.user

      const profile: User = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        address: userData.address,
        zipcode: userData.zipcode,
        city: userData.city,
        cardRef: userData.cardRef,
      }

      setUserProfile(profile)
      setIsAuthenticated(true)
      router.replace('/')
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
    }
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      setIsAuthenticated(false)
      setUserProfile(null)
    })
  }

  const handleUpdateProfile = async () => {
    if (!userProfile) return

    const result = await updateCurrentUser(editedProfile)

    if (result.success && result.user) {
      setUserProfile(result.user)
      setShowModificationModal(false)
      Alert.alert('Succès', 'Profil mis à jour ✅')
    } else {
      Alert.alert('Erreur', result.message)
    }
  }

  const openModificationModal = () => {
    if (userProfile) {
      setEditedProfile({
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        password: userProfile.password,
        address: userProfile.address || '',
        zipcode: userProfile.zipcode || '',
        city: userProfile.city || '',
        cardRef: userProfile.cardRef || ''
      })
    }
    setShowModificationModal(true)
  }

  const fullAddress =
    [userProfile?.address, userProfile?.zipcode, userProfile?.city]
      .filter(Boolean)
      .join(', ') || 'N/A'

  if (!isAuthenticated) {
    return <AuthForm loginCredential={handleLogin} />
  }

  return (
    <>
      <ThemedView style={[styles.header, {backgroundColor: Colors[colorScheme ?? 'light'].headerBackground}]}>
        <ThemedText
          style={[styles.headerTitle, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
          Détails du profil
        </ThemedText>
        <TouchableOpacity style={styles.modificationButton} onPress={openModificationModal}>
          <Ionicons name={"create-outline"} size={32} color={Colors[colorScheme ?? 'light'].textPrimary}/>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.heroContent}>
        <ThemedView style={[styles.infoContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
          <ThemedText style={[styles.label, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Nom complet</ThemedText>
          <ThemedText style={[styles.value, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
            {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Inconnu'}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.infoContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
          <ThemedText style={[styles.label, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Email</ThemedText>
          <ThemedText style={[styles.value, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
            {userProfile?.email ?? 'N/A'}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.infoContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
          <ThemedText style={[styles.label, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Adresse</ThemedText>
          <ThemedText style={[styles.value, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
            {fullAddress}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.infoContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
          <ThemedText style={[styles.label, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Réf. carte</ThemedText>
          <ThemedText style={[styles.value, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
            {userProfile?.cardRef ?? 'N/A'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].primaryAccent}]}
          onPress={handleLogout}
        >
          <ThemedText style={styles.buttonText}>Déconnexion</ThemedText>
        </TouchableOpacity>
      </ThemedView>


      <Modal visible={showModificationModal} animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={[styles.modalTitle, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>
            Modifier le profil
          </ThemedText>

          <ThemedView style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput, {
                backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
                color: Colors[colorScheme ?? 'light'].textPrimary
              }]}
              placeholder="Prénom"
              placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
              value={editedProfile.firstName}
              onChangeText={(text) => setEditedProfile({...editedProfile, firstName: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput, {
                backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
                color: Colors[colorScheme ?? 'light'].textPrimary
              }]}
              placeholder="Nom"
              placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
              value={editedProfile.lastName}
              onChangeText={(text) => setEditedProfile({...editedProfile, lastName: text})}
            />
          </ThemedView>

          <TextInput
            style={[styles.input, {
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
              color: Colors[colorScheme ?? 'light'].textPrimary
            }]}
            placeholder="Email"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={editedProfile.email}
            onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, {
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
              color: Colors[colorScheme ?? 'light'].textPrimary
            }]}
            placeholder="Adresse"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={editedProfile.address}
            onChangeText={(text) => setEditedProfile({...editedProfile, address: text})}
          />

          <TextInput
            style={[styles.input, {
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
              color: Colors[colorScheme ?? 'light'].textPrimary
            }]}
            placeholder="Code postal"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={editedProfile.zipcode}
            onChangeText={(text) => setEditedProfile({...editedProfile, zipcode: text})}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, {
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
              color: Colors[colorScheme ?? 'light'].textPrimary
            }]}
            placeholder="Ville"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={editedProfile.city}
            onChangeText={(text) => setEditedProfile({...editedProfile, city: text})}
          />

          <TextInput
            style={[styles.input, {
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
              color: Colors[colorScheme ?? 'light'].textPrimary
            }]}
            placeholder="Référence carte fidélité"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={editedProfile.cardRef}
            onChangeText={(text) => setEditedProfile({...editedProfile, cardRef: text})}
          />

          <TouchableOpacity
            style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].primaryAccent}]}
            onPress={handleUpdateProfile}
          >
            <ThemedText style={styles.buttonText}>Enregistrer</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowModificationModal(false)}
          >
            <ThemedText style={[styles.cancelButtonText, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>
              Annuler
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    </>
  )

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: "LuckiestGuy",
    fontSize: 24,
  },
  heroContent: {
    flex: 1,
    padding: 20,
    gap: 16
  },
  modificationButton: {
    padding: 5,
  },
  infoContainer: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins",
    textTransform: 'uppercase',
    opacity: 0.6,
    marginBottom: 4
  },
  value: {
    fontFamily: "Poppins",
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: 'LuckiestGuy',
    fontSize: 32,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfInput: {
    flex: 1,
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
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  footerContainer: {
    padding: 20,
  }
})
