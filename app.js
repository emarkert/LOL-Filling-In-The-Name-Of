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