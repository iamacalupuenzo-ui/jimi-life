import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component'
import { AvatarService } from '../../../../shared/services/avatar.service'

interface MenuItem {
  id: 'settings' | 'help' | 'about'
  label: string
  href: string
}

// Lado del recorte cuadrado con el que se guarda la foto (mantiene liviano el
// dato en localStorage y calza con el avatar circular).
const AVATAR_SIZE = 256

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [UserAvatarComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilPageComponent {
  private readonly avatar = inject(AvatarService)

  readonly userName = 'Guillermo Amaro'
  readonly email = 'guillermo.amaro@comsatelglobal.com'

  readonly orders = { total: 0, inUse: 0 }
  readonly devices = { total: 2, active: 2 }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    input.value = '' // permite volver a elegir el mismo archivo
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => this.avatar.setPhoto(this.toSquareDataUrl(img))
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  // Recorta al cuadrado centrado y reduce a AVATAR_SIZE antes de guardar.
  private toSquareDataUrl(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas')
    canvas.width = AVATAR_SIZE
    canvas.height = AVATAR_SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return img.src

    const side = Math.min(img.naturalWidth, img.naturalHeight)
    const sx = (img.naturalWidth - side) / 2
    const sy = (img.naturalHeight - side) / 2
    ctx.drawImage(img, sx, sy, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE)
    return canvas.toDataURL('image/jpeg', 0.85)
  }

  readonly menuItems: MenuItem[] = [
    { id: 'settings', label: 'Ajustes',              href: '#' },
    { id: 'help',     label: 'Ayuda y sugerencias',  href: '#' },
    { id: 'about',    label: 'Acerca de',            href: '#' },
  ]
}
