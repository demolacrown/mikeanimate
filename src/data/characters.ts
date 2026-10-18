@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --deep-purple: #351064;
  --royal-blue: #1746A2;
  --midnight-blue: #071426;
  --metallic-gold: #D4AF37;
  --soft-gold: #F3D58A;
  --white: #FFFFFF;
  --milk-white: #F7F4EC;
  --forest-green: #14532D;
  --near-black: #09090F;
  --panel: rgba(17, 23, 36, 0.8);
  --muted: rgba(255,255,255,0.75);
  --shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top, rgba(53,16,100,0.3), transparent 45%),
    linear-gradient(180deg, #09090F, #0d1524 30%, #09090F 100%);
  color: var(--white);
}

img { max-width: 100%; display: block; }

a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }

.container { width: min(1200px, calc(100% - 32px)); margin: 0 auto; }

h1, h2, h3, h4 { font-family: 'Cinzel', serif; letter-spacing: 0.02em; }

.eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--soft-gold);
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
  background: rgba(7, 20, 38, 0.7);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--soft-gold);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--deep-purple), var(--royal-blue));
  box-shadow: 0 12px 30px rgba(23,70,162,0.45);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-links a {
  color: rgba(255,255,255,0.78);
  transition: color 0.2s ease;
}

.nav-links a.active, .nav-links a:hover { color: var(--soft-gold); }

.mobile-menu {
  display: none;
  background: transparent;
  border: 1px solid rgba(212,175,55,0.3);
  color: var(--white);
  border-radius: 8px;
  width: 42px;
  height: 42px;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 36px;
  min-height: 720px;
  padding-top: 42px;
}

.hero-copy h1 {
  font-size: clamp(2.9rem, 5vw, 5rem);
  line-height: 0.95;
  margin: 0 0 18px;
}

.hero-copy p {
  max-width: 660px;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 15px 22px;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:hover { transform: translateY(-1px); }

.button-primary {
  background: linear-gradient(135deg, var(--metallic-gold), #b98b13);
  color: #0a0d16;
  box-shadow: 0 16px 25px rgba(212,175,55,0.34);
}

.button-secondary {
  background: rgba(23,70,162,0.18);
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--white);
}

.button-ghost {
  background: transparent;
  border: 1px solid rgba(243,213,138,0.38);
  color: var(--soft-gold);
}

.hero-visual {
  position: relative;
}

.hero-image-card {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.12);
}

.hero-image-card img {
  width: 100%;
  height: min(74vw, 640px);
  object-fit: cover;
  filter: saturate(0.82) contrast(1.08);
}

.hero-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 26px 22px 18px;
  background: linear-gradient(180deg, transparent, rgba(7,20,38,0.9));
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-overlay span {
  color: var(--soft-gold);
  letter-spacing: 0.12em;
  font-size: 0.67rem;
  text-transform: uppercase;
}

.hero-overlay strong { font-size: 1.5rem; }

.scroll-indicator {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 26px 0 0;
}

.scroll-indicator span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--soft-gold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.66rem;
}

.feature-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.feature-box {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 22px;
  border-radius: 20px;
  background: rgba(23,70,162,0.08);
  border: 1px solid rgba(212,175,55,0.18);
}

.feature-box svg { color: var(--soft-gold); margin-top: 3px; }

.feature-box strong {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
}

.feature-box span {
  color: rgba(255,255,255,0.72);
  line-height: 1.6;
}

.section-block {
  padding: 90px 0 30px;
}

.section-heading {
  margin-bottom: 28px;
}

.section-heading h2, .section-heading h1 {
  margin: 0 0 10px;
  font-size: clamp(2rem, 4vw, 3.2rem);
}

.section-heading p {
  color: rgba(255,255,255,0.75);
  margin: 0;
}

.centered { text-align: center; }

