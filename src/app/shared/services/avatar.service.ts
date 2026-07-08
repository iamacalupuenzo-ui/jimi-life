import { Injectable, signal } from '@angular/core'

const STORAGE_KEY = 'jimi:avatar-photo'

/**
 * Estado global de la foto de perfil elegida por el usuario.
 * Si `photo()` es null se usa la ilustración por defecto. Sin backend aún:
 * se persiste en localStorage para que sobreviva a recargas.
 */
@Injectable({ providedIn: 'root' })
export class AvatarService {
  private readonly _photo = signal<string | null>(this.read())
  readonly photo = this._photo.asReadonly()

  setPhoto(dataUrl: string): void {
    this._photo.set(dataUrl)
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl)
    } catch {
      /* quota u almacenamiento no disponible: queda solo en memoria */
    }
  }

  clear(): void {
    this._photo.set(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }

  private read(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  }
}
