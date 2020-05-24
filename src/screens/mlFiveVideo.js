/* eslint-disable no-console */
import Pfive from "p5";
import React, { PureComponent } from "react";

const canvasGlobal = {
  height: 786,
  width: 1076
};

const p5Handler = (p5) => {
  const self = {};

  const predictions = (err, res) => {
    if (err) {
      console.error(err);
    } else {

      if ((res || []).length > 0) {
        self.label = (res[0].label || "");
        self.confidence = (res[0].confidence || "");
      }

      setTimeout(() => { self.mobileNet.predict(predictions); }, 1000);
    }
  };

  const mlInitiated = () => {
    console.log("MobileNet Ready!!");
    self.mobileNet.predict(predictions);
  };

  p5.setup = () => {
    p5.createCanvas(canvasGlobal.width, canvasGlobal.height);
    p5.background(0);
    self.video = p5.createCapture(p5.VIDEO);
    self.video.hide();
    self.mobileNet = window.ml5.imageClassifier("MobileNet", self.video, mlInitiated);
  };

  p5.draw = () => {
    if (null !== self.video && typeof self.video !== "undefined") {
      p5.background(0);
      p5.image(self.video, 0, 0, canvasGlobal.width, canvasGlobal.height - 50);
    }

    if (typeof self.label !== "undefined" && self.label.length > 0) {
      const t = `Predicted ${self.label} with ${parseFloat(self.confidence * 100).toFixed(2)} % confidence`;
      p5.fill("white");
      p5.textSize(34);
      p5.text(t, 10, canvasGlobal.height - 10);
    }
  };
};

class MlFiveTwo extends PureComponent {
  constructor(props) {
    super(props);

    this.__canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myP5 = new Pfive(p5Handler, this.__canvasRef.current);
  }

  render() {
    return (
      <div className="bg-white border rounded p-3">
        <div id="canvas" ref={this.__canvasRef}></div>
      </div>
    );
  }
}

MlFiveTwo.displayName = "ML5 Video example";

export default MlFiveTwo;