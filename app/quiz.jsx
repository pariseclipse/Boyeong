import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getSavedWords } from "../services/firebase";

const QuizScreen = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [choices, setChoices] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [quizMode, setQuizMode] = useState("match");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const fetchWords = async () => {
    setLoading(true);
    try {
      const saved = await getSavedWords();
      if (!saved.length) throw new Error("No saved words.");
      setWords(saved);
      generateQuestion(saved);
    } catch (e) {
      alert("Failed to load words from Firestore.");
    } finally {
      setLoading(false);
    }
  };

  const generateQuestion = (wordList) => {
    const correct = wordList[Math.floor(Math.random() * wordList.length)];
    const otherChoices = wordList.filter((w) => w.word !== correct.word);
    const shuffled = [...otherChoices.sort(() => 0.5 - Math.random()).slice(0, 3), correct].sort(() => 0.5 - Math.random());

    setCurrentWord(correct);
    setChoices(shuffled);
    setAnswerStatus(null);
    setShowLearningCard(false);
    slideAnim.setValue(0);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleAnswer = (choice) => {
    const isCorrect = choice.translation === currentWord.translation;
    setAnswerStatus(isCorrect ? "correct" : "wrong");
    setShowLearningCard(true);

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const slideUp = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
    opacity: slideAnim,
  };

  if (loading || !currentWord) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#ff69b4" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.modeToggle}>
        <Text style={styles.modeLabel}>Mode:</Text>
        {["match", "multiple", "type"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeBtn,
              quizMode === mode && styles.modeBtnActive
            ]}
            onPress={() => setQuizMode(mode)}
          >
            <Text style={styles.modeText}>{mode}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {quizMode === "match" && (
  <>
    <Text style={styles.title}>Match the correct meaning</Text>
    <Text style={styles.translationLabel}>KOREAN</Text>
    <Text style={styles.translation}>{currentWord.word}</Text>

    <View style={styles.choiceContainer}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.choiceBtn,
            answerStatus &&
              (choice.translation === currentWord.translation
                ? styles.correct
                : styles.incorrect),
          ]}
          onPress={() => handleAnswer(choice)}
          disabled={!!answerStatus}
        >
          <Text style={styles.choiceText}>{choice.translation}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
)}

{quizMode === "multiple" && (
  <>
    <Text style={styles.title}>Choose the right word</Text>
    <Text style={styles.translationLabel}>ENGLISH</Text>
    <Text style={styles.translation}>{currentWord.translation}</Text>

    <View style={styles.choiceContainer}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.choiceBtn,
            answerStatus &&
              (choice.word === currentWord.word
                ? styles.correct
                : styles.incorrect),
          ]}
          onPress={() => handleAnswer(choice)}
          disabled={!!answerStatus}
        >
          <Text style={styles.choiceText}>{choice.word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
)}

{quizMode === "type" && (
  <>
    <Text style={styles.title}>Type the correct meaning</Text>
    <Text style={styles.translationLabel}>KOREAN</Text>
    <Text style={styles.translation}>{currentWord.word}</Text>

    <Text style={{ color: "#999", marginTop: 20 }}>💡 (Type input coming soon!)</Text>
  </>
)}


      {/* 🎉 Cat Reaction */}
      {answerStatus && (
        <Image
          source={
            answerStatus === "correct"
              ? require("../assets/videos/dancingcat.gif")
              : require("../assets/videos/cryingcat.gif")
          }
          style={styles.catReaction}
        />
      )}

      {showLearningCard && (
        <Animated.View style={[styles.learningCard, slideUp]}>
          <Text style={styles.learningTitle}>{currentWord.word}</Text>
          <Text style={styles.learningDetail}>Translation: {currentWord.translation}</Text>
          {currentWord.romanized && (
            <Text style={styles.learningDetail}>Romanization: {currentWord.romanized}</Text>
          )}
          <TouchableOpacity style={styles.nextBtn} onPress={() => generateQuestion(words)}>
            <Text style={styles.nextText}>Next ▶</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 10, textAlign: "center" },
  translationLabel: { textAlign: "center", color: "#888", marginTop: 20 },
  translation: { textAlign: "center", fontSize: 24, color: "#007bff", marginBottom: 30 },
  choiceContainer: { flexWrap: "wrap", flexDirection: "row", justifyContent: "center", gap: 12 },
  choiceBtn: {
    backgroundColor: "#f0f8ff",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    margin: 6,
    minWidth: 140,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d0e2ff",
  },
  correct: { backgroundColor: "#a8e6a1", borderColor: "#3bb273" },
  incorrect: { backgroundColor: "#f8b4b4", borderColor: "#e74c3c" },
  choiceText: { fontSize: 16, fontWeight: "500" },
  learningCard: {
    marginTop: 30,
    backgroundColor: "#f4f4f4",
    padding: 20,
    borderRadius: 14,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  learningTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  learningDetail: { fontSize: 16, color: "#555", marginBottom: 6 },
  nextBtn: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  nextText: { color: "white", fontWeight: "bold", fontSize: 16 },
  catReaction: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginTop: 10,
  },
  modeToggle: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  modeLabel: {
    fontWeight: "bold",
    fontSize: 14,
  },
  modeBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modeBtnActive: {
    backgroundColor: "#b8a1fe",
    borderColor: "#8f6ff1",
  },
  modeText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QuizScreen;
