import { createStore } from "redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { dishes } from "./dishes";
import { promotions } from "./promotions";
import { leaders } from "./leaders";
import { comments } from "./comments";
import { favorites } from "./favorites";

import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers, persistStore } from "redux-persist";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true,
  };
  const store = createStore(
    persistCombineReducers(config, {
      dishes: dishes,
      comments: comments,
      promotions: promotions,
      leaders: leaders,
      favorites,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
