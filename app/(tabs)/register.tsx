import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
/*import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;*/

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export default function RegisterScreen({ navigation }: /*props*/ any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = () => {
    const userData = {
      firstName,
      lastName,
      email,
      address,
      zipcode,
      city,
    };
    Object.entries(userData).forEach(([key, value]) => {
        save(key, value);
        console.log(`${key}: ${value}`);
    });
    console.log("Utilisateur enregistré :", userData);

    // Navigation vers Home (ou Carte)
    navigation.replace("Account");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Création de compte</Text>

      <TextInput
        placeholder="Prénom"
        placeholderTextColor="#888"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Nom"
        placeholderTextColor="#888"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Adresse"
        placeholderTextColor="#888"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Code postal"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="numeric"
        value={zipcode}
        onChangeText={setZipcode}
      />
      <TextInput
        placeholder="Ville"
        placeholderTextColor="#888"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Créer</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, textAlign: "center", color: "#007AFF" },
});
