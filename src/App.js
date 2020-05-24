import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRouter from "./routes";

class App extends React.Component {
  // state = {
  //   name: "Jenish"
  // }

  componentDidMount() { }

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;