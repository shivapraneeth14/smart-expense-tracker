import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import API from "../services/api";

export default function DashboardScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchExpenses();
    });

    return unsubscribe;
  }, [navigation]);

  // Total Expense
  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Category Summary
  const getCategorySummary = () => {
    const summary = {};
    expenses.forEach((item) => {
      if (summary[item.category]) {
        summary[item.category] += item.amount;
      } else {
        summary[item.category] = item.amount;
      }
    });
    return summary;
  };

  const categorySummary = getCategorySummary();

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc", padding: 20 }}>

      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>
        Dashboard 💰
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Manage your expenses efficiently
      </Text>

      {/* Total Expense Card */}
      <View
        style={{
          backgroundColor: "#6366f1",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 14 }}>
          Total Expense
        </Text>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
          ₹{totalExpense}
        </Text>
      </View>

      {/* Add Expense Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddExpense")}
        style={{
          backgroundColor: "#4f46e5",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          + Add Expense
        </Text>
      </TouchableOpacity>

      {/* Category Summary */}
      {expenses.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Category Summary
          </Text>

          {Object.keys(categorySummary).map((key) => (
            <View
              key={key}
              style={{
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 10,
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                elevation: 2,
              }}
            >
              <Text>{key}</Text>
              <Text style={{ fontWeight: "bold" }}>
                ₹{categorySummary[key]}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Expense List */}
      {expenses.length === 0 ? (
        <Text style={{ marginTop: 30, textAlign: "center", color: "#777" }}>
          No expenses yet
        </Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 12,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                elevation: 3,
              }}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.category}
                </Text>
                <Text style={{ color: "#777" }}>
                  {item.date?.split("T")[0]}
                </Text>
                {item.note ? (
                  <Text style={{ color: "#999", fontSize: 12 }}>
                    {item.note}
                  </Text>
                ) : null}
              </View>

              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                ₹{item.amount}
              </Text>
            </View>
          )}
        />
      )}

    </View>
  );
}