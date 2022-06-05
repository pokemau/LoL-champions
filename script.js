//fetch individual champion Data
const fetchIndivData = async () => {
	const api_url= './dragontail-12.10.1/12.10.1/data/en_US/champion.json';
	const apiResponse = await fetch(api_url);
	const responseJson = await apiResponse.json();
	const responseData = await responseJson.data;
	


	for(const entry of Object.entries(responseData)) {
		const indiv_champ_url = './dragontail-12.10.1/12.10.1/data/en_US/champion/';
		const champID = entry[1].id;
		const champJSON_URL = `${indiv_champ_url + champID}.json`;
		const fetchIndivJSON = await fetch(champJSON_URL);
		const indivJSON = await fetchIndivJSON.json();
		const indivData = await indivJSON.data;
		renderImage(indivData)
	}

}
//render image to images list
const renderImage = (champData) => {

	for(const entry of Object.entries(champData)) {
		const champ_img_loc = './dragontail-12.10.1/12.10.1/img/champion/';
		const champImage = document.createElement('img');
		const championListContainer = document.querySelector('.championList');
		const champID = entry[1].id;
		const champName = entry[1].name;
		const imgSRC = `${champ_img_loc + entry[1].id}.png`;
		const imageDiv = document.createElement('div');
		imageDiv.className = 'imageDiv';
		//set img attributes
		champImage.id = champID;
		champImage.alt = `image of ${champName}`;
		champImage.classList.add('boxImage');
		champImage.src = imgSRC;
		//append image to div then div to .container
		imageDiv.appendChild(champImage);
		championListContainer.appendChild(imageDiv);
		champImage.addEventListener('click', (e) => {
			console.log(champData)
			renderChampInfo(champName, entry);
		})
	}
}

const renderChampInfo = (champName, champData) => {
	//champ name and title
	const name = document.querySelector('.champName');
	const champTitle = document.querySelector('.champTitle');
	//champ img
	const loadingImg = document.querySelector('.champImg');
	const loadingImgURL = `./dragontail-12.10.1/img/champion/loading/${champName}_0.jpg`;
	//champ passive
	const champPassiveURL = `./dragontail-12.10.1/12.10.1/img/passive/${champData[1].passive.image.full}`

	//set champ img attributes
	loadingImg.classList.add('champImg');
	loadingImg.src = loadingImgURL;
	loadingImg.alt = `An Image of ${champName}`;
	//render name and title
	name.textContent = champName;
	champTitle.textContent = champData[1].title;
	//get skill tags from html
	const q = document.querySelector('.q');
	const w = document.querySelector('.w');
	const e = document.querySelector('.e');
	const r = document.querySelector('.r');
	const spellImgList = [q, w, e, r];
	//skill infos
	const qName = document.querySelector('.qName');
	const qDesc = document.querySelector('.qDesc');
	const wName = document.querySelector('.wName');
	const wDesc = document.querySelector('.wDesc');
	const eName = document.querySelector('.eName');
	const eDesc = document.querySelector('.eDesc');
	const rName = document.querySelector('.rName');
	const rDesc = document.querySelector('.rDesc');
	const spellNames = [qName, wName, eName, rName];
	const spellInfos = [qDesc, wDesc, eDesc, rDesc];
	//skill cooldown

	for(let i = 0; i < 4; i++) {
		const champSpellId = champData[1].spells[i].id;
		const champSpellName = champData[1].spells[i].name;
		const champpSpellDesc = champData[1].spells[i].description;
		const spellURL = `./dragontail-12.10.1/12.10.1/img/spell/${champSpellId}.png`;
		spellImgList[i].src = spellURL;

		spellNames[i].textContent = champSpellName;
		spellInfos[i].textContent = champpSpellDesc;
	}

	//passive infos
	const passiveImg = document.querySelector('.passive');
	const passiveName = document.querySelector('.passiveName');
	const passiveDesc = document.querySelector('.passiveDesc');
	passiveImg.src = champPassiveURL;
	passiveName.textContent = champData[1].passive.name.replace(/<\/?[^>]+(>|$)/gi, "");
	passiveDesc.textContent = champData[1].passive.description //.replace(/<\/?[^>]+(>|$)/gi, "");

	//console.log(champData);
}

fetchIndivData();