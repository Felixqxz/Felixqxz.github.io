"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MdEmail } from "react-icons/md";
import { SiGithub, SiGooglescholar, SiLinkedin } from "react-icons/si";

type Paper = {
  year: string;
  status: string;
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  paper: string;
  code?: string;
  award?: string;
  bibtex: string;
};

const papers: Paper[] = [
  {
    year: "2026",
    status: "arXiv ’26",
    title: "Malaika: Understanding Malware through Tri-Grounded Agentic Reasoning",
    authors: "Xingzhi Qian, Xinran Zheng, Yiling He, Lorenzo Cavallaro",
    venue: "arXiv preprint arXiv:2607.09179",
    abstract:
      "Malaika structures multi-agent malware understanding around domain, semantics, and knowledge grounding, combining adaptive evidence localization with explicit review to produce precise, auditable conclusions at practical cost.",
    paper: "https://arxiv.org/pdf/2607.09179",
    bibtex: `@article{qian2026malaika,
  title   = {Malaika: Understanding Malware through Tri-Grounded Agentic Reasoning},
  author  = {Qian, Xingzhi and Zheng, Xinran and He, Yiling and Cavallaro, Lorenzo},
  journal = {arXiv preprint arXiv:2607.09179},
  year    = {2026}
}`,
  },
  {
    year: "2026",
    status: "ISSTA ’26",
    title:
      "Is ‘Knowing It’s Malicious’ Enough? Evaluating LLMs for Fine-Grained Malware Behavior Auditing",
    authors: "Xinran Zheng, Xingzhi Qian, Yiling He, Shuo Yang, Lorenzo Cavallaro",
    venue: "35th ACM SIGSOFT International Symposium on Software Testing and Analysis",
    abstract:
      "A reproducible framework that asks whether LLMs can prioritize functions, attribute evidence, synthesize behavior, and discriminate samples — with analyst-verifiable outputs.",
    paper: "https://arxiv.org/abs/2509.14335",
    code: "https://github.com/ZhengXR930/MalEval",
    bibtex: `@inproceedings{zheng2026knowing,
  title     = {Is {Knowing It's Malicious} Enough? Evaluating LLMs for Fine-Grained Malware Behavior Auditing},
  author    = {Zheng, Xinran and Qian, Xingzhi and He, Yiling and Yang, Shuo and Cavallaro, Lorenzo},
  booktitle = {Proceedings of the 35th ACM SIGSOFT International Symposium on Software Testing and Analysis},
  year      = {2026}
}`,
  },
  {
    year: "2025",
    status: "ISSTA Companion ’25",
    title: "On Benchmarking Code LLMs for Android Malware Analysis",
    authors:
      "Yiling He, Hongyu She, Xingzhi Qian, Xinran Zheng, Zhuo Chen, Zhan Qin, Lorenzo Cavallaro",
    venue: "34th ACM SIGSOFT International Symposium on Software Testing and Analysis",
    abstract:
      "Cama evaluates how code LLMs interpret decompiled Android code through consistency, fidelity, and semantic relevance across 118 malware samples and 7.5M+ functions.",
    paper: "https://arxiv.org/abs/2504.00694",
    bibtex: `@inproceedings{he2025benchmarking,
  title     = {On Benchmarking Code LLMs for Android Malware Analysis},
  author    = {He, Yiling and She, Hongyu and Qian, Xingzhi and Zheng, Xinran and Chen, Zhuo and Qin, Zhan and Cavallaro, Lorenzo},
  booktitle = {Companion Proceedings of the 34th ACM SIGSOFT International Symposium on Software Testing and Analysis},
  year      = {2025}
}`,
  },
  {
    year: "2025",
    status: "IEEE S&P Workshops ’25",
    title: "LAMD: Context-driven Android Malware Detection and Classification with LLMs",
    authors: "Xingzhi Qian*, Xinran Zheng*, Yiling He, Shuo Yang, Lorenzo Cavallaro",
    venue: "46th IEEE Symposium on Security and Privacy Workshops",
    abstract:
      "LAMD extracts security-critical context and builds program structures for tier-wise reasoning, pairing detection with explanations and factual-consistency checks.",
    paper: "https://arxiv.org/abs/2502.13055",
    award: "Best Paper Award",
    bibtex: `@inproceedings{qian2025lamd,
  title     = {{LAMD}: Context-driven Android Malware Detection and Classification with {LLMs}},
  author    = {Qian, Xingzhi and Zheng, Xinran and He, Yiling and Yang, Shuo and Cavallaro, Lorenzo},
  booktitle = {2025 IEEE Symposium on Security and Privacy Workshops},
  year      = {2025}
}`,
  },
];

const researchSteps = [
  {
    label: "Context",
    title: "Context management",
    description: "Selecting, retaining, and routing the information agents need.",
  },
  {
    label: "Grounding",
    title: "Grounding",
    description: "Connecting reasoning and actions to verifiable evidence.",
  },
  {
    label: "Efficiency",
    title: "Efficiency",
    description: "Improving capability while controlling computation and cost.",
  },
  {
    label: "Improve",
    title: "Self-improvement",
    description: "Turning execution experience into auditable system updates.",
  },
];

function AcademicGalaxyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.sortObjects = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 50);
    camera.position.z = 12.5;

    let randomSeed = 24051998;
    const random = () => {
      randomSeed |= 0;
      randomSeed = randomSeed + 0x6d2b79f5 | 0;
      let value = Math.imul(randomSeed ^ randomSeed >>> 15, 1 | randomSeed);
      value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
    const gaussian = () => {
      let value = 0;
      while (!value) value = random();
      return Math.sqrt(-2 * Math.log(value)) * Math.cos(Math.PI * 2 * random());
    };

    const isCompact = window.innerWidth < 720;
    const starCount = isCompact ? 3400 : 6200;
    const galaxyCount = Math.round(starCount * .79);
    const positions = new Float32Array(starCount * 3);
    const scatter = new Float32Array(starCount * 3);
    const seeds = new Float32Array(starCount * 4);
    const colors = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color("#9edbff"),
      new THREE.Color("#b8adff"),
      new THREE.Color("#ffd4a0"),
      new THREE.Color("#a7edff"),
    ];

    for (let index = 0; index < starCount; index += 1) {
      const offset = index * 3;
      const seedOffset = index * 4;
      const isBackground = index >= galaxyCount;
      let x = 0;
      let y = 0;
      let z = 0;
      let luminosity = 1;

      if (isBackground) {
        x = (random() * 2 - 1) * 10.5;
        y = (random() * 2 - 1) * 6.3;
        z = (random() * 2 - 1) * 5;
        luminosity = .24 + random() * .4;
      } else {
        const region = random();
        if (region < .17) {
          const radius = Math.abs(gaussian()) * .52;
          const angle = random() * Math.PI * 2;
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius * .78;
          z = gaussian() * .22;
          luminosity = 1.15 + random() * .55;
        } else if (region < .28) {
          const radius = .4 + Math.pow(random(), .7) * 3.9;
          const angle = random() * Math.PI * 2;
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius * .72;
          z = gaussian() * .11;
          luminosity = .34 + random() * .3;
        } else {
          const arm = random() < .5 ? 0 : Math.PI;
          const radius = .34 + Math.pow(random(), .64) * 4.25;
          const armWidth = .06 + radius * .045;
          const lane = random();
          const laneOffset = lane < .56 ? -.26 : lane < .88 ? .24 : .88;
          const noise = laneOffset * armWidth + gaussian() * armWidth * .34;
          const angle = arm + radius * 2.32 + gaussian() * (.04 + radius * .018);
          x = Math.cos(angle) * (radius + noise);
          y = Math.sin(angle) * (radius + noise) * .72;
          z = gaussian() * (.055 + radius * .012);
          luminosity = lane < .56 ? .9 : lane < .88 ? .64 : .38;
        }
      }

      positions[offset] = x;
      positions[offset + 1] = y;
      positions[offset + 2] = z;

      const band = random() < .46;
      scatter[offset] = band ? (random() * 2 - 1) * 10.5 : (random() * 2 - 1) * 10.5;
      scatter[offset + 1] = band
        ? scatter[offset] * -.16 + gaussian() * (1.05 + random() * .7)
        : (random() * 2 - 1) * 6.5;
      scatter[offset + 2] = (random() * 2 - 1) * 5.5;

      const sizeSeed = random();
      seeds[seedOffset] = sizeSeed;
      seeds[seedOffset + 1] = luminosity;
      seeds[seedOffset + 2] = random() * Math.PI * 2;
      seeds[seedOffset + 3] = isBackground ? 1 : 0;

      const color = palette[Math.min(palette.length - 1, Math.floor(random() * palette.length))];
      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uYaw: { value: 0 },
      uPitch: { value: 0 },
      uPointer: { value: new THREE.Vector2(-99, -99) },
      uPointerEnergy: { value: 0 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        attribute vec3 aScatter;
        attribute vec4 aSeed;
        uniform float uTime;
        uniform float uScroll;
        uniform float uYaw;
        uniform float uPitch;
        uniform vec2 uPointer;
        uniform float uPointerEnergy;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vIntensity;
        varying float vHalo;

        mat3 rotateX(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(1., 0., 0., 0., c, s, 0., -s, c);
        }
        mat3 rotateY(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(c, 0., -s, 0., 1., 0., s, 0., c);
        }
        mat3 rotateZ(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(c, s, 0., -s, c, 0., 0., 0., 1.);
        }

        void main() {
          float background = aSeed.w;
          float loosen = smoothstep(.05, .95, uScroll) * mix(.14, .045, background);
          vec3 p = mix(position, aScatter, loosen);
          float breathing = 1. + sin(uScroll * 8.4) * .045;
          p.xy *= breathing + uScroll * .34;
          p = rotateZ(uTime * .012 + uScroll * 1.18) * p;
          p = rotateY(uYaw) * rotateX(.92 + uPitch) * p;

          vec4 world = modelMatrix * vec4(p, 1.);
          vec2 delta = world.xy - uPointer;
          float distanceToPointer = length(delta);
          float push = exp(-distanceToPointer * distanceToPointer * .72) * uPointerEnergy;
          if (distanceToPointer > .001) world.xy += normalize(delta) * push * .26;

          vec4 view = viewMatrix * world;
          gl_Position = projectionMatrix * view;
          float perspective = clamp(11. / max(2., -view.z), .55, 1.85);
          float size = aSeed.x < .7
            ? mix(1.25, 2.35, aSeed.x / .7)
            : aSeed.x < .95
              ? mix(2.35, 4.35, (aSeed.x - .7) / .25)
              : mix(5.2, 9.5, (aSeed.x - .95) / .05);
          gl_PointSize = min(27., size * perspective * uPixelRatio);
          vColor = color;
          vIntensity = aSeed.y * mix(.66, 1., .5 + .5 * sin(uTime * (.45 + aSeed.x) + aSeed.z));
          vIntensity *= mix(.58, 1., 1. - background);
          vHalo = smoothstep(.88, 1., aSeed.x);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vColor;
        varying float vIntensity;
        varying float vHalo;
        uniform float uOpacity;

        void main() {
          vec2 point = gl_PointCoord * 2. - 1.;
          float d2 = dot(point, point);
          if (d2 > 1.) discard;
          float core = exp(-d2 * 15.);
          float halo = exp(-d2 * 3.2) * (.22 + vHalo * .48);
          float flare = vHalo * (
            exp(-abs(point.x) * 28.) * exp(-point.y * point.y * 2.4) +
            exp(-abs(point.y) * 28.) * exp(-point.x * point.x * 2.4)
          ) * .32;
          float alpha = clamp((core + halo + flare) * vIntensity * uOpacity * 1.22, 0., .96);
          vec3 star = mix(vColor * .88, vec3(1.), core * .45 + flare * .16);
          gl_FragColor = vec4(star, alpha);
        }
      `,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    const meteorTextureCanvas = document.createElement("canvas");
    meteorTextureCanvas.width = 256;
    meteorTextureCanvas.height = 32;
    const meteorContext = meteorTextureCanvas.getContext("2d");
    if (meteorContext) {
      const trail = meteorContext.createLinearGradient(0, 0, meteorTextureCanvas.width, 0);
      trail.addColorStop(0, "rgba(151, 188, 220, 0)");
      trail.addColorStop(.56, "rgba(166, 202, 231, .025)");
      trail.addColorStop(.86, "rgba(197, 224, 244, .13)");
      trail.addColorStop(.97, "rgba(235, 246, 255, .48)");
      trail.addColorStop(1, "rgba(255, 255, 255, 0)");
      meteorContext.fillStyle = trail;
      meteorContext.fillRect(0, 14, 250, 4);
      const head = meteorContext.createRadialGradient(242, 16, 0, 242, 16, 7);
      head.addColorStop(0, "rgba(255, 255, 255, .76)");
      head.addColorStop(.2, "rgba(220, 239, 253, .48)");
      head.addColorStop(.58, "rgba(150, 193, 226, .1)");
      head.addColorStop(1, "rgba(108, 153, 194, 0)");
      meteorContext.fillStyle = head;
      meteorContext.fillRect(234, 8, 16, 16);
    }
    const meteorTexture = new THREE.CanvasTexture(meteorTextureCanvas);
    meteorTexture.colorSpace = THREE.SRGBColorSpace;
    meteorTexture.minFilter = THREE.LinearFilter;
    meteorTexture.magFilter = THREE.LinearFilter;

    type MeteorState = {
      sprite: THREE.Sprite;
      material: THREE.SpriteMaterial;
      elapsed: number;
      lifetime: number;
      speed: number;
      angle: number;
      brightness: number;
    };
    const meteorGroup = new THREE.Group();
    meteorGroup.renderOrder = 4;
    scene.add(meteorGroup);
    const meteorCount = isCompact ? 2 : 3;
    const meteors: MeteorState[] = [];
    let meteorHalfWidth = 9;
    let meteorHalfHeight = 5;
    const resetMeteor = (meteor: MeteorState, initial = false) => {
      meteor.angle = -.43 - random() * .1;
      meteor.speed = 2.05 + random() * .85;
      meteor.lifetime = 2.2 + random() * .65;
      meteor.brightness = .18 + random() * .13;
      meteor.elapsed = -(initial ? 2 + random() * 5 : 7 + random() * 11);
      meteor.sprite.position.set(
        -meteorHalfWidth + 1 + random() * meteorHalfWidth * 1.5,
        meteorHalfHeight + .15 + random() * 1.8,
        1.2 + random() * 2.3,
      );
      meteor.sprite.scale.set(1.25 + random() * 1.15, .032 + random() * .022, 1);
      meteor.material.rotation = meteor.angle;
      meteor.material.opacity = 0;
    };
    for (let index = 0; index < meteorCount; index += 1) {
      const meteorMaterial = new THREE.SpriteMaterial({
        map: meteorTexture,
        color: index === 2 ? 0xd8d3f0 : 0xd5e9f7,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      const meteorSprite = new THREE.Sprite(meteorMaterial);
      meteorSprite.renderOrder = 4;
      const meteor: MeteorState = {
        sprite: meteorSprite,
        material: meteorMaterial,
        elapsed: 0,
        lifetime: 2,
        speed: 3,
        angle: -.55,
        brightness: .5,
      };
      resetMeteor(meteor, true);
      meteor.elapsed = -(2.2 + index * 4.8 + random() * 1.4);
      meteorGroup.add(meteorSprite);
      meteors.push(meteor);
    }

    const pointer = new THREE.Vector2(-99, -99);
    const targetPointer = new THREE.Vector2(-99, -99);
    let targetScroll = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    let scroll = targetScroll;
    let yaw = 0;
    let pitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let yawVelocity = 0;
    let pitchVelocity = 0;
    let pointerEnergy = 0;
    let lastPointer = new THREE.Vector2();
    let pointerTime = 0;
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let animationFrame = 0;
    let documentVisible = !document.hidden;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.15 : 1.4);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      uniforms.uPixelRatio.value = pixelRatio;
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * .5)) * camera.position.z;
      meteorHalfHeight = viewHeight * .5;
      meteorHalfWidth = meteorHalfHeight * camera.aspect;
      stars.position.x = width > 940 ? 2.45 : width > 620 ? 1.65 : .55;
      stars.position.y = width > 620 ? .2 : .55;
      stars.scale.setScalar(width > 940 ? 1 : width > 620 ? .9 : .78);
    };

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      const velocity = pointerTime
        ? Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y) / Math.max(8, now - pointerTime)
        : 0;
      lastPointer.set(event.clientX, event.clientY);
      pointerTime = now;
      pointerEnergy = Math.min(.55, pointerEnergy + velocity * .1);
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * .5)) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;
      targetPointer.set(
        (event.clientX / Math.max(window.innerWidth, 1) - .5) * viewWidth,
        (.5 - event.clientY / Math.max(window.innerHeight, 1)) * viewHeight,
      );
      if (dragging) {
        const deltaX = event.clientX - dragX;
        const deltaY = event.clientY - dragY;
        targetYaw += deltaX * .0045;
        targetPitch = THREE.MathUtils.clamp(targetPitch + deltaY * .0034, -.6, .6);
        yawVelocity = deltaX * .0009;
        pitchVelocity = deltaY * .0007;
        dragX = event.clientX;
        dragY = event.clientY;
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, summary, details")) return;
      dragging = true;
      dragX = event.clientX;
      dragY = event.clientY;
      document.documentElement.classList.add("galaxy-dragging");
    };
    const endDrag = () => {
      dragging = false;
      document.documentElement.classList.remove("galaxy-dragging");
    };
    const handleScroll = () => {
      targetScroll = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    const handleVisibility = () => {
      documentVisible = !document.hidden;
      if (documentVisible && !animationFrame) animationFrame = requestAnimationFrame(frame);
    };

    const startedAt = performance.now();
    let previousFrame = startedAt;
    const frame = (now: number) => {
      animationFrame = 0;
      if (!documentVisible) return;
      const delta = Math.min(.05, (now - previousFrame) / 1000);
      previousFrame = now;
      const still = reducedMotion.matches;

      scroll += (targetScroll - scroll) * Math.min(1, delta * 7.5);
      pointer.lerp(targetPointer, Math.min(1, delta * 8));
      pointerEnergy *= Math.pow(.18, delta);
      if (!dragging) {
        targetYaw += yawVelocity;
        targetPitch = THREE.MathUtils.clamp(targetPitch + pitchVelocity, -.6, .6);
        yawVelocity *= Math.pow(.06, delta);
        pitchVelocity *= Math.pow(.025, delta);
        targetPitch *= Math.pow(.42, delta);
      }
      yaw += (targetYaw - yaw) * Math.min(1, delta * 8);
      pitch += (targetPitch - pitch) * Math.min(1, delta * 8);

      uniforms.uTime.value = still ? 0 : (now - startedAt) / 1000;
      uniforms.uScroll.value = scroll;
      uniforms.uYaw.value = still ? 0 : yaw;
      uniforms.uPitch.value = still ? 0 : pitch;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uPointerEnergy.value = still ? 0 : pointerEnergy;
      meteorGroup.visible = !still;
      if (!still) {
        const meteorSpeedBoost = 1 + Math.min(.12, Math.abs(targetScroll - scroll) * 6);
        for (const meteor of meteors) {
          meteor.elapsed += delta;
          if (meteor.elapsed < 0) {
            meteor.material.opacity = 0;
            continue;
          }
          const progress = meteor.elapsed / meteor.lifetime;
          if (
            progress >= 1 ||
            meteor.sprite.position.x > meteorHalfWidth + 4 ||
            meteor.sprite.position.y < -meteorHalfHeight - 3
          ) {
            resetMeteor(meteor);
            continue;
          }
          const fadeIn = THREE.MathUtils.smoothstep(progress, 0, .12);
          const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, .62, 1);
          meteor.material.opacity = meteor.brightness * fadeIn * fadeOut;
          const distance = meteor.speed * delta * meteorSpeedBoost;
          meteor.sprite.position.x += Math.cos(meteor.angle) * distance;
          meteor.sprite.position.y += Math.sin(meteor.angle) * distance;
        }
      }
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(frame);
    };

    resize();
    animationFrame = requestAnimationFrame(frame);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", endDrag, { passive: true });
    window.addEventListener("pointercancel", endDrag, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("galaxy-dragging");
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      for (const meteor of meteors) meteor.material.dispose();
      meteorTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="academic-galaxy-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="academic-galaxy-canvas" />
    </div>
  );
}

function mobiusCenter(t: number, target = new THREE.Vector3()) {
  return target.set(
    3.3 * Math.sin(t),
    1.34 * Math.sin(t * 2),
    .92 * Math.cos(t),
  );
}

function createMobiusGeometry() {
  const uSegments = 420;
  const crossSegments = 24;
  const halfWidth = .32;
  const halfThickness = .055;
  const superellipsePower = .5;
  const positions: number[] = [];
  const indices: number[] = [];
  const center = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const frameA = new THREE.Vector3();
  const frameB = new THREE.Vector3();
  const ribbonDirection = new THREE.Vector3();
  const surfaceNormal = new THREE.Vector3();
  const reference = new THREE.Vector3();

  for (let i = 0; i < uSegments; i += 1) {
    const t = (i / uSegments) * Math.PI * 2;
    mobiusCenter(t, center);
    tangent.set(
      3.3 * Math.cos(t),
      2.68 * Math.cos(t * 2),
      -.92 * Math.sin(t),
    ).normalize();
    reference.set(0, 0, Math.abs(tangent.z) > .88 ? 0 : 1);
    if (reference.lengthSq() === 0) reference.set(0, 1, 0);
    frameA.crossVectors(reference, tangent).normalize();
    frameB.crossVectors(tangent, frameA).normalize();
    ribbonDirection.copy(frameA).multiplyScalar(Math.cos(t / 2)).addScaledVector(frameB, Math.sin(t / 2)).normalize();
    surfaceNormal.crossVectors(tangent, ribbonDirection).normalize();

    for (let j = 0; j < crossSegments; j += 1) {
      const angle = (j / crossSegments) * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const across = halfWidth * Math.sign(cosine) * Math.pow(Math.abs(cosine), superellipsePower);
      const depth = halfThickness * Math.sign(sine) * Math.pow(Math.abs(sine), superellipsePower);
      const point = center.clone()
        .addScaledVector(ribbonDirection, across)
        .addScaledVector(surfaceNormal, depth);
      positions.push(point.x, point.y, point.z);
    }
  }

  for (let i = 0; i < uSegments; i += 1) {
    const nextRow = i < uSegments - 1 ? i + 1 : 0;
    const seamOffset = i < uSegments - 1 ? 0 : crossSegments / 2;
    for (let j = 0; j < crossSegments; j += 1) {
      const nextJ = (j + 1) % crossSegments;
      const a = i * crossSegments + j;
      const aNext = i * crossSegments + nextJ;
      const b = nextRow * crossSegments + ((j + seamOffset) % crossSegments);
      const bNext = nextRow * crossSegments + ((nextJ + seamOffset) % crossSegments);
      indices.push(a, b, aNext, b, bNext, aNext);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function ResearchOrbitalScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .86;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnvironment = new RoomEnvironment();
    const environmentMap = pmrem.fromScene(roomEnvironment, .045).texture;
    scene.environment = environmentMap;
    const model = new THREE.Group();
    model.rotation.set(-.14, -.12, -.025);
    model.scale.setScalar(.9);
    model.position.y = -.08;
    scene.add(model);

    const mobiusGeometry = createMobiusGeometry();
    const mobiusMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#263a52"),
      side: THREE.DoubleSide,
      roughness: .38,
      metalness: .62,
      clearcoat: .68,
      clearcoatRoughness: .27,
      sheen: .46,
      sheenColor: new THREE.Color("#7396b6"),
      sheenRoughness: .56,
      iridescence: .34,
      iridescenceIOR: 1.34,
      iridescenceThicknessRange: [210, 470],
      transmission: .018,
      thickness: .3,
      envMapIntensity: .78,
      emissive: new THREE.Color("#071523"),
      emissiveIntensity: .08,
    });
    const mobius = new THREE.Mesh(mobiusGeometry, mobiusMaterial);
    mobius.renderOrder = 2;
    model.add(mobius);

    const particleGeometry = new THREE.SphereGeometry(.095, 32, 24);
    const particleColor = new THREE.Color("#63c9ff");
    const particleCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: particleColor,
      roughness: .16,
      metalness: .18,
      clearcoat: 1,
      clearcoatRoughness: .1,
      emissive: new THREE.Color("#168fc9"),
      emissiveIntensity: .72,
      envMapIntensity: .9,
    });
    const particle = new THREE.Mesh(particleGeometry, particleCoreMaterial);
    const particleLight = new THREE.PointLight(0x45bfff, 3.2, 1.75, 2);
    particle.add(particleLight);
    model.add(particle);

    scene.add(new THREE.HemisphereLight(0x80bde6, 0x02050d, .92));
    const keyLight = new THREE.DirectionalLight(0xbfdcff, 1.8);
    keyLight.position.set(-3.8, 4.7, 6.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x7770d9, 4.6, 15);
    rimLight.position.set(4, -2.2, 4.5);
    scene.add(rimLight);
    const cyanLight = new THREE.PointLight(0x51b8db, 3.4, 13);
    cyanLight.position.set(-4, 1.8, 2.5);
    scene.add(cyanLight);

    let width = 1;
    let height = 1;
    let cameraRestingDistance = 10.8;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio, width < 620 ? 1.25 : 1.5);
      if (renderer.getPixelRatio() !== pixelRatio) renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      cameraRestingDistance = width < 620 ? 13.1 : 11.45;
      camera.position.set(0, 0, cameraRestingDistance);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const targetRotation = { x: -.14, y: -.12 };
    const velocity = { x: 0, y: 0 };
    const pointer = { pressed: false, active: false, id: -1, x: 0, y: 0, startX: 0, startY: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointer.pressed = true;
      pointer.active = false;
      pointer.id = event.pointerId;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.startX = event.clientX;
      pointer.startY = event.clientY;
      velocity.x = 0;
      velocity.y = 0;
    };
    const pointerMove = (event: PointerEvent) => {
      if (!pointer.pressed || event.pointerId !== pointer.id) return;
      if (!pointer.active) {
        const totalX = event.clientX - pointer.startX;
        const totalY = event.clientY - pointer.startY;
        if (Math.hypot(totalX, totalY) < 7) return;
        if (event.pointerType === "touch" && Math.abs(totalY) > Math.abs(totalX)) {
          pointer.pressed = false;
          pointer.id = -1;
          return;
        }
        pointer.active = true;
        canvas.setPointerCapture(event.pointerId);
        canvas.classList.add("is-dragging");
      }
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      targetRotation.y += dx * .009;
      targetRotation.x = THREE.MathUtils.clamp(targetRotation.x + dy * .007, -.65, .65);
      velocity.y = dx * .0018;
      velocity.x = dy * .0014;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointer.id) return;
      pointer.pressed = false;
      pointer.active = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.classList.remove("is-dragging");
      pointer.id = -1;
    };
    const resetView = () => {
      targetRotation.x = -.14;
      targetRotation.y = -.12;
      velocity.x = 0;
      velocity.y = 0;
    };
    const keyDown = (event: KeyboardEvent) => {
      const step = event.shiftKey ? .18 : .09;
      if (event.key === "ArrowLeft") targetRotation.y -= step;
      else if (event.key === "ArrowRight") targetRotation.y += step;
      else if (event.key === "ArrowUp") targetRotation.x = Math.max(-.65, targetRotation.x - step);
      else if (event.key === "ArrowDown") targetRotation.x = Math.min(.65, targetRotation.x + step);
      else if (event.key === "Enter" || event.key === "Home") resetView();
      else return;
      event.preventDefault();
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("dblclick", resetView);
    canvas.addEventListener("keydown", keyDown);

    const trackCenter = new THREE.Vector3();
    const trackTangent = new THREE.Vector3();
    const trackReference = new THREE.Vector3();
    const trackFrameA = new THREE.Vector3();
    const trackFrameB = new THREE.Vector3();
    const trackRibbonDirection = new THREE.Vector3();
    const trackSurfaceNormal = new THREE.Vector3();
    const particleTrackPoints: THREE.Vector3[] = [];
    const particleTrackSamples = 960;

    // A point offset from one face of a Möbius strip returns to its starting
    // orientation after two circuits. Sampling that double cover produces a
    // genuinely closed path on the ribbon instead of hiding a positional jump
    // at the seam.
    for (let index = 0; index < particleTrackSamples; index += 1) {
      const trackT = (index / particleTrackSamples) * Math.PI * 4;
      mobiusCenter(trackT, trackCenter);
      trackTangent.set(
        3.3 * Math.cos(trackT),
        2.68 * Math.cos(trackT * 2),
        -.92 * Math.sin(trackT),
      ).normalize();
      trackReference.set(0, 0, Math.abs(trackTangent.z) > .88 ? 0 : 1);
      if (trackReference.lengthSq() === 0) trackReference.set(0, 1, 0);
      trackFrameA.crossVectors(trackReference, trackTangent).normalize();
      trackFrameB.crossVectors(trackTangent, trackFrameA).normalize();
      trackRibbonDirection.copy(trackFrameA)
        .multiplyScalar(Math.cos(trackT / 2))
        .addScaledVector(trackFrameB, Math.sin(trackT / 2))
        .normalize();
      trackSurfaceNormal.crossVectors(trackTangent, trackRibbonDirection).normalize();
      particleTrackPoints.push(
        trackCenter.clone()
          .addScaledVector(trackRibbonDirection, .06)
          .addScaledVector(trackSurfaceNormal, .158),
      );
    }

    const particleTrack = new THREE.CatmullRomCurve3(particleTrackPoints, true, "centripetal", .35);
    particleTrack.arcLengthDivisions = 3200;
    particleTrack.updateArcLengths();
    const particleTarget = new THREE.Vector3();
    let particleProgress = .035;
    let previousFrameTime = performance.now();
    let animationFrame = 0;
    let isSceneVisible = false;
    let isDocumentVisible = !document.hidden;
    const animate = (frameTime: number) => {
      animationFrame = 0;
      const frameDelta = Math.min(Math.max((frameTime - previousFrameTime) / 1000, 0), .04);
      previousFrameTime = frameTime;
      if (!pointer.active) {
        velocity.x *= .94;
        velocity.y *= .94;
        targetRotation.x = THREE.MathUtils.clamp(targetRotation.x + velocity.x, -.65, .65);
        targetRotation.y += velocity.y;
      }
      model.rotation.x += (targetRotation.x - model.rotation.x) * .105;
      model.rotation.y += (targetRotation.y - model.rotation.y) * .105;
      const edgeOnAmount = Math.abs(Math.sin(model.rotation.y));
      const fittedCameraDistance = cameraRestingDistance + edgeOnAmount * 2 + Math.abs(model.rotation.x) * .45;
      camera.position.z += (fittedCameraDistance - camera.position.z) * .09;
      particleProgress = (particleProgress + frameDelta / (prefersReducedMotion ? 38 : 18)) % 1;
      particleTrack.getPointAt(particleProgress, particleTarget);
      particle.position.copy(particleTarget);
      const pulse = prefersReducedMotion ? 1 : .97 + Math.sin(frameTime * .0028) * .035;
      particle.scale.setScalar(pulse);
      renderer.render(scene, camera);
      if (isSceneVisible && isDocumentVisible) animationFrame = requestAnimationFrame(animate);
    };
    const startAnimation = () => {
      if (animationFrame || !isSceneVisible || !isDocumentVisible) return;
      previousFrameTime = performance.now();
      animationFrame = requestAnimationFrame(animate);
    };
    const stopAnimation = () => {
      if (!animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isSceneVisible = entry.isIntersecting;
      if (isSceneVisible) startAnimation();
      else stopAnimation();
    }, { rootMargin: "160px 0px", threshold: 0 });
    const handleDocumentVisibility = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) startAnimation();
      else stopAnimation();
    };

    particleTrack.getPointAt(particleProgress, particleTarget);
    particle.position.copy(particleTarget);
    renderer.render(scene, camera);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleDocumentVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("dblclick", resetView);
      canvas.removeEventListener("keydown", keyDown);
      environmentMap.dispose();
      roomEnvironment.dispose();
      pmrem.dispose();
      mobiusGeometry.dispose();
      mobiusMaterial.dispose();
      particleGeometry.dispose();
      particleCoreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="research-webgl-canvas"
      role="group"
      tabIndex={0}
      aria-label="Interactive 3D Möbius improvement loop. One particle travels continuously along the surface. Drag to rotate or use the arrow keys."
    />
  );
}

function ResearchInstrument() {
  return (
    <div className="research-orbit" data-reveal>
      <div className="research-loop-simulation">
        <ResearchOrbitalScene />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function HighlightedAuthors({ authors }: { authors: string }) {
  return authors.split(/(Xingzhi Qian)/g).map((part, index) =>
    part === "Xingzhi Qian"
      ? <strong className="author-self" key={`${part}-${index}`}>{part}</strong>
      : part,
  );
}

function BibTeXPanel({ bibtex, title }: { bibtex: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyBibTeX = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <details className="academic-bibtex">
      <summary>BibTeX</summary>
      <div className="bibtex-panel">
        <button type="button" onClick={copyBibTeX} aria-label={`Copy BibTeX citation for ${title}`}>
          {copied ? "Copied" : "Copy"}
        </button>
        <pre><code>{bibtex}</code></pre>
      </div>
    </details>
  );
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="academic-site">
      <AcademicGalaxyField />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="academic-header">
        <div className="academic-header-inner page-shell">
          <a className="academic-header-name" href="#about" aria-label="Xingzhi Qian — back to about">
            Xingzhi Qian
          </a>
          <nav className="academic-header-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#internships">Internships</a>
            <a href="#research">Research</a>
            <a href="#publications">Publications</a>
          </nav>
        </div>
      </header>
      <div className="academic-shell page-shell">
        <aside className="profile-sidebar" data-reveal>
          <div className="profile-avatar">
            <img src="/xingzhi-qian.jpg" alt="Portrait of Xingzhi Qian" width="857" height="1200" />
          </div>
          <h1>Xingzhi Qian</h1>
          <p className="profile-role">PhD Researcher <span className="nowrap">in Computer Science</span></p>
          <p className="profile-affiliation">University College London</p>
          <p className="profile-bio">I study the systems around LLM agents: context, grounding, efficiency, and learning from experience.</p>

          <div className="profile-meta">
            <span>London, United Kingdom</span>
            {/* <span>Microsoft Research Intern</span> */}
          </div>

          <div className="profile-links" aria-label="Academic profiles">
            <a href="mailto:xingzhi.qian.23@ucl.ac.uk" aria-label="Email Xingzhi Qian" title="xingzhi.qian.23@ucl.ac.uk"><MdEmail className="profile-link-icon email-icon" aria-hidden="true" /></a>
            <a href="https://scholar.google.com/citations?user=7f-Wk8YAAAAJ" target="_blank" rel="noreferrer" aria-label="Google Scholar" title="Google Scholar"><SiGooglescholar className="profile-link-icon scholar-icon" aria-hidden="true" /></a>
            <a href="https://github.com/Felixqxz" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><SiGithub className="profile-link-icon github-icon" aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/xingzhi-qian" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><SiLinkedin className="profile-link-icon linkedin-icon" aria-hidden="true" /></a>
          </div>

          <div className="sidebar-interests">
            <span>Research interests</span>
            <div>
              <strong>Context management</strong>
              <strong>Grounded Systems</strong>
              <strong>Agent efficiency</strong>
              <strong>RSI</strong>
              <strong>System Security</strong>
            </div>
          </div>
        </aside>

        <div className="academic-content">
          <section className="academic-section academic-intro" id="about" data-reveal>
            <span className="academic-label">About Me</span>
            <p className="academic-lead">
              I’m a PhD student in Computer Science at University College London,
              advised by <a href="https://s2lab.org/people/sullivan/" target="_blank" rel="noreferrer">Professor Lorenzo Cavallaro</a> in the
              <a href="https://s2lab.org/" target="_blank" rel="noreferrer"> Systems Security Research Lab (S2Lab)</a>. Previously, I completed my MEng degree in Computing (Artificial Intelligence and Machine Learning)
              at Imperial College London.
            </p>
            <p className="academic-lead">
              My research interests center on the systems around agents: context management, memory, tool use, routing, and verification.
              I study how these components can help agents reason over the right evidence, use computation efficiently, and improve from
              execution experience. I evaluate this work across diverse agent benchmarks and real-world domains, including program analysis
              and malware understanding.
            </p>
          </section>

          <section className="academic-section" id="education">
            <div className="academic-heading" data-reveal>
              <span className="academic-label">Education</span>
            </div>
            <div className="experience-track" data-reveal>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>Nov 2023—Oct 2027</span></div>
                  <h3>University College London</h3>
                  <p className="experience-company">MPhil / PhD · Computer Science</p>
                </div>
              </article>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>Sep 2019—Jun 2023</span></div>
                  <h3>Imperial College London</h3>
                  <p className="experience-company">MEng · Computing</p>
                </div>
              </article>
            </div>
          </section>

          <section className="academic-section" id="internships">
            <div className="academic-heading" data-reveal>
              <span className="academic-label">Internships</span>
            </div>
            <div className="experience-track" data-reveal>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>May—Oct 2026</span></div>
                  <h3>Microsoft</h3>
                  <p className="experience-company">Research Intern</p>
                  <p>Developing quality- and cost-efficient agent harness optimization across coding and general-purpose agent settings.</p>
                </div>
              </article>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>May—Sep 2022</span></div>
                  <h3>BAFTA Media Technology</h3>
                  <p className="experience-company">Software Engineering Intern</p>
                  <p>Built BAFTA View experiences for Fire TV and the web, with a focus on accessible cross-platform interaction.</p>
                </div>
              </article>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>May—Aug 2021</span></div>
                  <h3>Shanghai Ximalaya Technology</h3>
                  <p className="experience-company">Software Engineering in Test Intern</p>
                  <p>Designed automated API testing infrastructure and led smoke and regression testing for production services.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="academic-section" id="research">
            <div className="academic-heading" data-reveal>
              <span className="academic-label">Research</span>
              <p className="research-overview">
                My research studies how agent systems turn interaction into reliable improvement through four connected capabilities.
              </p>
              <div className="research-pillars" aria-label="Research directions">
                {researchSteps.map((step, index) => (
                  <article className={`research-pillar research-pillar-${index + 1}`} key={step.title}>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <ResearchInstrument />
          </section>

          <section className="academic-section" id="publications">
            <div className="academic-heading" data-reveal>
              <span className="academic-label">Publications</span>
              <p>Work on grounded agent reasoning, reliable evaluation, and LLMs for complex software systems.</p>
            </div>

            <div className="academic-publications">
              {papers.map((paper) => (
                <article className="academic-paper" key={paper.title} data-reveal>
                  <span className="academic-paper-year">{paper.year}</span>
                  <div>
                    <div className="academic-paper-meta">
                      <span>{paper.status}</span>
                      {paper.award && <strong>✦ {paper.award}</strong>}
                    </div>
                    <h3><a href={paper.paper} target="_blank" rel="noreferrer">{paper.title}</a></h3>
                    <p className="publication-summary">{paper.abstract}</p>
                    <p className="authors"><HighlightedAuthors authors={paper.authors} /></p>
                    <p className="venue">{paper.venue}</p>
                    <div className="academic-paper-links">
                      <a href={paper.paper} target="_blank" rel="noreferrer">Paper <ArrowIcon /></a>
                      {paper.code && <a href={paper.code} target="_blank" rel="noreferrer">Code <ArrowIcon /></a>}
                      <BibTeXPanel bibtex={paper.bibtex} title={paper.title} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="academic-footer">
            <span>© {new Date().getFullYear()} Xingzhi Qian</span>
            <span>Last updated October 2026</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
