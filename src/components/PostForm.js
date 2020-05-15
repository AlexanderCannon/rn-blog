import React, { useState } from "react";
import { Text, StyleSheet, TextInput, Button } from "react-native";

const PostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues && initialValues.title);
  const [content, setContent] = useState(
    initialValues && initialValues.content
  );
  return (
    <>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Add new post" onPress={() => onSubmit(title, content)} />
    </>
  );
};

PostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginHorizontal: 5,
  },
});

export default PostForm;
