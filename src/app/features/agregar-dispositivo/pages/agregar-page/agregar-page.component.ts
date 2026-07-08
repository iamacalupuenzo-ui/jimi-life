import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-agregar-page',
  standalone: true,
  templateUrl: './agregar-page.component.html',
  styleUrl: './agregar-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgregarPageComponent {
  private readonly router = inject(Router)

  goBack(): void {
    this.router.navigate(['/home'])
  }

  goToScan(): void {
    this.router.navigate(['/agregar-dispositivo', 'escanear'])
  }

  goToManual(): void {
    this.router.navigate(['/agregar-dispositivo', 'manual'])
  }
}
