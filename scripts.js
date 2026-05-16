// ============================================================================
// 
//                    Sarah's Script for SarahEvans.au
//
// ============================================================================

// Background colours or textures settings
let backgroundStyle = {
  colour_1: '#f5df3d',
  colour_2: '#eb2dbb',
  colour_2_enabled: true,
  angle: 135,
  texture: 'none'
};

// For the Quick Randomise Dice
function quickRandomiseBackground(e) { // what's e for ?
  if (e) e.stopPropagation(); // what's stopPropagation ?
  backgroundStyle.colour_1 = getRandomColour();
  backgroundStyle.colour_2 = getRandomColour();
  backgroundStyle.colour_2_enabled = true;
  backgroundStyle.angle = getRandomDegree();
  backgroundStyle.texture = 'none'; // Clear textures on quick dice
  updatePortfolioBackground();
  updateTextureButtons(); // Sync modal UI // what's this?
  if (document.getElementById('background-modal').classList.contains('show')) syncBgInputs();
}


function openPopup(id) {
  document.getElementById(id).classList.add('show');
  if (id === 'background-modal') syncBgInputs(); // again what's syncBgInputs
}

// is remove('show') in classList the best way?
function closePopup(id) {
  document.getElementById(id).classList.remove('show');
}

// what's 'e' ?
function closePopupIfOutside(e, id) {
  if (e.target.id === id) closePopup(id);
}

// sync Bg Inputs and updateTextureButtons I need to understand
function syncBgInputs() {
  document.getElementById('background-colour-1').value = rgbToHex(backgroundStyle.colour_1) || backgroundStyle.colour_1;
  document.getElementById('background-colour-2').value = rgbToHex(backgroundStyle.colour_2) || backgroundStyle.colour_2;
  document.getElementById('enable-colour-2').checked = backgroundStyle.colour_2_enabled;
  document.getElementById('background-angle').value = backgroundStyle.angle;
  updateTextureButtons();
}

// woah what is this mess? 
// what's 'match' and then what's /\d+/g ?
function rgbToHex(rgb) {
  if (!rgb.startsWith('rgb')) return rgb;
  const match = rgb.match(/\d+/g);
  if (!match) return '#ffffff';
  return "#" + match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}

// updateBackground (why from inputs?) (used to be updateBgFromInputs) update Background... from user Input
// updateBackgroundFromHTML 
function updateBackground() {
  backgroundStyle.colour_1 = document.getElementById('background-colour-1').value;
  backgroundStyle.colour_2 = document.getElementById('background-colour-2').value;
  backgroundStyle.colour_2_enabled = document.getElementById('enable-colour-2').checked;
  backgroundStyle.angle = document.getElementById('background-angle').value;
  updatePortfolioBackground();
}

function selectTexture(textureName) {
  backgroundStyle.texture = textureName;
  updateTextureButtons(); // this shouldn't be in js. Easy css no? 
  updatePortfolioBackground();
}


// This function doesn't make sense to me just yet. Might go away. 
function updateTextureButtons() {
  document.querySelectorAll('.texture-option').forEach(opt => {
    opt.classList.toggle('active', opt.textContent.toLowerCase() === backgroundStyle.texture);
  });
}

function updatePortfolioBackground() {
  const body = document.body;
  let bgString = "";

  // Base Colors
  if (backgroundStyle.colour_2_enabled) {
    bgString = `linear-gradient(${backgroundStyle.angle}deg, ${backgroundStyle.colour_1} 0%, ${backgroundStyle.colour_2} 100%)`;
  } else {
    bgString = backgroundStyle.colour_1;
  }

  body.style.background = bgString;
  body.style.backgroundColor = backgroundStyle.colour_1; // Fallback

  // Textures
  if (backgroundStyle.texture === 'paper') {
    body.style.backgroundImage = `url('Images/textured_paper2.png'), ${backgroundStyle.colour_2_enabled ? bgString : 'none'}`;
  } else if (backgroundStyle.texture === 'desk') {
    body.style.backgroundImage = `url('Images/desk.jpg'), ${backgroundStyle.colour_2_enabled ? bgString : 'none'}`;
  } else {
    body.style.backgroundImage = backgroundStyle.colour_2_enabled ? bgString : 'none';
  }

  const preview = document.getElementById('background-preview');
  const miniPreview = document.getElementById('background-modal-preview');
  const c1Circle = document.getElementById('c1-circle');
  const c2Circle = document.getElementById('c2-circle');

  const finalStyle = body.style.background || body.style.backgroundColor;

  if (preview) preview.style.background = finalStyle;
  if (miniPreview) miniPreview.style.background = finalStyle;
  if (c1Circle) c1Circle.style.backgroundColor = backgroundStyle.colour_1;
  if (c2Circle) c2Circle.style.backgroundColor = backgroundStyle.colour_2;
}