.character-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.character-card {
  background: rgba(7,20,38,0.72);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.character-card:hover { transform: translateY(-4px); border-color: rgba(212,175,55,0.45); }

.card-image {
  position: relative;
  overflow: hidden;
  height: 260px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  left: 18px;
  bottom: 18px;
  padding: 8px 10px;
  background: rgba(12, 13, 21, 0.72);
  border: 1px solid rgba(243, 213, 138, 0.22);
  border-radius: 999px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.bookmark-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(7,20,38,0.68);
  color: var(--white);
}

.card-body {
  padding: 22px 20px 26px;
}

.card-body h3 {
  margin: 0 0 8px;
  font-size: 1.35rem;
}

.meta {
  margin: 0 0 12px;
  color: var(--soft-gold);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.short-copy {
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  min-height: 96px;
}

.card-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.mini-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mini-primary { background: linear-gradient(135deg, var(--metallic-gold), #b98b13); color: #0f1117; }
.mini-secondary { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); }

.alt-section {
  background: rgba(255,255,255,0.02);
}

.split-panel {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 26px;
  align-items: center;
  padding: 26px;
  border-radius: 26px;
  background: rgba(17, 23, 36, 0.8);
  border: 1px solid rgba(212,175,55,0.16);
}

.fact-card {
  background: linear-gradient(135deg, rgba(53,16,100,0.36), rgba(23,70,162,0.22));
  border-radius: 20px;
  padding: 22px;
  border: 1px solid rgba(212,175,55,0.18);
}

.fact-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--soft-gold);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 20px;
}

.collection-card {
  padding: 22px;
  border-radius: 18px;
  background: rgba(19, 23, 30, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.collection-card h3 { margin: 0 0 12px; }

.collection-card p { color: rgba(255,255,255,0.72); line-height: 1.7; }

.section-page {
  padding-top: 80px;
  padding-bottom: 80px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: min(350px, 100%);
  padding: 0 14px;
  min-height: 52px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(18, 25, 36, 0.8);
}

.search-box input {
  background: transparent;
  border: 0;
  outline: none;
  color: var(--white);
  width: 100%;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.02);
  color: var(--white);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}

.chip.active {
  background: rgba(212,175,55,0.12);
  border-color: rgba(212,175,55,0.38);
  color: var(--soft-gold);
}

.profile-page {
  padding-top: 72px;
  padding-bottom: 100px;
}

.profile-header {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 30px;
  align-items: center;
}

.profile-copy h1 {
  font-size: clamp(2.3rem, 4vw, 4rem);
  margin: 0 0 14px;
}

.profile-copy p {
  color: rgba(255,255,255,0.75);
  line-height: 1.9;
}

.profile-image-wrap {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  min-height: 420px;
  border: 1px solid rgba(255,255,255,0.12);
}

.profile-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-image-wrap span {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background: rgba(9,9,15,0.72);
  border: 1px solid rgba(243,213,138,0.26);
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 0.7rem;
}

.profile-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.article-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 30px;
  margin-top: 36px;
}

.toc {
  position: sticky;
  top: 90px;
  align-self: start;
  padding: 22px;
  border-radius: 18px;
  background: rgba(12, 19, 28, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.toc h3 { margin: 0 0 14px; }

.toc ul {
  list-style: none;
  padding: 0; margin: 0;
  display: grid;
  gap: 10px;
}

.toc li a { color: rgba(255,255,255,0.72); }

.article-body {
  background: rgba(7,20,38,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 26px;
  padding: 28px;
}

.article-body section {
  margin-bottom: 34px;
}

.article-body h2 {
  margin: 0 0 14px;
  font-size: clamp(1.7rem, 2vw, 2.4rem);
}

.article-body p, .article-body li {
  color: rgba(255,255,255,0.76);
  line-height: 1.9;
}

.timeline-list {
  display: grid;
  gap: 8px;
}

.related-panel {
  margin-top: 30px;
}

.mini-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 18px;
  margin-top: 18px;
}

.mini-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(18,25,36,0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 20px;
}

.video-card {
  display: block;
  overflow: hidden;
  background: rgba(17, 23, 36, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
}

.video-poster {
  height: 220px;
  background-size: cover;
  background-position: center;
}

.video-card-body {
  padding: 18px;
}

.video-card-body span {
  color: var(--soft-gold);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-card-body h3 { margin: 8px 0; }

.video-card-body small { color: rgba(255,255,255,0.68); }

.video-player-card {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 26px;
  align-items: center;
}

.video-frame {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.12);
  background: #050b13;
}

.video-frame img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.video-controls {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  display: flex;
  gap: 10px;
}

.player-btn {
  border: 0;
  border-radius: 999px;
  width: 42px;
  height: 42px;
  background: rgba(7,20,38,0.7);
  color: var(--white);
}

.video-content h1 {
  margin-top: 0;
  font-size: clamp(2rem, 3vw, 3rem);
}

.video-content p {
  color: rgba(255,255,255,0.72);
  line-height: 1.8;
}

.video-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  color: var(--soft-gold);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.timeline-wrap {
  position: relative;
  margin-top: 24px;
}

.timeline-wrap::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(212,175,55,0.3);
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 26px;
  padding: 0 0 22px 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--metallic-gold);
  box-shadow: 0 0 0 6px rgba(212,175,55,0.12);
}

.timeline-date {
  padding-top: 4px;
  color: var(--soft-gold);
  font-weight: 700;
}

.timeline-card {
  padding: 22px;
  border-radius: 18px;
  background: rgba(17,23,36,0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.timeline-card h3 { margin: 0 0 8px; }

.timeline-card p { color: rgba(255,255,255,0.7); line-height: 1.7; }

.map-panel {
  padding: 20px;
  border-radius: 24px;
  background: rgba(7,20,38,0.7);
  border: 1px solid rgba(255,255,255,0.08);
}

.map-surface {
  position: relative;
  min-height: 560px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(23,70,162,0.14), rgba(53,16,100,0.2)),
    url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
}

.map-pin {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(9, 9, 15, 0.76);
  border: 1px solid rgba(243,213,138,0.36);
  color: var(--soft-gold);
  font-size: 0.76rem;
}

.pin-1 { top: 28%; left: 43%; }
.pin-2 { top: 42%; left: 59%; }
.pin-3 { top: 52%; left: 48%; }
.pin-4 { top: 36%; left: 58%; }
.pin-5 { top: 52%; left: 64%; }
.pin-6 { top: 63%; left: 58%; }
.pin-7 { top: 40%; left: 31%; }
.pin-8 { top: 55%; left: 24%; }
.pin-9 { top: 44%; left: 44%; }
.pin-10 { top: 68%; left: 72%; }

.assistant-page {
  padding-bottom: 120px;
}

.assistant-chat {
  background: rgba(7,20,38,0.75);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 22px;
  overflow: hidden;
}

.chat-box {
  padding: 24px;
  display: grid;
  gap: 14px;
  min-height: 340px;
}

.chat-message {
  max-width: 80%;
  padding: 14px 18px;
  border-radius: 18px;
  line-height: 1.8;
}

.chat-message.user {
  margin-left: auto;
  background: linear-gradient(135deg, rgba(23,70,162,0.4), rgba(53,16,100,0.3));
}

.chat-message.assistant {
  background: rgba(255,255,255,0.04);
}

.chat-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 24px 18px;
}

.chat-suggestions button {
  background: rgba(255,255,255,0.03);
  color: var(--white);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
}

.chat-input-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 0 24px 24px;
}

.chat-input-row textarea {
  min-height: 80px;
  resize: vertical;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.02);
  color: var(--white);
  border-radius: 16px;
  padding: 14px 16px;
}

