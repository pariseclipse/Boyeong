import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { login, register } from '../services/firebase';
import { useRouter } from 'expo-router';

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      router.replace('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/kdrama.gif')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* 🌸 Logo Above Card */}
        <Image
          source={require('../assets/images/image.png')}
          style={styles.logo}
        />
        <View style={styles.card}>
          <Text style={styles.heading}>
            {isRegister ? 'Create a Boyeong Account' : 'Login to Boyeong'}
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authText}>{isRegister ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 20 }}>
            <Text style={styles.toggleText}>
              {isRegister
                ? 'Already have an account? Login instead'
                : "Don't have an account? Sign up here"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: screenHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fbdd68',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  authButton: {
    backgroundColor: '#5d67d8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  authText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    color: '#fbdd68',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -50,
  },  
});
