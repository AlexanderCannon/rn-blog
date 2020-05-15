import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context } from "../context/Context";

const Feed = ({ navigation }) => {
  const { state, getPosts } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) =>
    new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => getPosts().then(() => setRefreshing(false)));
  }, [refreshing]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView>
      {state.length && (
        <FlatList
          style={styles.list}
          data={[...state].reverse()}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => {
            const backgroundColor = `#${Math.floor(
              Math.random() * 16777215
            ).toString(16)}`;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FancyDetail", {
                    id: item.id,
                    backgroundColor,
                  })
                }
              >
                <View
                  style={[
                    styles.row,
                    {
                      backgroundColor,
                    },
                  ]}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.content}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

Feed.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    height: 400,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  list: { marginTop: 20 },
});

export default Feed;