.about-panel {
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: 26px;
  align-items: center;
}

.avatar-card {
  width: 100%;
  min-height: 420px;
  display: grid;
  place-items: center;
  font-family: 'Cinzel', serif;
  font-size: 3rem;
  color: var(--soft-gold);
  background: linear-gradient(135deg, rgba(53,16,100,0.42), rgba(23,70,162,0.42));
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,0.08);
}

.about-copy p {
  color: rgba(255,255,255,0.75);
  line-height: 1.9;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 18px;
  margin-top: 30px;
}

.mission-card {
  padding: 22px;
  border-radius: 18px;
  background: rgba(17, 23, 36, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.mission-card ul {
  color: rgba(255,255,255,0.72);
  margin: 0;
  padding-left: 18px;
  line-height: 1.9;
}

.contact-card {
  padding: 28px;
  border-radius: 18px;
  background: rgba(17,23,36,0.8);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.72);
}

.footer {
  padding-top: 40px;
  background: rgba(9,9,15,0.9);
  border-top: 1px solid rgba(212,175,55,0.16);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr 0.8fr;
  gap: 30px;
  padding-bottom: 36px;
}

.footer-brand { margin-bottom: 12px; }

.footer p, .footer li, .footer a { color: rgba(255,255,255,0.72); }

.footer h4 { margin: 0 0 14px; }

.footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 0 28px;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.72);
  font-size: 0.85rem;
}

