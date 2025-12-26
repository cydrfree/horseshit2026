import { useState } from "react";
import { BubbleGallery } from "./components/BubbleGallery";
import Intro from "./Intro";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return <BubbleGallery />;
}
