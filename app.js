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
const DEFAULT_PORTRAITS = {}

let pathsArray = []

let selectedRoles = DEFAULT_ROLES
let assignedChamps = DEFAULT_CHAMPS
let portraitObj = DEFAULT_PORTRAITS

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
            let newTop = assignedChamps.top
            let newTopPath = `img/portraits/` + `${newTop}` + `_0.jpg`
            topPortrait.src = newTopPath
            topPortrait.classList.remove('hidden')
            break;
        case jungleChamps:
            jungleName.innerHTML = assignedChamps.jungle
            let newJungle = assignedChamps.jungle
            let newJunglePath = `img/portraits/` + `${newJungle}` + `_0.jpg`
            junglePortrait.src = newJunglePath
            junglePortrait.classList.remove('hidden')
            break;
        case midChamps:
            midName.innerHTML = assignedChamps.mid
            let newMid = assignedChamps.mid
            let newMidPath = `img/portraits/` + `${newMid}` + `_0.jpg`
            midPortrait.src = newMidPath
            midPortrait.classList.remove('hidden')
            break;
        case adcChamps:
            adcName.innerHTML = assignedChamps.adc
            let newADC = assignedChamps.adc
            let newADCPath = `img/portraits/` + `${newADC}` + `_0.jpg`
            adcPortrait.src = newADCPath
            adcPortrait.classList.remove('hidden')
            break;
        case supportChamps:
            supportName.innerHTML = assignedChamps.support
            let newSupport = assignedChamps.support
            let newSupportPath = `img/portraits/` + `${newSupport}` + `_0.jpg`
            supportPortrait.src = newSupportPath
            supportPortrait.classList.remove('hidden')
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

const topPortrait = document.getElementById('topPortrait')
const junglePortrait = document.getElementById('junglePortrait')
const midPortrait = document.getElementById('midPortrait')
const adcPortrait = document.getElementById('adcPortrait')
const supportPortrait = document.getElementById('supportPortrait')

const addBtns = document.querySelectorAll('.add-lane-btn')

// rollBtn.onclick = () => assignRoles(selectedRoles)

function updateNames() {
    topName.innerHTML = assignedChamps.top
    jungleName.innerHTML = assignedChamps.jungle
    midName.innerHTML = assignedChamps.mid
    adcName.innerHTML = assignedChamps.adc
    supportName.innerHTML = assignedChamps.support
}

function assignRoles(roles) {
    roles.forEach(role => getRandomChamp(role))
    updateNames()
    getPortraits(assignedChamps)
}

function createImgSrc(champ) {
    let imgPath = `img/portraits/` + `${champ}` + `_0.jpg`
    pathsArray.push(imgPath)
}

function getPortraits(obj) {
    let portraits = (Object.values(obj))
    portraits.forEach(champ => {
        createImgSrc(champ)
    });

    topPortrait.src = pathsArray[0]
    junglePortrait.src = pathsArray[1]
    midPortrait.src = pathsArray[2]
    adcPortrait.src = pathsArray[3]
    supportPortrait.src = pathsArray[4]

    addBtnTop.classList.add('hidden')
    addBtnJungle.classList.add('hidden')
    addBtnMid.classList.add('hidden')
    addBtnADC.classList.add('hidden')
    addBtnSupport.classList.add('hidden')


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
