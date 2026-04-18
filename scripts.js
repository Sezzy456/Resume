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
        
let bgState = {
  c1: '#f5df3d',
  c2: '#eb2dbb',
  c2Enabled: true,
  angle: 135,
  texture: 'none'
};

function quickRandomize(e) {
  if (e) e.stopPropagation();
  bgState.c1 = get_rand_colour();
  bgState.c2 = get_rand_colour();
  bgState.c2Enabled = true;
  bgState.angle = get_rand_degree();
  bgState.texture = 'none'; // Clear textures on quick dice
  updatePortfolioBackground();
  updateTextureButtons(); // Sync modal UI
  if (document.getElementById('bg-modal').classList.contains('show')) syncBgInputs();
}

function openPopup(id) {
  document.getElementById(id).classList.add('show');
  if (id === 'bg-modal') syncBgInputs();
}

function closePopup(id) {
  document.getElementById(id).classList.remove('show');
}

function closePopupIfOutside(e, id) {
  if (e.target.id === id) closePopup(id);
}

function syncBgInputs() {
  document.getElementById('bg-color-1').value = rgbToHex(bgState.c1) || bgState.c1;
  document.getElementById('bg-color-2').value = rgbToHex(bgState.c2) || bgState.c2;
  document.getElementById('enable-color-2').checked = bgState.c2Enabled;
  document.getElementById('bg-angle').value = bgState.angle;
  updateTextureButtons();
}

function rgbToHex(rgb) {
  if (!rgb.startsWith('rgb')) return rgb;
  const match = rgb.match(/\d+/g);
  if (!match) return '#ffffff';
  return "#" + match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}

function updateBgFromInputs() {
  bgState.c1 = document.getElementById('bg-color-1').value;
  bgState.c2 = document.getElementById('bg-color-2').value;
  bgState.c2Enabled = document.getElementById('enable-color-2').checked;
  bgState.angle = document.getElementById('bg-angle').value;
  updatePortfolioBackground();
}

function selectTexture(tex) {
  bgState.texture = tex;
  updateTextureButtons();
  updatePortfolioBackground();
}

function updateTextureButtons() {
  document.querySelectorAll('.texture-option').forEach(opt => {
    opt.classList.toggle('active', opt.textContent.toLowerCase() === bgState.texture);
  });
}

function updatePortfolioBackground() {
  const body = document.body;
  let bgString = "";

  // Base Colors
  if (bgState.c2Enabled) {
    bgString = `linear-gradient(${bgState.angle}deg, ${bgState.c1} 0%, ${bgState.c2} 100%)`;
  } else {
    bgString = bgState.c1;
  }

  body.style.background = bgString;
  body.style.backgroundColor = bgState.c1; // Fallback

  // Textures
  if (bgState.texture === 'paper') {
    body.style.backgroundImage = `url('Images/textured_paper2.png'), ${bgState.c2Enabled ? bgString : 'none'}`;
  } else if (bgState.texture === 'desk') {
    body.style.backgroundImage = `url('Images/desk.jpg'), ${bgState.c2Enabled ? bgString : 'none'}`;
  } else {
    body.style.backgroundImage = bgState.c2Enabled ? bgString : 'none';
  }

  const preview = document.getElementById('bg-preview');
  const miniPreview = document.getElementById('bg-modal-preview');
  const c1Circle = document.getElementById('c1-circle');
  const c2Circle = document.getElementById('c2-circle');

  const finalStyle = body.style.background || body.style.backgroundColor;

  if (preview) preview.style.background = finalStyle;
  if (miniPreview) miniPreview.style.background = finalStyle;
  if (c1Circle) c1Circle.style.backgroundColor = bgState.c1;
  if (c2Circle) c2Circle.style.backgroundColor = bgState.c2;
}

