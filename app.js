const SITE = {
  herName: "my love",
  fromName: "Ali",
  dateLabel: "September 6th",
  intro: [
    "hey you.",
    "I made you something.",
    "it’s only a little website.",
    "but it’s just for you.",
  ],
  letter: `I wanted to give you something you could open. Not a text that disappears into the thread.

A quiet little place that exists because it’s your birthday, and because I love you.

Thank you for being the softest part of my days. I hope this year is very kind to you.

happy birthday.
always yours,`,
  reasons: [
    { title: "your laugh", copy: "it undoes my whole day, in the best way." },
    { title: "your heart", copy: "you care in the small, quiet ways nobody else sees." },
    { title: "this feeling", copy: "ordinary rooms feel warmer when you’re in them." },
    { title: "your mind", copy: "the way you notice things. the way you think." },
    { title: "how safe", copy: "I can be all of myself with you." },
    { title: "you", copy: "that’s the whole list, actually." },
  ],
};

const introText = document.querySelector("#introText");
const introBtn = document.querySelector("#introBtn");
const envelope = document.querySelector("#envelope");
const envelopeHint = document.querySelector("#envelopeHint");
const letterDate = document.querySelector("#letterDate");
const letterBody = document.querySelector("#letterBody");
const letterBtn = document.querySelector("#letterBtn");
const cards = document.querySelector("#cards");
const reasonsBtn = document.querySelector("#reasonsBtn");
const cake = document.querySelector("#cake");
const cakePrompt = document.querySelector("#cakePrompt");
const blowBtn = document.querySelector("#blowBtn");
const cakeBtn = document.querySelector("#cakeBtn");
const finaleName = document.querySelector("#finaleName");
const finaleFrom = document.querySelector("#finaleFrom");
const finaleKicker = document.querySelector("#finaleKicker");
const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");

let introStep = 0;
let confettiBits = [];
let confettiTimer = 0;

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

function renderCards() {
  cards.innerHTML = SITE.reasons
    .map(
      (reason, index) => `
        <button class="card" type="button" data-card="${index}" aria-label="${reason.title}">
          <span class="card-inner">
            <span class="card-face card-front">
              <span class="heart-mark">♥</span>
              <span class="card-label">${reason.title}</span>
            </span>
            <span class="card-face card-back">
              <p class="card-copy">${reason.copy}</p>
            </span>
          </span>
        </button>`
    )
    .join("");
}

function spawnFloaters(count = 14) {
  const root = document.querySelector("#floaters");
  root.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const span = document.createElement("span");
    span.className = "floater";
    span.textContent = i % 4 === 0 ? "✦" : "♥";
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${9 + Math.random() * 10}s`;
    span.style.animationDelay = `${Math.random() * 8}s`;
    span.style.fontSize = `${10 + Math.random() * 14}px`;
    root.appendChild(span);
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
    ctx.fillRect(-bit.size / 2, -bit.size / 2, bit.size, bit.size * 0.6);
    ctx.restore();
  });
  if (confettiTimer > 0 || confettiBits.length) {
    requestAnimationFrame(drawConfetti);
  }
}

function celebrate() {
  burst(window.innerWidth / 2, window.innerHeight * 0.28, 110);
  burst(window.innerWidth * 0.25, window.innerHeight * 0.4, 50);
  burst(window.innerWidth * 0.75, window.innerHeight * 0.4, 50);
  confettiTimer = 1;
  drawConfetti();
}

introText.textContent = SITE.intro[0];
letterDate.textContent = SITE.dateLabel;
finaleKicker.textContent = SITE.dateLabel.toLowerCase();
finaleName.textContent = SITE.herName;
finaleFrom.textContent = `— ${SITE.fromName}`;
renderCards();
spawnFloaters();
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
  envelopeHint.textContent = "for you";
  setTimeout(() => {
    showScene("letter");
    typeLetter(SITE.letter, () => letterBtn.classList.remove("is-hidden"));
  }, 1100);
});

letterBtn.addEventListener("click", () => showScene("reasons"));

cards.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) card.classList.toggle("is-flipped");
});

reasonsBtn.addEventListener("click", () => showScene("cake"));

blowBtn.addEventListener("click", () => {
  cake.classList.add("is-blown");
  cakePrompt.textContent = "happy birthday.";
  blowBtn.classList.add("is-hidden");
  cakeBtn.classList.remove("is-hidden");
  celebrate();
});

cakeBtn.addEventListener("click", () => {
  showScene("finale");
  celebrate();
  spawnFloaters(22);
});

window.addEventListener("resize", resizeCanvas);
