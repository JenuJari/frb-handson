import Promise from "promise";

export const appInit = (payload) => (new Promise((res, rej) => {
  try {
    setTimeout(() => {
      res(true);
    }, payload.time);
  } catch (error) {
    rej(error);
  }
}));