import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import API from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    console.log("🔵 Register button clicked");
    console.log("📩 Sending data:", { name, email, password });

    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("✅ Register success:", res.data);

      Alert.alert("Success", "User registered");

      navigation.navigate("Login");

    } catch (err) {
      console.log("❌ Register error:", err.response?.data || err.message);

      Alert.alert(
        "Error",
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        Create Account ✨
      </Text>
      <Text style={{ color: "#555", marginBottom: 30 }}>
        Start tracking your expenses easily
      </Text>

      {/* Card */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Name */}
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Button */}
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#6366f1",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text
        onPress={() => navigation.navigate("Login")}
        style={{
          marginTop: 20,
          textAlign: "center",
          color: "#6366f1",
          fontWeight: "500",
        }}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}