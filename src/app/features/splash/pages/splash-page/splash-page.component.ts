import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { animate } from 'motion'

// Pantalla de bienvenida: revela el logo de Monark con motion y luego navega
// al Home. Se muestra al abrir la app (ruta raíz).
@Component({
  selector: 'app-splash-page',
  standalone: true,
  templateUrl: './splash-page.component.html',
  styleUrl: './splash-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashPageComponent implements AfterViewInit {
  private readonly router = inject(Router)

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root')
  private readonly emblem = viewChild.required<ElementRef<SVGGElement>>('emblem')
  private readonly word = viewChild.required<ElementRef<SVGGElement>>('word')

  ngAfterViewInit(): void {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      window.setTimeout(() => this.goHome(), 900)
      return
    }

    this.playIntro()
  }

  // Entrada vía clases + @keyframes CSS (no motion/WAAPI): es la forma fiable
  // de animar los <g> del SVG. Por defecto (sin clase) el logo ya es visible
  // (ver .scss), así que si esto lanzara un error el logo igual se ve.
  private playIntro(): void {
    try {
      this.emblem().nativeElement.classList.add('splash__emblem--intro')
      this.word().nativeElement.classList.add('splash__word--intro')
    } catch {
      // El logo ya es visible por CSS aunque la clase no se aplique.
    }

    window.setTimeout(() => this.playExit(), 2300)
  }

  // Motion sí es fiable para animar un <div> HTML plano (el root), pero se
  // envuelve en try/catch y con .catch en la promesa para garantizar que la
  // navegación a /home ocurra siempre, incluso si la animación falla.
  private playExit(): void {
    try {
      const root = this.root().nativeElement
      const exit = animate(
        root,
        { opacity: [1, 0], scale: [1, 1.08] },
        { duration: 0.55, ease: 'easeIn' },
      )
      exit.finished.then(() => this.goHome()).catch(() => this.goHome())
    } catch {
      this.goHome()
    }
  }

  private goHome(): void {
    void this.router.navigate(['/home'])
  }
}
