import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/Context";
import PostForm from "../components/PostForm";

const Create = ({ navigation }) => {
  const { addPost } = useContext(Context);
  return (
    <>
      <PostForm
        onSubmit={(title, content) => {
          addPost(title, content, () => {
            navigation.navigate("Index");
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Create;
