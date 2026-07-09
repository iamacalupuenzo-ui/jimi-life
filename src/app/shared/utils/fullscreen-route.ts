// Rutas que ocupan toda la pantalla y ocultan el bottom-nav flotante.
const FULLSCREEN_PREFIXES = ['/splash', '/dispositivo', '/agregar-dispositivo']

export function isFullscreenRoute(url: string): boolean {
  return FULLSCREEN_PREFIXES.some((prefix) => url.startsWith(prefix))
}
