/* eslint-disable no-console */
import Pfive from "p5";
import React, { Component } from "react";

const canvasGlobal = {
  height: 786,
  width: 1076
};

const p5Handler = (p5) => {
  const self = {};

  const mlInitiated = () => {
    self.mobileNetready = true;
    console.log("MobileNet is ready");
  };

  const predictions = (err, res) => {
    if (err) {
      console.error(err);
    } else {
      if ((res || []).length > 0) {
        self.label = (res[0].label || "");
        self.confidence = (res[0].confidence || "");
      }
    }
  }

  const imageSelected = () => {
    if (self.mobileNetready !== true) {
      self.errorMessage = "MobileNet is not ready.";
      return;
    }

    self.errorMessage = "";
    self.imageSelected = true;
    self.mobileNet.predict(self.image, predictions);
  };

  p5.setup = () => {
    p5.createCanvas(canvasGlobal.width, canvasGlobal.height);
    p5.background(0);
    self.mobileNet = window.ml5.imageClassifier("MobileNet", mlInitiated);
  };

  p5.draw = () => {
    p5.background(0);

    if (window.__fileSelected) {
      if (typeof self.image === "undefined") {
        self.image = p5.createImg(window.__fileSelected, imageSelected);
        self.image.hide();
      }
    }

    if (self.errorMessage) {
      p5.fill("red");
      p5.textSize(34);
      p5.text(self.errorMessage, 10, canvasGlobal.height - 10);
      return 0;
    }

    if (self.mobileNetready === true && self.imageSelected === true) {
      p5.image(self.image, 0, 0, canvasGlobal.width, canvasGlobal.height);
    }

    if (typeof self.label !== "undefined" && self.label.length > 0) {
      const t = `Predicted ${self.label} with ${parseFloat(self.confidence * 100).toFixed(2)} % confidence`;
      p5.fill("white");
      p5.textSize(34);
      p5.text(t, 10, canvasGlobal.height - 10);
    }

  };

}
class MlFiveImage extends Component {

  constructor(props) {
    super(props);

    this.__fileInput = React.createRef();
    this.__canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myP5 = new Pfive(p5Handler, this.__canvasRef.current);
  }

  openFIleSelect = () => {
    this.__fileInput.current.click();
  };

  onFileSelected = (files) => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      window.__fileSelected = reader.result;
    }, false);

    if (files) { reader.readAsDataURL(files[0]); }
  };

  render() {
    return (
      <div className="bg-white border rounded p-3">
        <form>
          <div className="form-group">
            <button type="button" onClick={this.openFIleSelect} className="btn btn-primary">{"Upload File"}</button>
            <input
              type="file"
              id="imageInput"
              ref={this.__fileInput}
              style={{ visibility: "hidden" }}
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => this.onFileSelected(e.target.files)}
            />
          </div>
        </form>
        <hr />
        <div id="canvas" ref={this.__canvasRef}></div>
      </div>
    )
  }
}

export default MlFiveImage;