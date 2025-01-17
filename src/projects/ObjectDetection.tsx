import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { useRef } from "react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arta } from "react-syntax-highlighter/dist/esm/styles/hljs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });
  const [loading, setLoading] = useState(false);

  const onClickToCode = contextSafe(() => {
    gsap.to(".card-front", { rotationY: 180, duration: 1, ease: "back.out" });
    gsap.to(".card-back", {
      display: "block",
      rotationY: 0,
      duration: 1,
      ease: "back.out",
    });
  });
  const onClickToModel = contextSafe(() => {
    gsap.to(".card-front", { rotationY: 0, duration: 1, ease: "back.out" });
    gsap.to(".card-back", {
      display: "none",
      rotationY: 180,
      duration: 1,
      ease: "back.out",
    });
  });

  const disableWebcamHandler = () => {
    const video = videoRef.current;
    if (!video) {
      alert("Video element not found. Please refresh the page.");
      return;
    }
    const stream = video.srcObject as MediaStream;
    if (stream) {
      // Stop all tracks of the video stream
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;

      // Clear the canvas instead of removing it
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

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

        // Reinitialize the canvas size
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // Restart the detection loop
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

  const loadModelHandler = async () => {
    setLoading(true);
    const loadedModel = await cocoSsd.load();
    setModel(loadedModel);
    setLoading(false);
  };

  const enableWebCam = `import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = 
  useState<cocoSsd.ObjectDetection | null>(null);

   const disableWebcamHandler = () => {
    const video = videoRef.current;
    if (!video) {
      alert("Video element not found. Please refresh the page.");
      return;
    }
    const stream = video.srcObject as MediaStream;
    if (stream) {
      // Stop all tracks of the video stream
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
  
      // Clear the canvas instead of removing it
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
  
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
        // Reinitialize the canvas size
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        // Restart the detection loop
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
  );
}`;

  return (
    <section className="relative mt-5" ref={container}>
      <div
        className="flex py-5 flex-col gap-10 items-center "
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div
          className="flex flex-col gap-2 border p-5 px-10 rounded-lg w-full z-[0] card-front"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h1 className="font-bold text-3xl">Multiple object detection</h1>
          <p className="text-gray-500">
            Real-time object detection using TensorFlow.js and a pre-trained
            COCO-SSD model
          </p>
          <div className="mt-5  flex justify-center">
            <div className="relative border  rounded-xl w-full  overflow-hidden">
              <video
                id="webcam"
                ref={videoRef}
                className="rounded-xl w-full h-[600px] "
              ></video>
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                }}
              ></canvas>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <h5 className="font-semibold text-xl">How it works:</h5>
            <ol className="list-decimal list-inside text-gray-500">
              <li>Load the model by clicking the "Load Model" button</li>
              <li>Click the "Enable webcam" button to start</li>
              <li>Hold objects close to your webcam</li>
              <li>Watch as object are detected in real-time</li>
            </ol>
            <div className="flex gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium ">
                TensorFlow.js
              </span>

              <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium">
                COCO-SSD Model
              </span>
              <span className="flex items-center gap-1 text-sm bg-black text-white w-fit p-1 px-3 rounded-2xl font-medium">
                Real-time Processing
              </span>
            </div>
            <div className="flex justify-between mt-5">
              <div className=" gap-2 flex flex-wrap">
                <button
                  onClick={loadModelHandler}
                  className={`${
                    loading ? "bg-slate-400" : "bg-black"
                  }   p-2 border rounded-lg px-4  w-fit text-white font-semibold`}
                  disabled={loading}
                >
                  {loading ? "Loading Model..." : "Load Model"}
                </button>
                <button
                  onClick={enableWebcamHandler}
                  className={`${
                    model ? "bg-black" : "bg-slate-400"
                  } p-2 border rounded-lg px-4  w-fit text-white font-semibold`}
                  disabled={!model}
                >
                  Enable webcam
                </button>
                <button
                  onClick={disableWebcamHandler}
                  className={`border-black p-2 border rounded-lg px-4  w-fit  font-semibold ${
                    model ? "" : "bg-slate-200"
                  }`}
                  disabled={!model}
                >
                  Turn off webcam
                </button>
              </div>
              <button
                className="border-black  border rounded-lg px-4  w-fit  font-semibold"
                onClick={onClickToCode}
              >
                Code
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 h-[120vh] w-full bg-black  card-back hidden"
        style={{
          transform: "rotateY(180deg)",
          perspective: "1000px",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="flex justify-end bg-white">
          <button
            className="border-black p-2 border rounded-lg px-4 mb-10  w-fit  font-semibold "
            onClick={onClickToModel}
          >
            Back
          </button>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={arta}
          showLineNumbers={true}
          className=" overflow-y-scroll h-[120vh]"
        >
          {enableWebCam}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
