const CORAL_TYPE = {
  FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  ACROPORA_LORIPES: "ACROPORA_LORIPES",
  ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
}; 

const fontSize = 32;

const fsCoralDimensions = {
	imgW: 50,
	imgH: 50,
};
const alCoralDimensions = {
	imgW: 50,
	imgH: 50,
};
const amCoralDimensions = {
	imgW: 50,
	imgH: 50,
};

class Coral{

	constructor(coralType, img, name, red, green, blue){
		this.coralType = coralType;
		this.img = img;
		this.name = name;
		this.red = Number(red);
		this.blue = Number(blue);
		this.green = Number(green);

		if(coralType === CORAL_TYPE.FUNGIA_SCUTARIA){
			console.log("in fs");
			this.imgWidth = fsCoralDimensions.imgW;
			this.imgHeight = fsCoralDimensions.imgH;
		}

		else if(coralType === CORAL_TYPE.ACROPORA_LORIPES){
			console.log("in al");
			this.imgWidth = alCoralDimensions.imgW;
			this.imgHeight = alCoralDimensions.imgH;
		}

		else if(coralType === CORAL_TYPE.ACROPORA_MILLEPORA){
			console.log("in am");
			this.imgWidth = amCoralDimensions.imgW;
			this.imgHeight = amCoralDimensions.imgH;
		}

	}

	drawSelf(row, col, offsetX, offsetY){

		//textSize(fontSize);
		//const nameWidth = textWidth(this.name);

		const alpha = 255;
	  	//tint(this.red, this.green, this.blue, alpha); // Tint blue

		const xCoord = (col * this.imgWidth) + offsetX;
		const yCoord = (row * this.imgHeight) +offsetY;

		imageMode(CORNER);
		image(this.img, xCoord, yCoord, this.imgWidth, this.imgHeight);
	}

}