import AsyncStorage from '@react-native-async-storage/async-storage'
import type {User} from '@/types/user'

export const registerUser = async (newUser: User) => {
  try {
    const storedUsers = await AsyncStorage.getItem('users')
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

    const existingUser = users.find(u => u.id === newUser.id)
    if (existingUser) {
      return { success: false, message: 'Cet email est déjà enregistré.' }
    }

    users.push(newUser)
    await AsyncStorage.setItem('users', JSON.stringify(users))

    return { success: true, message: 'Inscription réussie' }
  } catch (error) {
    console.error('Erreur registerUser:', error)
    return { success: false, message: 'Erreur lors de l’inscription.' }
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const storedUsers = await AsyncStorage.getItem('users')
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'Email ou mot de passe incorrect.' }
    }

    // Stocke le user connecté
    await AsyncStorage.setItem('currentUser', JSON.stringify(user))
    return { success: true, message: 'Connexion réussie', user }

  } catch (error) {
    console.error('Erreur loginUser:', error)
    return { success: false, message: 'Erreur lors de la connexion.' }
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Erreur getCurrentUser:', error)
    return null
  }
}

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('currentUser')
  } catch (error) {
    console.error('Erreur logoutUser:', error)
  }
}

export const updateCurrentUser = async (updatedData: Partial<User>) => {
  try {
    const storedUser = await AsyncStorage.getItem('currentUser')
    if (!storedUser) return { success: false, message: 'Aucun utilisateur connecté.' }

    const currentUser: User = JSON.parse(storedUser)
    const updatedUser = { ...currentUser, ...updatedData }

    // Met à jour la liste des users globale
    const storedUsers = await AsyncStorage.getItem('users')
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : []
    const updatedUsers = users.map(u => (u.email === currentUser.email ? updatedUser : u))

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser))

    return { success: true, message: 'Profil mis à jour', user: updatedUser }

  } catch (error) {
    console.error('Erreur updateCurrentUser:', error)
    return { success: false, message: 'Erreur lors de la mise à jour du profil.' }
  }
}

