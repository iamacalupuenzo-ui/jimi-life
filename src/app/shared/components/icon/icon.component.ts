import { ChangeDetectionStrategy, Component, input } from '@angular/core'

/**
 * Set de iconos canónico de Jimi Life.
 * Fuente única de verdad para batería, ubicación y bluetooth: los mismos
 * trazados que usa el device-card del home. Reusar SIEMPRE este componente
 * en vez de re-dibujar SVGs inline, para no divergir del estándar.
 * El color se hereda por `currentColor` (lo define el contenedor).
 */
export type JimiIconName =
  | 'battery'
  | 'location'
  | 'clock'
  | 'bluetooth'
  | 'bluetooth-off'
  | 'pin'

@Component({
  selector: 'jl-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: inline-flex; line-height: 0; }'],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('battery') {
          <rect x="2" y="6" width="17" height="12" rx="3.5" fill="currentColor" />
          <rect x="20.5" y="9.5" width="2.5" height="5" rx="1.25" fill="currentColor" />
        }
        @case ('location') {
          <path
            fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
            d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 10a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
          />
          <rect x="11" y="1.5" width="2" height="4" rx="1" fill="currentColor" />
          <rect x="11" y="18.5" width="2" height="4" rx="1" fill="currentColor" />
          <rect x="1.5" y="11" width="4" height="2" rx="1" fill="currentColor" />
          <rect x="18.5" y="11" width="4" height="2" rx="1" fill="currentColor" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            d="M12 6.5V12l3.6 2.1" stroke="var(--neutral-0)" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
          />
        }
        @case ('bluetooth') {
          <path
            d="M6.5 8 17 16.5l-5 4v-17l5 4L6.5 16"
            stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"
          />
        }
        @case ('bluetooth-off') {
          <path
            d="M12 10V3.5l5 4-3.2 2.6M12 14v6.5l5-4L6.5 8"
            stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"
          />
          <path d="M4.5 4.5l15 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        }
        @case ('pin') {
          <path
            d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 0 1 13 0c0 4.6-6.5 10-6.5 10Z"
            fill="currentColor" opacity="0.2"
          />
          <path
            d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 0 1 13 0c0 4.6-6.5 10-6.5 10Z"
            stroke="currentColor" stroke-width="1.6"
          />
          <circle cx="12" cy="11" r="2.4" fill="currentColor" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<JimiIconName>()
  readonly size = input<number>(20)
}