.intro-shell {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #070d17 0%, #0b1225 25%, #050a14 100%);
}

.intro-glow {
  position: absolute;
  width: 55vw;
  height: 55vw;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}

.intro-glow-purple { background: rgba(53,16,100,0.55); left: -10%; top: 10%; }
.intro-glow-blue { background: rgba(23,70,162,0.55); right: -10%; bottom: 12%; }

.intro-particles { position: absolute; inset: 0; }
.intro-particles span {
  position: absolute;
  left: var(--x, 50%);
  top: var(--y, 50%);
  width: var(--size, 5px);
  height: var(--size, 5px);
  border-radius: 50%;
  background: rgba(243,213,138,0.8);
  box-shadow: 0 0 14px rgba(243,213,138,0.7);
  animation: floatParticle 5s ease-in-out infinite alternate;
  animation-delay: var(--delay, 0s);
}

@keyframes floatParticle {
  0% { opacity: 0.2; transform: translateY(0) scale(0.8); }
  100% { opacity: 1; transform: translateY(-18px) scale(1.2); }
}

.intro-silhouette {
  position: absolute;
  bottom: 0;
  width: 32vw;
  height: 35vw;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02));
  clip-path: polygon(20% 100%, 30% 30%, 40% 0, 48% 30%, 55% 0, 66% 34%, 75% 100%);
  opacity: 0.34;
}

.silhouette-left { left: 12%; }
.silhouette-right { right: 12%; }

.intro-sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(243,213,138,0.15) 48%, transparent 100%);
  transform: translateX(-100%);
  animation: sweep 2.1s ease-in-out 0.7s forwards;
}

@keyframes sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.intro-brand-mark {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.5rem, 6vw, 6rem);
  letter-spacing: 0.12em;
  text-shadow: 0 0 22px rgba(212,175,55,0.45);
  position: relative;
  z-index: 2;
}

.skip-intro {
  position: absolute;
  top: 26px;
  right: 26px;
  background: rgba(9,9,15,0.5);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--white);
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  z-index: 4;
}

.brand-shell {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(180deg, #09090F 0%, #111827 38%, #09090F 100%);
}

.brand-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at center, rgba(212,175,55,0.12), transparent 40%),
    linear-gradient(90deg, rgba(53,16,100,0.18), rgba(23,70,162,0.08));
}

.brand-logo {
  position: relative;
  z-index: 2;
  font-family: 'Cinzel', serif;
  font-size: clamp(2.2rem, 7vw, 7rem);
  letter-spacing: 0.08em;
  color: #f5d17a;
  text-shadow: 0 0 20px rgba(212,175,55,0.5), 0 20px 35px rgba(0,0,0,0.55);
  transform-style: preserve-3d;
}

.brand-tagline {
  position: absolute;
  bottom: 122px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--soft-gold);
  letter-spacing: 0.18em;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.replay-brand {
  position: absolute;
  right: 26px;
  bottom: 26px;
  background: rgba(9,9,15,0.6);
  border: 1px solid rgba(243,213,138,0.26);
  color: var(--white);
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
}

.reading-progress {
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255,255,255,0.08);
  z-index: 40;
}

.reading-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--metallic-gold), var(--royal-blue));
}

@media (max-width: 1000px) {
  .hero, .profile-header, .video-player-card, .split-panel, .about-panel { grid-template-columns: 1fr; }
  .character-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .feature-strip, .collections-grid, .footer-grid, .mission-grid { grid-template-columns: 1fr; }
  .video-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}

@media (max-width: 760px) {
  .nav-links {
    position: absolute;
    top: 76px;
    left: 16px;
    right: 16px;
    flex-direction: column;
    align-items: stretch;
    background: rgba(7,20,38,0.97);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 18px;
    display: none;
  }

  .nav-links.nav-open { display: flex; }
  .mobile-menu { display: inline-flex; align-items: center; justify-content: center; }
  .nav-links a { padding: 8px 0; }
  .character-grid, .video-grid { grid-template-columns: 1fr; }
  .article-layout { grid-template-columns: 1fr; }
  .toolbar { align-items: stretch; }
  .search-box { width: 100%; }
  .chat-input-row { grid-template-columns: 1fr; }
  .hero .button { width: 100%; }
  .footer-bottom { flex-direction: column; }
}
