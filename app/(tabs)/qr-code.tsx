import React from "react";
import { View, Text } from "react-native";
// import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  const qrValue = `https://drive.google.com/file/d/1wxDq6dquFPgQccGD52ILn5FgtwjEtP7G/view?usp=sharing`;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Scannez pour télécharger l'application
      </Text>
      {/* <QRCode */}
        value={qrValue}
        size={250}
      {/* /> */}
    </View>
  );
}
