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
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: dishes,
      comments: comments,
      promotions: promotions,
      leaders: leaders,
      favorites,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
