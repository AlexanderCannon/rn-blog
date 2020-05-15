import React, { useContext, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/Context";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Index = ({ navigation }) => {
  const { state, deletePost, getPosts } = useContext(Context);
  useEffect(() => {
    getPosts();
    const listener = navigation.addListener("didFocus", () => {
      getPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        style={styles.list}
        data={state}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deletePost(item.id)}>
                  <Entypo size={20} name="trash" style={styles.bin} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

Index.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Create")}
      style={styles.icon}
    >
      <AntDesign name="pluscircleo" size={30} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  list: { marginTop: 20 },
  icon: { marginRight: 30 },
  bin: { marginRight: 24 },
});

export default Index;
