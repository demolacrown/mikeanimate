import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ArrowRight,
  Bookmark,
  BookText,
  Compass,
  Copy,
  Eye,
  Filter,
  Globe,
  HelpCircle,
  Menu,
  MessageSquareText,
  Play,
  Search,
  Share2,
  Sparkles,
  Star,
  Volume2,
  X,
  CalendarClock,
  MapPin,
  ChevronRight,
  History,
  ShieldCheck,
  WandSparkles,
  Cpu,
  Lightbulb,
  CheckCircle2,
  Quote,
  CircleDashed,
  ChevronDown,
  Home,
  NotebookText,
  Users,
  TimerReset,
  Landmark,
  BookmarkPlus,
} from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { characters, timelineEvents, quickFacts, collectionGroups, glossaryTerms } from './data/characters';

type Character = (typeof characters)[number];

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

function App() {
  const [appPhase, setAppPhase] = useState<'intro' | 'brand' | 'site'>('intro');

  useEffect(() => {
    const seen = sessionStorage.getItem('mikeanimate-intro-seen');
    if (seen === 'true') {
      setAppPhase('site');
      return;
    }

    const introTimer = setTimeout(() => setAppPhase('brand'), 3500);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (appPhase === 'brand') {
      const timeout = setTimeout(() => {
        sessionStorage.setItem('mikeanimate-intro-seen', 'true');
        setAppPhase('site');
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [appPhase]);

  if (appPhase === 'intro') {
    return <IntroScreen onSkip={() => { sessionStorage.setItem('mikeanimate-intro-seen', 'true'); setAppPhase('site'); }} />;
  }

  if (appPhase === 'brand') {
    return <BrandAnimation onReplay={() => setAppPhase('brand')} onSkip={() => { sessionStorage.setItem('mikeanimate-intro-seen', 'true'); setAppPhase('site'); }} />;
  }

  return <SiteShell />;
}

function IntroScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="intro-shell">
      <div className="intro-glow intro-glow-purple" />
      <div className="intro-glow intro-glow-blue" />
      <div className="intro-particles">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index} style={{ ['--delay' as any]: `${index * 0.12}s`, ['--size' as any]: `${2 + (index % 5)}px` }} />
        ))}
      </div>
      <div className="intro-silhouette silhouette-left" />
      <div className="intro-silhouette silhouette-right" />
      <div className="intro-sweep" />
      <div className="intro-brand-mark">MIKEANIMATE</div>
      <button className="skip-intro" onClick={onSkip}>Skip Intro</button>
    </div>
  );
}

function BrandAnimation({ onReplay, onSkip }: { onReplay: () => void; onSkip: () => void }) {
  return (
    <div className="brand-shell">
      <div className="brand-bg" />
      <motion.div
        className="brand-logo"
        initial={{ opacity: 0, scale: 0.86, rotateX: 60 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 2.1, ease: 'easeOut' }}
      >
        MIKEANIMATE
      </motion.div>
      <motion.div
        className="brand-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.2, duration: 0.8 }}
      >
        AFRICAN HISTORY. IMMORTAL STORIES.
      </motion.div>
      <button className="skip-intro" onClick={onSkip}>Skip</button>
      <button className="replay-brand" onClick={onReplay}>Replay Brand Animation</button>
    </div>
  );
}

