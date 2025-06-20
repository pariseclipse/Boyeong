import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  const quotes = [
    {
      korean: "난 네가 좋아 💖",
      english: "I like you",
      source: "Crash Landing on You",
    },
    {
      korean: "걱정하지 마. 내가 있잖아 💫",
      english: "Don’t worry. I’m here for you",
      source: "Start-Up",
    },
    {
      korean: "이건 심장 폭행이야! 😍",
      english: "This is heart-attack-level cuteness!",
      source: "True Beauty",
    },
    {
      korean: "날 믿어. 🌟",
      english: "Trust me.",
      source: "Itaewon Class",
    },
    {
      korean: "넌 나한테 완전 빠졌어 💕",
      english: "You’re totally into me!",
      source: "Business Proposal",
    },
    {
      korean: "기적은 스스로 만드는 거야 ✨",
      english: "You create your own miracles.",
      source: "Extraordinary Attorney Woo",
    },
    {
      korean: "난 항상 네 편이야 💌",
      english: "I'm always on your side.",
      source: "Our Beloved Summer",
    },
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dashboardContainer}>
        
        <Image source={require("../assets/images/image.png")} style={styles.logo} />

        <Text style={styles.heading}>Main Dashboard</Text>

        <View style={styles.catQuoteRow}>
          <Image
            source={require("../assets/videos/dancingcat.gif")}
            style={styles.decorativeImage}
          />

          <View style={styles.quoteBubble}>
            <Text style={styles.quoteKorean}>{quote.korean}</Text>
            <Text style={styles.quoteEnglish}>{quote.english}</Text>
            <Text style={styles.quoteSource}>— {quote.source}</Text>
          </View>
        </View>

        <Text style={styles.subheading}>Your personalised Korean K-drama learning experience</Text>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={[styles.tile, styles.purple]} onPress={() => router.push("/learn")}>
            <Text style={styles.tileIcon}>🎬</Text>
            <Text style={styles.tileText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.yellow]} onPress={() => router.push("/practice")}>
            <Text style={styles.tileIcon}>🧠</Text>
            <Text style={styles.tileText}>Flashcards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.purple]} onPress={() => router.push("/quiz")}>
            <Text style={styles.tileIcon}>📝</Text>
            <Text style={styles.tileText}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.yellow]} onPress={() => router.push("/translator")}>
            <Text style={styles.tileIcon}>🌐</Text>
            <Text style={styles.tileText}>Translator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.purple]} onPress={() => router.push("/phrases")}>
            <Text style={styles.tileIcon}>🇰🇷</Text>
            <Text style={styles.tileText}>Phrases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.yellow]} onPress={() => router.push("/hangul")}>
            <Text style={styles.tileIcon}>✍🏻</Text>
            <Text style={styles.tileText}>Hangul</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Boyeong (보영) means brightness and growth! 🌟</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  dashboardContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 280,
    height: 270,
    marginBottom: -60,
    marginTop: -60,
  },
  decorativeImage: {
    width: 180,
    height: 180,
    marginRight: 16,
  },
  catQuoteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  quoteBubble: {
    flex: 1,
    backgroundColor: "#fcdc69",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0.5, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  quoteKorean: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quoteEnglish: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  quoteSource: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
    fontStyle: "italic",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5d67d8",
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    columnGap: 16,
    marginBottom: 0,
    width: "100%",
  },
  tile: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tileIcon: {
    fontSize: 62,
    marginBottom: 15,
    marginTop: 15,
  },
  tileText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  purple: { backgroundColor: "#b8a1fe" },
  blue: { backgroundColor: "#626bd9" },
  yellow: { backgroundColor: "#fcdc69" },
  sky: { backgroundColor: "#b0e2ff" },
  footerText: {
    marginTop: 60,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
});
