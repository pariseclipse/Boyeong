import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

const phrasesData = {
    "💬 Greetings": [
      { korean: "안녕하세요", romanized: "annyeonghaseyo", english: "Hello" },
      { korean: "감사합니다", romanized: "gamsahamnida", english: "Thank you" },
      { korean: "잘 지냈어요?", romanized: "jal jinaesseoyo?", english: "How have you been?" },
      { korean: "안녕히 가세요", romanized: "annyeonghi gaseyo", english: "Goodbye (to someone leaving)" },
      { korean: "안녕히 계세요", romanized: "annyeonghi gyeseyo", english: "Goodbye (to someone staying)" },
      { korean: "오랜만이에요", romanized: "oraenmanieyo", english: "Long time no see" },
      { korean: "미안합니다", romanized: "mianhamnida", english: "I’m sorry" },
      { korean: "실례합니다", romanized: "sillyehamnida", english: "Excuse me" },
      { korean: "천만에요", romanized: "cheonmaneyo", english: "You're welcome" },
      { korean: "이름이 뭐예요?", romanized: "ireumi mwoyeyo?", english: "What’s your name?" },
    ],
  
    "🍚 At a Restaurant": [
      { korean: "이거 주세요", romanized: "igeo juseyo", english: "Please give me this" },
      { korean: "맛있어요", romanized: "masisseoyo", english: "It’s delicious" },
      { korean: "계산서 주세요", romanized: "gyesanseo juseyo", english: "The bill, please" },
      { korean: "물 좀 주세요", romanized: "mul jom juseyo", english: "Please give me some water" },
      { korean: "추천해주세요", romanized: "chucheonhaejuseyo", english: "Please recommend something" },
      { korean: "덜 맵게 해주세요", romanized: "deol maepge haejuseyo", english: "Please make it less spicy" },
      { korean: "포장해 주세요", romanized: "pojanghae juseyo", english: "Please pack it (to go)" },
      { korean: "채식주의자예요", romanized: "chaesikjuuijayeyo", english: "I’m a vegetarian" },
      { korean: "맛이 어때요?", romanized: "masi eottaeyo?", english: "How does it taste?" },
      { korean: "이거 뭐예요?", romanized: "igeo mwoyeyo?", english: "What is this?" },
    ],
  
    "🚖 Getting Around": [
      { korean: "어디예요?", romanized: "eodiyeyo?", english: "Where is it?" },
      { korean: "왼쪽", romanized: "oenjjok", english: "Left" },
      { korean: "오른쪽", romanized: "oreunjjok", english: "Right" },
      { korean: "곧장 가 주세요", romanized: "gotjang ga juseyo", english: "Please go straight" },
      { korean: "여기 세워 주세요", romanized: "yeogi sewo juseyo", english: "Please stop here" },
      { korean: "얼마예요?", romanized: "eolmayeyo?", english: "How much is it?" },
      { korean: "버스 정류장이 어디예요?", romanized: "beoseu jeongryujangi eodiyeyo?", english: "Where is the bus stop?" },
      { korean: "이 지하철은 어디로 가요?", romanized: "i jihacheoreun eodiro gayo?", english: "Where does this subway go?" },
      { korean: "택시 불러 주세요", romanized: "taegsi bulleo juseyo", english: "Please call a taxi" },
      { korean: "지도를 보여 주세요", romanized: "jido-reul boyeo juseyo", english: "Please show me a map" },
    ],
  
    "🏠 Daily Life": [
      { korean: "좋은 아침이에요", romanized: "joeun achimieyo", english: "Good morning" },
      { korean: "잘 자요", romanized: "jal jayo", english: "Good night" },
      { korean: "조심하세요", romanized: "josimhaseyo", english: "Be careful" },
      { korean: "괜찮아요", romanized: "gwaenchanayo", english: "It’s okay" },
      { korean: "알겠어요", romanized: "algesseoyo", english: "I understand" },
      { korean: "모르겠어요", romanized: "moreugesseoyo", english: "I don’t understand" },
      { korean: "좋아요", romanized: "joayo", english: "It’s good" },
      { korean: "싫어요", romanized: "sileoyo", english: "I don’t like it" },
      { korean: "피곤해요", romanized: "pigonhaeyo", english: "I’m tired" },
      { korean: "재밌어요", romanized: "jaemisseoyo", english: "It’s fun" },
    ],
    
    "🎬 K-Drama Phrases": [
    { korean: "너무 보고 싶었어", romanized: "neomu bogo sipeosseo", english: "I missed you so much" },
    { korean: "사랑해", romanized: "saranghae", english: "I love you" },
    { korean: "가지 마", romanized: "gaji ma", english: "Don’t go" },
    { korean: "왜 이렇게 늦었어?", romanized: "wae ireoke neujeosseo?", english: "Why are you so late?" },
    { korean: "진짜야?", romanized: "jinjjaya?", english: "Are you serious?" },
    { korean: "넌 특별해", romanized: "neon teukbyeolhae", english: "You’re special" },
    { korean: "믿을 수 없어", romanized: "mideul su eopseo", english: "I can’t believe it" },
    { korean: "행복했으면 좋겠어", romanized: "haengbokhaesseumyeon jokesseo", english: "I hope you’re happy" },
    { korean: "왜 나한텐 이렇게 해?", romanized: "wae nahanten ireoke hae?", english: "Why are you treating me like this?" },
    { korean: "끝났어", romanized: "kkeutnasseo", english: "It’s over" }
  ]
  };

const PhrasesScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("💬 Greetings");

  const renderPhrase = ({ item }) => (
    <View style={styles.phraseCard}>
      <Text style={styles.korean}>{item.korean}</Text>
      <Text style={styles.romanized}>{item.romanized}</Text>
      <Text style={styles.english}>{item.english}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📘 Learn Simple Korean Phrases</Text>

      {/* 🔖 Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {Object.keys(phrasesData).map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 📝 Phrases List */}
      <FlatList
        data={phrasesData[selectedCategory]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPhrase}
        style={styles.phraseList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  categoryBar: { marginBottom: 12 },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: { backgroundColor: "#ffb6c1" },
  categoryText: { fontSize: 14, fontWeight: "bold" },
  phraseList: { marginTop: 8 },
  phraseCard: {
    backgroundColor: "#fff5f8",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ffe4ec",
  },
  korean: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  romanized: { fontSize: 14, color: "#888" },
  english: { fontSize: 16, color: "#444" },
});

export default PhrasesScreen;
