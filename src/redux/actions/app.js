import { APP_INIT_REQUEST } from "./../types";

export const appInitAct = (payload) => ({
  type: APP_INIT_REQUEST,
  payload
});