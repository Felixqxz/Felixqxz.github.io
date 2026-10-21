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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnvironment = new RoomEnvironment();
    const environmentMap = pmrem.fromScene(roomEnvironment, .045).texture;
    scene.environment = environmentMap;
    const model = new THREE.Group();
    model.rotation.set(-.14, -.12, -.025);
    scene.add(model);

    const mobiusGeometry = createMobiusGeometry();
    const mobiusMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7895a4"),
      side: THREE.DoubleSide,
      roughness: .3,
      metalness: .28,
      clearcoat: 1,
      clearcoatRoughness: .16,
      sheen: .2,
      sheenColor: new THREE.Color("#dbe8ed"),
      iridescence: .12,
      iridescenceIOR: 1.28,
      iridescenceThicknessRange: [140, 260],
      transmission: .035,
      thickness: .38,
      envMapIntensity: 1.38,
      emissive: new THREE.Color("#18394b"),
      emissiveIntensity: .022,
    });
    const mobius = new THREE.Mesh(mobiusGeometry, mobiusMaterial);
    mobius.renderOrder = 2;
    model.add(mobius);

    const particleGeometry = new THREE.SphereGeometry(.095, 32, 24);
    const particleColor = new THREE.Color("#1268a8");
    const particleCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: particleColor,
      roughness: .2,
      metalness: .08,
      clearcoat: 1,
      clearcoatRoughness: .1,
      emissive: new THREE.Color("#0b4d7f"),
      emissiveIntensity: .2,
      envMapIntensity: 1.25,
    });
    const particle = new THREE.Mesh(particleGeometry, particleCoreMaterial);
    model.add(particle);

    scene.add(new THREE.HemisphereLight(0xf3fbff, 0x17233f, 1.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(-3.8, 4.7, 6.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x6f9caf, 10, 15);
    rimLight.position.set(4, -2.2, 4.5);
    scene.add(rimLight);
    const cyanLight = new THREE.PointLight(0xa8d5e4, 7, 13);
    cyanLight.position.set(-4, 1.8, 2.5);
    scene.add(cyanLight);

    let width = 1;
    let height = 1;
    let cameraRestingDistance = 10.8;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      cameraRestingDistance = width < 620 ? 12.4 : 10.8;
      camera.position.set(0, 0, cameraRestingDistance);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const targetRotation = { x: -.14, y: -.12 };
    const velocity = { x: 0, y: 0 };
    const pointer = { active: false, id: -1, x: 0, y: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointer.active = true;
      pointer.id = event.pointerId;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      velocity.x = 0;
      velocity.y = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    };
    const pointerMove = (event: PointerEvent) => {
      if (!pointer.active || event.pointerId !== pointer.id) return;
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
      if (!pointer.active || event.pointerId !== pointer.id) return;
      pointer.active = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.classList.remove("is-dragging");
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
    const animate = (frameTime: number) => {
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
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
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
