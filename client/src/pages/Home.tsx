/*
 * Diseño: Casa criolla contemporánea — modernismo tropical editorial.
 * Esta página prioriza la mesa compartida, una composición asimétrica y la paleta Añil de Patio, terracota e marfil.
 */
import { useEffect, useState } from "react";
import {
  ArrowUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Expand,
  Facebook,
  Flame,
  Instagram,
  Leaf,
  Menu as MenuIcon,
  MapPin,
  Quote,
  UtensilsCrossed,
  Wine,
  X,
} from "lucide-react";
import { toast } from "sonner";

type MenuCategory = "Entrantes" | "Fuertes" | "Bebidas" | "Postres";
type DietaryProfile = "vegan" | "diabetes" | "hypertension";

const menuItems: Record<MenuCategory, { name: string; description: string; price: string; note?: string; image: string; alt: string }[]> = {
  Entrantes: [
    { name: "Tostones de la casa", description: "Plátano verde, ajo, limón y sal de patio.", price: "$8", note: "para compartir", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=240&q=80", alt: "Tostones dorados servidos para compartir" },
    { name: "Yuca con mojo", description: "Yuca tierna, mojo de naranja agria y hierbas frescas.", price: "$7", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=240&q=80", alt: "Plato de yuca y vegetales con hierbas frescas" },
    { name: "Croquetas de jamón", description: "Bechamel cremosa, jamón curado y migas de pan doradas.", price: "$9", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=240&q=80", alt: "Bocados crujientes de cocina casera" },
  ],
  Fuertes: [
    { name: "Ropa vieja", description: "Res cocida a fuego lento, tomate, pimientos y especias dulces.", price: "$18", note: "receta de la casa", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80", alt: "Plato principal de carne deshebrada con verduras" },
    { name: "Lechón asado", description: "Cerdo marinado en naranja agria, ajo y orégano criollo.", price: "$19", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=240&q=80", alt: "Carne asada servida en un plato de restaurante" },
    { name: "Arroz congrí con vegetales", description: "Frijol negro, arroz, plátano maduro y ensalada de temporada.", price: "$15", note: "sin carne", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80", alt: "Arroz con vegetales y acompañamientos frescos" },
  ],
  Bebidas: [
    { name: "Guarapo con limón", description: "Caña de azúcar recién prensada, hielo y cítrico.", price: "$6", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=240&q=80", alt: "Bebida fresca servida con cítricos y hielo" },
    { name: "Mojito de la casa", description: "Ron blanco, hierbabuena, lima y azúcar demerara.", price: "$11", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=240&q=80", alt: "Cóctel refrescante con hierbabuena y lima" },
    { name: "Café cubano", description: "Espresso corto, intenso y servido al momento.", price: "$4", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=240&q=80", alt: "Taza de café espresso recién servido" },
  ],
  Postres: [
    { name: "Flan de coco", description: "Flan sedoso, caramelo oscuro y ralladura de lima.", price: "$8", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80", alt: "Postre cremoso con caramelo y decoración de temporada" },
    { name: "Pastel de guayaba y queso", description: "Dulce de guayaba, queso crema y galleta de mantequilla.", price: "$9", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=240&q=80", alt: "Postre dulce servido en un plato claro" },
    { name: "Helado de mamey", description: "Helado artesanal, crumble de canela y sal marina.", price: "$7", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=240&q=80", alt: "Helado artesanal servido en una copa" },
  ],
};

const categories: { id: MenuCategory; icon: typeof UtensilsCrossed }[] = [
  { id: "Entrantes", icon: UtensilsCrossed },
  { id: "Fuertes", icon: Flame },
  { id: "Bebidas", icon: Wine },
  { id: "Postres", icon: Leaf },
];

const dietaryProfiles: Record<DietaryProfile, { title: string; subtitle: string; summary: string; recommendations: { name: string; desc: string; tip: string }[] }> = {
  vegan: {
    title: "Opciones veganas y de origen vegetal",
    subtitle: "Sin carnes, lácteos ni caldos animales",
    summary: "Nuestra cocina criolla puede disfrutarse sin productos de origen animal seleccionando ingredientes frescos y preparando sofritos basados exclusivamente en aceite vegetal, ajo, cebolla, pimientos y especias naturales.",
    recommendations: [
      { name: "Yuca con mojo vegetal", desc: "Yuca tierna acompañada de mojo de naranja agria, ajo y aceite de oliva.", tip: "Pedir sin manteca ni grasa animal añadida." },
      { name: "Arroz congrí con vegetales y plátano maduro", desc: "Frijol negro cocinado con especias criollas, arroz blanco y plátano maduro frito.", tip: "Verificar con el equipo que el sofrito del frijol no incluya embutidos." },
      { name: "Ensalada de temporada con aguacate", desc: "Hojas frescas, tomate, cebolla morada y aguacate alimonado.", tip: "Aliño ligero de aceite de oliva virgen extra y limón." },
    ],
  },
  diabetes: {
    title: "Orientación para control de carbohidratos (Diabetes)",
    subtitle: "Priorizando fibra, proteínas magras y porciones equilibradas",
    summary: "Para quienes manejan sus niveles de glucosa, sugerimos equilibrar los acompañamientos con porciones moderadas de carbohidratos y optar por preparaciones a la parrilla o hervidas, consultando siempre los ingredientes dulces de las salsas.",
    recommendations: [
      { name: "Lechón asado magro o pollo a la plancha", desc: "Carnes marinadas en cítricos y ajo, cocinadas sin azúcares añadidos.", tip: "Acompañar con vegetales salteados en lugar de raciones grandes de arroz." },
      { name: "Yuca o plátano en porción moderada", desc: "Tubérculos tradicionales cubanos preparados de forma casera.", tip: "Controlar la porción y combinar siempre con proteínas y fibra para una absorción gradual." },
      { name: "Guarapo sin azúcar o infusión de hierbabuena", desc: "Bebidas refrescantes naturales sin edulcorantes artificiales pesados.", tip: "Evitar almíbares comerciales y azúcares refinados añadidos." },
    ],
  },
  hypertension: {
    title: "Recomendaciones bajas en sodio (Hipertensión)",
    subtitle: "Cuidando el contenido de sal y potenciando hierbas aromáticas",
    summary: "Adaptamos nuestros platos reduciendo el uso de sal de mesa y sustituyéndola por condimentos naturales como el orégano criollo, el comino, el ajo, la cebolla y el jugo fresco de naranja agria y limón.",
    recommendations: [
      { name: "Carnes blancas o res con especias naturales", desc: "Preparaciones donde el sabor proviene del comino, el laurel y los cítricos.", tip: "Solicitar explícitamente a nuestro equipo la preparación con bajo contenido de sodio." },
      { name: "Arroz blanco e hortalizas al vapor", desc: "Guarniciones sencillas preparadas con aceite de oliva y hierbas.", tip: "Evitar caldos concentrados comerciales en la cocción del arroz." },
      { name: "Agua con limón o limonada sin exceso de sodio", desc: "Bebidas hidratantes naturales.", tip: "Refrescantes y seguras para mantener una dieta equilibrada." },
    ],
  },
};

const gallerySlides = [
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1500&q=85",
    eyebrow: "La mesa",
    title: "Todo empieza cuando llega el primer plato.",
    alt: "Mesa de restaurante con platos servidos para compartir",
  },
  {
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1500&q=85",
    eyebrow: "Ropa vieja",
    title: "Fuego lento, hambre contenta.",
    alt: "Plato colorido de cocina casera servido en mesa",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=85",
    eyebrow: "Para compartir",
    title: "Un centro de mesa que pide otra ronda.",
    alt: "Mesa abundante con varios platos para compartir",
  },
  {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1500&q=85",
    eyebrow: "De la casa",
    title: "El plato que se reconoce con los ojos cerrados.",
    alt: "Plato principal servido con ingredientes frescos",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1500&q=85",
    eyebrow: "La sobremesa",
    title: "Quédate cinco minutos más.",
    alt: "Ambiente cálido de restaurante con mesas preparadas",
  },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Entrantes");
  const [activeDietary, setActiveDietary] = useState<DietaryProfile>("vegan");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<{ name: string; description: string; price: string; note?: string; image: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState("inicio");

  // Scrollspy: el navbar señala la sección visible mientras se hace scroll.
  useEffect(() => {
    const ids = ["cocina", "carta", "galeria", "dietas", "historia", "visitanos"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  // Si el usuario prefiere movimiento reducido, hero con imagen fija en vez de vídeo.
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Póster/fallback del hero: imagen remota que funciona sin /manus-storage.
  const heroPoster =
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (galleryPaused) return;
    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % gallerySlides.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [galleryPaused]);

  const moveGallery = (direction: number) => {
    setGalleryIndex((current) => (current + direction + gallerySlides.length) % gallerySlides.length);
  };

  const handleReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Recibimos tu solicitud", {
      description: "La cocina revisará los detalles y te contactaremos para confirmar.",
    });
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell min-h-screen">
      <header className="site-header" aria-label="Navegación principal">
        <a className="brand-lockup" href="#inicio" aria-label="La Habana Criolla, inicio">
          <img className="brand-mark" src="/manus-storage/la-habana-criolla-mark_ab69f6e3.png" alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <span className="brand-name">
            <span>La Habana</span>
            <em>Criolla</em>
          </span>
        </a>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Secciones">
          <a href="#cocina" className={activeSection === "cocina" ? "is-active" : ""} aria-current={activeSection === "cocina" ? "true" : undefined} onClick={() => setMobileOpen(false)}>La cocina</a>
          <a href="#carta" className={activeSection === "carta" ? "is-active" : ""} aria-current={activeSection === "carta" ? "true" : undefined} onClick={() => setMobileOpen(false)}>La carta</a>
          <a href="#galeria" className={activeSection === "galeria" ? "is-active" : ""} aria-current={activeSection === "galeria" ? "true" : undefined} onClick={() => setMobileOpen(false)}>Galería</a>
          <a href="#dietas" className={activeSection === "dietas" ? "is-active" : ""} aria-current={activeSection === "dietas" ? "true" : undefined} onClick={() => setMobileOpen(false)}>Dietas especiales</a>
          <a href="#historia" className={activeSection === "historia" ? "is-active" : ""} aria-current={activeSection === "historia" ? "true" : undefined} onClick={() => setMobileOpen(false)}>La casa</a>
          <a href="#visitanos" className={activeSection === "visitanos" ? "is-active" : ""} aria-current={activeSection === "visitanos" ? "true" : undefined} onClick={() => setMobileOpen(false)}>Visítanos</a>
        </nav>
        <button className="header-cta" onClick={() => scrollToSection("reserva")}>
          <CalendarDays size={16} strokeWidth={1.6} />
          Reservar una mesa
        </button>
        <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={23} strokeWidth={1.6} /> : <MenuIcon size={23} strokeWidth={1.6} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Cocina criolla cubana · Desde 1998</p>
            <h1>Hay platos que no se explican: <i>se ponen al centro.</i></h1>
            <p className="hero-lede">Una mesa cálida en medio de la ciudad. Recetas cubanas de fuego lento, ingredientes honestos y una sobremesa que siempre encuentra cinco minutos más.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollToSection("carta")}>Mira la carta</button>
              <button className="text-link" onClick={() => scrollToSection("historia")}>Conoce la casa</button>
            </div>
            <div className="hero-footnote"><span className="stamp">HC</span><span>Comida con memoria.<br />Servida sin ceremonia.</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              {reduceMotion ? (
                <img src={heroPoster} alt="Mesa criolla cubana con ropa vieja, arroz congrí y tostones" loading="eager" decoding="async" />
              ) : (
                <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={heroPoster}>
                  <source src="/video/hero.mp4" type="video/mp4" />
                  <img src={heroPoster} alt="Mesa criolla cubana con ropa vieja, arroz congrí y tostones" loading="eager" decoding="async" />
                </video>
              )}
              <div className="image-caption"><span>La mesa,</span><strong>el mejor lugar para volver.</strong></div>
            </div>
            <div className="vertical-seal"><span>LA HABANA</span><strong>CRIOLLA</strong><span>COCINA · MESA · BARRIO</span></div>
          </div>
          <div className="hero-side-note">Vol. 01 <span /> Patio y memoria</div>
        </section>

        <section id="cocina" className="principles-section section-padding">
          <div className="section-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> Nuestro criterio</p>
            <h2>La tradición no se guarda. <i>Se cocina.</i></h2>
          </div>
          <div className="principles-grid">
            <article className="principle-card principle-card-featured">
              <span className="principle-number">01</span>
              <Flame className="principle-icon" size={27} strokeWidth={1.4} />
              <h3>Fuego lento</h3>
              <p>Lo que necesita tiempo, lo tiene. Caldos profundos, sofritos pacientes y carnes que se deshacen sin pedir permiso.</p>
              <span className="card-rule" />
            </article>
            <article className="principle-card">
              <span className="principle-number">02</span>
              <Leaf className="principle-icon" size={27} strokeWidth={1.4} />
              <h3>Producto cercano</h3>
              <p>La temporada marca el paso. Elegimos lo que llega fresco y dejamos que el ingrediente cuente su parte.</p>
              <span className="card-rule" />
            </article>
            <article className="principle-card">
              <span className="principle-number">03</span>
              <UtensilsCrossed className="principle-icon" size={27} strokeWidth={1.4} />
              <h3>Mesa abierta</h3>
              <p>Servimos para compartir, conversar y repetir. Aquí nadie viene a comer deprisa, aunque llegue con hambre.</p>
              <span className="card-rule" />
            </article>
          </div>
        </section>

        <section id="carta" className="menu-section section-padding">
          <div className="menu-heading">
            <div>
              <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> La carta</p>
              <h2>Elige con <i>hambre.</i></h2>
            </div>
            <p>Una carta breve, de esas que dejan espacio para volver. Cocina cubana de raíz, con una pequeña licencia para la temporada.</p>
          </div>
          <div className="menu-layout">
            <div className="category-list" role="tablist" aria-label="Categorías del menú">
              {categories.map(({ id, icon: Icon }) => (
                <button key={id} className={`category-tab ${activeCategory === id ? "is-active" : ""}`} onClick={() => setActiveCategory(id)} role="tab" aria-selected={activeCategory === id}>
                  <span className="category-icon"><Icon size={18} strokeWidth={1.6} /></span>
                  <span>{id}</span>
                  <ChevronRight size={16} strokeWidth={1.6} className="category-arrow" />
                </button>
              ))}
              <div className="menu-note"><span className="note-mark">✳</span> Pregunta por nuestro<br />plato fuera de carta.</div>
            </div>
            <div className="menu-items" role="tabpanel">
              {menuItems[activeCategory].map((item, index) => (
                <article className="menu-item" key={item.name} style={{ animationDelay: `${index * 60}ms` }}>
                  <button className="menu-thumb-button" type="button" onClick={() => setLightboxItem(item)} aria-label={`Ampliar imagen de ${item.name}`}>
                    <img className="menu-item-thumb" src={item.image} alt={item.alt} loading="lazy" decoding="async" width={82} height={82} />
                    <span className="thumb-zoom-icon"><Expand size={14} strokeWidth={1.6} /></span>
                  </button>
                  <div className="menu-item-copy">
                    <div className="menu-item-top"><span className="menu-item-index">0{index + 1}</span><h3>{item.name}</h3><span className="menu-price">{item.price}</span></div>
                    <p>{item.description}</p>
                    {item.note && <span className="menu-item-note">{item.note}</span>}
                  </div>
                </article>
              ))}
              <div className="menu-disclaimer">Precios orientativos · Consulta disponibilidad y alérgenos con nuestro equipo.</div>
            </div>
            <div className="menu-image-card">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="Ropa vieja con arroz congrí y tostones" loading="lazy" />
              <div className="menu-image-overlay"><span>Lo que huele<br />a casa.</span></div>
            </div>
          </div>
        </section>

        <section id="galeria" className="gallery-section section-padding">
          <div className="gallery-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> La mesa en imágenes</p>
            <h2>Lo que llega al centro <i>se comparte.</i></h2>
            <p>Ambiente, fuego y platos que ya tienen sus propios fans. Desliza para mirar lo que está saliendo de la cocina.</p>
            <div className="gallery-count" aria-live="polite"><strong>{String(galleryIndex + 1).padStart(2, "0")}</strong><span>/ {String(gallerySlides.length).padStart(2, "0")}</span></div>
          </div>
          <div className="gallery-rail">
            <div
              className="gallery-viewport"
              role="region"
              aria-roledescription="carrusel"
              aria-label="Galería de ambiente y platos populares"
              tabIndex={0}
              onMouseEnter={() => setGalleryPaused(true)}
              onMouseLeave={() => setGalleryPaused(false)}
              onFocus={() => setGalleryPaused(true)}
              onBlur={() => setGalleryPaused(false)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") moveGallery(1);
                if (event.key === "ArrowLeft") moveGallery(-1);
              }}
            >
              <div className="gallery-track" style={{ transform: `translateX(-${galleryIndex * 100}%)` }}>
                {gallerySlides.map((slide, index) => (
                  <figure className="gallery-slide" key={slide.title} aria-hidden={galleryIndex !== index}>
                    <img src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                    <figcaption><span>{slide.eyebrow}</span><strong>{slide.title}</strong></figcaption>
                    <span className="gallery-slide-index">0{index + 1}</span>
                  </figure>
                ))}
              </div>
              <button className="gallery-arrow gallery-arrow-prev" type="button" aria-label="Imagen anterior" onClick={() => moveGallery(-1)}><ChevronLeft size={20} strokeWidth={1.6} /></button>
              <button className="gallery-arrow gallery-arrow-next" type="button" aria-label="Imagen siguiente" onClick={() => moveGallery(1)}><ChevronRight size={20} strokeWidth={1.6} /></button>
            </div>
            <div className="gallery-controls">
              <div className="gallery-dots" role="tablist" aria-label="Seleccionar imagen de la galería">
                {gallerySlides.map((slide, index) => (
                  <button key={slide.title} type="button" role="tab" aria-label={`Ver imagen ${index + 1}: ${slide.eyebrow}`} aria-selected={galleryIndex === index} className={galleryIndex === index ? "is-active" : ""} onClick={() => setGalleryIndex(index)} />
                ))}
              </div>
              <span>Usa las flechas o desliza para explorar</span>
            </div>
          </div>
        </section>

        <section id="dietas" className="dietary-section section-padding">
          <div className="dietary-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Bienestar y cocina consciente</p>
              <h2>Opciones para cada <i>necesidad.</i></h2>
            </div>
            <p>Creemos que comer sabroso no debe excluir a nadie. Consulta nuestras sugerencias para dietas veganas, control de glucosa e hipertensión.</p>
          </div>
          <div className="dietary-tabs" role="tablist" aria-label="Perfiles dietéticos">
            <button className={`dietary-tab ${activeDietary === "vegan" ? "is-active" : ""}`} onClick={() => setActiveDietary("vegan")} role="tab" aria-selected={activeDietary === "vegan"}>
              <span>Vegano y Vegetal</span>
            </button>
            <button className={`dietary-tab ${activeDietary === "diabetes" ? "is-active" : ""}`} onClick={() => setActiveDietary("diabetes")} role="tab" aria-selected={activeDietary === "diabetes"}>
              <span>Diabetes (Glucosa)</span>
            </button>
            <button className={`dietary-tab ${activeDietary === "hypertension" ? "is-active" : ""}`} onClick={() => setActiveDietary("hypertension")} role="tab" aria-selected={activeDietary === "hypertension"}>
              <span>Hipertensión (Sodio)</span>
            </button>
          </div>
          <div className="dietary-content" role="tabpanel">
            <div className="dietary-overview">
              <h3>{dietaryProfiles[activeDietary].title}</h3>
              <p className="dietary-subtitle">{dietaryProfiles[activeDietary].subtitle}</p>
              <p>{dietaryProfiles[activeDietary].summary}</p>
            </div>
            <div className="dietary-list">
              {dietaryProfiles[activeDietary].recommendations.map((rec, idx) => (
                <div className="dietary-card" key={rec.name} style={{ animationDelay: `${idx * 50}ms` }}>
                  <span className="dietary-index">0{idx + 1}</span>
                  <div className="dietary-card-body">
                    <h4>{rec.name}</h4>
                    <p>{rec.desc}</p>
                    <span className="dietary-tip">Sugerencia al pedir: {rec.tip}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="dietary-notice">
              <span>⚠ Nota importante de cocina:</span> Preparamos cada plato con cuidado, pero nuestra cocina maneja alérgenos y condimentos tradicionales. Por favor, informa a nuestro equipo sobre cualquier condición estricta de salud al hacer tu reserva para que podamos adaptarnos.
            </div>
          </div>
        </section>

        <section id="historia" className="story-section section-padding">
          <div className="story-image-wrap">
            <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85" alt="Mesa preparada para una cena" loading="lazy" />
            <span className="story-image-label">Una casa de patio<br />y de puertas abiertas.</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> La casa</p>
            <h2>De la receta de la abuela a tu <i>mesa.</i></h2>
            <p>La Habana Criolla nació de una libreta con manchas de sofrito y de la convicción de que la cocina más honesta es la que se comparte sin hacer demasiado ruido.</p>
            <p>Respetamos las bases —el mojo, el congrí, el fuego, el dulce de guayaba— y dejamos que el día nos diga qué poner al plato.</p>
            <button className="text-link text-link-dark" onClick={() => scrollToSection("visitanos")}>Ven a conocerla</button>
          </div>
        </section>

        <section className="voices-section section-padding" aria-labelledby="voices-title">
          <div className="voices-header">
            <p className="eyebrow"><span className="eyebrow-line" /> La sobremesa</p>
            <h2 id="voices-title">Tu voz también <i>cuenta.</i></h2>
            <p>No inventamos reseñas. Preferimos dejar este espacio listo para escuchar a quienes sí se han sentado a nuestra mesa.</p>
          </div>
          <div className="voices-empty-state">
            <Quote size={30} strokeWidth={1.2} />
            <div><strong>Opiniones verificadas próximamente</strong><span>Cuando nos visites, cuéntanos qué plato se quedó contigo.</span></div>
            <button className="button button-outline" onClick={() => scrollToSection("reserva")}>Escríbenos</button>
          </div>
        </section>

        <section id="reserva" className="reservation-section section-padding">
          <div className="reservation-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Ven a la mesa</p>
            <h2>Guarda un lugar<br />para la <i>sobremesa.</i></h2>
            <p>Cuéntanos cuándo vienes y cuántos son. Para grupos grandes o celebraciones, escríbenos directamente.</p>
            <div className="hours-row"><Clock3 size={18} strokeWidth={1.6} /><span>Martes — Domingo<br /><strong>12:00 — 23:00</strong></span></div>
          </div>
          <form className="reservation-form" onSubmit={handleReservation}>
            <label>Tu nombre<input required name="name" placeholder="Cómo te llamamos" /></label>
            <div className="form-row"><label>Fecha<input required name="date" type="date" /></label><label>Personas<select required name="guests" defaultValue="2"><option value="2">2 personas</option><option value="3">3 personas</option><option value="4">4 personas</option><option value="5">5 personas</option><option value="6">6+ personas</option></select></label></div>
            <label>Algo que debamos saber<textarea name="message" rows={2} placeholder="Una celebración, una alergia, una ventana favorita…" /></label>
            <button className="button button-light" type="submit">Solicitar reserva</button>
            <span className="form-note">La solicitud no queda confirmada hasta recibir nuestra respuesta.</span>
          </form>
        </section>

        <section id="visitanos" className="visit-section section-padding">
          <div className="visit-statement"><span className="stamp stamp-large">HC</span><h2>Nos vemos<br /><i>en la mesa.</i></h2></div>
          <div className="visit-details">
            <div className="detail-block"><MapPin size={20} strokeWidth={1.6} /><div><span>Estamos en</span><strong>Patio del Barrio, 14<br />La Habana Criolla</strong></div></div>
            <div className="detail-block"><Clock3 size={20} strokeWidth={1.6} /><div><span>Horario</span><strong>Martes a domingo<br />12:00 — 23:00</strong></div></div>
            <div className="social-row"><a href="#visitanos" aria-label="Instagram"><Instagram size={18} strokeWidth={1.6} /></a><a href="#visitanos" aria-label="Facebook"><Facebook size={18} strokeWidth={1.6} /></a><span>@lahabanacriolla</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 La Habana Criolla</span><span className="footer-center">Cocina · Mesa · Barrio</span><a href="#inicio">Volver arriba <ArrowUp size={14} strokeWidth={1.6} /></a></footer>

      {lightboxItem && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={`Vista ampliada de ${lightboxItem.name}`} onClick={() => setLightboxItem(null)}>
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={() => setLightboxItem(null)} aria-label="Cerrar vista ampliada"><X size={22} strokeWidth={1.6} /></button>
            <div className="lightbox-image-wrap">
              <img src={lightboxItem.image} alt={lightboxItem.alt} />
            </div>
            <div className="lightbox-info">
              <div className="lightbox-info-top">
                <h3>{lightboxItem.name}</h3>
                <span className="lightbox-price">{lightboxItem.price}</span>
              </div>
              <p>{lightboxItem.description}</p>
              {lightboxItem.note && <span className="lightbox-note">{lightboxItem.note}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
