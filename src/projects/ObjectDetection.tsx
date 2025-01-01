import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arta } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);

  const enableWebcamHandler = async () => {
    if (!model) {
      alert("Model not loaded yet. Please wait.");
      return;
    }
    const video = videoRef.current;
    if (!video) {
      alert("Video element not found. Please refresh the page.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.onloadeddata = () => {
        video.play();
        detectFrame(video, model as cocoSsd.ObjectDetection);
      };
    } catch (err) {
      console.error("Error accessing the webcam:", err);
    }
  };
  const detectFrame = (
    video: HTMLVideoElement,
    model: cocoSsd.ObjectDetection
  ) => {
    model.detect(video).then((predictions: cocoSsd.DetectedObject[]) => {
      renderPredictions(predictions);
      requestAnimationFrame(() => detectFrame(video, model));
    });
  };
  const renderPredictions = (predictions: cocoSsd.DetectedObject[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const video = videoRef.current;
    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach((prediction: cocoSsd.DetectedObject) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.font = "18px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        `${prediction.class} (${(prediction.score * 100).toFixed(1)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };
  useEffect(() => {
    // Load the COCO-SSD model
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      console.log("Model loaded");
    });
  }, []);

  const enableWebCam = `import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = 
  useState<cocoSsd.ObjectDetection | null>(null);

  const enableWebcamHandler = async () => {
    if (!model) {
      alert("Model not loaded yet. Please wait.");
      return;
    }
    const video = videoRef.current;
    if (!video) {
      alert("Video element not found. Please refresh the page.");
      return;
    }
    try {
      const stream = 
      await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.onloadeddata = () => {
        video.play();
        detectFrame(video, model as cocoSsd.ObjectDetection);
      };
    } catch (err) {
      console.error("Error accessing the webcam:", err);
    }
  };
  const detectFrame = (
    video: HTMLVideoElement,
    model: cocoSsd.ObjectDetection
  ) => {
    model.detect(video)
    .then((predictions: cocoSsd.DetectedObject[]) => {
      renderPredictions(predictions);
      requestAnimationFrame(() => detectFrame(video, model));
    });
  };
  const renderPredictions = 
  (predictions: cocoSsd.DetectedObject[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const video = videoRef.current;
    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach((prediction: cocoSsd.DetectedObject) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.font = "18px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        "prediction.class ((prediction.score * 100).toFixed(1)%)", 
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };
  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      console.log("Model loaded");
    });
  }, []);
  
  return (
   <div>
    <button onClick={enableWebcamHandler} 
    disabled={!model}> Enable webcam </button>
        <div>
            <video id="webcam" width="640" height="480" 
            ref={videoRef}></video>
            <canvas ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            ></canvas>
          </div>
  );`;


  return (
    <section className="h-screen flex py-5">
      <div>
        <h1 className="text-orange-500 font-medium italic">
          Multiple object detection using pre trained model in TensorFlow.js
        </h1>
        <div className="flex flex-col gap-2">
          <p>
            Wait for the model to load before clicking the button to enable the
            webcam - at which point it will become visible to use.
          </p>
          <p>
            Hold some objects up close to your webcam to get a real-time
            classification! When ready click "enable webcam" below and accept
            access to the webcam when the browser asks (check the top left of
            your window)
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={enableWebcamHandler}
            className="bg-orange-200 p-1 border rounded-xl px-3 border-black text-black w-fit"
            disabled={!model}
          >
            Enable webcam
          </button>
          <div className="relative border border-white m-5 rounded-xl w-[640px] h-[480px]">
            <video
              id="webcam"
              width="640"
              height="480"
              ref={videoRef}
              className="rounded-xl"
            ></video>
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            ></canvas>
          </div>
        </div>
      </div>
      <div className="w-[50%] ">
        <SyntaxHighlighter
          language="javascript"
          style={arta}
          showLineNumbers={true}
          class="h-[95vh] scroll-smooth"

        >
          {enableWebCam}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
