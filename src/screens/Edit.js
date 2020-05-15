import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/Context";
import PostForm from "../components/PostForm";

const Edit = ({ navigation }) => {
  const { state, editPost } = useContext(Context);
  const id = navigation.getParam("id");
  const { title, content } = state.find((item) => item.id === id);
  return (
    <>
      <PostForm
      label="Edit my post"
        initialValues={{ title, content }}
        onSubmit={(title, content) => {
          editPost(id, title, content, () => {
            navigation.pop();
          });
        }}
        initialContent={content}
        initialTitle={title}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Edit;
