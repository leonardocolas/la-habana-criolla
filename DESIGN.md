# DESIGN.md — Guía de diseño La Habana Criolla

> Fuente de verdad visual. Extraído de `ideas.md`, `client/src/index.css` (426 líneas) y `client/src/pages/Home.tsx`.
> Regla para IA: si un cambio no cumple esta guía, no hacerlo. Si la guía no cubre un caso, preguntar antes de inventar.

## 1. Concepto — Casa criolla contemporánea
Modernismo tropical editorial: calidez de patio habanero + rigor de revista gastronómica. `ideas.md:22-29`.
Principios:
1. La mesa es el centro (plato, historia, compartir primero).
2. Calidez con criterio (textura y color siempre con jerarquía y aire).
3. Asimetría habitable (bloques desplazados, bandas de color, nada perfectamente centrado).
4. Tradición viva, no nostalgia congelada.

## 2. Color — tokens reales (`index.css:25-42`)
| Token | Valor | Uso |
|---|---|---|
| `--ink` / `--primary` / `--foreground` | `#183B4E` Añil de Patio | Texto, nav, fondo carta, footer. Color marca principal |
| `--ivory` / `--background` | `#F6F0E7` | Fondo general site |
| `--paper` / `--card` | `#FBF8F2` | Tarjetas claras, lightbox |
| `--terracotta` / `--ring` | `#C5643D` | Acento apetito/fuego, hovers, eyebrow, focus-visible |
| `--terracotta-deep` | `#A94E30` | Solo profundizar hover si hace falta |
| `--pale-blue` | `#DCE6E2` | Fondo dietas + historia |
| `--peach` | `#EFB69E` (unifica al antiguo `#EDB49A`) | Texto sobre añil (precios, eyebrow-light) |
| `#4E6067`, `#627278`, `#52636A` | grises-azulados | Cuerpo secundario sobre claro |
| `rgba(246,240,231,0.6/.56/.4)` | marfil atenuado | Cuerpo secundario sobre añil |

Reglas:
- Fondo base siempre marfil, nunca blanco puro (excepción: hover `button-light` a `#fff`).
- Añil sostiene texto y grandes superficies oscuras (`menu-section`, footer). Terracota solo para énfasis, nunca como fondo de texto largo.
- Bordes sutiles: `rgba(24,59,78,0.12-0.18)`. Sobre añil: `rgba(246,240,231,0.17-0.2)`.
- Grano global `body::before` con SVG noise al 5.5% — no quitar, da textura papel.
- Contraste: terracota sobre marfil solo para etiquetas grandes/cortas, no para párrafos.

## 3. Tipografía (Google Fonts en `client/index.html:11`)
- **Display:** `Fraunces, Georgia, serif` — H1/H2/H3, precios destacados, marca. Peso 480-650, `letter-spacing -0.04 a -0.075em`, `line-height 0.86-1.05`. Cursiva `<i>` en terracota para la palabra emocional ("se ponen al *centro*").
  - H1: `clamp(47px,5.2vw,80px)`. H2 sección: `clamp(42px,4.7vw,67px)`. H3 plato: 25px.
- **Body:** `DM Sans, Arial, sans-serif` — párrafos 12-15px, `line-height 1.55-1.72`, color secundario (no añil puro).
- **Accent:** `Space Mono, monospace` — eyebrows, nav, notas, precios, stamps. `10px o menos, UPPERCASE, tracking 0.08-0.16em`, color terracota o gris.
- Marca header: `La Habana` Fraunces 16px 650 + `Criolla` Fraunces itálica terracota 15px (`index.css:91-93`).

Reglas IA:
- Nunca usar otro font. Nunca poner body en Fraunces ni titulares en DM Sans/Space Mono.
- Eyebrow siempre con formato: `<p class="eyebrow"><span class="eyebrow-line"/> TEXTO</p>`.
- Precios en Space Mono, nunca en Fraunces bold.

## 4. Layout y ritmo
- Secciones ancho completo con `.section-padding: clamp(76px,10vw,150px) clamp(20px,8vw,130px)`.
- Alternancia obligatoria: manifiesto claro (principios) → ficha oscura (carta añil) → nota clara (galería papel) → nota verde (dietas pale-blue) → sobremesa (reserva terracota) → cierre papel.
- Hero dividido: copy izquierda (0.82fr) + visual derecha (1.18fr), `min-height min(730px,100vh-76px)`. En móvil apila (`max-width:760px`).
- Grids: principios 3 col → 1 col; carta `0.72fr 1.2fr 0.82fr` → columna; reserva `0.93fr 1.07fr` → bloque.
- Breakpoints: `1050px` (ajuste), `760px` (móvil), `440px` (pequeño). Breakpoint móvil esconde `.brand-name` y `.header-cta`.
- Cada sección principal debe incluir una "señal de mesa": plato, sello, línea azulejo, nota manuscrita (`ideas.md:78`).

