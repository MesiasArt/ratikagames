# Publicar Ratika Games en Cloudflare

La web está lista en `dist/`. No requiere instalación, compilación ni servidor: es HTML, CSS y JavaScript.

## Tu repositorio ya está conectado a Cloudflare

Repositorio: https://github.com/MesiasArt/ratikagames

En **Workers & Pages → tu proyecto Pages → Settings → Builds & deployments**, usa:

- **Production branch:** `main`.
- **Framework preset:** `None`.
- **Build command:** vacío; si el panel exige uno, usa `exit 0`.
- **Build output directory:** `dist`.
- **Root directory:** vacío (raíz del repositorio).
- **Environment variables:** ninguna.

Guarda y vuelve a ejecutar el despliegue más reciente si ya había fallado con el repositorio vacío. Cada nuevo envío a `main` publicará una versión automáticamente. La dirección real de la web aparecerá en el panel de tu proyecto.

Si lo que conectaste es **Workers Builds** en lugar de **Pages**, utiliza `npx wrangler deploy` como comando de despliegue y deja el comando de compilación vacío. El archivo `wrangler.jsonc` incluido configura los archivos estáticos desde `dist`. No configures ambos servicios para el mismo proyecto.

La carpeta local `cloudflare-repo` es la copia Git preparada para esta conexión. Los archivos en su carpeta `dist` son los que debe publicar Cloudflare.

## Alternativa: un proyecto Pages nuevo con subida de ZIP

Esta alternativa no se usa con tu proyecto existente conectado a Git. El ZIP `ratika-games-cloudflare.zip` queda como copia lista para una subida manual a un proyecto nuevo.

1. Entra en https://dash.cloudflare.com/ y abre **Workers & Pages**.
2. Selecciona **Create application → Get started → Drag and drop your files** (elige Pages si el panel te muestra primero Workers).
3. Escribe `ratika-games` como nombre del proyecto, o uno disponible.
4. Arrastra `ratika-games-cloudflare.zip`. `index.html` debe quedar en la raíz de la subida, junto a `styles.css`, `app.js`, `games.js` y la carpeta `assets`.
5. Pulsa **Deploy site** / **Save and Deploy**. Cloudflare te dará la dirección pública terminada en `.pages.dev`.

Para actualizar, edita los archivos en `dist`, vuelve a comprimir su contenido y abre tu proyecto → **Create a new deployment** → **Production** → sube el ZIP nuevo.

## Usar tu dominio

En el proyecto abre **Custom domains → Set up a domain**, escribe tu dominio y sigue los pasos. Para usar un dominio raíz, como `ratikagames.com`, debes agregar ese dominio a tu cuenta Cloudflare y configurar los nameservers que te indique en el proveedor donde compraste el dominio. Para un subdominio con DNS externo, primero asócialo en Pages y luego configura el CNAME indicado por Cloudflare.

## Editar la página

- `dist/index.html`: textos, enlaces de Boyscout, redes y secciones.
- `dist/styles.css`: colores, tamaños y diseño adaptable.
- `dist/games.js`: títulos, imágenes, descripciones y enlaces de los demás proyectos. Añade enlaces HTTPS oficiales en `storeUrl` cuando estén disponibles.
- `dist/assets/`: logo, portadas y animación. Los archivos originales están conservados en la carpeta del proyecto.

Los textos de los proyectos distintos de Boyscout son propuestas editoriales basadas en los nombres de los archivos: revísalos antes de publicar. No se agregaron fechas de lanzamiento ni géneros sin confirmar. Los enlaces de Kickstarter e itch.io se incorporaron tal como los proporcionaste; no se afirma que la campaña esté activa.

## Vista previa local

Con Node.js instalado, abre una terminal en la carpeta del proyecto y ejecuta `node preview.mjs`. Abre http://127.0.0.1:4173 . También puedes abrir `dist/index.html` directamente en un navegador.

Las fuentes se cargan desde Google Fonts; hay fuentes locales de respaldo si no tienes conexión. El resto de los recursos se sirve desde tu propia web.

## Alternativa por terminal

`npx wrangler login`

`npx wrangler pages deploy dist --project-name ratika-games`

Cloudflare te pedirá crear o seleccionar el proyecto. Direct Upload no permite convertir el mismo proyecto a integración Git después; si quieres publicación automática con GitHub, crea desde el principio un proyecto con esa integración.

Documentación oficial consultada:
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
