import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const TranslatorScreen = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("ko-en"); // "ko-en" or "en-ko"

  const mockDictionary = {
    "안녕하세요": "Hello",
    "감사합니다": "Thank you",
    "사랑해요": "I love you",
    "배고파요": "I'm hungry",
    "잘 자요": "Good night",
    "hello": "안녕하세요",
    "thank you": "감사합니다",
    "i love you": "사랑해요",
    "i'm hungry": "배고파요",
    "good night": "잘 자요",
  };
  
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTranslatedText("");
  
    setTimeout(() => {
      const key = inputText.trim().toLowerCase();
      const result = mockDictionary[key];
      setTranslatedText(result ? result : "❌ No translation found.");
      setLoading(false);
    }, 800); // simulate delay
  };

  const swapLanguage = () => {
    setDirection((prev) => (prev === "ko-en" ? "en-ko" : "ko-en"));
    setInputText("");
    setTranslatedText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Translator</Text>

      <TouchableOpacity onPress={swapLanguage} style={styles.languageSwitch}>
        <Text style={styles.switchText}>
          {direction === "ko-en" ? "Korean ➡ English" : "English ➡ Korean"} 🔄
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder={
          direction === "ko-en" ? "Translate Korean to English..." : "Translate English to Korean..."
        }
        value={inputText}
        onChangeText={setInputText}
        multiline
      />

      <TouchableOpacity style={styles.translateBtn} onPress={handleTranslate}>
        <Text style={styles.btnText}>Translate✨</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#ff69b4" style={{ marginTop: 20 }} />
      ) : (
        translatedText !== "" && (
          <View style={styles.outputBox}>
            <Text style={styles.resultText}>{translatedText}</Text>
          </View>
        )
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  translateBtn: {
    marginTop: 16,
    backgroundColor: "#ff69b4",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  outputBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  languageSwitch: {
    alignSelf: "center",
    marginBottom: 16,
  },
  switchText: {
    fontSize: 14,
    color: "#555",
  },
});

export default TranslatorScreen;
