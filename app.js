const DEFAULT_ROLES = []
const DEFAULT_CHAMPS = {top: "", jungle: "", mid: "", adc: "", support: "",}
const DEFAULT_PORTRAITS = {}

let champData = [];
let selectAnimationDuration = 200; //half a second animation
let pathsArray = []

let selectedRoles = DEFAULT_ROLES
let assignedChamps = DEFAULT_CHAMPS
let portraitObj = DEFAULT_PORTRAITS


var request = new XMLHttpRequest();
request.open('GET', 'champion.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    champData = JSON.parse(request.responseText);

  } else {
    // We reached our target server, but it returned an error
    console.log('There was an error retrieving champ data from local JSON file.')
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log('There was a connection error.')
};

request.send();

function diceRoll(lane) {
    assignedChamps[lane] = getRandomChamp(lane);
    animateSelection(lane);
    let laneWrapper = document.querySelector('[data-role="'+lane+'"]');
    laneWrapper.querySelector('.champ-name').innerHTML = assignedChamps[lane];
    laneWrapper.querySelector('.champPortrait').src = `img/portraits/` + assignedChamps[lane] + `_0.jpg`;
    laneWrapper.querySelector('.champPortrait').classList.remove('hidden')
    laneWrapper.querySelector('.dice-icon').src = `img/reroll-button-active 1.png`;
}

function reset() {
    selectedRoles = DEFAULT_ROLES
    assignedChamps = DEFAULT_CHAMPS
    assignRoles(selectedRoles);
}

function getRandomChamp(lane) {
    let champPool = champData[lane];
    const randomIndex = Math.floor(Math.random() * champPool.length)
    const champSelection = champPool[randomIndex]
    return champSelection;
}

function animateSelection(lane){
    let laneWrapper = document.querySelector('[data-role="'+lane+'"]');
    laneWrapper.querySelector('.champ-name').classList.add('animating');
    laneWrapper.querySelector('.champ-name').classList.remove('animated');
    laneWrapper.querySelector('.champPortrait').classList.add('animating');
    laneWrapper.querySelector('.champPortrait').classList.remove('animated');
    laneWrapper.querySelector('.champPortraitWrapper').classList.add('animating');
    laneWrapper.querySelector('.champPortraitWrapper').classList.remove('animated');

    setTimeout( function(){
        laneWrapper.querySelector('.champ-name').classList.add('animated');
        laneWrapper.querySelector('.champ-name').classList.remove('animating');
        laneWrapper.querySelector('.champPortrait').classList.add('animated');
        laneWrapper.querySelector('.champPortrait').classList.remove('animating');
        laneWrapper.querySelector('.champPortraitWrapper').classList.add('animated');
        laneWrapper.querySelector('.champPortraitWrapper').classList.remove('animating');
    }, selectAnimationDuration);
}
