const topChamps = ["Aatrox", "Akali", "Akshan", "Alistar", "Camille", "Cho'Gath", "Darius", "Dr. Mundo", "Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "Karma", "Kayle", "Kennen", "Kled", "Lee Sin", "Lillia", "Lissandra", "Lucian", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Sett", "Shen", "Singed", "Sion", "Sylas", "Tahm Kench", "Teemo", "Trundle", "Tryndamere", "Twitch", "Urgot", "Vayne", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Yasuo", "Yone", "Yorick", "Zac", "Zed"]

const jungleChamps = ["Aatrox", "Amumu", "Darius", "Diana", "Dr. Munod", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Garen", "Gragas", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Jax", "Karthus", "Kayn", "Kha'Zix", "Kindred", "Lee Sin", "Lillia", "Malphite", "Master Yi", "Mordekaiser", "Morgana", "Nasus", "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Pantheon", "Poppy", "Rammus", "Rek'Sai", "Rengar", "Rumble", "Sejuani", "Shaco", "Shyvana", "Skarner", "Taliyah", "Talon", "Trundle", "Tryndamere", "Twitch", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Zac", "Zed"]

const midChamps = ["Ahri", "Akali", "Akshan", "Anivia", "Annie", "Aurelion Sol", "Azir", "Brand", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Ekko", "Ezreal", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jayce", "Kai'Sa", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Lissandra", "Lucian", "Lux", "Malphite", "Malzahar", "Mordekaiser", "Morgana", "Neeko", "Orianna", "Pantheon", "Pyke", "Qiyana", "Rumble", "Ryze", "Seraphine", "Sett", "Swain", "Sylas", "Syndra", "Taliyah", "Talon", "Tristana", "Tryndamere", "Twisted Fate", "Veigar", "Vel'Koz", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"]

const adcChamps = ["Akshan", "Anivia", "Aphelios", "Ashe", "Brand", "Caitlyn", "Cassiopeia", "Corki", "Draven", "Ezreal", "Graves", "Heimerdinger", "Irelia", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Karthus", "Kindred", "Kog'Maw", "Lucian", "Lux", "Malzahar", "Miss Fortune", "Morgana", "Pyke", "Quinn", "Samira", "Senna", "Seraphine", "Sivir", "Swain", "Syndra", "Tahm Kench", "Teemo", "Tristana", "Twitch", "Varus", "Vayne", "Veigar", "Vel'Koz", "Xayah", "Xerath", "Yasuo", "Yone", "Zeri", "Ziggs"]

const supportChamps = ["Ahri", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Bard", "Blitzcrank", "Brand", "Braum", "Cho'Gath", "Elise", "Fiddlesticks", "Galio", "Gragas", "Heimerdinger", "Ivern", "Janna", "Jarvan IV", "Kai'Sa", "Karma", "Karthus", "Kennen", "Lee Sin", "Leona", "Lissandra", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Miss Fortune", "Morgana", "Nami", "Nautilus", "Neeko", "Nidalee", "Orianna", "Pantheon", "Poppy", "Pyke", "Rakan", "Rell", "Renata Glasc", "Senna", "Seraphine", "Shaco", "Shen", "Sona", "Soraka", "Swain", "Tahm Kench", "Taliyah", "Taric", "Thresh", "Vel'Koz", "Xerath", "Yuumi", "Zilean", "Zyra"]


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
const DEFAULT_ROLES = []
const DEFAULT_CHAMPS = {top: "", jungle: "", mid: "", adc: "", support: "",}

let selectedRoles = []
let assignedChamps = {top: "", jungle: "", mid: "", adc: "", support: "",}

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
midDice.onclicik = () => diceRoll(e.target.value)
adcDice.onclicik = () => diceRoll(e.target.value)
supportDice.onclicik = () => diceRoll(e.target.value)

function diceRoll(lane) {
    getRandomChamp(lane)
}

function reset() {
    let selectedRoles = DEFAULT_ROLES
    let assignedChamps = DEFAULT_CHAMPS
    assignRoles();
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
    //if laneToArray = topChamps -> assignedChamps.top
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