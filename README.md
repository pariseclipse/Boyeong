# 🌸 Boyeong — Learn Korean through K-Dramas

*A Final Year Project by Paris Le*

Boyeong is an interactive Korean language learning app that helps users improve their vocabulary, comprehension, and pronunciation using short, real-life K-drama scenes. Designed with language immersion in mind, Boyeong makes studying feel fun, engaging, and culturally enriching.

## 📱 Features

* 🎬 **Learn from K-Drama Clips** – 3-second video scenes with subtitles, English translations, and root word extraction.
* 🧠 **Spaced Repetition & Flashcards** – Save new words and review them in a swipeable flashcard interface.
* 🎤 **Pronunciation Practice** – Integrated speech recognition lets users practice and refine speaking skills.
* ✏️ **Hangul Drawing Practice** – Trace consonants and vowels directly in-app to master Korean writing.
* 🧩 **Multiple Quiz Modes** – Reinforce learning through match-pairs, multiple-choice, tap-to-reveal, and sentence rebuilding.
* 💬 **K-Drama Phrasebook** – Learn trendy Korean expressions and phrases from your favorite shows.
* 🐱 **Gamified Learning with Cute Cat Mascot** – Motivation through visual feedback (dancing/cute cat animations).


## 📸 Screenshots

A visual preview of Boyeong’s core features and UI design:

---

### 🔐 Login / Sign-up Screen

Users can register or log in to access personalized progress tracking and saved vocabulary. 
<img src="assets/images/login.jpeg" width="300"/>

---

### 🏠 Main Menu

Central navigation screen to access all learning features including quizzes, flashcards, Hangul writing, and phrases. 

<img src="assets/images/main.jpeg" width="300"/>

---

### 🐱 Dashboard with Cat Animation & Daily Quotes

Features a motivational cat mascot and daily K-drama quote with translation for inspiration. 
<img src="assets/images/dashboard.jpeg" width="300"/>

---

### 🎬 K-Drama Clip Learning Screen

Learn Korean through 3-second K-drama scenes with clickable subtitles, English translations, and vocabulary extraction to make learning feel immersive and fun. 
<img src="assets/images/clip1.jpeg" width="250"/> 
<br/> 
<img src="assets/images/clip2.jpeg" width="250"/>

---

### 🧠 Flashcard Practice Screen

A swipe-based flashcard system using spaced repetition to help review and retain saved vocabulary. 
<img src="assets/images/flashcard1.jpeg" width="300"/>
<br/>
<img src="assets/images/flashcard2.jpeg" width="300"/>


---

### 🧩 Quiz Screen

Interactive quizzes including multiple choice, sentence building, and match pairs to reinforce learning. 
<img src="assets/images/quiz1.jpeg" width="300"/>
<img src="assets/images/quiz2.jpeg" width="300"/>


---

### ✍️ Hangul Practice Screen

Users can trace and practice Korean letters on a drawing pad, including both basic and complex characters. 
<img src="assets/images/hangul.jpeg" width="300"/>

---

### 💬 Phrase Library Screen

Browse trendy Korean expressions and popular drama phrases with pronunciation and English meanings. 
<img src="assets/images/phrases.jpeg" width="300"/>

---

### 🌐 Translation Screen

Explore breakdowns of sentences from drama clips with root words, grammatical structures, and translations. 
<img src="assets/images/translator.jpeg" width="300"/>

---



## ⚙️ Tech Stack

* **Frontend**: React Native (Expo)
* **Backend**: Firebase (Authentication, Firestore, Storage)
* **Speech Recognition**: Expo Speech, Web Speech API
* **Video Playback**: Expo AV
* **Drawing Canvas**: react-native-signature-canvas

## 📂 Project Structure

```bash
Boyeong/
├── assets/                # Video clips, images, and audio
├── components/            # Reusable UI components
├── screens/               # Main app screens (Learn, Practice, Dashboard, etc.)
├── services/              # Firebase setup and utility functions
├── utils/                 # Helper functions (e.g., saveWordToFirebase)
├── App.js                 # Entry point
```

## 🚀 Getting Started

To run the project locally:

```bash
git clone https://github.com/yourusername/boyeong.git
cd boyeong
npm install
npx expo start
```

Make sure to add your Firebase config in `/services/firebase.jsx`.

## 🛠️ Future Plans

* Add spaced repetition logic with custom learning intervals
* Integrate voice acting or tone correction feedback
* Publish to App Store / Play Store
* Add community features for user-shared phrases and scenes

## 🧑‍🎓 About the Creator

I’m Paris Le, a final-year Computer Science student at TU Dublin, passionate about Korean culture, language learning, and educational technology. Boyeong was inspired by my own journey studying abroad in Korea and my love for dramas as a learning tool.

Connect with me:
🌐 [linkedin](https://www.linkedin.com/in/paristrinhle/) | 📧 [parisletrinh@gmail.com](mailto:paristrinhle@gmail.com)
