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

function changeStyle(style) {
  let theme = document.getElementById('theme');
  document.getElementById('content-box').style.backgroundImage = "";
  theme.setAttribute('href', 'style_base.css');
  
  /* Remove 'active' class */
  let buttons = document.getElementsByClassName('dropdown-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  if (style == "Flat-Rounded") {
    theme.setAttribute('href', 'style01.css');
    buttons[0].classList.add('active');
  } else if (style == "Shadow") {
    theme.setAttribute('href', 'style02.css');
    buttons[1].classList.add('active');
  } else if (style == "Newspaper") {
    theme.setAttribute('href', 'style03_newspaper.css');
    // changeColour("rgb(" + 212 + ","  + 211 + "," + 207 + ")");
    document.getElementById('content-box').style.backgroundImage = "url('Images/textured_paper2.png')";
    // document.body.style.backgroundImage = "url('Images/textured_paper2.png')";
    buttons[2].classList.add('active');
  } else if (style == "Notebook"){
    theme.setAttribute('href', 'style04_notebook.css');
    document.body.style.backgroundImage = "url('Images/desk.jpg')";
    buttons[3].classList.add('active');
  }
}


function assignSeason(season, emoji, colour, nextSeason) {
  document.getElementById("seasonButton").value = season;
  document.getElementById("seasonText").innerHTML = newSeasonText(emoji);
  changeColour(colour);
  /* Change button to next season*/
  document.getElementById("seasonButton").innerHTML = nextSeason;
}

function cycleSeason() {
  season = document.getElementById("seasonButton").value;
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
  seasonTxt = "";
  for (i=0; i<100; i++){
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


