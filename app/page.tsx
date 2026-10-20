"use client";

import { useEffect, useRef, useState } from "react";
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
    label: "Observe",
    title: "Read the trajectory",
    detail: "Capture where context, tools, and computation actually change an agent’s path.",
    signal: "TRACE",
    readout: "Execution traces",
    packets: ["RUN / TRACE", "CONTEXT / MAP", "COST / PATH"],
  },
  {
    label: "Diagnose",
    title: "Find the bottleneck",
    detail: "Separate wasted effort from missing semantics, evidence, or control structure.",
    signal: "DELTA",
    readout: "Failure modes",
    packets: ["QUALITY / Δ", "WASTE / FOUND", "EVIDENCE / GAP"],
  },
  {
    label: "Adapt",
    title: "Rewrite the harness",
    detail: "Turn experience into auditable updates to prompts, tools, memory, and routing.",
    signal: "UPDATE",
    readout: "Agent harnesses",
    packets: ["PROMPT / EDIT", "TOOL / ROUTE", "MEMORY / PATCH"],
  },
  {
    label: "Verify",
    title: "Ground the gain",
    detail: "Test whether improvement is reliable, evidence-backed, and worth its cost.",
    signal: "PROOF",
    readout: "Grounded evidence",
    packets: ["CLAIM / CHECK", "SEMANTICS / LINK", "GAIN / VERIFY"],
  },
];

