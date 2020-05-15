import React, { createContext, useReducer } from "react";
import axios from "axios";

export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const GET_POSTS = "GET_POSTS";

const Reducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return { state: [...state, action.payload] };
    case DELETE_POST:
      return state.filter((item) => item.id !== action.payload);
    case EDIT_POST:
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              id: action.payload.id,
              title: action.payload.title,
              content: action.payload.content,
            }
          : item
      );
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
};

const initialState = [
  {
    title: "No posts yet",
    content:
      "You might be offline, or you might have no posts yet.\nGo online or add posts to get started",
    id: "one",
  },
];

export const Context = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addPost = async (title, content, callback) => {
    try {
      axios.post("http://localhost:3000/posts", { title, content });
      !!callback && callback();
      dispatch({ type: ADD_POST, payload: { title, content } });
    } catch (e) {}
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (e) {}
  };

  const editPost = async (id, title, content, callback) => {
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, { title, content });

      dispatch({ type: EDIT_POST, payload: { title, content, id } });
      !!callback && callback();
    } catch (e) {}
  };

  const getPosts = async () => {
    const { data } = await axios.get("http://localhost:3000/posts");
    dispatch({ type: GET_POSTS, payload: data });
  };

  return (
    <Context.Provider
      value={{ state, addPost, deletePost, editPost, getPosts }}
    >
      {children}
    </Context.Provider>
  );
};
