const DESTINO_URL = "https://raw.githubusercontent.com/darkkin-sik/QR-REDIRECT-EFIGIE/main/destino.txt";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "Pragma": "no-cache"
};

function errorResponse(message, status) {
  return new Response(message, {
    status,
    headers: {
      ...NO_CACHE_HEADERS,
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

export default {
  async fetch() {
    const manifestUrl = new URL(DESTINO_URL);
    manifestUrl.searchParams.set("cacheBust", `${Date.now()}-${Math.random()}`);

    const manifestResponse = await fetch(manifestUrl, { cache: "no-store" });
    if (!manifestResponse.ok) {
      return errorResponse("No se pudo consultar el destino actual. Intenta nuevamente en unos segundos.", 502);
    }

    const destino = (await manifestResponse.text()).trim();
    if (!/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/i.test(destino)) {
      return errorResponse("El destino todavía no está configurado. Inicia el servidor y vuelve a escanear el QR.", 503);
    }

    return new Response(null, {
      status: 302,
      headers: {
        ...NO_CACHE_HEADERS,
        "Location": destino
      }
    });
  }
};
