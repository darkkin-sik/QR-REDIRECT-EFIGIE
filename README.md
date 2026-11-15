# QR-REDIRECT-EFIGIE

El QR permanente abre la página de GitHub Pages, que redirige al Cloudflare Worker `figie-qr-redirect.jose-sicardi-r2.workers.dev`. El Worker consulta `destino.txt` en cada acceso y redirige al Quick Tunnel vigente.

## Configuración inicial

1. En Cloudflare, crea un Worker llamado `figie-qr-redirect`.
2. Copia el contenido de `worker.js` en el editor del Worker y despliega los cambios.
3. Publica este repositorio en GitHub Pages desde la rama `main`.
4. El script `iniciar.ps1` actualiza `destino.txt` y lo sube a `main` cada vez que inicia un túnel.

El QR general debe apuntar a `https://darkkin-sik.github.io/QR-REDIRECT-EFIGIE/`.

El enlace independiente del hub es `https://darkkin-sik.github.io/QR-REDIRECT-EFIGIE/?ruta=hub`. La página de GitHub Pages pasa la ruta al Worker, que agrega `/hub.html` al túnel activo. La raíz sigue redirigiendo al inicio actual, sin cambios. Al agregar nuevos destinos, incluye únicamente rutas permitidas en `worker.js`.