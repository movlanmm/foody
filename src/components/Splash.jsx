import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import lottie from "../lottie/lottie.json";

export default function Splash() {
  return (
    <div
      style={{ zIndex: 10000 }}
      className="fixed top-0 left-0 h-dvh flex items-center justify-center w-dvw bg-main"
    >
      <Player
        autoplay
        loop
        src={lottie}
        style={{ width: "50%", height: "400px" }}
      />
      <Controls
        loop
        autoPlay
        speed={1}
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
      />
    </div>
  );
}