function SiteShell() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="page-shell">
      <header className="topbar">
        <nav className="nav container">
          <Link className="brand" to="/">
            <span className="brand-mark">M</span>
            <span>MIKEANIMATE</span>
          </Link>

          <button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen((p) => !p)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore History</NavLink>
            <NavLink to="/characters">Historical Characters</NavLink>
            <NavLink to="/watch">Watch Animations</NavLink>
            <NavLink to="/timeline">Historical Timelines</NavLink>
            <NavLink to="/map">Interactive Map</NavLink>
            <NavLink to="/assistant">AI History Assistant</NavLink>
            <NavLink to="/about">About Mike</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:slug" element={<CharacterProfile />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/watch/:slug" element={<VideoPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem('mikeanimate-bookmarks') || '[]'));
  const [dailyFact] = useState(quickFacts[0]);

  useEffect(() => {
    localStorage.setItem('mikeanimate-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (slug: string) => {
    setBookmarks((prev) => prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]);
  };

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">AFRICAN HISTORY. IMMORTAL STORIES.</span>
          <h1>THE PAST IS MORE ALIVE THAN YOU THINK.</h1>
          <p>
            Discover the kings who shaped kingdoms, the queens whose courage changed history, the warriors who defended their people, and the ancient civilizations whose stories still echo across generations.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/characters">EXPLORE THE LEGENDS</Link>
            <Link className="button button-secondary" to="/watch">WATCH THE STORIES</Link>
            <Link className="button button-ghost" to="/assistant">ASK THE HISTORY AI</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img alt="African royal architecture and historical imagery" src="https://images.unsplash.com/photo-1519904981063-b0bc7a1c5b7b?auto=format&fit=crop&w=1200&q=80" />
            <div className="hero-overlay">
              <span>Historical Storytelling</span>
              <strong>MIKEANIMATE</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-indicator"><span>Scroll</span></div>

      <section className="container feature-strip">
        <div className="feature-box">
          <Sparkles size={22} />
          <div>
            <strong>Immersive history</strong>
            <span>Visualizing Africa’s past through culture, memory, and motion.</span>
          </div>
        </div>
        <div className="feature-box">
          <History size={22} />
          <div>
            <strong>Research-led storytelling</strong>
            <span>Historical responsibility with clear distinctions between fact and legend.</span>
          </div>
        </div>
        <div className="feature-box">
          <Cpu size={22} />
          <div>
            <strong>AI-guided discovery</strong>
            <span>Explore characters, events, terms, and timelines with a carefully framed assistant.</span>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">Meet the legends</span>
          <h2>MEET THE LEGENDS</h2>
          <p>Behind every crown lies a story. Behind every monument lies a memory.</p>
        </div>
        <div className="character-grid">
          {characters.slice(0, 6).map((character) => (
            <article key={character.slug} className="character-card">
              <div className="card-image">
                <img src={character.image || 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&w=900&q=80'} alt={character.name} />
                <button className="bookmark-button" onClick={() => toggleBookmark(character.slug)}>
                  <Bookmark fill={bookmarks.includes(character.slug) ? '#D4AF37' : 'transparent'} size={18} />
                </button>
                <span className="badge">{character.category}</span>
              </div>
              <div className="card-body">
                <h3>{character.name}</h3>
                <p className="meta">{character.region}</p>
                <p className="short-copy">{character.description}</p>
                <div className="card-actions">
                  <Link className="mini-btn mini-primary" to={`/characters/${character.slug}`}>Read Full Story</Link>
                  <Link className="mini-btn mini-secondary" to={`/watch/${character.slug}`}>Watch Their Story</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block alt-section">
        <div className="split-panel">
          <div>
            <span className="eyebrow">Daily history</span>
            <h3>{dailyFact.title}</h3>
            <p>{dailyFact.summary}</p>
            <Link className="inline-link" to="/timeline">Explore the timeline</Link>
          </div>
          <div className="fact-card">
            <div className="fact-header">
              <CalendarClock size={18} />
              <span>{dailyFact.date}</span>
            </div>
            <p>{dailyFact.text}</p>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">Collections</span>
          <h2>Curated collections</h2>
        </div>
        <div className="collections-grid">
          {collectionGroups.map((group) => (
            <div className="collection-card" key={group.title}>
              <span className="eyebrow">{group.type}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ExplorePage() {
  return <section className="container section-page"><h1>Explore History</h1><p>Explore the kingdoms, empires, leaders, and traditions that shaped African civilizations across time.</p></section>;
}

function CharactersPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('All');
  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem('mikeanimate-bookmarks') || '[]'));

  useEffect(() => {
    localStorage.setItem('mikeanimate-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const filtered = characters.filter((character) => {
    const matchesQuery = `${character.name} ${character.region} ${character.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = selected === 'All' || character.category === selected;
    return matchesQuery && matchesFilter;
  });

  return (
    <section className="container section-page">
      <div className="section-heading centered">
        <span className="eyebrow">Historical Characters</span>
        <h1>MEET THE LEGENDS</h1>
      </div>

      <div className="toolbar">
        <div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search characters" /></div>
        <div className="filter-row">
          {['All','Kings','Queens','Warriors','Cultural Figures','Religious Figures','Empire Builders','Political Leaders','Legendary Figures'].map((item) => (
            <button key={item} className={selected === item ? 'chip active' : 'chip'} onClick={() => setSelected(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="character-grid">
        {filtered.map((character) => (
          <article key={character.slug} className="character-card">
            <div className="card-image">
              <img src={character.image || 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&w=900&q=80'} alt={character.name} />
              <button className="bookmark-button" onClick={() => setBookmarks((prev) => prev.includes(character.slug) ? prev.filter((item) => item !== character.slug) : [...prev, character.slug])}>
                <Bookmark fill={bookmarks.includes(character.slug) ? '#D4AF37' : 'transparent'} size={18} />
              </button>
              <span className="badge">{character.category}</span>
            </div>
            <div className="card-body">
              <h3>{character.name}</h3>
              <p className="meta">{character.region}</p>
              <p className="short-copy">{character.description}</p>
              <div className="card-actions">
                <Link className="mini-btn mini-primary" to={`/characters/${character.slug}`}>Read Full Story</Link>
                <Link className="mini-btn mini-secondary" to={`/watch/${character.slug}`}>Watch Their Story</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CharacterProfile() {
  const { slug } = useParams();
  const character = characters.find((item) => item.slug === slug) ?? characters[0];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const next = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(next);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const related = characters.filter((item) => item.region === character.region).slice(0, 3);

  return (
    <div className="container profile-page">
      <div className="reading-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="profile-header">
        <div className="profile-copy">
          <span className="eyebrow">{character.category}</span>
          <h1>{character.name}</h1>
          <p>{character.description}</p>
          <div className="profile-actions">
            <Link className="button button-primary" to={`/watch/${character.slug}`}>Watch Their Story</Link>
            <button className="button button-secondary">Ask Mike History AI</button>
          </div>
        </div>
        <div className="profile-image-wrap">
          <img src={character.image || 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&w=900&q=80'} alt={character.name} />
          <span>{character.imageKind}</span>
        </div>
      </div>

      <div className="article-layout">
        <aside className="toc">
          <h3>Table of contents</h3>
          <ul>
            {['Introduction','The world they lived in','Early life and origins','Rise to prominence','Major historical events','Leadership and influence','Cultural legacy','Fact or legend?','Historical timeline','Did you know?','Historical sources','Continue exploring'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{item}</a></li>
            ))}
          </ul>
        </aside>

        <article className="article-body">
          <section id="introduction"><h2>Introduction</h2><p>{character.article.introduction}</p></section>
          <section id="the-world-they-lived-in"><h2>The world they lived in</h2><p>{character.article.world}</p></section>
          <section id="early-life-and-origins"><h2>Early life and origins</h2><p>{character.article.earlyLife}</p></section>
          <section id="rise-to-prominence"><h2>Rise to prominence</h2><p>{character.article.rise}</p></section>
          <section id="major-historical-events"><h2>Major historical events</h2><p>{character.article.events}</p></section>
          <section id="leadership-and-influence"><h2>Leadership and influence</h2><p>{character.article.leadership}</p></section>
          <section id="cultural-legacy"><h2>Cultural and historical legacy</h2><p>{character.article.legacy}</p></section>
          <section id="fact-or-legend"><h2>Fact or legend?</h2><p>{character.article.factOrLegend}</p></section>
          <section id="historical-timeline"><h2>Historical timeline</h2><ul className="timeline-list">{character.timeline.map((item) => <li key={item.name}><strong>{item.year}</strong> — {item.name}</li>)}</ul></section>
          <section id="did-you-know"><h2>Did you know?</h2><ul>{character.didYouKnow.map((fact) => <li key={fact}>{fact}</li>)}</ul></section>
          <section id="historical-sources"><h2>Historical sources</h2><ul>{character.sources.map((source) => <li key={source}><a href={source} target="_blank" rel="noreferrer">{source}</a></li>)}</ul></section>
          <section id="continue-exploring"><h2>Continue exploring</h2><p>{character.article.continue}</p></section>
        </article>
      </div>

      <div className="related-panel">
        <h3>Related characters</h3>
        <div className="mini-cards">
          {related.map((relatedCharacter) => (
            <Link key={relatedCharacter.slug} to={`/characters/${relatedCharacter.slug}`} className="mini-card">
              <strong>{relatedCharacter.name}</strong>
              <span>{relatedCharacter.region}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function WatchPage() {
  return (
    <section className="container section-page">
      <div className="section-heading">
        <span className="eyebrow">Watch animations</span>
        <h1>THE MIKEANIMATE CINEMATIC ARCHIVE</h1>
        <p>Watch history unfold through cinematic introductions and carefully researched story arcs.</p>
      </div>
      <div className="video-grid">
        {characters.slice(0, 8).map((character) => (
          <Link key={character.slug} to={`/watch/${character.slug}`} className="video-card">
            <div className="video-poster" style={{ backgroundImage: `url(${character.image || 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&w=900&q=80'})` }} />
            <div className="video-card-body">
              <span>{character.category}</span>
              <h3>{character.name}</h3>
              <small>{character.period}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function VideoPage() {
  const { slug } = useParams();
  const character = characters.find((item) => item.slug === slug) ?? characters[0];

  return (
    <section className="container section-page video-player-page">
      <div className="video-player-card">
        <div className="video-frame">
          <img src={character.image || 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&w=900&q=80'} alt={character.name} />
          <div className="video-controls">
            <button className="player-btn"><Play size={18} /></button>
            <button className="player-btn"><Volume2 size={18} /></button>
            <button className="player-btn">CC</button>
            <button className="player-btn">Full</button>
          </div>
        </div>
        <div className="video-content">
          <h1>{character.videoTitle}</h1>
          <p>{character.videoDescription}</p>
          <div className="video-metadata">
            <span>Duration: 12 sec</span>
            <span>Aspect ratio: 16:9</span>
            <span>{character.imageKind}</span>
          </div>
          <div className="profile-actions">
            <Link className="button button-primary" to={`/characters/${character.slug}`}>Read the Full History</Link>
            <Link className="button button-secondary" to="/assistant">Ask AI About This Character</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelinePage() {
  return (
    <section className="container section-page">
      <div className="section-heading">
        <span className="eyebrow">Travel through time</span>
        <h1>TRAVEL THROUGH TIME</h1>
        <p>Follow the events, kingdoms, and turning points that shaped Africa’s history across generations.</p>
      </div>
      <div className="timeline-wrap">
        {timelineEvents.map((event) => (
          <div className="timeline-item" key={event.title}>
            <div className="timeline-date">{event.date}</div>
            <div className="timeline-card">
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
              <small>{event.region}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MapPage() {
  return (
    <section className="container section-page">
      <div className="section-heading">
        <span className="eyebrow">Explore the kingdoms of Africa</span>
        <h1>EXPLORE THE KINGDOMS OF AFRICA</h1>
        <p>Approximate historical locations and cultural associations are included to support exploration while respecting the changing nature of borders and political geography.</p>
      </div>
      <div className="map-panel">
        <div className="map-surface">
          <div className="map-pin pin-1"><span>Ile-Ife</span></div>
          <div className="map-pin pin-2"><span>Oyo</span></div>
          <div className="map-pin pin-3"><span>Benin</span></div>
          <div className="map-pin pin-4"><span>Zazzau</span></div>
          <div className="map-pin pin-5"><span>Sokoto</span></div>
          <div className="map-pin pin-6"><span>Opobo</span></div>
          <div className="map-pin pin-7"><span>Mali</span></div>
          <div className="map-pin pin-8"><span>Asante</span></div>
          <div className="map-pin pin-9"><span>Dahomey</span></div>
          <div className="map-pin pin-10"><span>Zulu</span></div>
        </div>
      </div>
    </section>
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Welcome to MIKE HISTORY AI. Ask about a kingdom, a ruler, an event, or a disputed historical story.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const result = await response.json();

      setMessages((prev) => [...prev, { role: 'assistant', text: result.answer || result.error || 'The assistant could not answer at the moment.' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'The AI assistant is unavailable right now. Please try again later or use the demo answers.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container section-page assistant-page">
      <div className="section-heading">
        <span className="eyebrow">MIKE HISTORY AI</span>
        <h1>ASK THE PAST. DISCOVER THE STORY.</h1>
      </div>
      <div className="assistant-chat">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <div>{message.text}</div>
            </div>
          ))}
          {loading && <div className="chat-message assistant"><div>Thinking...</div></div>}
        </div>
        <div className="chat-suggestions">
          {['Who was Queen Moremi?', 'What is the traditional story of Oduduwa?', 'How did the Mali Empire become powerful?', 'What is the difference between history and oral tradition?'].map((question) => (
            <button key={question} onClick={() => setInput(question)}>{question}</button>
          ))}
        </div>
        <div className="chat-input-row">
          <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a king, queen, kingdom, or historical event..." />
          <button onClick={sendQuestion} className="button button-primary">Send</button>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="container section-page about-page">
      <div className="section-heading">
        <span className="eyebrow">The creator behind MIKEANIMATE</span>
        <h1>THE CREATOR BEHIND MIKEANIMATE</h1>
      </div>
      <div className="about-panel">
        <div className="about-visual">
          <div className="avatar-card">MIKE</div>
        </div>
        <div className="about-copy">
          <p>MIKEANIMATE is the creative vision of Demola Crown, a young Nigerian digital creator with a passion for animation, storytelling, technology, and discovering how things work.</p>
          <p>Inspired by the richness of African history and the possibilities of modern digital creativity, Demola created MIKEANIMATE to help people experience historical stories in a more engaging, visual, and memorable way.</p>
          <p>His vision is to combine cinematic animation, historical research, digital storytelling, and emerging AI technology to make the past more accessible to a new generation.</p>
          <p>Through MIKEANIMATE, he hopes to encourage curiosity, preserve cultural memory, and inspire people to explore the remarkable stories that history has left behind.</p>
        </div>
      </div>
      <div className="mission-grid">
        <div className="mission-card"><h3>WHY MIKEANIMATE EXISTS</h3><p>To make African history more accessible through accurate research, cinematic storytelling, engaging visuals, and interactive digital experiences.</p></div>
        <div className="mission-card"><h3>OUR VISION</h3><p>To build a creative platform where people around the world can discover the people, places, kingdoms, and traditions that shaped Africa’s past.</p></div>
        <div className="mission-card"><h3>OUR VALUES</h3><ul><li>Historical responsibility.</li><li>Creativity.</li><li>Cultural respect.</li><li>Curiosity.</li><li>Accessibility.</li></ul></div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="container section-page">
      <div className="section-heading"><span className="eyebrow">Contact</span><h1>Get in touch</h1></div>
      <div className="contact-card"><p>Contact details are intentionally left as placeholders until the project has a verified communication channel.</p></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">M</span><span>MIKEANIMATE</span></div>
          <p>Cinematic African history storytelling for curious minds.</p>
        </div>
        <div>
          <h4>Main navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/characters">Characters</Link></li>
            <li><Link to="/assistant">AI Assistant</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h4>Collections</h4>
          <ul>
            <li><Link to="/characters">Women Who Shaped African History</Link></li>
            <li><Link to="/timeline">Kingdoms and Empires</Link></li>
            <li><Link to="/map">African Resistance</Link></li>
          </ul>
        </div>
        <div>
          <h4>Policy</h4>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Image Attribution</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MIKEANIMATE</span>
        <span>Historical sources and image attributions should be reviewed before publication.</span>
      </div>
    </footer>
  );
}

export default App;
