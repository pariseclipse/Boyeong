import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { useRouter } from "expo-router";

// this is the list of basic consonants
const consonants = [
  { char: "ㄱ", romanized: "g/k" }, { char: "ㄲ", romanized: "kk" },
  { char: "ㄴ", romanized: "n" }, { char: "ㄷ", romanized: "d/t" },
  { char: "ㄸ", romanized: "tt" }, { char: "ㄹ", romanized: "r/l" },
  { char: "ㅁ", romanized: "m" }, { char: "ㅂ", romanized: "b/p" },
  { char: "ㅃ", romanized: "pp" }, { char: "ㅅ", romanized: "s" },
  { char: "ㅆ", romanized: "ss" }, { char: "ㅇ", romanized: "ng" },
  { char: "ㅈ", romanized: "j" }, { char: "ㅉ", romanized: "jj" },
  { char: "ㅊ", romanized: "ch" }, { char: "ㅋ", romanized: "k" },
  { char: "ㅌ", romanized: "t" }, { char: "ㅍ", romanized: "p" },
  { char: "ㅎ", romanized: "h" },
];

// this is the list of simple vowels
const vowels = [
  { char: "ㅏ", romanized: "a" }, { char: "ㅑ", romanized: "ya" },
  { char: "ㅓ", romanized: "eo" }, { char: "ㅕ", romanized: "yeo" },
  { char: "ㅗ", romanized: "o" }, { char: "ㅙ", romanized: "yo" },
  { char: "ㅛ", romanized: "u" }, { char: "ㅝ", romanized: "yu" },
  { char: "ㅟ", romanized: "eu" }, { char: "ㅣ", romanized: "i" },
];

// this is the list of complex vowels (a mix of two vowels)
const complexVowels = [
  { char: "ㅐ", romanized: "ae" }, { char: "ㅒ", romanized: "yae" },
  { char: "ㅔ", romanized: "e" }, { char: "ㅖ", romanized: "ye" },
  { char: "ㅘ", romanized: "wa" }, { char: "ㅚ", romanized: "wae" },
  { char: "ㅜ", romanized: "oe" }, { char: "ㅞ", romanized: "wo" },
  { char: "ㅠ", romanized: "we" }, { char: "ㅡ", romanized: "wi" },
  { char: "ㅢ", romanized: "ui" },
];

const HangulScreen = () => {
  const ref = useRef(); // reference to the signature pad
  const [isDrawing, setIsDrawing] = useState(false); // to prevent scroll while writing

  return (
    <ScrollView
      style={styles.container}
      scrollEnabled={!isDrawing}
      keyboardShouldPersistTaps="handled"
    >
      {/* title text */}
      <Text style={styles.header}>practice writing hangul 🌟</Text>

      {/* section: consonants */}
      <Text style={styles.subHeader}>consonants</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {consonants.map((item, index) => (
          <View key={index} style={styles.letterCard}>
            <Text style={styles.hangul}>{item.char}</Text>
            <Text style={styles.romanized}>{item.romanized}</Text>
          </View>
        ))}
      </ScrollView>

      {/* section: vowels */}
      <Text style={styles.subHeader}>vowels</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {vowels.map((item, index) => (
          <View key={index} style={styles.letterCard}>
            <Text style={styles.hangul}>{item.char}</Text>
            <Text style={styles.romanized}>{item.romanized}</Text>
          </View>
        ))}
      </ScrollView>

      {/* section: complex vowels */}
      <Text style={styles.subHeader}>complex vowels</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {complexVowels.map((item, index) => (
          <View key={index} style={styles.letterCard}>
            <Text style={styles.hangul}>{item.char}</Text>
            <Text style={styles.romanized}>{item.romanized}</Text>
          </View>
        ))}
      </ScrollView>

      {/* canvas area */}
      <Text style={styles.subHeader}>practice here! 🖍️</Text>
      <View style={styles.canvasBox}>
        <SignatureScreen
          ref={ref}
          onBegin={() => setIsDrawing(true)} // lock scroll when writing
          onEnd={() => setIsDrawing(false)}
          onOK={() => setIsDrawing(false)}
          minWidth={4}
          maxWidth={4}
          penColor="#000000"
          webStyle={`.m-signature-pad--footer { display: none; }`} // hides bottom bar
        />
      </View>

      {/* clear button */}
      <TouchableOpacity
        onPress={() => ref.current?.clearSignature()}
        style={styles.clearButton}
      >
        <Text style={styles.clearButtonText}>clear</Text>
      </TouchableOpacity>

      {/* space at bottom */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// all styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  subHeader: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },  
  letterCard: {
    backgroundColor: "#fce4ec",
    borderRadius: 10,
    padding: 12,
    margin: 6,
    alignItems: "center",
    width: 80,
  },
  hangul: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  romanized: { fontSize: 14, color: "#555" },
  canvasBox: {
    height: 300,
    width: "100%",
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  clearButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#ffb6c1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  clearButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});

export default HangulScreen;
