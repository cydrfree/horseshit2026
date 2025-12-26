import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import img3E9Ddcdb3D2Eb8A167578912C8Ba15E81 from "figma:asset/72eea06bc595d8599ed778301d86f950e9dcbfd6.png";
import img6F67074333Befb25C994122C15C0648B1 from "figma:asset/8ef2937daafe550926c69d5988ff3b753675b45e.png";
import img374Cf6Ff8314C5027Df8Ea3618B3Fe141 from "figma:asset/98b61d4567ba99b2b7215d81fa5cfcd41036079d.png";
import img81491D05814F394323D3E2Bc0A12F08A1 from "figma:asset/bcf551ba9d35419aed5c8bc476279db3895c3d23.png";
import imgAf6Da698D006Cac5707Ed0Fe22Fc97Ed1 from "figma:asset/99fd4b633a286e9b3e18524dce5d8ea700d47f75.png";
import imgA92A471E9096072B98B68471B0E473F61 from "figma:asset/e18fbb058d5427cf6932f9a3bea2c5c0bd07ba51.png";
import imgE909F9F7F61B67642A653619Cb5E90631 from "figma:asset/453415d8b70df096110a4efe8846135b40d77891.png";
import imgEbb328A87D655571C8Cdb45297827B341 from "figma:asset/eefc46a2bdc094d57ef0270829d4ef00570bd660.png";
import Frame from "../imports/Frame";

const images = [
  img3E9Ddcdb3D2Eb8A167578912C8Ba15E81,
  img6F67074333Befb25C994122C15C0648B1,
  img374Cf6Ff8314C5027Df8Ea3618B3Fe141,
  img81491D05814F394323D3E2Bc0A12F08A1,
  imgAf6Da698D006Cac5707Ed0Fe22Fc97Ed1,
  imgA92A471E9096072B98B68471B0E473F61,
  imgE909F9F7F61B67642A653619Cb5E90631,
  imgEbb328A87D655571C8Cdb45297827B341,
];

