# DESIGN.md — Jimi Life

> Este archivo se actualiza cuando el usuario cambia criterios visuales.

## Dirección visual
Clásico pero moderno: base clara cálida (#FDFCF8), marca dorada Jimi (#FFB800),
gradientes suaves tipo "aura" pastel en cards (referencia: bento cards con
radial-gradients), superficies con blur y bordes blancos translúcidos.

## Sistema de tokens activo
- Brand: gold-500 #FFB800 (escala gold-50 → gold-950)
- Fuente: Plus Jakarta Sans (400–800)
- Tokens: src/styles/tokens/_primitives.scss + _semantic.scss + _foundation.scss

## Tokens clave
| Token | Uso |
|---|---|
| --gradient-brand | Pill activo del nav, CTAs destacados |
| --gradient-header | Fondo degradado dorado del header (fade a transparente) |
| --gradient-aura-* | Blobs radiales pastel dentro de cards (lime/sky/peach/mint) |
| --radius-lg / xl | Cards 24px / nav flotante 32px |
| --shadow-card / float / nav | Elevaciones |

## Criterios de componentes
- Bottom nav: flotante, blur, pill con gradiente dorado en el ítem activo
- Device cards: rectangulares compactas — thumbnail 68px izquierda + nombre/chips + dirección al pie; aura pastel sutil (0.45)
- Chips de estado: success (batería ok), danger (batería baja), info (bluetooth), brand (contigo)
- Estados explícitos: default, hover, focus-visible, empty
- Iconos: SVG inline stroke 1.6–1.8, tamaños 15/19/20/22px
- Inputs futuros: siempre con label visible

## Historial de cambios de estilo
- 2026-07-07 — Setup inicial: paleta dorada + auras pastel + nav gradiente — brief de Enzo (refs Jimi Life app + bento gradients)
- 2026-07-07 — Device cards: de hero grande a rectangular compacta (estándar Jimi Life app) — pedido de Enzo con captura de referencia
