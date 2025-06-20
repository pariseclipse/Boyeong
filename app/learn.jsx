import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { getFirestore, doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

const LearnScreen = () => {
  const router = useRouter();
  const { sceneId = "businessproposal_01" } = useLocalSearchParams();
  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);

  // define all ordered clips
  const sceneOrder = [
    "businessproposal_01",
    "businessproposal_02",
    "businessproposal_03",
    "businessproposal_04"
  ];

  const nextClipId = {
    businessproposal_01: "businessproposal_02",
    businessproposal_02: "businessproposal_03",
    businessproposal_03: "businessproposal_04",
  };

  useEffect(() => {
    const fetchClip = async () => {
      setLoading(true);
      setClip(null);
      try {
        const db = getFirestore();
        const docRef = doc(db, "clips", sceneId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setClip(docSnap.data());
        } else {
          console.warn("No clip found for:", sceneId);
        }
      } catch (error) {
        console.error("Error fetching clip:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClip();
  }, [sceneId]);

  const handleSaveWord = async (word, translation) => {
    try {
      const db = getFirestore();
      const existingQuery = await getDocs(collection(db, "savedWords"));
      const alreadyExists = existingQuery.docs.some(doc => {
        const data = doc.data();
        return data.word === word && data.translation === translation;
      });

      if (alreadyExists) {
        Alert.alert("⚠️ Already saved!", `"${word}" is already in Practice.`);
        return;
      }

      await addDoc(collection(db, "savedWords"), {
        word,
        translation,
        sceneName: clip.sceneName || "",
      });

      Alert.alert("✅ Saved to Practice!", `${word} - ${translation}`);
    } catch (error) {
      console.error("Error saving word:", error);
      Alert.alert("❌ Error", "Could not save the word.");
    }
  };

  if (loading || !clip) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4c8bf5" />;
  }

  const currentIndex = sceneOrder.indexOf(sceneId);
  const prevId = sceneOrder[currentIndex - 1];
  const nextId = nextClipId[sceneId];

  const embedUrl = clip.videoUrl.includes("/e/")
    ? `${clip.videoUrl}?autoplay=1`
    : clip.videoUrl.replace("streamable.com/", "streamable.com/e/") + "?autoplay=1";

  return (
    <View key={sceneId} style={styles.container}>
      <Text style={styles.episodeTitle}>{clip.sceneName}</Text>

      <WebView
        source={{ uri: embedUrl }}
        style={styles.video}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
      />

      <View style={styles.subtitleBox}>
        <Text style={styles.romanized}>{clip.romanized}</Text>
        <Text style={styles.korean}>{clip.korean}</Text>
        <Text style={styles.english}>{clip.english || "⚠️ No translation available"}</Text>
      </View>

      <Text style={styles.rootCaption}>
        💡 Each word has a root form. Tap "+ Practice" to save it for review!
      </Text>

      {clip.words && clip.words.map((word, index) => (
        <View key={index} style={styles.wordRow}>
          <Text style={styles.wordText}>{word.word}</Text>
          <TouchableOpacity onPress={() => handleSaveWord(word.root, word.translation)}>
            <Text style={styles.rootLabel}>+ Practice</Text>
          </TouchableOpacity>
          <Text style={styles.rootText}>{word.root}</Text>
          <Text style={styles.translation}>{word.translation}</Text>
        </View>
      ))}

      <View style={styles.buttonRow}>
        {prevId && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => router.replace(`/learn?sceneId=${prevId}`)}
          >
            <Text style={styles.buttonText}>◀ Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (nextId) {
              router.replace(`/learn?sceneId=${nextId}`);
            } else {
              Alert.alert("🎉 Great job!", "You finished all clips!");
            }
          }}
        >
          <Text style={styles.buttonText}>Next ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  episodeTitle: { fontSize: 18, fontWeight: "bold", color: "#4c8bf5", marginBottom: 8, textAlign: "center" },
  sceneTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  video: { width: "100%", height: 220, borderRadius: 10, marginBottom: 16 },
  subtitleBox: { alignItems: "center", marginBottom: 16 },
  romanized: { fontSize: 16, color: "#555" },
  korean: { fontSize: 20, fontWeight: "bold", marginVertical: 4 },
  english: { fontSize: 16, fontStyle: "italic", color: "#666" },
  rootCaption: {
    fontSize: 14,
    color: "#4c8bf5",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  wordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  wordText: { fontSize: 16, flex: 1 },
  rootLabel: {
    fontSize: 12,
    backgroundColor: "#ffa726",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginHorizontal: 4,
    color: "#fff",
  },
  rootText: { fontSize: 16, fontWeight: "bold", flex: 1 },
  translation: { fontSize: 16, color: "#444", flex: 2, textAlign: "right" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4c8bf5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#ccc",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default LearnScreen;