export function BubbleGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showText, setShowText] = useState(true);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const imageSize = isMobile ? 70 : 100; // 모든 이미지 동일한 크기

    // 엔진 생성
    const engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });
    engineRef.current = engine;

    // 캔버스 설정
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;

    // 벽 생성
    const wallOptions = { isStatic: true, restitution: 1, friction: 0 };
    const walls = [
      Bodies.rectangle(width / 2, 0, width, 10, wallOptions),
      Bodies.rectangle(width / 2, height, width, 10, wallOptions),
      Bodies.rectangle(0, height / 2, 10, height, wallOptions),
      Bodies.rectangle(width, height / 2, 10, height, wallOptions),
    ];
    Composite.add(engine.world, walls);

    // 이미지 로드
    const imageElements: HTMLImageElement[] = [];
    let loadedCount = 0;

    const initPhysics = () => {
      const bodies: Matter.Body[] = [];

      images.forEach((imgSrc, index) => {
        // 랜덤 위치 (겹치지 않게)
        let x, y;
        let isOverlapping = true;
        let attempts = 0;

        while (isOverlapping && attempts < 50) {
          x = Math.random() * (width - imageSize - 100) + imageSize / 2 + 50;
          y = Math.random() * (height - imageSize - 100) + imageSize / 2 + 50;

          isOverlapping = bodies.some((body) => {
            const dx = Math.abs(body.position.x - x);
            const dy = Math.abs(body.position.y - y);
            return dx < imageSize + 20 && dy < imageSize + 20;
          });

          attempts++;
        }

        // 물리 바디 생성 (정사각형)
        const body = Bodies.rectangle(x!, y!, imageSize, imageSize, {
          restitution: 0.9,
          friction: 0,
          frictionAir: 0,
          density: 0.001,
          inertia: Infinity, // 회전 지
          label: `image-${index}`,
        });

        // 초기 속도 - 적당하게
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
        });

        bodies.push(body);
      });

      Composite.add(engine.world, bodies);
      bodiesRef.current = bodies;

      // 충돌 이벤트 리스너 - 충돌할 때마다 랜덤 방향으로 변경
      Events.on(engine, 'collisionStart', (event) => {
        event.pairs.forEach((pair) => {
          const { bodyA, bodyB } = pair;
          
          // bodyA가 이미지일 경우
          if (bodyA.label?.startsWith('image-')) {
            const currentSpeed = Math.sqrt(bodyA.velocity.x ** 2 + bodyA.velocity.y ** 2);
            const targetSpeed = Math.max(currentSpeed, 2); // 최소 속도 보장
            const randomAngle = Math.random() * Math.PI * 2;
            
            Matter.Body.setVelocity(bodyA, {
              x: Math.cos(randomAngle) * targetSpeed,
              y: Math.sin(randomAngle) * targetSpeed,
            });
          }
          
          // bodyB가 이미지일 경우
          if (bodyB.label?.startsWith('image-')) {
            const currentSpeed = Math.sqrt(bodyB.velocity.x ** 2 + bodyB.velocity.y ** 2);
            const targetSpeed = Math.max(currentSpeed, 2); // 최소 속도 보장
            const randomAngle = Math.random() * Math.PI * 2;
            
            Matter.Body.setVelocity(bodyB, {
              x: Math.cos(randomAngle) * targetSpeed,
              y: Math.sin(randomAngle) * targetSpeed,
            });
          }
        });
      });

      // 렌더링 루프
      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        bodies.forEach((body, index) => {
          const img = imageElements[index];
          if (!img) return;

          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          
          // 이미지를 정사각형으로 그리기
          ctx.drawImage(
            img,
            -imageSize / 2,
            -imageSize / 2,
            imageSize,
            imageSize
          );
          
          ctx.restore();

          // 회전 방지
          Matter.Body.setAngle(body, 0);
          Matter.Body.setAngularVelocity(body, 0);

          // 최소 속도 유지 - 더 강하게
          const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
          if (speed < 1.5) {
            const angle = Math.random() * Math.PI * 2;
            Matter.Body.setVelocity(body, {
              x: Math.cos(angle) * 2,
              y: Math.sin(angle) * 2,
            });
          }

          // 최대 속도 제한
          if (speed > 4) {
            const scale = 4 / speed;
            Matter.Body.setVelocity(body, {
              x: body.velocity.x * scale,
              y: body.velocity.y * scale,
            });
          }
          
          // 주기적으로 랜덤한 힘 추가 (더 활발하게)
          if (Math.random() < 0.02) {
            Matter.Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * 0.0005,
              y: (Math.random() - 0.5) * 0.0005,
            });
          }
        });

        requestAnimationFrame(animate);
      };

      // 엔진 시작
      const runner = Runner.create();
      Runner.run(runner, engine);
      animate();

      // 클릭 이벤트
      const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        bodies.forEach((body, index) => {
          const halfSize = imageSize / 2;
          const bodyX = body.position.x;
          const bodyY = body.position.y;

          if (
            clickX >= bodyX - halfSize &&
            clickX <= bodyX + halfSize &&
            clickY >= bodyY - halfSize &&
            clickY <= bodyY + halfSize
          ) {
            setBackgroundImage(images[index]);
            setShowText(false);
          }
        });
      };

      canvas.addEventListener("click", handleClick);

      return () => {
        canvas.removeEventListener("click", handleClick);
        Runner.stop(runner);
        Engine.clear(engine);
      };
    };

    // 이미지 로드
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          loadedImagesRef.current = imageElements;
          initPhysics();
        }
      };
      imageElements.push(img);
    });

    return () => {
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen overflow-hidden bg-white relative"
      style={
        backgroundImage 
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: '100% 100%', // 강제로 늘리기
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      <canvas ref={canvasRef} className="relative z-10" />
      
      {/* 중앙에 고정된 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[60%] max-w-[300px] md:max-w-[450px]">
          {showText && <Frame />}
        </div>
      </div>
    </div>
  );
}