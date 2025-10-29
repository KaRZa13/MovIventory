import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  const qrValue = "Bonjour";

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <QRCode value={qrValue} size={250} />
      </View>

      <View
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 24,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: "100%",
            backgroundColor: "#8B0000",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
            Télécharger
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