## 5. Componentes — clases canónicas (no reinventar)
- **Botones:** `.button` base (min-height 44px, 11px 700 DM Sans). Variantes: `.button-dark` (añil→terracotta hover), `.button-light` (marfil sobre terracota), `.button-outline`. Press: `scale(0.97)`. Sin flechas decorativas: solo texto. Flechas permitidas únicamente donde indican dirección real (carrusel `ChevronLeft/Right`, `Volver arriba` con `ArrowUp` recto).
- **Navbar con scroll:** header fijo + scrollspy (`activeSection` en `Home.tsx`, `.main-nav a.is-active` en terracotta con `aria-current`) + `section[id] { scroll-margin-top: 84px }` para que las anclas no queden tapadas.
- **Iconos lucide:** UI a `strokeWidth 1.6` (CTA, tabs, galería, contacto, cierres); display grande (principios 27px, `Quote` 30px) a trazo fino 1.2-1.4. El zoom de miniatura usa `Expand`, nunca flechas.
- **Text-link:** Space Mono 10px uppercase con underline `rgba(24,59,78,0.45)`, hover terracota.
- **Header:** sticky, `blur(14px)`, `rgba(246,240,231,0.9)`, grid `1fr auto 1fr`. Nav Space Mono 10px con underline terracota animado `scaleX`. CTA con borde añil, hover relleno añil.
- **Stamp/sello:** círculo borde terracota, Fraunces bold (`HC`). `.stamp` 35px, `.stamp-large` 54px. Uso moderado.
- **Cards principio:** `border-top 1px añil`, número Space Mono terracota, icono lucide 27px stroke 1.4 terracota. Featured: fondo terracota + texto marfil.
- **Carta (fondo añil):** tabs Fraunces 22px con flecha, active `#EFB69E` + `translateX(4px)`. Items grid `82px 1fr`, thumb 82px con zoom-icon al hover. Índice `01` Space Mono terracota. Nota plato Space Mono 8px `#EFB69E`.
- **Lightbox:** overlay `rgba(12,31,41,0.85)+blur(12px)`, dialog `540px` papel, imagen 330px, precio Space Mono 16px terracota. Animaciones `fade 250ms + zoom 300ms`.
- **Galería:** slide `clamp(370px,42vw,570px)` con gradiente añil, caption Fraunces itálica + eyebrow melocotón. Flechas 45px borde marfil, hover terracota. Dots: barra 24px→42px terracota en active.
- **Form reserva (fondo terracota):** inputs sin caja, solo `border-bottom rgba(246,240,231,0.52)`, texto marfil DM Sans 14px, label Space Mono 9px uppercase. Focus: borde marfil.
- **Focus visible global:** `2px terracota offset 4px` — no quitar.

## 6. Movimiento
- Curvas: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out` para track galería.
- Entradas: `menu-reveal 400ms ease-out` (opacity + translateY 8px), stagger 50-70ms vía `animationDelay`.
- Imágenes: `scale(1.025-1.06)` en hover, `650-800ms ease-out`.
- Sin carruseles automáticos salvo galería (5.6s, pausa en hover/focus). Respetar `prefers-reduced-motion: reduce` (ya implementado, mantener).

## 7. Imagery
- Foto protagonista + caption Fraunces itálica abajo-derecha con sombra. Tratamiento: `saturate(0.92)`, hover `1.08`.
- No usar shadcn `button.tsx/card.tsx` para estos bloques editoriales; el sistema custom en `index.css` es el canónico. `client/src/components/ui/` (53 ficheros) se conserva como reserva: `App.tsx` usa `sonner` + `tooltip`, `NotFound.tsx` usa `button` + `card`, `ManusDialog.tsx` usa `button` + `dialog`, y los ficheros ui se importan entre sí (`buttonVariants`, `separator`, `label`...), así que borrar "los no usados" rompería la compilación. Vite solo empaqueta lo importado (tree-shaking), no lastra el bundle.

## 8. Reglas para crear / modificar (checklist IA)
1. ¿Usa solo tokens de §2 y fonts de §3?
2. ¿Mantiene alternancia claro/oscuro y `section-padding`?
3. ¿Reutiliza `.button/.eyebrow/.stamp/.text-link` en vez de crear clases nuevas?
4. ¿Hover/active/focus y `prefers-reduced-motion` contemplados?
5. ¿Responsive 1050/760/440 probado mentalmente?
6. ¿No introduce blanco puro, sombras duras ni otro radio que no exista?

## 9. Mejoras aplicadas (2026-10-08)
1. **Tokens duplicados:** unificados en `--peach: #EFB69E` (`index.css`, `@theme` incluye `--color-peach`).
2. **CLS en thumbs:** `width={82} height={82}` en `Home.tsx` + `aspect-ratio: 1/1` en `.menu-thumb-button`.
3. **Contraste reserva:** placeholder `0.58→0.78`, `.form-note` `0.62→0.85`.
4. **`vertical-seal`:** oculto bajo 440px (`display:none`) en vez de desplazarlo.
5. **shadcn:** se conserva como reserva (ver §7); Vite lo tree-shakea, no lastra el bundle.
6. **Fallbacks locales:** favicon inline SVG (ya no depende de `/manus-storage`); hero con póster remoto + hueco local `client/public/video/hero.mp4|.webm` y `client/public/img/` para assets finales.

## 10. Hero con vídeo (reglas)
- Elemento `<video class="hero-video" autoPlay muted loop playsInline preload="metadata" poster>`: siempre muteado (requisito autoplay), sin controles, mismo encuadre que la foto (`object-fit: cover`, hover `scale(1.025)`).
- Si `prefers-reduced-motion`, se renderiza `<img>` con el póster en vez del vídeo.
- Clip actual: `client/public/video/hero.mp4` (1280×720, 12s, 3.7MB) — "Food Frying" de Coverr vía Pexels (https://www.pexels.com/video/food-frying-853865), licencia gratuita sin atribución requerida. Primer plano de fritura en aceite burbujeante, acorde a "fuego lento".
- Para sustituirlo: reemplaza ese fichero manteniendo nombre y peso (<5MB, 720p, 6-12s, sin audio). Sin fichero se muestra el póster automáticamente.
- No usar GIF pesado; el `<video>` es el formato canónico para movimiento en hero.
