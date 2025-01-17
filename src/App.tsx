import HeroSection from "./components/HeroSection";
import ObjectDetection from "./projects/ObjectDetection";
import ThreeJSModel from "./projects/ThreeJSModel";

function App() {
  return (
    <main className="max-w-[1420px]">
      <HeroSection />
      <h1 className="text-4xl font-bold text-center">
        TensorFlow.js Integration
      </h1>
      <ObjectDetection />
      <ThreeJSModel />
    </main>
  );
}

export default App;
