# Plan — La Habana Criolla: de landing actual a producto entero

> Alcance acordado (2026-10-08): **web informativa + reserva vía WhatsApp / email, sin backend propio**.
> Este plan solo describe hechos verificados en el repo + huecos + propuesta. No inventa datos del negocio.

## 1. Qué se tiene (verificado)

### Producto / contenido
- One-page en `client/src/pages/Home.tsx` (449 líneas) con secciones: hero `#inicio`, cocina `#cocina`, carta `#carta`, galería `#galeria`, dietas `#dietas`, historia `#historia`, reserva `#reserva`, visita `#visitanos`, footer.
- Carta hardcodeada en `Home.tsx:28`: 4 categorías (Entrantes, Fuertes, Bebidas, Postres) x 3 platos, con `name, description, price, note?, image, alt`.
- Lightbox de platos en `Home.tsx:429`: abre por clic en miniatura, cierra por botón / clic fondo / tecla Escape (`Home.tsx:136`). Ver `todo.md` (todo marcado [x]).
- Galería con autoplay 5.6s, pausa en hover/focus, flechas y dots, `Home.tsx:144-150`.
- Sección dietas con 3 perfiles (`vegan`, `diabetes`, `hypertension`) en `Home.tsx:58-89` + aviso de alérgenos genérico.
- Sección voces/testimonios en estado vacío intencional (`Home.tsx:388-399`): "Opiniones verificadas próximamente" — coherente con `ideas.md:72`.
- Dirección creativa en `ideas.md`: ruta "Casa criolla contemporánea", color marca Añil de Patio `#183B4E`, tipografías Fraunces / DM Sans / Space Mono.

### Técnica
- Stack: React 19 + TS + Vite 7, TailwindCSS 4 (`client/src/index.css`), shadcn/ui (`client/src/components/ui/`), wouter, lucide-react, sonner, zod + react-hook-form (instalados, no usados en reserva).
- Entradas: `client/index.html` (lang es, fonts Google, theme-color `#183B4E`), `client/src/main.tsx`, `client/src/App.tsx` (ThemeProvider light no-switchable + Router `/`, `/404`).
- Alias: `@` -> `client/src`, `@shared` -> `shared` (`vite.config.ts:210-215`, `tsconfig.json:18-21`). Root Vite: `client/`, build a `dist/public`.
- Server `server/index.ts`: solo estático Express + fallback `index.html`. Sin API.
- Componente `MapView` en `client/src/components/Map.tsx` existe pero **no se usa** en `Home`.
- Scripts `package.json:6-13`: `dev` (vite --host, puerto 3000), `build` (vite + esbuild server), `start` (NODE_ENV=production node dist/index.js), `preview`, `check` (tsc --noEmit), `format`.
- Package manager: `pnpm@10.4.1`.

## 2. Qué falta para "producto entero" (web informativa + reserva)

### Bloqueante P0 — Reserva real sin backend
Estado actual `Home.tsx:156-162`: `handleReservation` solo hace `toast.success` + `reset()`. Falta:
- [ ] Campos: falta `teléfono/email` y `hora`. Hoy solo `name, date, guests, message`.
- [ ] Validación: usar zod + react-hook-form ya instalados.
- [ ] Destino real: construir mensaje y abrir `https://wa.me/[PENDIENTE NÚMERO]/?text=...` y/o `mailto:[PENDIENTE EMAIL]` con fallback si no hay WhatsApp.
- [ ] Copy legal: "solicitud no confirmada hasta respuesta" ya existe (`Home.tsx:413`), mantener.
- Dato requerido usuario: número WhatsApp, email reservas, horario de reservas, tamaño máximo grupo.

### P0 — Datos reales (no inventar)
- [ ] Dirección real (hoy `Patio del Barrio, 14` en `Home.tsx:420` es placeholder).
- [ ] Teléfono real (hoy no existe en la UI).
- [ ] Instagram/Facebook reales (hoy `href="#visitanos"` en `Home.tsx:422`).
- [ ] Horario real (hoy Martes-Domingo 12:00-23:00 hardcodeado en dos sitios).
- [ ] Precios y disponibilidad finales + texto alérgenos.

### P0 — Imágenes y mapa rotos en prod
- [ ] `hero` y `brand-mark` apuntan a `/manus-storage/la-habana-criolla-*.png/jpg` (`Home.tsx:168,205`, `index.html:12`). Esa carpeta no existe en el repo (`client/public/` solo tiene `.gitkeep` + `__manus__/`). En prod darán 404.
- Propuesta: mover assets finales a `client/public/img/` y referenciar `/img/...`, o definir fuente Unsplash con licencia. No usar hotlink sin optimizar.
- [ ] Decidir si se usa `MapView` o se incrusta iframe Google Maps con dirección real. Hoy la sección visita no tiene mapa.

### P1 — Carta mantenible
- [ ] Sacar `menuItems, categories, dietaryProfiles, gallerySlides` de `Home.tsx` a `client/src/data/menu.ts` (o JSON) para editar sin tocar UI.
- [ ] Añadir bandera `disponible / fuera de carta` y nota de alérgenos por plato.

### P1 — SEO / legal / accesibilidad
- [ ] OG tags, `robots.txt`, `sitemap.xml`, favicon local (hoy favicon apunta a `/manus-storage`, roto).
- [ ] Analytics: `index.html:17` usa `%VITE_ANALYTICS_ENDPOINT%`. Definir `.env.example` o eliminar script si no se usa.
- [ ] Lightbox: añadir focus-trap + `aria` + bloqueo scroll fondo. Escape ya existe.
- [ ] Páginas o footer con aviso legal / privacidad / cookies (pendiente texto usuario).

### P1 — Build / compatibilidad Windows
- [ ] `start` usa `NODE_ENV=production` estilo Unix, falla en PowerShell 5.1. Propuesta: `cross-env` o documentar `$env:NODE_ENV="production"; node dist/index.js`.
- [ ] Verificar `pnpm check` y `pnpm build` en limpio antes de entregar. No hay tests (vitest instalado, 0 tests) — no se exige para este alcance.

## 3. Plan por fases (propuesta, sin plazos inventados)

**Fase 1 — Reserva WhatsApp/email (producto mínimo operable)**
1. Añadir campos hora + teléfono + validación zod.
2. Generar texto reserva y botones WhatsApp + Email.
3. Pedir al usuario número/email y textos finales.

**Fase 2 — Datos e imágenes reales**
1. Sustituir placeholders por datos usuario.
2. Mover imágenes a `client/public/img/`, arreglar favicon.
3. Conectar mapa o eliminar dependencia `Map.tsx` si no se usa.

**Fase 3 — Mantenibilidad + SEO/legal**
1. Extraer datos a `data/`.
2. OG/robots/sitemap, `.env.example`, fix `start` Windows.
3. `pnpm check && pnpm build && pnpm start` verificado.

## 4. Comandos
```powershell
pnpm install
pnpm dev      # http://localhost:3000
pnpm check
pnpm build
pnpm start    # ver nota Windows arriba
```

## 5. Decisiones pendientes del usuario (no avanzar sin esto)
- [ ] Número WhatsApp + email de reservas
- [ ] Dirección, teléfono, horarios, redes reales
- [ ] Carta final + precios + alérgenos
- [ ] Textos legales
- [ ] Origen imágenes finales
