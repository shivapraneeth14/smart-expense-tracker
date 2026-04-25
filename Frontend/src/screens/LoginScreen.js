import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import API from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigation.navigate("Dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc", justifyContent: "center", padding: 20 }}>
      
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        Welcome Back 👋
      </Text>
      <Text style={{ color: "#555", marginBottom: 30 }}>
        Login to manage your expenses
      </Text>

      <View style={{
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5
      }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#6366f1",
            padding: 15,
            borderRadius: 10,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 20, textAlign: "center", color: "#6366f1" }}
      >
        Create an account
      </Text>

    </View>
  );
}