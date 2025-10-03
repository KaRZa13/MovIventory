import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";

export default function TabTwoScreen() {
  const pathname = usePathname();
  return (
    <View>
      <Text style={styles.title}>Création de compte</Text>

      <Link href="/qr-code" asChild>
        <TouchableOpacity style={styles.qrButton} onPress={() => {}}>
          <Ionicons
            name="qr-code-outline"
            size={125}
            color="black"
            style={styles.qrIcon}
          />
        </TouchableOpacity>
      </Link>

      {/* Mettre register pour rediriger */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.formButton} onPress={() => {}}>
          <Text style={styles.formText}>
            Remplir le formulaire manuellement
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "15%",
  },
  qrButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#131212ff",
    borderWidth: 3,
    padding: 15,
    borderRadius: 25,
    height: 175,
    marginTop: "25%",
    marginLeft: "10%",
    marginRight: "10%",
    alignItems: "center",
  },
  qrIcon: {
    alignSelf: "center",
  },
  formButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#131212ff",
    borderWidth: 3,
    padding: 15,
    borderRadius: 25,
    height: 175,
    marginTop: "15%",
    marginLeft: "10%",
    marginRight: "10%",
    alignItems: "center",
  },
  formText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "14%",
  },
});
