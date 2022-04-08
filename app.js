//select role(s) on role banner by clicking '+' button center banner
//add roles to selectedRoles array
//click roll
//hides '+' circle
//passes selectedRoles array to assignRoles(roles)
//retrieves random champ from arrays for each role in array
//displays champ img + name in banner
//option to roll the dice IN EACH banner AFTER champ has been assigned
// ROLL btn changes to Again?
//user clicks again -> banners reset -> defaults role selection

let topChamps = []
let jungleChamps = []
let midChamps = []
let adcChamps  = []
let supportChamps = []

var request = new XMLHttpRequest();
request.open('GET', 'champion.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    let champData = JSON.parse(request.responseText);
    topChamps = champData.topChamps
    jungleChamps = champData.jungleChamps
    midChamps = champData.midChamps
    adcChamps  = champData.adcChamps
    supportChamps = champData.supportChamps

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

const DEFAULT_ROLES = []
const DEFAULT_CHAMPS = {top: "", jungle: "", mid: "", adc: "", support: "",}

let selectedRoles = DEFAULT_ROLES
let assignedChamps = DEFAULT_CHAMPS

const addBtnTop = document.getElementById('addBtnTop')
const addBtnJungle = document.getElementById('addBtnJungle')
const addBtnMid = document.getElementById('addBtnMid')
const addBtnADC = document.getElementById('addBtnADC')
const addBtnSupport = document.getElementById('addBtnSupport')

addBtnTop.onclick = () => selectRole('topChamps')
addBtnJungle.onclick = () => selectRole('jungleChamps')
addBtnMid.onclick = () => selectRole('midChamps')
addBtnADC.onclick = () => selectRole('adcChamps')
addBtnSupport.onclick = () => selectRole('supportChamps')

function selectRole(value) {
    selectedRoles.push(value)
}

const topDice = document.getElementById('topDice')
const jungleDice = document.getElementById('jungleDice')
const midDice = document.getElementById('midDice')
const adcDice = document.getElementById('adcDice')
const supportDice = document.getElementById('supportDice')

topDice.onclick = () => diceRoll(e.target.value)
jungleDice.onclick = () => diceRoll(e.target.value)
midDice.onclick = () => diceRoll(e.target.value)
adcDice.onclick = () => diceRoll(e.target.value)
supportDice.onclick = () => diceRoll(e.target.value)

function diceRoll(lane) {
    getRandomChamp(lane)
}

function reset() {
    selectedRoles = DEFAULT_ROLES
    assignedChamps = DEFAULT_CHAMPS
    assignRoles(selectedRoles);
}

const rollBtn = document.getElementById('rollBtn')

rollBtn.onclick = () => assignRoles(selectedRoles)

function assignRoles(roles) {
    roles.forEach(role => getRandomChamp(role))
}

function getRandomChamp(lane) {
    let laneToArray = eval(lane)
    const randomIndex = Math.floor(Math.random() * laneToArray.length)
    const champSelection = laneToArray[randomIndex]
    switch (laneToArray) {
        case topChamps:
            assignedChamps.top = champSelection
            break;
        case jungleChamps:
            assignedChamps.jungle = champSelection
            break;
        case midChamps:
            assignedChamps.mid = champSelection
            break;
        case adcChamps:
            assignedChamps.adc = champSelection
            break;
        case supportChamps:
            assignedChamps.support = champSelection
            break;
        default: 
            assignedChamps = DEFAULT_CHAMPS
    }
}