
class Coral{
	constructor(species, color, name){
		this.species = species;
		this.color = color;
		this.name = name;
		this.parentRock = null;

		this.domContainer = this.createDomElements(species, color, name);
	}

	createDomElements(species, color, name){
		const containerId = `${name}-${species}-container`;

		let container = document.createElement('div');
		container.id = containerId;

		const { domName, domNameWidthPx, domNameHeightPx } = this.createDomName(name, container);
		this.domName = domName;

		const { domImg, domImgWidthPx, domImgHeightPx } = this.createDomImg(species, color, container);
		this.domImg = domImg;

		this.dimensions = {
			domNameWidthPx,
			domNameHeightPx,
			domImgWidthPx,
			domImgHeightPx,
			totalHeight: domNameHeightPx + domImgHeightPx + FONT_SIZE + NAME_TO_IMG_GAP_PX,
			totalWidth: (domNameWidthPx > domImgWidthPx ? domNameWidthPx  : domImgWidthPx)
		};

		return container;
	}

	createDomName(name, container){
		const nameDiv = document.createElement('div');
		nameDiv.id = `${name}-label`;
		nameDiv.classList.add('coralName');
		nameDiv.style.fontSize = `${FONT_SIZE}px`;
		nameDiv.textContent = name;

		const testParent = document.getElementById('TEST-NAME-CONTAINER');
		testParent.appendChild(nameDiv);

		const nameWidth = (nameDiv.clientWidth + 1);
		const nameHeight = (nameDiv.clientHeight + 1);

		nameDiv.remove();
		container.appendChild(nameDiv);

		return {
			domName: nameDiv,
			domNameWidthPx: nameWidth,
			domNameHeightPx: nameHeight,
		};


	}

	createDomImg(species, color, container){

		let newImg = document.createElement('img');
		newImg.src = CORAL_FILENAMES[species];
		newImg.style.position = 'absolute';

		const domHeight = TO_PIXELS(CORAL_DIMENSIONS[species].height, 'innerHeight');
		const domWidth = TO_PIXELS(CORAL_DIMENSIONS[species].width, 'innerWidth');
		newImg.setAttribute('height', `${domHeight}`);
		newImg.setAttribute('width', `${domWidth}`);
		newImg.classList.add(color);

		const imgWidth = (newImg.clientWidth + 1);
		const imgHeight = (newImg.clientHeight + 1);

		container.append(newImg);
		return {
			domImg: newImg, 
			domImgWidthPx: domWidth,
			domImgHeightPx: domHeight
		};
	}


	setPosition(topPx, leftPx, parentRock){
		const { domImgWidthPx, domImgHeightPx, domNameWidthPx, domNameHeightPx } = this.dimensions;

		//Set Top
		const imgXPx = topPx-domImgHeightPx;
		this.domImg.style.top = `${imgXPx}px`;

		//let nameYPx  =  (topPx - domImgHeightPx) - (domNameHeightPx + FONT_SIZE + NAME_TO_IMG_GAP_PX);
		//let nameYPx  =  (topPx) - (domNameHeightPx + FONT_SIZE + NAME_TO_IMG_GAP_PX);

		let nameYPx = imgXPx - (domNameHeightPx + FONT_SIZE + NAME_TO_IMG_GAP_PX);

		this.domName.style.top = `${nameYPx}px`;

		//Set Left
		if(domImgWidthPx > domNameWidthPx){
			this.domImg.style.left = `${leftPx}px`;
			const nameXPx = (leftPx + Math.round(domImgWidthPx / 2)) - (Math.round(domNameWidthPx)/2);
			this.domName.style.left = `${nameXPx}px`;//adjust name accordingly
		}
		else{
			this.domName.style.left = `${leftPx}px`;
			const imgXPx = (leftPx + Math.round(domNameWidthPx / 2)) - (Math.round(domImgWidthPx)/2);
			this.domImg.style.left = `${imgXPx}px`; //adjust img accordingly
		}

		// let nameXPx = null;
		// let groupStartX = null;

		// if(domImgWidthPx > domNameWidthPx){
		// 	nameXPx = (imgXPx + Math.round(domImgWidthPx / 2)) - (Math.round(domNameWidthPx)/2);
		// 	groupStartX = imgXPx;
		// }
		// else{
		// 	nameXPx = (imgXPx + Math.round(domImgWidthPx / 2)) - (Math.round(domNameWidthPx)/2);
		// 	groupStartX = nameXPx;
		// }


		this.parentRock = parentRock;

		//Collision box
		{

			const test = document.createElement('div');
			test.classList.add('box');
			test.style.left = `${leftPx}px`;
			test.style.top = `${nameYPx}px`;

			test.style.width = `${this.dimensions.totalWidth}px`;
			test.style.height = `${this.dimensions.totalHeight}px`;

			//this.domContainer.append(test);
		}

		
		this.dimensions.groupStartXPx = leftPx;
		this.dimensions.groupStartYPx = nameYPx;


		if(this.species === CORAL_SPECIES[`FUNGIA_SCUTARIA`]){
			this.domImg.classList.add(`growingShorter`);
		}
		else{
			this.domImg.classList.add(`growingLonger`);
		}

		// return {
		// 	groupStartX: leftPx,
		// 	groupTopYPx: nameYPx, 
		// 	// groupRightXPx: (this.dimensions.domImgWidthPx > this.dimensions.domNameWidthPx ? x + this.dimensions.domImgWidthPx : x + this.dimensions.domNameWidthPx ),
		// 	// groupBottomYPx: y,
		// }

	}

	draw(parentDom){
		parentDom.appendChild(this.domContainer);
	}


}
