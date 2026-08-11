/*
 * Diseño: Casa criolla contemporánea — modernismo tropical editorial.
 * Esta página prioriza la mesa compartida, una composición asimétrica y la paleta Añil de Patio, terracota e marfil.
 */
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
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

const menuItems: Record<MenuCategory, { name: string; description: string; price: string; note?: string }[]> = {
  Entrantes: [
    { name: "Tostones de la casa", description: "Plátano verde, ajo, limón y sal de patio.", price: "$8", note: "para compartir" },
    { name: "Yuca con mojo", description: "Yuca tierna, mojo de naranja agria y hierbas frescas.", price: "$7" },
    { name: "Croquetas de jamón", description: "Bechamel cremosa, jamón curado y migas de pan doradas.", price: "$9" },
  ],
  Fuertes: [
    { name: "Ropa vieja", description: "Res cocida a fuego lento, tomate, pimientos y especias dulces.", price: "$18", note: "receta de la casa" },
    { name: "Lechón asado", description: "Cerdo marinado en naranja agria, ajo y orégano criollo.", price: "$19" },
    { name: "Arroz congrí con vegetales", description: "Frijol negro, arroz, plátano maduro y ensalada de temporada.", price: "$15", note: "sin carne" },
  ],
  Bebidas: [
    { name: "Guarapo con limón", description: "Caña de azúcar recién prensada, hielo y cítrico.", price: "$6" },
    { name: "Mojito de la casa", description: "Ron blanco, hierbabuena, lima y azúcar demerara.", price: "$11" },
    { name: "Café cubano", description: "Espresso corto, intenso y servido al momento.", price: "$4" },
  ],
  Postres: [
    { name: "Flan de coco", description: "Flan sedoso, caramelo oscuro y ralladura de lima.", price: "$8" },
    { name: "Pastel de guayaba y queso", description: "Dulce de guayaba, queso crema y galleta de mantequilla.", price: "$9" },
    { name: "Helado de mamey", description: "Helado artesanal, crumble de canela y sal marina.", price: "$7" },
  ],
};

