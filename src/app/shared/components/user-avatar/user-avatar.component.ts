import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Ilustración de avatar del usuario. Fuente única compartida entre el header
 * del Home y la vista de Perfil. Rellena su contenedor (circular por defecto
 * del padre); los colores son propios de la ilustración.
 */
@Component({
  selector: 'app-user-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: inline-flex; line-height: 0; width: 100%; height: 100%; }
    svg { width: 100%; height: 100%; display: block; }
  `],
  template: `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="100" r="100" fill="#3A3530"/>
      <path d="M42 200 Q44 155 62 148 L75 160 Q100 170 125 160 L138 148 Q156 155 158 200Z" fill="#FFB800"/>
      <rect x="88" y="138" width="24" height="26" rx="12" fill="#F2A97A"/>
      <path d="M62 148 Q75 136 88 138 L88 155 Q75 158 62 165Z" fill="#E8A200"/>
      <path d="M138 148 Q125 136 112 138 L112 155 Q125 158 138 165Z" fill="#E8A200"/>
      <ellipse cx="100" cy="108" rx="34" ry="38" fill="#F2A97A"/>
      <ellipse cx="66" cy="110" rx="7" ry="9" fill="#F2A97A"/>
      <ellipse cx="134" cy="110" rx="7" ry="9" fill="#E89060"/>
      <path d="M68 100 Q66 72 100 66 Q134 72 132 100 Q128 76 100 72 Q72 76 68 100Z" fill="#1C1410"/>
      <ellipse cx="69" cy="94" rx="10" ry="16" fill="#1C1410"/>
      <ellipse cx="131" cy="94" rx="10" ry="16" fill="#1C1410"/>
      <path d="M76 78 Q82 62 100 66 Q84 70 80 80Z" fill="#2A1E14"/>
      <path d="M124 78 Q118 62 100 66 Q116 70 120 80Z" fill="#2A1E14"/>
      <path d="M88 68 Q100 58 112 68 Q100 64 88 68Z" fill="#2A1E14"/>
      <path d="M82 104 Q88 100 94 102" stroke="#3D2B1A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M106 102 Q112 100 118 104" stroke="#3D2B1A" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="89" cy="112" rx="6" ry="7" fill="white"/>
      <ellipse cx="111" cy="112" rx="6" ry="7" fill="white"/>
      <ellipse cx="90" cy="113" rx="4" ry="5" fill="#2A1810"/>
      <ellipse cx="112" cy="113" rx="4" ry="5" fill="#2A1810"/>
      <circle cx="91.5" cy="111" r="1.5" fill="white"/>
      <circle cx="113.5" cy="111" r="1.5" fill="white"/>
      <path d="M97 122 Q100 130 103 122" stroke="#E08860" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M88 134 Q100 144 112 134" stroke="#D07050" stroke-width="2" stroke-linecap="round" fill="none"/>
      <ellipse cx="78" cy="128" rx="9" ry="5" fill="#F0A090" opacity="0.35"/>
      <ellipse cx="122" cy="128" rx="9" ry="5" fill="#F0A090" opacity="0.35"/>
    </svg>
  `,
})
export class UserAvatarComponent {}
