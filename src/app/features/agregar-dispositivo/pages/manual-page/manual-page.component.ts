import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { Location } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-manual-page',
  standalone: true,
  templateUrl: './manual-page.component.html',
  styleUrl: './manual-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualPageComponent {
  private readonly router = inject(Router)
  private readonly location = inject(Location)

  readonly code = signal('')
  readonly canContinue = computed(() => this.code().trim().length > 0)

  close(): void {
    this.location.back()
  }

  scan(): void {
    this.router.navigate(['/agregar-dispositivo', 'escanear'])
  }

  continue(): void {
    if (!this.canContinue()) return
    // Sin backend aún: se simula el alta y se vuelve al Home.
    this.router.navigate(['/home'])
  }
}
