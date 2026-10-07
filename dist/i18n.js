const translations = {
  "Pequeños personajes. Grandes aventuras.": "Small characters. Big adventures.",
  "Proyecto anterior": "Previous project",
  "Proyecto siguiente": "Next project",
  "Seleccionar proyecto": "Select project",
  "Pausar carrusel": "Pause slideshow",
  "Reanudar carrusel": "Resume slideshow",
  "Saltar al contenido": "Skip to content",
  "Menú": "Menu",
  "Nuestros juegos": "Our games",
  "El estudio": "The studio",
  "Pequeños personajes.": "Small characters.",
  "Grandes aventuras.": "Big adventures.",
  "Un poco de caos. Mucha personalidad.": "A little chaos. Lots of personality.",
  "Juegos independientes para salir de lo de siempre.": "Indie games that break away from the ordinary.",
  "Explora nuestros juegos": "Explore our games",
  "01 / NUESTROS JUEGOS": "01 / OUR GAMES",
  "Tu próxima aventura": "Your next adventure",
  "empieza": "starts",
  "aquí.": "here.",
  "Cada mundo tiene su propia historia.": "Every world has its own story.",
  "Encuentra el tuyo.": "Find yours.",
  "UN PUEBLO. UN GRAN MISTERIO.": "ONE TOWN. ONE BIG MYSTERY.",
  "AVENTURA": "ADVENTURE",
  "MINIJUEGOS": "MINIGAMES",
  "Boyscout es una aventura con vista desde arriba en la que juegas como Patricio, un niño que aprende a ayudar a sus vecinos mientras su padre intenta hacer crecer su negocio en un pueblo rural. Un día, un suceso inesperado cambiará para siempre la vida de sus habitantes.": "Boyscout is a top-down adventure in which you play as Patricio, a little boy who is learning to help his neighbors while his father is trying to grow his own business in a rural town. One day, an unusual event will change the lives of the locals forever.",
  "Ver en Steam": "View on Steam",
  "Juega la demo": "Play the demo",
  "Conoce el proyecto en Kickstarter": "Discover the project on Kickstarter",
  "Más de Ratika Games": "More from Ratika Games",
  "Nuestros proyectos": "Our projects",
  "02 / NUESTRA COMUNIDAD": "02 / OUR COMMUNITY",
  "La comunidad de": "The community of",
  "¡Ven a conversar y compartir con el equipo de Ratika Games!": "Come and hang out with the Ratika Games team!",
  "Únete a Discord": "Join our Discord",
  "Siempre en": "Always in",
  "movimiento.": "motion.",
  "Del primer trazo al siguiente paso. Conoce a nuestra ratika en acción y descubre la personalidad detrás de cada aventura.": "From the first sketch to the next step. Meet our ratika in action and discover the personality behind every adventure.",
  "Reproducir animación": "Play animation",
  "Pausar animación": "Pause animation",
  "Reintentar animación": "Retry animation",
  "UNA RATIKA. MUCHAS POSIBILIDADES.": "ONE RATIKA. MANY POSSIBILITIES.",
  "EL SIGUIENTE NIVEL TE ESPERA": "THE NEXT LEVEL AWAITS",
  "Qué bueno": "So glad",
  "que": "you",
  "llegaste.": "are here.",
  "Sigue el proceso, conoce a nuestros personajes y acompáñanos en lo que viene.": "Follow our progress, meet our characters and join us for what comes next.",
  "Síguenos en Instagram": "Follow us on Instagram",
  "Ratika en X / Twitter": "Ratika on X / Twitter",
  "Juegos": "Games",
  "Estudio": "Studio",
  "Universo": "Universe",
  "RATIKA GAMES / EL JUEGO": "RATIKA GAMES / THE GAME",
  "La página oficial de este juego se compartirá aquí.": "The official page for this game will be shared here.",
  "Visitar página del juego": "Visit game page",
  "Jugar en Poki": "Play on Poki",
  "Jugar en itch.io": "Play on itch.io",
  "Una dosis de caos": "A dose of chaos",
  "Instinto felino": "Feline instinct",
  "Espíritu de aventura": "Adventure awaits",
  "Una historia por descubrir": "A story to discover",
  "Entra en el universo de Rati Ratikas y conoce a sus personajes. Una colección de pequeñas personalidades que no pasan desapercibidas.": "Enter the world of Rati Ratikas and meet its characters. A collection of little personalities that stand out.",
  "Descubre Ninja Cat, un universo con espíritu felino y una identidad visual llena de energía.": "Discover Ninja Cat, a world with feline spirit and an energetic visual identity.",
  "Conoce el mundo de Saoko Adventure: personajes, color y una nueva aventura por descubrir.": "Meet the world of Saoko Adventure: characters, color and a new adventure to discover.",
  "Explora el universo de 28 de Febrero y descubre su identidad, sus personajes y su historia.": "Explore the world of 28 de Febrero and discover its identity, characters and story.",
  "Cerrar ficha": "Close game details",
  "Navegación principal": "Main navigation",
  "Ratika Games, inicio": "Ratika Games, home",
  "Los personajes de Rati Ratikas": "The characters of Rati Ratikas",
  "Banner de Boyscout con Patricio y los habitantes del pueblo": "Boyscout banner featuring Patricio and the townspeople",
  "Animación de Ratika corriendo": "Animation of Ratika running",
  "Bienvenido a Ratika Games. Descubre nuestros juegos, personajes y mundos independientes.": "Welcome to Ratika Games. Discover our indie games, characters and worlds."
};
let language = 'es';
const originals = new WeakMap();
const originalAttributes = new WeakMap();
window.resetLanguageAttributes = element => originalAttributes.delete(element);
function translate(value) {
  if (language === 'es') return value;
  if (translations[value]) return translations[value];
  if (value.startsWith('Conocer ')) return 'Discover ' + value.slice(8);
  if (value.startsWith('Ilustración de ')) return 'Artwork of ' + value.slice(15);
  return value;
}
window.applyLanguage = function () {
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('script, style, .language-switch')) continue;
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const source = originals.get(node);
    node.nodeValue = source.replace(source.trim(), translate(source.trim()));
  }
  document.querySelectorAll('[aria-label], img[alt]').forEach(element => {
    let values = originalAttributes.get(element);
    if (!values) { values = {}; for (const attribute of ['aria-label', 'alt']) if (element.hasAttribute(attribute)) values[attribute] = element.getAttribute(attribute); originalAttributes.set(element, values); }
    for (const [attribute, value] of Object.entries(values)) element.setAttribute(attribute, translate(value));
  });
  const meta = document.querySelector('meta[name="description"]');
  meta.content = language === 'en' ? translations['Bienvenido a Ratika Games. Descubre nuestros juegos, personajes y mundos independientes.'] : 'Bienvenido a Ratika Games. Descubre nuestros juegos, personajes y mundos independientes.';
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
};
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  language = button.dataset.language;
  try { localStorage.setItem('ratika-language', language); } catch {}
  window.applyLanguage();
}));
try { if (localStorage.getItem('ratika-language') === 'en') language = 'en'; } catch {}
window.applyLanguage();
