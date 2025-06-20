import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { logout } from "../services/firebase";

const screenWidth = Dimensions.get("window").width;

export default function IndexScreen() {
  const router = useRouter();
  const scrollRef = useRef();
  const posters = [
    require("../assets/images/drama1.jpg"),
    require("../assets/images/drama2.jpg"),
    require("../assets/images/drama3.jpg"),
    require("../assets/images/drama4.jpg"),
    require("../assets/images/drama5.jpg"),
    require("../assets/images/drama6.jpg"),
    require("../assets/images/drama7.jpg"),
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: index * screenWidth,
          animated: true,
        });
        index = (index + 1) % posters.length;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* 🎬 Auto-scrolling Banner */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={styles.bannerContainer}
      >
        {posters.map((img, index) => (
          <Image key={index} source={img} style={styles.bannerImage} />
        ))}
      </ScrollView>

      {/* 🐥 Logo */}
      <Text style={styles.heading}></Text>
      <Image source={require("../assets/images/image.png")} style={styles.logo} />
      <Text style={styles.subheading}>
      Your K-Drama Journey to Learning Korean 
      </Text>

      {/* 🌸 Navigation */}
      <Link href="/home" style={styles.linkButton}>
        <View style={styles.buttonRow}>
          <Text style={styles.linkButtonText}>Go to Dashboard</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </Link>

      <Link href="/learn" style={[styles.linkButton, styles.secondaryButton]}>
        <View style={styles.buttonRow}>
          <Text style={styles.secondaryButtonText}>Start Learning</Text>
          <Text style={styles.arrowDark}>›</Text>
        </View>
      </Link>

      <TouchableOpacity onPress={handleLogout} style={[styles.linkButton, styles.logoutButton]}>
        <View style={styles.buttonRow}>
          <Text style={styles.linkButtonText}>Logout</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.footerText}> Let's make learning fun and easy with Boyeong! 🌟</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  bannerContainer: {
    width: "100%",
    height: 620,
    paddingLeft: 16, 
  },
  bannerImage: {
    width: 300, // slightly smaller 
    height: 400,
    resizeMode: "cover",
    borderRadius: 12,
    marginRight: 12, // space between images
  },
  logo: {
    width: 280,
    height: 140,
    marginTop: -50, // pulls logo closer to banner
    marginBottom: -20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  linkButton: {
    backgroundColor: "#A78BFA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#fee06e",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#5d67d8",
  },
  footerText: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  linkButton: {
    backgroundColor: "#A78BFA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
    position: "relative",
  },
  
  buttonRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  arrow: {
    position: "absolute",
    right: 0,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    paddingRight: 10,
  },
  
  arrowDark: {
    position: "absolute",
    right: 0,
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    paddingRight: 10,
  },
  
  
});
