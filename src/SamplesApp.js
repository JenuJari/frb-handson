import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Sketch from "react-p5";
// import lion from './assets/lion.jpg';
// import modi from './assets/modi.jpg';

const canvasGlobal = {
    height: 780,
    width: 1080
};

const SampleApp = (props) => {
    let self = {};
    self.mobileNet = null;
    self.image = null;
    self.video = null;
    self.label = '';
    self.confidence = '';
    
    const predictions = (err, res) => {
        if (err) {
            console.error(err);
        } else {
            if((res || []).length > 0) {
                self.label = (res[0].label || "");
                self.confidence = (res[0].confidence || "");
            }
            setTimeout(() => {
                self.mobileNet.predict(predictions);
            }, 1000);
        }
    };

    const mlInitiated = () => {
        self.mobileNet.predict(predictions);
    };

    const setup = (p5, canvasParentRef) => {
        self.p5 = p5;
        p5.createCanvas(canvasGlobal.width, canvasGlobal.height).parent(canvasParentRef);
        p5.background(0);
        self.video = self.p5.createCapture(self.p5.VIDEO);
        self.video.hide();
        self.mobileNet = window.ml5.imageClassifier('MobileNet', self.video , mlInitiated);
    };

    const draw = p5 => {
        p5.background(0);
        if(typeof self.p5 === "undefined") self.p5 = p5;
        if(null !== self.video) {
            self.p5.image(self.video, 0, 0, canvasGlobal.width, canvasGlobal.height - 50);
            if(self.label.length > 0) {
                self.p5.fill('white');
                self.p5.textSize(34);
                self.p5.text(self.label, 10, canvasGlobal.height - 10);
                // self.p5.createP(`Pridited ${label} with ${parseFloat(confidence * 100).toFixed(2)} % confidence`);
            }
        }
    };

    return (
        <div className="container" {...props}>
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};

export default SampleApp;


/* 

let self = {};
    self.mobileNet = null;
    self.image = null;
    self.results = null;

    const displayPridiction = () => {
        const { label, confidence} = self.results[0];
        self.p5.fill('red');
        self.p5.textSize(50);
        self.p5.text(label,50,canvasGlobal.height - 50);
        self.p5.createP(`Pridited ${label} with ${parseFloat(confidence * 100).toFixed(2)} % confidence`);
    };

    const predictions = (err, res) => {
        if (err) {
            console.error(err);
        } else {
            self.results = res;
            displayPridiction();
        }
    };

    const mlInitiated = () => {
        self.mobileNet.predict(self.image, predictions);
    };

    const imageLoaded = () => {
        self.p5.image(self.image, 0, 0, canvasGlobal.width, canvasGlobal.height);
        self.mobileNet = window.ml5.imageClassifier('MobileNet', mlInitiated);
    }

    const setup = (p5, canvasParentRef) => {
        self.p5 = p5;
        p5.createCanvas(canvasGlobal.width, canvasGlobal.height).parent(canvasParentRef);
        p5.background(0);
        self.image = p5.createImg(lion, imageLoaded);
        self.image.hide();
    };

*/