function ResearchInstrument() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState(0);
  const mode = researchSteps[activeMode];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${y * -4}deg`);
      card.style.setProperty("--tilt-y", `${x * 5}deg`);
      card.style.setProperty("--card-x", `${x * 14}px`);
      card.style.setProperty("--card-y", `${y * 14}px`);
      card.style.setProperty("--field-rx", `${y * -15}deg`);
      card.style.setProperty("--field-ry", `${x * 19}deg`);
    };

    const handleLeave = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--card-x", "0px");
      card.style.setProperty("--card-y", "0px");
      card.style.setProperty("--field-rx", "0deg");
      card.style.setProperty("--field-ry", "0deg");
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);
    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const advanceMode = () => setActiveMode((current) => (current + 1) % researchSteps.length);

  return (
    <div className="hero-visual" data-reveal>
      <div className="specimen-card" ref={cardRef} data-mode={activeMode}>
        <div className="specimen-topline">
          <span>RESEARCH SIGNAL / XQ—01</span>
          <span className="specimen-live"><i /> {mode.signal} MODE</span>
        </div>
        <div className="portrait-system">
          <span className="signal-grid" aria-hidden="true" />
          <span className="signal-sweep" aria-hidden="true" />
          <span className="signal-axis signal-axis-x" aria-hidden="true" />
          <span className="signal-axis signal-axis-y" aria-hidden="true" />
          <div className="orbital-field">
            <span className="orbit orbit-a" aria-hidden="true" />
            <span className="orbit orbit-b" aria-hidden="true" />
            <span className="orbit orbit-c" aria-hidden="true" />
            <button className="monogram-core" type="button" onClick={advanceMode} aria-label={`Advance from ${mode.label} to the next research stage`}>
              <span className="sphere-ring sphere-ring-a" aria-hidden="true" />
              <span className="sphere-ring sphere-ring-b" aria-hidden="true" />
            <span className="sphere-ring sphere-ring-c" aria-hidden="true" />
            <span className="monogram-index">0{activeMode + 1} / 04 · {mode.signal}</span>
            <span className="monogram-caption" aria-live="polite">{mode.title}<br /><em>Click to advance</em></span>
            </button>
            <span className="data-packet packet-a"><i /> {mode.packets[0]}</span>
            <span className="data-packet packet-b"><i /> {mode.packets[1]}</span>
            <span className="data-packet packet-c"><i /> {mode.packets[2]}</span>
          </div>
          <span className="coordinate coordinate-a">INPUT / EXPERIENCE</span>
          <span className="coordinate coordinate-b">OUTPUT / {mode.signal}</span>
          <span className="instrument-hint">MOVE POINTER · SELECT STAGE · CLICK CORE</span>
        </div>
        <div className="specimen-readout" aria-label="Research loop stages">
          {researchSteps.map((step, index) => (
            <button
              type="button"
              className={activeMode === index ? "active" : ""}
              onClick={() => setActiveMode(index)}
              onPointerEnter={() => setActiveMode(index)}
              onFocus={() => setActiveMode(index)}
              aria-pressed={activeMode === index}
              key={step.label}
            >
              <span>0{index + 1} / {step.label}</span>
              <strong>{step.readout}</strong>
            </button>
          ))}
        </div>
      </div>
      <span className="vertical-note">OBSERVE × DIAGNOSE × ADAPT × VERIFY</span>
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
              <strong>Grounding</strong>
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
            <div className="education-grid" data-reveal>
              <article className="education-card education-card-ucl">
                <div className="education-card-body">
                  <div className="education-card-meta"><em>London, UK</em></div>
                  <h3>MPhil / PhD · Computer Science</h3>
                  <p className="education-institution">University College London</p>
                  <p className="education-detail">Researching systems security in S2Lab, with a focus on agentic AI, program analysis, and grounded reasoning for malware and complex software understanding.</p>
                  <span className="education-dates">Nov 2023—Oct 2027</span>
                </div>
              </article>
              <article className="education-card education-card-icl">
                <div className="education-card-body">
                  <div className="education-card-meta"><em>London, UK</em></div>
                  <h3>MEng · Computing</h3>
                  <p className="education-institution">Imperial College London</p>
                  <p className="education-detail">Integrated master’s degree specializing in artificial intelligence and machine learning.</p>
                  <span className="education-dates">Sep 2019—Jun 2023</span>
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
                  <div className="experience-meta"><span>May—Oct 2026</span><em>Research</em></div>
                  <h3>Microsoft</h3>
                  <p className="experience-company">Research Intern</p>
                  <p>Developing quality- and cost-efficient agent harness optimization across coding and general-purpose agent settings.</p>
                </div>
              </article>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>May—Sep 2022</span><em>Engineering</em></div>
                  <h3>BAFTA Media Technology</h3>
                  <p className="experience-company">Software Engineering Intern</p>
                  <p>Built BAFTA View experiences for Fire TV and the web, with a focus on accessible cross-platform interaction.</p>
                </div>
              </article>
              <article>
                <div className="experience-card">
                  <div className="experience-meta"><span>May—Aug 2021</span><em>Quality</em></div>
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
              <p>I focus on four connected questions across the agent improvement loop.</p>
            </div>

            <div className="research-focus" data-reveal>
              <article>
                <span>Current direction · 01</span>
                <h3>Adaptive agent harnesses</h3>
                <p>Turn execution traces into auditable, recoverable updates to prompts, tools, memory, and routing, while jointly optimizing task quality and execution cost.</p>
              </article>
              <article>
                <span>Current direction · 02</span>
                <h3>Grounded program understanding</h3>
                <p>Combine program semantics, static analysis, and retrieval-grounded evidence so agents can produce precise, verifiable conclusions in complex software domains.</p>
              </article>
            </div>

            <div className="academic-topics" data-reveal>
              <article><span>01</span><div><h3>Context management</h3><p>Structure retrieval, memory, and execution history so agents reason over what matters.</p></div></article>
              <article><span>02</span><div><h3>Grounding</h3><p>Connect agent decisions to semantics, tool outputs, and evidence that can be inspected.</p></div></article>
              <article><span>03</span><div><h3>Efficiency</h3><p>Improve quality–cost trade-offs across context, routing, tools, and search.</p></div></article>
              <article><span>04</span><div><h3>Self-improvement</h3><p>Turn trajectories and failures into auditable updates to the surrounding harness.</p></div></article>
            </div>

            <div className="research-instrument-wrap" data-reveal>
              <ResearchInstrument />
            </div>
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
