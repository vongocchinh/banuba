import { fps, getSource, startPlayer } from "../BanubaPlayer.js";

import {
  webcamSourceButton,
  imageSourceButton,
  startScreen,
  overlay,
  fpsBlock,
} from "./elements.js";

const onSourceSelect = () => {
  startScreen.classList.add("hidden");
  overlay.classList.add("hidden");
  setInterval(() => {
    if (fpsBlock) {
      fpsBlock?.querySelectorAll("span").forEach((el) => {
        el.innerText = fps[el.id].toFixed(1);
      });
    }
  });
};

const onWebcamSelect = (e) => {
  const source = getSource(e.target.value);
  startPlayer(source);
  onSourceSelect();
};

const onImageSelect = (e) => {
  const source = getSource(e.target.value, e.target.files[0]);
  startPlayer(source);
  onSourceSelect();
};

webcamSourceButton.addEventListener("click", onWebcamSelect);
imageSourceButton.addEventListener("change", onImageSelect);

// Tự động khởi động webcam khi trang load
window.addEventListener("load", () => {
  // Tạo một event giả để trigger onWebcamSelect
  const mockEvent = { target: { value: "webcam" } };
  onWebcamSelect(mockEvent);
});
