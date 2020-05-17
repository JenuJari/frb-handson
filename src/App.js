import React from 'react';
import SampleApp from "./SamplesApp";
import InsideLayoutOne from './common/hoc/InsideLayoutOne';

window.__appInitGlobals = () => {
  window.$ = require("jquery");
  require("popper.js");
  require("bootstrap/dist/js/bootstrap.bundle.min");
};

class App extends React.Component {
  state = {
    name: "Jenish"
  }

  componentDidMount() {
    window.__appInitGlobals();
  }

  render() {
    return (
      <InsideLayoutOne>
        <SampleApp name={this.state.name} />
      </InsideLayoutOne>
    );
  }
}

export default App;
