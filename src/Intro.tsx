// src/Intro.tsx
import { useState, useRef } from "react";
import "./Intro.css";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [step, setStep] = useState<"start" | "message">("start");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleRun = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
    }

    setStep("message");
  };

  return (
    <div
      className={`intro-wrapper ${step === "message" ? "message-mode" : ""}`}
    >
      <audio ref={audioRef} loop>
        {/* 아래 경로의 맨 앞 슬래시(/)를 제거했습니다 */}
        <source src="assets/bgm.mp3" type="audio/mpeg" />
      </audio>

      <div className="intro-container">
        {/* 배경 이미지: start 단계에서만 보임 */}
        <div
          className="background"
          style={{ opacity: step === "start" ? 1 : 0 }}
        >
          {/* 아래 경로의 맨 앞 슬래시(/)를 제거했습니다 */}
          <img src="assets/background.jpeg" alt="배경" />
        </div>

        {/* ... (중간 생략: 흐르는 텍스트 및 SVG 코드는 그대로 유지) ... */}

        <div className="scrolling-text top">
          <div className="scroll-content">
            <p>20261948-0234781ekwnrdlfRJditlqkftgoRLemfdk</p>
            <p>20261948-0234781ekwnrdlfRJditlqkftgoRLemfdk</p>
          </div>
        </div>
        <div className="scrolling-text bottom">
          <div className="scroll-content">
            <p>ekwnrduqjflfRJdidlrjgotjrgoqhkfktlqkftoRLemfdk</p>
            <p>ekwnrduqjflfRJdidlrjgotjrgoqhkfktlqkftoRLemfdk</p>
          </div>
        </div>

        <div
          className="start-screen"
          style={{
            opacity: step === "start" ? 1 : 0,
            pointerEvents: step === "start" ? "auto" : "none",
          }}
        >
          {/* SVG 등 기존 코드 생략 (그대로 두세요) */}
          <div className="year-2026">
            <svg
              className="year-svg"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1317.03 330"
            >
              {/* SVG 내부 path 코드들... */}
              <g>
                <path d="M1172.53 330C1092.03..." fill="white" />
                <path d="M838.766 0C914.266..." fill="white" />
                <path d="M490.266 330C400.766..." fill="white" />
                <path d="M141.5 0C217 0..." fill="white" />
              </g>
            </svg>
          </div>
          <button onClick={handleRun} className="go-message-btn">
            Run
          </button>
        </div>

        {/* 메시지 화면 */}
        <div className={`message-wrapper ${step === "message" ? "show" : ""}`}>
          <div className="message-card">
            {/* 아래 경로의 맨 앞 슬래시(/)를 제거했습니다 */}
            <img
              src="assets/horseshit.webp"
              alt="새해 이미지"
              className="message-img"
            />
            <h1>♡丙午年♡</h1>
            <p>♡ 달려나가자 ♡ 2026 붉은 말 처럼 ♡</p>
            <br />
            <p>
              「LESSON 5」 를 아시나요? 우리는 언제나 가장 가깝고 쉬운 길을
              추구하지만, 사실 가장 가까운 길은 멀리 돌아가는 길일지도 모릅니다.
              멀리 돌아가는 길이야 말로 가장 가까운 길... 2026년은 힘차게
              도약하는 해가 되기를 바라며 새해 복 많이 받으세요.
              <br />
              웅정이 올림
            </p>

            {/* 갤러리입장 */}
            <button
              onClick={onComplete}
              className="back-btn"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              → 갤러리 입장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
