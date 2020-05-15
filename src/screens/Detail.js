import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/Context";
import { Entypo } from "@expo/vector-icons";

const Detail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state } = useContext(Context);
  const post = state.find((post) => post.id === id);

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
};

Detail.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <Entypo name="pencil" size={30} style={styles.icon} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  icon: { marginRight: 30 },
});

export default Detail;
