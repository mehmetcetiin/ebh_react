import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [buttonOpacity] = useState(new Animated.Value(1));
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      if (isLogin) {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password
        });
        setUserData(response.data);
      } else {
        // Handle registration
      }
    } catch (error) {
      setError(error.message);
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataText}>Hoşgeldiniz, {userData.username}!</Text>
          <Text style={styles.userDataText}>Mailiniz: {userData.email}</Text>
          <Text style={styles.userDataText}>Kullanıcı İdniz: {userData.id}</Text>
          <Text style={styles.userDataText}>Cinsiyet: {userData.gender}</Text>
          <Text style={styles.userDataText}>Fotoğraf: {userData.image}</Text>
          <Text style={styles.userDataText}>Token: {userData.token}</Text>
        </View>
      ) : (
        <View style={styles.authContainer}>
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adınız"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifreniz"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Animated.View style={{ opacity: buttonOpacity }}>
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <Text style={styles.buttonText}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>{isLogin ? 'Kayıt Ol' : 'Giriş Yap'}</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    alignItems: 'center',
  },
  userDataContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#16247d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    marginTop: 10,
    color: '#16247d',
    textDecorationLine: 'underline',
  },
  userDataText: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
