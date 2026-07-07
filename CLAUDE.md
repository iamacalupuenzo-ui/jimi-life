# CLAUDE.md — Jimi Life

## Propósito
App de seguridad personal (web mobile-first) para monitorear dispositivos Jimi Tracker:
personas mayores, niños, mascotas. Conectividad LTE CAT-M + GNSS, geocercas y alarmas.

## Stack
- Framework: Angular 22 (standalone components, signals)
- Lenguaje: TypeScript
- Estilos: SCSS + CSS custom properties
- Package manager: pnpm

## Arquitectura
Feature-based con lazy loading (base: plantilla-angular de Enzo).
- `core/` → servicios globales, guards, interceptors (singleton)
- `shared/` → mobile-shell, bottom-nav y futuros reutilizables
- `features/` → home, perfil (stub); próximos: detalle de dispositivo, geocercas, alertas
- `styles/tokens/` → _primitives, _semantic, _foundation (radios, sombras, gradientes)

## Rutas
- `/home` → lazy, HomePageComponent (dispositivos)
- `/perfil` → lazy, PerfilPageComponent (stub)
- `''` y `**` → redirect a `/home`

## API / Backend
Sin backend aún. Datos mock en `features/home/data/mock-devices.ts`.

## Features planificadas
- [x] Home: header saludo + tarjetas hero de dispositivo + toolbar (scan/agregar/alertas)
- [ ] Detalle de dispositivo con mapa (Leaflet, como proyecto viajes)
- [ ] Geocercas (vallas de seguridad)
- [ ] Alertas / notificaciones
- [ ] Perfil completo (pedidos, dispositivos, configuración)
- [ ] Login / onboarding

## Convenciones obligatorias
- Máximo 250 líneas por archivo — si se supera, dividir
- Standalone components + ChangeDetectionStrategy.OnPush siempre
- input()/output() de signals (Angular 22), inject() en vez de constructor
- Colores siempre via CSS vars: var(--color-brand-default)
- Nunca hardcodear colores, tipografía o espaciado
- Barrel exports cuando la feature crezca

## Notas del proyecto
- pnpm-workspace.yaml tiene `allowBuilds` para esbuild/lmdb (sin eso `pnpm build` falla)
- Imágenes de producto: SVGs propios en `public/devices/`
- Usuario mock: Guillermo Amaro (guillermo.amaro@comsatelglobal.com)
