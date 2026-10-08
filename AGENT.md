# AGENT.md — La Habana Criolla

> Descripción del proyecto para agentes. Basado solo en código verificado. No inventar datos del negocio (dirección, teléfono, redes, precios). Pedirlos al usuario.

## Qué es
Landing one-page de restaurante cubano "La Habana Criolla". Diseño "Casa criolla contemporánea" definido en `ideas.md`: Añil de Patio `#183B4E`, marfil `#F6F0E7`, terracota `#C5643D`, tipografías Fraunces (display) + DM Sans (body) + Space Mono (accent). Sin backend, sin DB, sin auth.

## Stack
- React 19 + TypeScript strict + Vite 7 + TailwindCSS 4 + shadcn/ui (Radix) + wouter + lucide-react + sonner.
- `zod`, `react-hook-form`, `axios`, `vitest` instalados pero **no usados** en flujo actual.
- `pnpm@10.4.1` obligatorio (`pnpm-lock.yaml`). Node 20+.
- Server `server/index.ts`: Express estático + fallback SPA. Sin API.

## Estructura relevante
```
client/index.html        # lang=es, fonts, theme-color, script analytics con %VITE_*%
client/src/main.tsx      # bootstrap
client/src/App.tsx       # ErrorBoundary + ThemeProvider(light, no switchable) + Router wouter
client/src/pages/Home.tsx # 449 líneas, TODA la landing (hero, cocina, carta, galería, dietas, historia, voces, reserva, visita, footer, lightbox)
client/src/pages/NotFound.tsx
client/src/components/Map.tsx # MapView Google Maps, NO usado actualmente
client/src/components/ErrorBoundary.tsx, ManusDialog.tsx
client/src/components/ui/  # shadcn
client/src/contexts/ThemeContext.tsx # switchable=false por defecto
client/src/hooks/ useMobile, usePersistFn, useComposition
client/src/lib/utils.ts  # cn()
client/src/index.css     # 426 líneas, tokens + estilos custom (site-shell, hero, menu, gallery...)
client/public/           # solo .gitkeep + __manus__/ ; NO hay /manus-storage/
shared/const.ts          # COOKIE_NAME, ONE_YEAR_MS (no usado en flujo actual)
server/index.ts
vite.config.ts           # root=client/, alias @/@shared/@assets, puerto 3000, plugins manus
tsconfig.json            # include client/src, shared, server; paths @/*, @shared/*
```

## Rutas y estado UI (Home.tsx)
- Estado local useState: `activeCategory`, `activeDietary`, `mobileOpen`, `galleryIndex`, `galleryPaused`, `lightboxItem`. Sin store global.
- Carta: `menuItems: Record<MenuCategory, ...>` hardcodeado línea 28.
- Reserva `handleReservation:156`: `preventDefault + toast.success + reset()`. FAKE, no envía a ningún sitio.
- Navegación por anclas `#cocina #carta #galeria #dietas #historia #visitanos #reserva` + `scrollToSection`.
- Placeholders conocidos: dirección `Patio del Barrio, 14`, social `href="#visitanos"`, imágenes `/manus-storage/*` (rotas en prod), favicon igual.

## Comandos (PowerShell 5.1, win32)
```powershell
pnpm install
pnpm dev      # vite --host, http://localhost:3000
pnpm check    # tsc --noEmit
pnpm build    # vite build + esbuild server -> dist/
pnpm preview
pnpm start    # ROTO en Windows: usa sintaxis Unix NODE_ENV=. Usar: $env:NODE_ENV="production"; node dist/index.js
```
- No cambiar de directorio con `cd` dentro del comando; usar parámetro `workdir`.
- Para ficheros usar herramientas Read/Edit/Write, no `cat/sed/echo`.

## Reglas para agentes
1. No inventar número WhatsApp, email, dirección, horarios, redes, precios ni imágenes. Marcar como `[PENDIENTE USUARIO]`.
2. Alcance producto acordado: web informativa + reserva WhatsApp/email, sin backend. No añadir DB/auth/pedidos sin pedirlo.
3. Preguntar antes/después si falta un dato; no asumir.
4. Referenciar código como `ruta:línea`.
5. Tras editar, verificar con `pnpm check` y si aplica `pnpm build`. Vitest existe pero hay 0 tests.
6. Responder en español, corto y directo. Documentos vivos: `Plan.md` (qué hay / qué falta), `ideas.md` (branding, no cambiar sin permiso), `todo.md` (histórico lightbox).
