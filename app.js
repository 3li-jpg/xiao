const SITE = {
  herName: "Ashwaki",
  fromName: "Alawi",
  dateLabel: "September 6th",
  intro: [
    "hey Ashwaki.",
    "I made you something.",
    "it’s only a little website.",
    "but it’s just for you.",
  ],
  letter: `Ashwaki,

I wanted to give you something you could open. Not a text that disappears.

A quiet little place that exists because it’s your birthday, and because I love you.

happy birthday.
always yours,`,
};

const introText = document.querySelector("#introText");
const introBtn = document.querySelector("#introBtn");
const envelope = document.querySelector("#envelope");
const envelopeHint = document.querySelector("#envelopeHint");
const letterDate = document.querySelector("#letterDate");
const letterBody = document.querySelector("#letterBody");
const letterBtn = document.querySelector("#letterBtn");
const cake = document.querySelector("#cake");
const cakePrompt = document.querySelector("#cakePrompt");
const blowBtn = document.querySelector("#blowBtn");
const cakeBtn = document.querySelector("#cakeBtn");
const finaleName = document.querySelector("#finaleName");
const finaleFrom = document.querySelector("#finaleFrom");
const finaleKicker = document.querySelector("#finaleKicker");
const photoBtn = document.querySelector("#photoBtn");
const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");

let introStep = 0;
let confettiBits = [];
let confettiTimer = 0;

function isPhone() {
  return window.matchMedia("(max-width: 700px)").matches || window.innerHeight < 760;
}

function showScene(name) {
  document.querySelectorAll(".scene").forEach((scene) => {
    scene.classList.toggle("is-on", scene.dataset.scene === name);
  });
}

function typeLetter(text, onDone) {
  const full = `${text}\n${SITE.fromName}`;
  let i = 0;
  letterBody.textContent = "";

  const tick = () => {
    letterBody.textContent = full.slice(0, i);
    if (i >= full.length) {
      onDone();
      return;
    }
    const ch = full[i];
    i += 1;
    const pause = ch === "." || ch === "!" ? 180 : ch === "\n" ? 90 : 22;
    setTimeout(tick, pause);
  };

  tick();
}

