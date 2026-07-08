import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, OnDestroy, ViewChild, inject, signal,
} from '@angular/core'
import { Location } from '@angular/common'
import { Router } from '@angular/router'

// La API de linterna (torch) aún no está en los tipos estándar del DOM.
type TorchCapabilities = MediaTrackCapabilities & { torch?: boolean }

@Component({
  selector: 'app-escanear-page',
  standalone: true,
  templateUrl: './escanear-page.component.html',
  styleUrl: './escanear-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscanearPageComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router)
  private readonly location = inject(Location)

  @ViewChild('video', { static: true }) private videoRef!: ElementRef<HTMLVideoElement>

  readonly error = signal<string | null>(null)
  readonly torchOn = signal(false)
  readonly torchAvailable = signal(false)

  private stream: MediaStream | null = null

  async ngAfterViewInit(): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) {
      this.error.set('Este dispositivo no permite acceder a la cámara.')
      return
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })

      const video = this.videoRef.nativeElement
      video.srcObject = this.stream
      await video.play()

      const track = this.stream.getVideoTracks()[0]
      const caps = track.getCapabilities?.() as TorchCapabilities | undefined
      this.torchAvailable.set(Boolean(caps?.torch))
    } catch {
      this.error.set('No pudimos acceder a la cámara. Revisá los permisos e intentá de nuevo.')
    }
  }

  ngOnDestroy(): void {
    this.stopCamera()
  }

  private stopCamera(): void {
    this.stream?.getTracks().forEach((track) => track.stop())
    this.stream = null
  }

  async toggleTorch(): Promise<void> {
    const track = this.stream?.getVideoTracks()[0]
    if (!track || !this.torchAvailable()) return

    const next = !this.torchOn()
    try {
      await track.applyConstraints({ advanced: [{ torch: next }] } as unknown as MediaTrackConstraints)
      this.torchOn.set(next)
    } catch {
      this.torchAvailable.set(false)
    }
  }

  close(): void {
    this.stopCamera()
    // Vuelve al origen (Home si vino del botón QR, o la vista de agregar).
    this.location.back()
  }

  manualEntry(): void {
    this.stopCamera()
    this.router.navigate(['/agregar-dispositivo', 'manual'])
  }
}
