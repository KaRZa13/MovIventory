import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Rect } from "react-native-svg";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerSide} />
        <Text style={styles.headerTitle}>logo</Text>
        <View style={styles.headerSide}>
          <Link href="/(tabs)/account" asChild>
            <TouchableOpacity>
              <Ionicons name="person-circle" size={28} color="#222" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.barcodeLabel}>Nom prénom</Text>
        <View style={styles.barcodeWrapper}>
          <BarcodeEAN13 value="123456789012" height={120} lineColor="#111" />
          <Text style={{ marginTop: 8 }}>Chiffres à générer</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesDimensions = {
  screenWidth: typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 360,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  headerSide: {
    width: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  barcodeLabel: {
    marginBottom: 12,
    fontSize: 16,
    color: "#444",
  },
  barcodeWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

type BarcodeProps = { value: string; height?: number; lineColor?: string };

function BarcodeEAN13({ value, height = 120, lineColor = "#111" }: BarcodeProps) {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length < 12) {
    return <Text>EAN-13 invalide</Text>;
  }
  const base12 = digitsOnly.slice(0, 12);
  const checksum = computeEAN13Checksum(base12);
  const full = (digitsOnly.length === 13 ? digitsOnly.slice(0, 13) : base12 + checksum);

  const modules = ean13ToModules(full);
  const totalModules = modules.reduce((sum, m) => sum + m.width, 0);
  const maxWidth = Math.round(0.9 * stylesDimensions.screenWidth);
  const moduleWidth = Math.max(1, Math.floor(maxWidth / totalModules));
  const width = totalModules * moduleWidth;

  let x = 0;
  const bars: { x: number; w: number }[] = [];
  for (const m of modules) {
    if (m.isBar) bars.push({ x, w: m.width * moduleWidth });
    x += m.width * moduleWidth;
  }

  return (
    <Svg width={width} height={height}>
      {bars.map((b, i) => (
        <Rect key={i} x={b.x} y={0} width={b.w} height={height} fill={lineColor} />
      ))}
    </Svg>
  );
}

function computeEAN13Checksum(value12: string): string {
  const digits = value12.split("").map((d) => parseInt(d, 10));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const n = digits[digits.length - 1 - i];
    sum += n * (i % 2 === 0 ? 3 : 1);
  }
  const mod = sum % 10;
  const check = (10 - mod) % 10;
  return String(check);
}

function ean13ToModules(ean13: string): { isBar: boolean; width: number }[] {
  const L: Record<string, string> = {
    "0": "0001101",
    "1": "0011001",
    "2": "0010011",
    "3": "0111101",
    "4": "0100011",
    "5": "0110001",
    "6": "0101111",
    "7": "0111011",
    "8": "0110111",
    "9": "0001011",
  };
  const G: Record<string, string> = {
    "0": "0100111",
    "1": "0110011",
    "2": "0011011",
    "3": "0100001",
    "4": "0011101",
    "5": "0111001",
    "6": "0000101",
    "7": "0010001",
    "8": "0001001",
    "9": "0010111",
  };
  const R: Record<string, string> = {
    "0": "1110010",
    "1": "1100110",
    "2": "1101100",
    "3": "1000010",
    "4": "1011100",
    "5": "1001110",
    "6": "1010000",
    "7": "1000100",
    "8": "1001000",
    "9": "1110100",
  };
  const parityTable: Record<string, ("L" | "G")[]> = {
    "0": ["L", "L", "L", "L", "L", "L"],
    "1": ["L", "L", "G", "L", "G", "G"],
    "2": ["L", "L", "G", "G", "L", "G"],
    "3": ["L", "L", "G", "G", "G", "L"],
    "4": ["L", "G", "L", "L", "G", "G"],
    "5": ["L", "G", "G", "L", "L", "G"],
    "6": ["L", "G", "G", "G", "L", "L"],
    "7": ["L", "G", "L", "G", "L", "G"],
    "8": ["L", "G", "L", "G", "G", "L"],
    "9": ["L", "G", "G", "L", "G", "L"],
  };

  const d = ean13.split("");
  const first = d[0];
  const left = d.slice(1, 7);
  const right = d.slice(7);
  const parities = parityTable[first];

  const start = "101";
  const middle = "01010";
  const end = "101";

  const leftBits = left
    .map((digit, i) => (parities[i] === "L" ? L[digit] : G[digit]))
    .join("");
  const rightBits = right.map((digit) => R[digit]).join("");
  const bitString = start + leftBits + middle + rightBits + end;

  const modules: { isBar: boolean; width: number }[] = [];
  let currentIsBar = true;
  let run = 0;
  for (let i = 0; i < bitString.length; i++) {
    const bit = bitString[i];
    if (bit === (currentIsBar ? "1" : "0")) {
      run += 1;
    } else {
      modules.push({ isBar: currentIsBar, width: run });
      currentIsBar = !currentIsBar;
      run = 1;
    }
  }
  if (run > 0) modules.push({ isBar: currentIsBar, width: run });
  return modules;
}