const categories: { id: MenuCategory; icon: typeof UtensilsCrossed }[] = [
  { id: "Entrantes", icon: UtensilsCrossed },
  { id: "Fuertes", icon: Flame },
  { id: "Bebidas", icon: Wine },
  { id: "Postres", icon: Leaf },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Entrantes");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Recibimos tu solicitud", {
      description: "La cocina revisará los detalles y te contactaremos para confirmar.",
    });
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden">
      <header className="site-header" aria-label="Navegación principal">
        <a className="brand-lockup" href="#inicio" aria-label="La Habana Criolla, inicio">
          <img className="brand-mark" src="/manus-storage/la-habana-criolla-mark_ab69f6e3.png" alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <span className="brand-name">
            <span>La Habana</span>
            <em>Criolla</em>
          </span>
        </a>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
          <a href="#cocina" onClick={() => setMobileOpen(false)}>La cocina</a>
          <a href="#carta" onClick={() => setMobileOpen(false)}>La carta</a>
          <a href="#historia" onClick={() => setMobileOpen(false)}>La casa</a>
          <a href="#visitanos" onClick={() => setMobileOpen(false)}>Visítanos</a>
        </nav>
        <button className="header-cta" onClick={() => scrollToSection("reserva")}>
          <CalendarDays size={16} strokeWidth={1.8} />
          Reservar una mesa
        </button>
        <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={23} /> : <MenuIcon size={23} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Cocina criolla cubana · Desde 1998</p>
            <h1>Hay platos que no se explican: <i>se ponen al centro.</i></h1>
            <p className="hero-lede">Una mesa cálida en medio de la ciudad. Recetas cubanas de fuego lento, ingredientes honestos y una sobremesa que siempre encuentra cinco minutos más.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollToSection("carta")}>Mira la carta <ArrowDownRight size={17} /></button>
              <button className="text-link" onClick={() => scrollToSection("historia")}>Conoce la casa <ArrowUpRight size={16} /></button>
            </div>
            <div className="hero-footnote"><span className="stamp">HC</span><span>Comida con memoria.<br />Servida sin ceremonia.</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img src="/manus-storage/la-habana-criolla-hero_82bafe20.jpg" alt="Mesa criolla cubana con ropa vieja, arroz congrí y tostones" />
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
                  <ChevronRight size={16} className="category-arrow" />
                </button>
              ))}
              <div className="menu-note"><span className="note-mark">✳</span> Pregunta por nuestro<br />plato fuera de carta.</div>
            </div>
            <div className="menu-items" role="tabpanel">
              {menuItems[activeCategory].map((item, index) => (
                <article className="menu-item" key={item.name} style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="menu-item-top"><span className="menu-item-index">0{index + 1}</span><h3>{item.name}</h3><span className="menu-price">{item.price}</span></div>
                  <p>{item.description}</p>
                  {item.note && <span className="menu-item-note">{item.note}</span>}
                </article>
              ))}
              <div className="menu-disclaimer">Precios orientativos · Consulta disponibilidad y alérgenos con nuestro equipo.</div>
            </div>
            <div className="menu-image-card">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="Ropa vieja con arroz congrí y tostones" loading="lazy" />
              <div className="menu-image-overlay"><span>Lo que huele<br />a casa.</span><ArrowUpRight size={20} /></div>
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
            <button className="text-link text-link-dark" onClick={() => scrollToSection("visitanos")}>Ven a conocerla <ArrowUpRight size={16} /></button>
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
            <button className="button button-outline" onClick={() => scrollToSection("reserva")}>Escríbenos <ArrowUpRight size={16} /></button>
          </div>
        </section>

        <section id="reserva" className="reservation-section section-padding">
          <div className="reservation-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Ven a la mesa</p>
            <h2>Guarda un lugar<br />para la <i>sobremesa.</i></h2>
            <p>Cuéntanos cuándo vienes y cuántos son. Para grupos grandes o celebraciones, escríbenos directamente.</p>
            <div className="hours-row"><Clock3 size={18} strokeWidth={1.5} /><span>Martes — Domingo<br /><strong>12:00 — 23:00</strong></span></div>
          </div>
          <form className="reservation-form" onSubmit={handleReservation}>
            <label>Tu nombre<input required name="name" placeholder="Cómo te llamamos" /></label>
            <div className="form-row"><label>Fecha<input required name="date" type="date" /></label><label>Personas<select required name="guests" defaultValue="2"><option value="2">2 personas</option><option value="3">3 personas</option><option value="4">4 personas</option><option value="5">5 personas</option><option value="6">6+ personas</option></select></label></div>
            <label>Algo que debamos saber<textarea name="message" rows={2} placeholder="Una celebración, una alergia, una ventana favorita…" /></label>
            <button className="button button-light" type="submit">Solicitar reserva <ArrowUpRight size={17} /></button>
            <span className="form-note">La solicitud no queda confirmada hasta recibir nuestra respuesta.</span>
          </form>
        </section>

        <section id="visitanos" className="visit-section section-padding">
          <div className="visit-statement"><span className="stamp stamp-large">HC</span><h2>Nos vemos<br /><i>en la mesa.</i></h2></div>
          <div className="visit-details">
            <div className="detail-block"><MapPin size={20} strokeWidth={1.4} /><div><span>Estamos en</span><strong>Patio del Barrio, 14<br />La Habana Criolla</strong></div></div>
            <div className="detail-block"><Clock3 size={20} strokeWidth={1.4} /><div><span>Horario</span><strong>Martes a domingo<br />12:00 — 23:00</strong></div></div>
            <div className="social-row"><a href="#visitanos" aria-label="Instagram"><Instagram size={19} strokeWidth={1.6} /></a><a href="#visitanos" aria-label="Facebook"><Facebook size={19} strokeWidth={1.6} /></a><span>@lahabanacriolla</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 La Habana Criolla</span><span className="footer-center">Cocina · Mesa · Barrio</span><a href="#inicio">Volver arriba <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}
