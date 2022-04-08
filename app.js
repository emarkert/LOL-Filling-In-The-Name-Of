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

const topAddImg = document.getElementById('topAddImg')
const jungleAddImg = document.getElementById('jungleAddImg')
const midAddImg = document.getElementById('midAddImg')
const adcAddImg = document.getElementById('adcAddImg')
const supportAddImg = document.getElementById('supportAddImg')

addBtnTop.onclick = () => selectRole(topChamps)
addBtnJungle.onclick = () => selectRole(jungleChamps)
addBtnMid.onclick = () => selectRole(midChamps)
addBtnADC.onclick = () => selectRole(adcChamps)
addBtnSupport.onclick = () => selectRole(supportChamps)

function selectRole(value) {
    selectedRoles.push(value)
    switch (value) {
        case topChamps:
            topAddImg.src = 'img/top icon.png'
            break;
        case jungleChamps:
            jungleAddImg.src = 'img/jungle icon.png'
            break;
        case midChamps:
            midAddImg.src = 'img/mid icon.png'
            break;
        case adcChamps:
            adcAddImg.src = 'img/adc icon.png'
            break;
        case supportChamps:
            supportAddImg.src = 'img/support icon.png'
            break;
    }
}

const topDice = document.getElementById('topDice')
const jungleDice = document.getElementById('jungleDice')
const midDice = document.getElementById('midDice')
const adcDice = document.getElementById('adcDice')
const supportDice = document.getElementById('supportDice')

topDice.onclick = () => diceRoll(topChamps)
jungleDice.onclick = () => diceRoll(jungleChamps)
midDice.onclick = () => diceRoll(midChamps)
adcDice.onclick = () => diceRoll(adcChamps)
supportDice.onclick = () => diceRoll(supportChamps)

function diceRoll(lane) {
    getRandomChamp(lane)
    switch (lane) {
        case topChamps:
            topName.innerHTML = assignedChamps.top   
            break;
        case jungleChamps:
            jungleName.innerHTML = assignedChamps.jungle
            break;
        case midChamps:
            midName.innerHTML = assignedChamps.mid
            break;
        case adcChamps:
            adcName.innerHTML = assignedChamps.adc
            break;
        case supportChamps:
            supportName.innerHTML = assignedChamps.support
            break;
        default:
            break;
    }
}

function reset() {
    selectedRoles = DEFAULT_ROLES
    assignedChamps = DEFAULT_CHAMPS
    assignRoles(selectedRoles);
}

const rollBtn = document.getElementById('rollBtn')
const topName = document.getElementById('topName')
const jungleName = document.getElementById('jungleName')
const midName = document.getElementById('midName')
const adcName = document.getElementById('adcName')
const supportName = document.getElementById('supportName')

rollBtn.onclick = () => assignRoles(selectedRoles)

function assignRoles(roles) {
    roles.forEach(role => getRandomChamp(role))
    topName.innerHTML = assignedChamps.top
    jungleName.innerHTML = assignedChamps.jungle
    midName.innerHTML = assignedChamps.mid
    adcName.innerHTML = assignedChamps.adc
    supportName.innerHTML = assignedChamps.support
}

function getRandomChamp(lane) {
    const randomIndex = Math.floor(Math.random() * lane.length)
    const champSelection = lane[randomIndex]
    switch (lane) {
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