// this function doesn't allow two colours... 
function changeColour(colour) {
  if (colour === null) {
    backgroundStyle.colour_1 = getRandomColour();
    backgroundStyle.colour_2 = getRandomColour();
    backgroundStyle.colour_2_enabled = Math.random() > 0.5;
  } else {
    backgroundStyle.colour_1 = colour;
    backgroundStyle.colour_2_enabled = false;
  }
  updatePortfolioBackground();
  if (document.getElementById('background-modal').classList.contains('show')) syncBgInputs();
}

// The RESUME_DATA has been moved to data.js

function showResume(type, doScroll = false) {
  const container = document.getElementById("resume-target");
  if (container && RESUME_DATA[type]) {
    container.innerHTML = RESUME_DATA[type];
  }

  // Remember choice
  localStorage.setItem("resumeType", type);
  
  if (doScroll) {
    const resumeSection = document.getElementById("resume");
    if (resumeSection) {
      resumeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Load saved preference
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("resumeType");
  const type = (saved && RESUME_DATA[saved]) ? saved : "researcher";
  showResume(type);

  // Initialize background and UI
  // Start with signature Pink-Gold gradient
  backgroundStyle.colour_1 = '#f5df3d'; // Gold
  backgroundStyle.colour_2 = '#eb2dbb'; // Pink
  backgroundStyle.colour_2_enabled = true;
  backgroundStyle.angle = 30;
  updatePortfolioBackground();
  
  // Set initial Season state
  assignSeason("None", " ", null, "☀️");
});

function changeStyle(style) {
  let theme = document.getElementById('theme');
  let contentBoxes = document.querySelectorAll('.content-box');
  let pageTitle = document.querySelector('h1.title');
  contentBoxes.forEach(box => box.style.backgroundImage = "");
  theme.setAttribute('href', 'style_base.css');
  
  closePopup('style-modal');
  
  if (style == "Flat-Rounded") {
    theme.setAttribute('href', 'style01.css');
    if (pageTitle) pageTitle.textContent = "Sarah Evans";
  } else if (style == "Newspaper") {
    theme.setAttribute('href', 'style03_newspaper.css');
    if (pageTitle) pageTitle.textContent = "Sarah Evans";
    contentBoxes.forEach(box => box.style.backgroundImage = "url('Images/textured_paper2.png')");
    document.body.style.backgroundImage = "url('Images/textured_paper2.png')";
  } else if (style == "Notebook"){
    theme.setAttribute('href', 'style04_notebook.css');
    if (pageTitle) pageTitle.textContent = "Sarah evans";
    selectTexture('desk');
  }
  
  const styleDisplay = document.getElementById('current-style-display');
  if (styleDisplay) styleDisplay.textContent = style.replace('Flat-Rounded', 'Blob');
}

function assignSeason(season, emoji, colour, nextEmoji) {
  const seasonButton = document.getElementById("season-button"); 
  if (seasonButton) seasonButton.value = season; // set season to = the current value
  
  const emojiDisplay = document.getElementById("season-emoji-display");
  if (emojiDisplay) {
    emojiDisplay.textContent = emoji === " " ? "☀️" : emoji; // what's the ?
    emojiDisplay.style.visibility = emoji === " " ? "hidden" : "visible";
  }

  const seasonLabel = document.getElementById("season-label-text");
  if (seasonLabel) {
    const displayEmoji = emoji === " " ? "◌" : emoji;
    const displayNext = nextEmoji === " " ? "◌" : nextEmoji;
    seasonLabel.textContent = `Season ${displayEmoji} → ${displayNext}`;
  }

// I don't really understand what's going on
  let seasonTextObject = document.getElementById("season-text");
  if (seasonTextObject) {
     const isNone = emoji === " ";
     seasonTextObject.style.color = isNone ? "transparent" : "inherit";
     const textEmoji = isNone ? "☀️" : emoji; 
     seasonTextObject.innerHTML = newSeasonText(textEmoji);
  }
  
  // Only update background colour if a colour is provided
  if (colour) {
    changeColour(colour);
  }
}

function cycleSeason() {
  const currentEmoji = document.getElementById("season-emoji-display").textContent;
  
  if (currentEmoji === "☀️") {
    assignSeason("Autumn", "🍂", "orange", "❄️");
  } else if (currentEmoji === "🍂") {
    assignSeason("Winter", "❄️", "lightblue", "🌸");
  } else if (currentEmoji === "❄️") {
    assignSeason("Spring", "🌸", "lightpink", " "); 
  } else if (currentEmoji === "🌸" || currentEmoji === " ") {
    if (currentEmoji === "🌸" && document.getElementById("season-emoji-display").style.visibility === "visible") {
      // Transition to Clear: Keep the pink background!
      assignSeason("None", " ", null, "☀️");
    } else {
      // Transition from Clear (or initial): Go to Summer Gold
      assignSeason("Summer", "☀️", "#f5df3d", "🍂");
    }
  }
}

function newSeasonText(emoji){
  let seasonText = "";
  for (let i=0; i<100; i++){
    seasonText = seasonText + emoji;
  }
  return seasonText;
}

function getRandomColour() {
  var r = function() {return Math.floor(Math.random()*256)};
  return "rgb(" + r() + "," + r() + "," + r() + ")";
}

function getRandomDegree() {
  return Math.floor(Math.random()*360);
}

/* ================ NAV ARROW LOGIC ================ */
window.addEventListener('scroll', updateNavigationArrow);
window.addEventListener('resize', updateNavigationArrow);
window.addEventListener('DOMContentLoaded', updateNavigationArrow);

function updateNavigationArrow() {
  const arrow = document.getElementById('navigation-arrow');
  const navigationLinks = document.querySelectorAll('.navigation-link');
  // Need the shared parent to measure offset correctly
  const navigationBar = document.querySelector('.navigation-bar');
  if (!arrow || navigationLinks.length === 0 || !navigationBar) return;

  // The arrow container is beside the nav links.
  // We use relative positions of the links within the navigation bar.
  const firstLink = navigationLinks[0];
  const lastLink = navigationLinks[navigationLinks.length - 1];
  
  // Calculate vertical center of the links 
  const minTop = firstLink.offsetTop + (firstLink.offsetHeight / 2) - (arrow.offsetHeight / 2);
  const maxTop = lastLink.offsetTop + (lastLink.offsetHeight / 2) - (arrow.offsetHeight / 2);

  const scrollY = window.scrollY;
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  let progress = 0;
  
  if (scrollMax > 0) {
    progress = scrollY / scrollMax;
  }
  progress = Math.max(0, Math.min(1, progress));

  const newTop = minTop + progress * (maxTop - minTop);
  // Using transform instead of top for smoother animation performance
  arrow.style.transform = `translateY(${newTop}px)`;
}

/* ================ COLLAPSIBLE SIDEBAR MENU LOGIC ================ */
function toggleCard(cardId) {
  const content = document.getElementById(cardId + '-content');
  if (content) {
    content.classList.toggle('show');
    const cardParent = content.closest('.card');
    if (cardParent) {
      cardParent.classList.toggle('is-open');
    }
  }
}

// Add smooth scrolling to navigation links
document.querySelectorAll('.navigation-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = e.target.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 50;
      const targetY = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});
