import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { onAuthStateChange } from "../services/firebase";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Only run if not loading and user is not logged in
    if (isLoggedIn === false && segments[0] !== 'login') {
      router.replace('/login');
    }

    // If logged in and on login page, redirect to index
    if (isLoggedIn && segments[0] === 'login') {
      router.replace('/');
    }
  }, [isLoggedIn, segments]);

  if (isLoggedIn === null) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* wrap everything */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Menu' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="home" options={{ title: 'Dashboard' }} />
          <Stack.Screen name="learn" options={{ title: 'Learn' }} />
          <Stack.Screen name="practice" options={{ title: 'Flashcard' }} />
          <Stack.Screen name="phrases" options={{ title: 'Phrases' }} />
          <Stack.Screen name="hangul" options={{ title: 'Hangul' }} />
          <Stack.Screen name="translator" options={{ title: 'Translator' }} />
          <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
