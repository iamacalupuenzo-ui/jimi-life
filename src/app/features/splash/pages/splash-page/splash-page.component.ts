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

  // Curva "ease-out expresiva" para una entrada con carácter.
  private readonly ease = [0.16, 1, 0.3, 1] as const

  ngAfterViewInit(): void {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      this.emblem().nativeElement.style.opacity = '1'
      this.word().nativeElement.style.opacity = '1'
      window.setTimeout(() => this.goHome(), 900)
      return
    }

    this.playIntro()
  }

  private playIntro(): void {
    const emblem = this.emblem().nativeElement
    const word = this.word().nativeElement
    const root = this.root().nativeElement

    animate(
      emblem,
      { opacity: [0, 1], scale: [0.35, 1], rotate: [-16, 0] },
      { duration: 1.1, ease: this.ease },
    )

    animate(
      word,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.7, delay: 0.5, ease: this.ease },
    )

    window.setTimeout(() => {
      const exit = animate(
        root,
        { opacity: [1, 0], scale: [1, 1.08] },
        { duration: 0.55, ease: 'easeIn' },
      )
      exit.finished.then(() => this.goHome())
    }, 2300)
  }

  private goHome(): void {
    void this.router.navigate(['/home'])
  }
}
