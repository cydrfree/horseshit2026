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
        <source src="/assets/bgm.mp3" type="audio/mpeg" />
      </audio>

      <div className="intro-container">
        {/* 배경 이미지: start 단계에서만 보임 */}
        <div
          className="background"
          style={{ opacity: step === "start" ? 1 : 0 }}
        >
          <img src="/assets/background.jpeg" alt="배경" />
        </div>

        {/* 흐르는 텍스트 */}
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

        {/* 시작 화면 */}
        <div
          className="start-screen"
          style={{
            opacity: step === "start" ? 1 : 0,
            pointerEvents: step === "start" ? "auto" : "none",
          }}
        >
          <div className="year-2026">
            {/* SVG 코드를 그대로 사용 */}
            <svg
              className="year-svg"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1317.03 330"
            >
              <g>
                <path
                  d="M1172.53 330C1092.03 330 1022.03 282 1022.03 225V165C1022.03 69.5 1084.53 0.499985 1172.53 0.499985C1227.53 0.499985 1276.53 27 1308.53 75H1271.53C1249.53 31.5 1211.53 4.49999 1172.53 4.49999C1130.03 4.49999 1088.53 34.5 1076.03 75.5C1044.03 75.5 1028.03 105 1028.03 165V200C1047.53 153.5 1109.03 120 1174.53 120C1253.03 120 1317.03 167.5 1317.03 224.5C1317.03 282 1253.03 330 1172.53 330ZM1062.53 225.5C1062.53 279 1115.03 325.5 1172.53 325.5C1230.53 325.5 1276.53 278.5 1276.53 224C1276.53 170 1232.03 124.5 1174.53 124.5C1117.53 124.5 1062.53 171.5 1062.53 225.5Z"
                  fill="white"
                />
                <path
                  d="M838.766 0C914.266 0 977.266 49 977.266 111C977.266 161.5 935.266 195.5 840.266 223C774.266 242 722.766 281 715.266 316.5H932.766C959.266 316.5 977.266 301 977.266 274V325H707.266C707.266 284.5 764.766 238 839.766 217C899.266 200.5 940.266 161 940.266 111C940.266 61 898.766 4.00001 838.766 4.00001C780.766 4.00001 734.266 53.5 734.266 104.5L697.266 105C697.266 49.5 762.766 0 838.766 0Z"
                  fill="white"
                />
                <path
                  d="M490.266 330C400.766 330 324.766 253.5 324.766 164.5C324.766 75.5 400.766 0 490.266 0C579.266 0 654.766 75.5 654.766 164.5C654.766 253.5 579.266 330 490.266 330ZM361.766 164.5C361.766 255.5 417.766 326 490.266 326C562.266 326 617.766 255.5 617.766 164.5C617.766 73.5 562.266 3.50001 489.766 3.50001C417.266 3.50001 361.766 73.5 361.766 164.5Z"
                  fill="white"
                />
                <path
                  d="M141.5 0C217 0 280 49 280 111C280 161.5 238 195.5 143 223C77 242 25.5 281 18 316.5H235.5C262 316.5 280 301 280 274V325H10C10 284.5 67.5 238 142.5 217C202 200.5 243 161 243 111C243 61 201.5 4.00001 141.5 4.00001C83.5 4.00001 37 53.5 37 104.5L0 105C0 49.5 65.5 0 141.5 0Z"
                  fill="white"
                />
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
            <img
              src="/assets/horseshit.webp"
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
