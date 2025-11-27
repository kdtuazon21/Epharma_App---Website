import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface AuthFormProps {
  userType: string;
  onAuthSuccess: () => void;
}

export default function AuthForm({ userType, onAuthSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const getThemeColor = () => {
    switch (userType) {
      case 'customer': return '#4F46E5';
      case 'merchant': return '#059669';
      case 'driver': return '#DC2626';
      case 'admin': return '#7C2D12';
      default: return '#4F46E5';
    }
  };

  const handleAuth = () => {
    if (!email || !password || (!isLogin && (!name || !phone))) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    // Simulate authentication
    Alert.alert('Success', `${isLogin ? 'Login' : 'Registration'} successful!`, [
      { text: 'OK', onPress: onAuthSuccess }
    ]);
  };

  const themeColor = getThemeColor();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColor }]}>
        {userType.charAt(0).toUpperCase() + userType.slice(1)} {isLogin ? 'Login' : 'Sign Up'}
      </Text>

      {!isLogin && (
        <>
          <TextInput
            style={[styles.input, { borderColor: themeColor }]}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { borderColor: themeColor }]}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </>
      )}

      <TextInput
        style={[styles.input, { borderColor: themeColor }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { borderColor: themeColor }]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColor }]}
        onPress={handleAuth}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={[styles.switchText, { color: themeColor }]}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14
  }
});