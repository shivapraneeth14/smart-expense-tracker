import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../services/api";

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [note, setNote] = useState("");

  const handleAdd = async () => {
    console.log("Button clicked");

    // ✅ Validation
    if (!amount || !category) {
      Alert.alert("Error", "Amount and category are required");
      return;
    }

    if (isNaN(amount)) {
      Alert.alert("Error", "Amount must be a number");
      return;
    }

    try {
      await API.post("/expenses", {
        amount: Number(amount),
        category,
        date,
        note,
      });

      Alert.alert("Success", "Expense added");
      navigation.goBack();

    } catch (err) {
      console.log("API error", err.response?.data || err.message);
      Alert.alert("Error", "Failed to add expense");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
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
        Add Expense 💸
      </Text>
      <Text style={{ color: "#555", marginBottom: 30 }}>
        Track your spending easily
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
        {/* Amount */}
        <TextInput
          placeholder="Amount (₹)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Category */}
        <TextInput
          placeholder="Category (Food, Travel...)"
          value={category}
          onChangeText={setCategory}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        >
          <Text>
            {date.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Note */}
        <TextInput
          placeholder="Note (optional)"
          value={note}
          onChangeText={setNote}
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />

        {/* Button */}
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: "#6366f1",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Save Expense
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}