//fetch individual champion Data
const fetchIndivData = async () => {
	const api_url= './dragontail-12.10.1/12.10.1/data/en_US/champion.json'
	const apiResponse = await fetch(api_url)
	const responseJson = await apiResponse.json()
	const responseData = await responseJson.data

	for(const entry of Object.entries(responseData)) {
		const indiv_champ_url = './dragontail-12.10.1/12.10.1/data/en_US/champion/'
		const champID = entry[1].id
		const champJSON_URL = `${indiv_champ_url + champID}.json`
		const fetchIndivJSON = await fetch(champJSON_URL)
		const indivJSON = await fetchIndivJSON.json()
		const indivData = await indivJSON.data
		renderImage(indivData)
	}
}
//render image to images list
const renderImage = (champData) => {
	for(const entry of Object.entries(champData)) {
		const champ_img_loc = './dragontail-12.10.1/12.10.1/img/champion/'
		const champImage = document.createElement('img')
		const championListContainer = document.querySelector('.championList')
		const champID = entry[1].id
		const champName = entry[1].name
		const imgSRC = `${champ_img_loc + entry[1].id}.png`
		const imageDiv = document.createElement('div')
		imageDiv.className = 'imageDiv'
		//set img attributes
		champImage.id = champID
		champImage.alt = `image of ${champName}`
		champImage.classList.add('boxImage')
		champImage.src = imgSRC
		//append image to div then div to .container
		imageDiv.appendChild(champImage)
		championListContainer.appendChild(imageDiv)
		champImage.addEventListener('click', () => {
			renderChampInfo(champID, champName, entry)
		})
	}
}

const renderChampInfo = (champID, champName, champData) => {
	//champ name and title
	const name = document.querySelector('.champName')
	const champTitle = document.querySelector('.champTitle')
	//champ img
	const loadingImg = document.querySelector('.champImg')
	const loadingImgURL = `./dragontail-12.10.1/img/champion/loading/${champID}_0.jpg`
	//champ passive
	const champPassiveURL = `./dragontail-12.10.1/12.10.1/img/passive/${champData[1].passive.image.full}`

	//set champ img attributes
	loadingImg.classList.add('champImg')
	loadingImg.src = loadingImgURL
	loadingImg.alt = `An Image of ${champName}`
	//render name and title
	name.textContent = champName
	champTitle.textContent = champData[1].title
	//get skill tags from html
	const q = document.querySelector('.q')
	const w = document.querySelector('.w')
	const e = document.querySelector('.e')
	const r = document.querySelector('.r')
	const spellImgList = [q, w, e, r]
	//skill infos
	const qName = document.querySelector('.qName')
	const qDesc = document.querySelector('.qDesc')
	const wName = document.querySelector('.wName')
	const wDesc = document.querySelector('.wDesc')
	const eName = document.querySelector('.eName')
	const eDesc = document.querySelector('.eDesc')
	const rName = document.querySelector('.rName')
	const rDesc = document.querySelector('.rDesc')
	const spellNames = [qName, wName, eName, rName]
	const spellInfos = [qDesc, wDesc, eDesc, rDesc]
	//skill cooldown
	const qCD = document.querySelector('.qCD')
	const wCD = document.querySelector('.wCD')
	const eCD = document.querySelector('.eCD')
	const rCD = document.querySelector('.rCD')
	const spellCDs = [qCD, wCD, eCD, rCD]



	for(let i = 0; i < 4; i++) {
		const champCD = champData[1].spells[i].cooldown
		spellCDs[i].textContent = champCD;
		const champSpellId = champData[1].spells[i].id
		const champSpellName = champData[1].spells[i].name
		const champpSpellDesc = champData[1].spells[i].description
		const spellImg_URL = `./dragontail-12.10.1/12.10.1/img/spell/${champSpellId}.png`
		spellImgList[i].src = spellImg_URL

		spellNames[i].textContent = champSpellName
		spellInfos[i].textContent = champpSpellDesc
	}
	//add passiveDiv and spellDiv classes
	const passiveDiv = document.querySelector('#pDiv')
	passiveDiv.classList.add('passiveDiv')
	const sDiv = document.querySelectorAll('.sDiv')
	for(const skill of sDiv) {
		skill.classList.add('skillDiv')
	}
	

	//passive infos
	const passiveImg = document.querySelector('.passive')
	const passiveName = document.querySelector('.passiveName')
	const passiveDesc = document.querySelector('.passiveDesc')
	passiveImg.src = champPassiveURL;
	passiveName.textContent = champData[1].passive.name.replace(/<\/?[^>]+(>|$)/gi, "")
	passiveDesc.textContent = champData[1].passive.description.replace(/<\/?[^>]+(>|$)/gi, "")


	//base stats of the champion
	const champHP = champData[1].stats.hp
	const champMana = champData[1].stats.mp
	const champHpRegen = champData[1].stats.hpregen
	const champArmor = champData[1].stats.armor
	const champAD = champData[1].stats.attackdamage
	const champMR = champData[1].stats.spellblock
	const champRange = champData[1].stats.attackrange
	
	const HP = document.querySelector('.hp')
	const mana = document.querySelector('.mana')
	const hpRegen = document.querySelector('.hpRegen')
	const armor = document.querySelector('.armor')
	const AD = document.querySelector('.ad')
	const MR = document.querySelector('.mr')
	const range = document.querySelector('.range')
	HP.textContent = `HP: ${champHP}`
	mana.textContent = `Mana: ${champMana}`
	hpRegen.textContent = `HP Regen: ${champHpRegen} per 5sec`
	armor.textContent = `Armor: ${champArmor}`
	AD.textContent = `Attack Damage: ${champAD}`
	MR.textContent = `Magic Resist: ${champMR}`
	range.textContent = `Range: ${champRange}`

	console.log(champData)
}

fetchIndivData()