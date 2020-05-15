import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/Context";
import { FontAwesome } from "@expo/vector-icons";

const Detail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const backgroundColor = navigation.getParam("backgroundColor");
  const { state } = useContext(Context);
  const post = state.find((post) => post.id === id);

  return (
    <View style={[styles.background, { backgroundColor }]}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
});

export default Detail;
