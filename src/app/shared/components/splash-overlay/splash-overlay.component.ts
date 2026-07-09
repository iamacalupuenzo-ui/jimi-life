import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core'
import { animate } from 'motion'

// Overlay de arranque: se muestra encima de la ruta actual en cada recarga
// (a diferencia de /splash, que solo navega desde la raíz). No navega, solo
// se oculta tras la animación dejando ver la ruta con la que se cargó la app.
@Component({
  selector: 'app-splash-overlay',
  standalone: true,
  templateUrl: './splash-overlay.component.html',
  styleUrl: './splash-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashOverlayComponent implements AfterViewInit {
  readonly hidden = signal(false)

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root')
  private readonly emblem = viewChild.required<ElementRef<SVGGElement>>('emblem')
  private readonly word = viewChild.required<ElementRef<SVGGElement>>('word')

  ngAfterViewInit(): void {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      window.setTimeout(() => this.hidden.set(true), 900)
      return
    }

    this.playIntro()
  }

  private playIntro(): void {
    try {
      this.emblem().nativeElement.classList.add('splash__emblem--intro')
      this.word().nativeElement.classList.add('splash__word--intro')
    } catch {
      // El logo ya es visible por CSS aunque la clase no se aplique.
    }

    window.setTimeout(() => this.playExit(), 2300)
  }

  private playExit(): void {
    try {
      const root = this.root().nativeElement
      const exit = animate(
        root,
        { opacity: [1, 0], scale: [1, 1.08] },
        { duration: 0.55, ease: 'easeIn' },
      )
      exit.finished.then(() => this.hidden.set(true)).catch(() => this.hidden.set(true))
    } catch {
      this.hidden.set(true)
    }
  }
}
