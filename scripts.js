// alert('changeSeasonText activated');

/* ============ An attempt that didn't work ==============   
function changeLayout() {
  currentWindow = console.log(window.location.pathname); // Just the file path (/index.html)

  if (currentWindow == 'SarahEvans.html'){
    window.location.href='SarahEvansGraphic.html';
  } else if (currentWindow == 'SarahEvansGraphic.html'){
    window.location.href='SarahEvans.html';
  }
}
*/
        
function changeColour(colour) {
  document.body.style.backgroundImage = "none";

  if (colour == null){
    if (theme.getAttribute('href') == 'style01.css'){
      let newGradient = 'linear-gradient(' + get_rand_degree() +'deg,' + get_rand_colour() + '0%,' + get_rand_colour() + '100%)'
      document.getElementsByTagName('body')[0].style.background = newGradient;
    } else {
      document.body.style.backgroundColor = get_rand_colour();
    }
  } else {
    document.body.style.backgroundColor = colour;
  }
}

function showResume(type, doScroll = false) {
  document.getElementById("resume-ux").hidden = type !== "ux";
  document.getElementById("resume-dev").hidden = type !== "dev";

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
  const saved = localStorage.getItem("resumeType") || "dev";
  showResume(saved);
});

function changeStyle(style) {
  let theme = document.getElementById('theme');
  let contentBoxes = document.querySelectorAll('.content-box');
  let pageTitle = document.querySelector('h1.title');
  contentBoxes.forEach(box => box.style.backgroundImage = "");
  theme.setAttribute('href', 'style_base.css');
  
  /* Remove 'active' class */
  let buttons = document.getElementsByClassName('dropdown-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  if (style == "Flat-Rounded") {
    theme.setAttribute('href', 'style01.css');
    if (pageTitle) pageTitle.textContent = "Sarah Evans";
    buttons[0].classList.add('active');
  } else if (style == "Newspaper") {
    theme.setAttribute('href', 'style03_newspaper.css');
    if (pageTitle) pageTitle.textContent = "Sarah Evans";
    contentBoxes.forEach(box => box.style.backgroundImage = "url('Images/textured_paper2.png')");
    document.body.style.backgroundImage = "url('Images/textured_paper2.png')";
    buttons[1].classList.add('active');
  } else if (style == "Notebook"){
    theme.setAttribute('href', 'style04_notebook.css');
    if (pageTitle) pageTitle.textContent = "Sarah evans";
    document.body.style.backgroundImage = "url('Images/desk.jpg')";
    buttons[2].classList.add('active');
  }
}

function assignSeason(season, emoji, colour, nextSeason) {
  document.getElementById("seasonButton").value = season;
  let seasonTextObj = document.getElementById("seasonText");
  if (seasonTextObj) {
     seasonTextObj.innerHTML = newSeasonText(emoji);
  }
  changeColour(colour);
  /* Change button to next season*/
  document.getElementById("seasonButton").innerHTML = nextSeason;
}

function cycleSeason() {
  let season = document.getElementById("seasonButton").value;
  if (season == "null"){
    assignSeason("Summer", "☀️", "gold", "🍂");
  } else if (season == "Summer"){
    assignSeason("Autumn", "🍂", "orange", "❄️");
  } else if (season == "Autumn"){
    assignSeason("Winter", "❄️", "lightblue", "🌸");
  } else if (season == "Winter"){
    assignSeason("Spring", "🌸", "lightpink", "");
  } else if (season == "Spring"){
    assignSeason("null", "", "pink", "☀️");
  }
}

function newSeasonText(emoji){
  let seasonTxt = "";
  for (let i=0; i<100; i++){
    seasonTxt = seasonTxt + emoji;
  }
  return seasonTxt;
}

function get_rand_colour() {
  var r = function() {return Math.floor(Math.random()*256)};
  return "rgb(" + r() + "," + r() + "," + r() + ")";
}

function get_rand_degree() {
  return Math.floor(Math.random()*360);
}

/* ================ NAV ARROW LOGIC ================ */
window.addEventListener('scroll', updateNavArrow);
window.addEventListener('resize', updateNavArrow);
window.addEventListener('DOMContentLoaded', updateNavArrow);

function updateNavArrow() {
  const arrow = document.getElementById('nav-arrow');
  const navLinks = document.querySelectorAll('.nav-link');
  // Need the shared parent to measure offset correctly
  const navBar = document.querySelector('.navigation-bar');
  if (!arrow || navLinks.length === 0 || !navBar) return;

  // The arrow container is beside the nav links.
  // We use relative positions of the links within the navigation bar.
  const firstLink = navLinks[0];
  const lastLink = navLinks[navLinks.length - 1];
  
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
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = e.target.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