function spawnFloaters(count) {
  const root = document.querySelector("#floaters");
  const glyphs = ["♥", "♥", "♥", "♡", "♥"];
  const n = count ?? (isPhone() ? 18 : 42);
  root.innerHTML = "";
  for (let i = 0; i < n; i += 1) {
    const span = document.createElement("span");
    span.className = "floater";
    span.textContent = glyphs[i % glyphs.length];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${7 + Math.random() * 9}s`;
    span.style.animationDelay = `${Math.random() * 6}s`;
    span.style.fontSize = `${10 + Math.random() * (isPhone() ? 14 : 22)}px`;
    span.style.color = i % 3 === 0 ? "#7a3b45" : "#c97b84";
    root.appendChild(span);
  }
}

function spawnScatter() {
  const root = document.querySelector("#heartScatter");
  const spots = isPhone()
    ? [
        [8, 10], [88, 12], [6, 38], [92, 44],
        [8, 72], [90, 68], [48, 5], [92, 88],
        [8, 88], [78, 32],
      ]
    : [
        [6, 8], [18, 14], [88, 10], [94, 22], [8, 42], [92, 48],
        [4, 70], [14, 86], [86, 78], [96, 62], [48, 6], [72, 12],
        [28, 90], [62, 88], [40, 8], [80, 36], [12, 58], [90, 84],
        [22, 28], [76, 68], [34, 76], [58, 18], [10, 22], [84, 54],
      ];
  root.innerHTML = spots
    .map(
      ([x, y], i) =>
        `<span style="left:${x}%;top:${y}%;font-size:${12 + (i % 4) * 5}px;animation-delay:${(i * 0.18).toFixed(2)}s">${i % 4 === 0 ? "♡" : "♥"}</span>`
    )
    .join("");
}

function popHeart(x, y, extra = "") {
  const heart = document.createElement("span");
  heart.className = "tap-heart";
  heart.textContent = extra || (Math.random() > 0.25 ? "♥" : "♡");
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${18 + Math.random() * 18}px`;
  heart.style.color = Math.random() > 0.5 ? "#7a3b45" : "#c97b84";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
}

function burstHearts(x, y, amount = 10) {
  for (let i = 0; i < amount; i += 1) {
    const dx = x + (Math.random() - 0.5) * 90;
    const dy = y + (Math.random() - 0.5) * 60;
    setTimeout(() => popHeart(dx, dy), i * 40);
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function burst(x, y, amount = 80) {
  const colors = ["#c97b84", "#b8956c", "#7a3b45", "#e8c9c4", "#fff8f1"];
  for (let i = 0; i < amount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    confettiBits.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 3 + Math.random() * 4,
      color: colors[i % colors.length],
      life: 90 + Math.random() * 40,
      spin: Math.random() * 0.2,
    });
  }
}

function drawHeartShape(size) {
  const s = Math.max(size, 4);
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(0, -s * 0.25, -s, -s * 0.25, -s, s * 0.2);
  ctx.bezierCurveTo(-s, s * 0.65, 0, s * 1.05, 0, s * 1.15);
  ctx.bezierCurveTo(0, s * 1.05, s, s * 0.65, s, s * 0.2);
  ctx.bezierCurveTo(s, -s * 0.25, 0, -s * 0.25, 0, s * 0.35);
  ctx.closePath();
  ctx.fill();
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiBits = confettiBits.filter((bit) => bit.life > 0);
  confettiBits.forEach((bit) => {
    bit.x += bit.vx;
    bit.y += bit.vy;
    bit.vy += 0.12;
    bit.life -= 1;
    ctx.save();
    ctx.translate(bit.x, bit.y);
    ctx.rotate(bit.life * bit.spin);
    ctx.globalAlpha = Math.max(bit.life / 120, 0);
    ctx.fillStyle = bit.color;
    drawHeartShape(bit.size);
    ctx.restore();
  });
  if (confettiTimer > 0 || confettiBits.length) {
    requestAnimationFrame(drawConfetti);
  }
}

function celebrate() {
  const amount = isPhone() ? 70 : 140;
  burst(window.innerWidth / 2, window.innerHeight * 0.28, amount);
  burst(window.innerWidth * 0.22, window.innerHeight * 0.42, isPhone() ? 30 : 70);
  burst(window.innerWidth * 0.78, window.innerHeight * 0.42, isPhone() ? 30 : 70);
  burstHearts(window.innerWidth / 2, window.innerHeight * 0.35, isPhone() ? 8 : 16);
  confettiTimer = 1;
  drawConfetti();
}

introText.textContent = SITE.intro[0];
letterDate.textContent = SITE.dateLabel;
finaleKicker.textContent = SITE.dateLabel.toLowerCase();
finaleName.textContent = SITE.herName;
finaleFrom.textContent = `— ${SITE.fromName}`;
spawnFloaters();
spawnScatter();
resizeCanvas();

introBtn.addEventListener("click", () => {
  introStep += 1;
  if (introStep < SITE.intro.length) {
    introText.style.opacity = "0";
    setTimeout(() => {
      introText.textContent = SITE.intro[introStep];
      introText.style.opacity = "1";
      if (introStep === SITE.intro.length - 1) introBtn.textContent = "open it";
    }, 180);
    return;
  }
  showScene("envelope");
});

introText.style.transition = "opacity 0.18s ease";

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("is-open")) return;
  envelope.classList.add("is-open");
  envelopeHint.textContent = `for ${SITE.herName} ♥`;
  burstHearts(window.innerWidth / 2, window.innerHeight * 0.45, 14);
  setTimeout(() => {
    showScene("letter");
    typeLetter(SITE.letter, () => letterBtn.classList.remove("is-hidden"));
  }, 1100);
});

letterBtn.addEventListener("click", () => showScene("photo"));
photoBtn.addEventListener("click", () => showScene("cake"));

blowBtn.addEventListener("click", () => {
  cake.classList.add("is-blown");
  cakePrompt.textContent = `happy birthday, ${SITE.herName}.`;
  blowBtn.classList.add("is-hidden");
  cakeBtn.classList.remove("is-hidden");
  celebrate();
});

cakeBtn.addEventListener("click", () => {
  showScene("finale");
  celebrate();
  spawnFloaters(isPhone() ? 28 : 56);
});

document.addEventListener("pointerdown", (event) => {
  popHeart(event.clientX, event.clientY);
});

window.addEventListener("resize", resizeCanvas);

const startScene = new URLSearchParams(location.search).get("scene");
if (startScene) showScene(startScene);
