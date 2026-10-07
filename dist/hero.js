const heroProjects = [
  { title: 'Rati Ratikas', folder: 'Rati Ratikas', bg: 'RRatikaBG.png', characters: 'RRatikaCharacters.png', logo: 'Rratikas_Logo.png' },
  { title: 'Boyscout: Patrick’s Town', folder: 'Boyscout', bg: 'Boyscout_BG.png', characters: 'Boyscout_Characters.png', logo: 'Boyscout_Logo.png' },
  { title: 'Ninja Cat', folder: 'Ninja Cat', bg: 'Ninjacat_BG.png', characters: 'Ninjacat_Character.png', logo: 'Ninjacat_Logo.png' },
  { title: '28 de Febrero', folder: '28 de Febrero', bg: '28feb_Bg.png', characters: '28feb_Characters.png', logo: '28feb_Logo.png' }
];
const hero = document.querySelector('.hero-banner');
const slideContainer = hero.querySelector('.hero-slides');
const dotContainer = hero.querySelector('.hero-dots');

let currentHero = 0;

let heroTimer;

// Fit the visible artwork without changing the original transparent PNG files.
function fitHeroArtwork(img) {
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 700 / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  let left = canvas.width, top = canvas.height, right = 0, bottom = 0;
  for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
    if (data[(y * canvas.width + x) * 4 + 3] > 12) {
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  if (right <= left || bottom <= top) return;
  left = Math.max(0, left - 2); top = Math.max(0, top - 2);
  right = Math.min(canvas.width, right + 3); bottom = Math.min(canvas.height, bottom + 3);
  const width = right - left, height = bottom - top;
  img.parentElement.style.aspectRatio = `${width} / ${height}`;
  img.parentElement.style.setProperty('--art-ratio', width / height);
  Object.assign(img.style, { width: `${canvas.width / width * 100}%`, maxWidth: 'none', height: 'auto', left: `${-left / width * 100}%`, top: `${-top / height * 100}%` });
}

heroProjects.forEach((project, index) => {
  const slide = document.createElement('article');
  slide.className = `hero-slide${index === 0 ? ' is-active' : ''}`;
  slide.setAttribute('aria-label', project.title);
  slide.setAttribute('aria-hidden', String(index !== 0));
  slide.inert = index !== 0;
  const base = `assets/herobanner/${project.folder}/`;
  const background = document.createElement('img');
  background.className = 'hero-scene'; background.src = base + project.bg; background.alt = '';
  background.fetchPriority = index === 0 ? 'high' : 'low';
  const characters = document.createElement('div'); characters.className = 'hero-characters';
  const copy = document.createElement('div'); copy.className = 'hero-project-copy';
  const logo = document.createElement('div'); logo.className = 'hero-project-logo';
  for (const [holder, file, alt] of [[characters, project.characters, ''], [logo, project.logo, project.title]]) {
    const img = document.createElement('img');
    img.alt = alt; img.addEventListener('load', () => fitHeroArtwork(img), { once: true });
    img.src = base + file; holder.append(img);
  }
  const link = document.createElement('a'); link.className = 'button lime';
  link.href = '#juegos'; link.textContent = 'Explora nuestros juegos';
  copy.append(logo, link);
  const caption = document.createElement('p'); caption.className = 'banner-caption'; caption.textContent = `${project.title.toUpperCase()} / RATIKA GAMES`;
  slide.append(background, characters, copy, caption); slideContainer.append(slide);
  const dot = document.createElement('button'); dot.type = 'button';
  dot.setAttribute('aria-label', project.title); dot.setAttribute('aria-pressed', String(index === 0));
  dot.addEventListener('click', () => selectHero(index)); dotContainer.append(dot);
});

function scheduleHero() {
  clearTimeout(heroTimer);
  if (!document.hidden) {
    heroTimer = setTimeout(() => selectHero(currentHero + 1), 7000);
  }
}
function selectHero(index) {
  currentHero = (index + heroProjects.length) % heroProjects.length;
  [...slideContainer.children].forEach((slide, i) => {
    slide.classList.toggle('is-active', i === currentHero);
    slide.setAttribute('aria-hidden', String(i !== currentHero)); slide.inert = i !== currentHero;
    dotContainer.children[i].setAttribute('aria-pressed', String(i === currentHero));
  });
  scheduleHero();
}
hero.querySelector('.hero-prev').addEventListener('click', () => selectHero(currentHero - 1));
hero.querySelector('.hero-next').addEventListener('click', () => selectHero(currentHero + 1));
document.addEventListener('visibilitychange', scheduleHero);
scheduleHero();
