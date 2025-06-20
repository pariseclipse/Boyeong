// PracticeScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function PracticeScreen() {
  const [flashcards, setFlashcards] = useState([]);
  const [originalFlashcards, setOriginalFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const flipRotation = useRef(0);

  useEffect(() => {
    const fetchSavedWords = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "savedWords"));
      const words = querySnapshot.docs.map((doc) => doc.data());
      setFlashcards(words);
      setOriginalFlashcards(words);
      setLoading(false);
    };

    fetchSavedWords();
  }, []);

  useEffect(() => {
    flipAnim.addListener(({ value }) => {
      flipRotation.current = value;
    });
    return () => flipAnim.removeAllListeners();
  }, [flipAnim]);

  const flipCard = () => {
    const toValue = showAnswer ? 0 : 180;
    Animated.timing(flipAnim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(() => setShowAnswer(!showAnswer));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
    flipAnim.setValue(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
    flipAnim.setValue(0);
  };

  const currentCard = flashcards.length > 0 ? flashcards[currentIndex % flashcards.length] : null;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontStyle = {
    transform: [{ rotateY: frontInterpolate }],
    ...styles.cardFront,
  };
  const backStyle = {
    transform: [{ rotateY: backInterpolate }],
    ...styles.cardBack,
    position: 'absolute',
    top: 0,
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Saved Flashcards 📒</Text>
        <Text style={styles.loadingText}>Loading cards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Flashcard 📒</Text>

      {currentCard ? (
        <View style={styles.cardWrapper}>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View>
              <Animated.View style={frontStyle}>
                <Text style={styles.cardText}>{currentCard.word}</Text>
              </Animated.View>
              <Animated.View style={backStyle}>
                <Text style={styles.cardText}>{currentCard.translation}</Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <Text style={styles.loadingText}>No flashcards saved yet 😢</Text>
      )}

      {currentCard && (
        <>
          <Text style={styles.progress}>{currentIndex + 1} / {flashcards.length}</Text>
          <View style={styles.arrowRow}>
            <TouchableOpacity onPress={goToPrevious}>
              <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNext}>
              <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.tip}>💡 Tap the card to flip</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardWrapper: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80, // shifted lower
  },
  cardFront: {
    width: 340,
    height: 240,
    backgroundColor: "#FFE4B5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardBack: {
    width: 340,
    height: 240,
    backgroundColor: "#FFDDEB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
  progress: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    marginBottom: 10,
  },
  arrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginBottom: 20,
  },
  arrow: {
    fontSize: 32,
    color: "#444",
  },
  tip: {
    fontSize: 13,
    color: "#aaa",
  },
});