function changeColour(colour) {
  if (colour === null) {
    bgState.c1 = get_rand_colour();
    bgState.c2 = get_rand_colour();
    bgState.c2Enabled = Math.random() > 0.5;
  } else {
    bgState.c1 = colour;
    bgState.c2Enabled = false;
  }
  updatePortfolioBackground();
  if (document.getElementById('bg-modal').classList.contains('show')) syncBgInputs();
}

const RESUME_DATA = {
  researcher: `
    <div class="section center-aligned information">
      <p>Melbourne, Victoria • 000 000 000 • example@email.com
      <br>LinkedIn: <a href="linkedin.com/in/sarahevans456">linkedin.com/in/sarahevans456</a> • GitHub: <a href="github.com/Sezzy456">github.com/Sezzy456</a> 
      <br>Website: <a href="www.sarahevans.au">www.sarahevans.au</a>
      <br><strong>Key Tools:</strong> Figma, Optimal Workshop, HTML/CSS/JS, Jira, GitHub, Miro</p>
    </div>

    <div class="section">
      <h3>Career Overview</h3>
      <p>UI/UX designer experienced in translating research into wireframes, prototypes, and responsive interfaces. Skilled in usability testing, accessibility, and front-end implementation, with a practical, collaborative approach that delivers user-centred solutions.</p>
    </div>

    <div class="section skills">
      <h3>Core Skills</h3>
      <div class="skills-columns">
        <p><strong>UX Design</strong>
        <br>• User Research (interviews, surveys, observation)
        <br>• Usability Testing (first-click, card sorting, tree testing)
        <br>• Journey Mapping and User Flows
        <br>• Information Architecture
        <br>• Heuristic Evaluation
        <br>• Accessibility and Inclusive Design
        </p>
        <p><strong>UI Design</strong>
        <br>• Wireframing and High-Fidelity Prototyping
        <br>• Visual Design and Layout
        <br>• Component Design and Design Systems
        <br>• Responsive and Mobile-First Design
        </p>
        <p><strong>Tools and Technical</strong>
        <br>• Figma (components, auto-layout, prototyping, collaboration)
        <br>• Miro
        <br>• Jira and Confluence
        <br>• Optimal Workshop
        <br>• Adobe Creative Suite
        <br>• HTML, CSS, JavaScript
        <br>• Python and SQL
        <br>• Git / GitHub, VS Code
        </p>
      </div>
    </div>

    <div class="section education">
      <h3>Education & Certificates</h3>
      <p><strong>Bachelor of Design (User Experience Design)</strong> - <em>University of Melbourne</em>, 2024
      <br>Focus areas: UX research, interaction design, prototyping, user journeys, design systems, accessibility, and front-end foundations.</p>
      <p>Certificate III in Screen and Media
      <br>RSA (Responsible Service of Alcohol)
      <br>Full Australian Driver’s Licence</p>
    </div>

    <div class="section work-experience">
      <h3>Work Experience</h3>
      <p><strong>Victorian Emergency Management Institute (VEMI)</strong> - Hospitality Staff (Casual)
      <br>2021 - 2025</p>
      <ul>
        <li>Collaborated with cross-functional teams in high-pressure environments.</li>
        <li>Communicated clearly with customers and team members to maintain service quality.</li>
        <li>Adapted quickly across roles, demonstrating reliability and time management.</li>
      </ul>
    </div>

    <p class="center-aligned">References available upon request.</p>
  `,
  designer: `
    <div class="row">
      <div class="column">
        <div class="section information">
          <h3>Contact</h3>
          <p>📞<i>Phone:</i> 0000 000 000 
          <br>📧<i>Email:</i> example@email.com 
          <br>📍<i>Location:</i> Melbourne, Victoria 
          <br>🌐<i>LinkedIn:</i> <a href="linkedin.com/in/sarahevans456">linkedin.com/in/sarahevans456</a> 
          <br>🌐<i>GitHub:</i> <a href="github.com/Sezzy456">github.com/Sezzy456</a> 
          <br>Full Australian Driver’s Licence • RSA Certified</p>
        </div>
        <div class="section technical-skills skills">
          <h3>Technical Skills</h3>
          <table>
            <tr><th>Skill</th><th>Proficiency</th></tr>
            <tr><td>HTML/CSS</td><td>██████████</td></tr>
            <tr><td>JavaScript</td><td>█████████░</td></tr>
            <tr><td>Python</td><td>█████████░</td></tr>
            <tr><td>SQL</td><td>██████░░░░</td></tr>
            <tr><td>C/C++/C#</td><td>██████░░░░</td></tr>
            <tr><td>Java</td><td>██████░░░░</td></tr>
            <tr><td>Figma</td><td>██████████</td></tr>
            <tr><td>Adobe Suite</td><td>██████░░░░</td></tr>
            <tr><td>Office / Google Suite</td><td>██████████</td></tr>
          </table>
        </div>
        <div class="section education-certificates">
          <h3>Education & Certificates</h3>
          <p><b>Bachelor of Design (User Experience Design)</b> 
          <br><e>University of Melbourne</e> - 2024</p>
          <ul>
            <li>Focused on user research, UI/UX methodologies, journey mapping, ideation, prototyping, web accessibility, and front-end tools</li>
          </ul>
          <ul>
            <li>Certificate III in Screen and Media</li>
            <li>RSA (Responsible Service of Alcohol)</li>
            <li>Full Australian Driver's License</li>
          </ul>
        </div>
      </div>
      <div class="column">
        <div class="section career-overview">
          <h3>Career Overview</h3>
          <p>I’m a design graduate with a strong interest in web and UX design, supported by technical skills across both design tools and coding. My background in hospitality has made me adaptable, reliable, and confident communicating with different people. I’m keen to bring my skills into a professional, creative, and collaborative environment.</p>
        </div>
        <div class="section skills">
          <h3>Key Skills</h3>
          <p><strong>Design & UX</strong>
          <br>• UI/UX Design & Prototyping
          <br>• Wireframing & Journey Mapping 
          <br>• Web Accessibility
          <br>• Design Collaboration & Prototyping Tools (Figma, Miro, Jira, Confluence)
          <br>• Adobe Creative Suite (Photoshop, Illustrator, InDesign)
          </p>
          <p><strong>Development</strong>
          <br>• Front-End Development (HTML, CSS, JavaScript)
          <br>• Programming: Python, C, C++, C#, Java, SQL
          </p>
          <p><strong>Professional Skills</strong>
          <br>• Strong Communication & Teamwork
          <br>• Time Management & Problem-Solving
          <br>• Ability to Learn Quickly & Adapt 
          </p>
        </div>
        <div class="section work-experience">
          <h3>Work Experience</h3>
          <p><b>Victorian Emergency Management Institute (VEMI)</b> - Hospitality Staff (Casual)
          <br>2021 - 2025</p>
          <ul>
            <li>Worked across Front of House, Kitchenhand, Housekeeping, and Bar</li>
            <li>Developed strong time management and adaptability across tasks and environments</li>
            <li>Delivered friendly and efficient customer service under pressure</li>
            <li>Practised clear team communication and multitasking on the job</li>
          </ul>
        </div>
      </div>
    </div>
    <p class="center-aligned">References available upon request</p>
  `,
  developer: `
    <div class="section center-aligned information">
      <p>Melbourne, Victoria • 000 000 000 • example@email.com
      <br>LinkedIn: <a href="linkedin.com/in/sarahevans456">linkedin.com/in/sarahevans456</a> • GitHub: <a href="github.com/Sezzy456">github.com/Sezzy456</a> 
      <br>Portfolio: <a href="www.sarahevans.au">www.sarahevans.au</a></p>
    </div>

    <div class="section">
      <h3>Career Overview</h3>
      <p>I’m a web and UI designer with front-end development skills, specialising in creating responsive, accessible, and user-friendly websites. With a background in UX design and hands-on experience building projects using HTML, CSS, JavaScript, and Figma, I enjoy turning ideas into polished digital interfaces. I bring strong collaboration, adaptability, and communication skills from both design work and customer-facing roles.</p>
    </div>

    <div class="section skills">
      <h3>Key Skills & Tools</h3>
      <div class="skills-columns">
        <p><strong>Design & UX</strong>
        <br>• UI/UX Design & Prototyping
        <br>• Wireframing, Journey Mapping & User Flows
        <br>• Web Accessibility (WCAG)
        <br>• Responsive Web Design (RWD)
        <br>• Collaboration Tools (Figma, Miro, Jira, Confluence)
        <br>• Adobe Creative Suite (Photoshop, Illustrator, InDesign)
        </p>
        <p><strong>Front-End Development</strong>
        <br>• HTML, CSS, JavaScript
        <br>• Python & SQL 
        <br>• Git & Version Control
        <br>• VS Code 
        </p>
        <p><strong>Professional Skills</strong>
        <br>• Communication & Teamwork
        <br>• Time Management 
        <br>• Problem-Solving
        <br>• Fast Learner & Highly Adaptable
        </p>
      </div>
    </div>

    <div class="section methods">
      <h3>Methods & Processes</h3>
      <div class="row">
        <div class="column">
          <ul>
            <li>Usability & Accessibility Testing</li>
            <li>Wireframing & Prototyping</li>
          </ul>
        </div>
        <div class="column">
          <ul>
            <li>Agile/Scrum Collaboration</li>
            <li>UX Evaluation (First-click, Tree Testing, Card Sorting)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section education">
      <h3>Education & Certificates</h3>
      <p><strong>Bachelor of Design (User Experience Design)</strong> - <em>University of Melbourne</em>, 2024
      <br>Focus areas: User research, UX methodologies, prototyping, journey mapping, accessibility, and front-end tools.</p>
      <p>Certificate III in Screen and Media
      <br>RSA (Responsible Service of Alcohol)
      <br>Full Australian Driver’s Licence</p>
    </div>

    <div class="section work-experience">
      <h3>Work Experience</h3>
      <p><strong>Victorian Emergency Management Institute (VEMI)</strong> - Hospitality Staff (Casual)
      <br>2021 - 2025</p>
      <ul>
        <li>Built strong time management and adaptability across varied, fast-paced roles.</li>
        <li>Coordinated across teams while communicating clearly under pressure.</li>
        <li>Delivered consistent, professional customer service with strong attention to detail.</li>
      </ul>
    </div>

    <p class="center-aligned">References available upon request.</p>
  `
};

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
  bgState.c1 = '#f5df3d'; // Gold
  bgState.c2 = '#eb2dbb'; // Pink
  bgState.c2Enabled = true;
  bgState.angle = 30;
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
  const seasonBtn = document.getElementById("seasonButton-hidden");
  if (seasonBtn) seasonBtn.value = season;
  
  const emojiDisplay = document.getElementById("season-emoji-display");
  if (emojiDisplay) {
    emojiDisplay.textContent = emoji === " " ? "☀️" : emoji;
    emojiDisplay.style.visibility = emoji === " " ? "hidden" : "visible";
  }

  const seasonLabel = document.getElementById("season-label-text");
  if (seasonLabel) {
    const displayEmoji = emoji === " " ? "◌" : emoji;
    const displayNext = nextEmoji === " " ? "◌" : nextEmoji;
    seasonLabel.textContent = `Season ${displayEmoji} → ${displayNext}`;
  }

  let seasonTextObj = document.getElementById("seasonText");
  if (seasonTextObj) {
     const isNone = emoji === " ";
     seasonTextObj.style.color = isNone ? "transparent" : "inherit";
     const textEmoji = isNone ? "☀️" : emoji; 
     seasonTextObj.innerHTML = newSeasonText(textEmoji);
  }
  
  // Only update background color if a colour is provided
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
      const offset = 50;
      const targetY = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});
