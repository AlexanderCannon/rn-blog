import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "./src/context/Context";

import Index from "./src/screens/Index";
import Detail from "./src/screens/Detail";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import Feed from "./src/screens/Feed";
import FancyDetail from "./src/screens/FancyDetail";

const CreateFlow = createStackNavigator(
  {
    Index,
    Detail,
    Create,
    Edit,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Posts",
    },
  }
);

const FeedFlow = createStackNavigator({
  Feed,
  FancyDetail,
});

const navigator = createBottomTabNavigator({
  Feed: FeedFlow,
  Create: CreateFlow,
});

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
