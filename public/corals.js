// const CORAL_TYPE = {
//   FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
//   ACROPORA_LORIPES: "ACROPORA_LORIPES",
//   ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
// }; 

// const fontSize = 32;

// const fsCoralDimensions = {
// 	imgW: 100,
// 	imgH: 100,
// };
// const alCoralDimensions = {
// 	imgW: 50,
// 	imgH: 50,
// };
// const amCoralDimensions = {
// 	imgW: 50,
// 	imgH: 50,
// };

// class Coral{

// 	constructor(coralType, img, name, red, green, blue){
// 		this.coralType = coralType;
// 		this.img = img;
// 		this.name = name;
// 		this.red = Number(red);
// 		this.blue = Number(blue);
// 		this.green = Number(green);

// 		if(coralType === CORAL_TYPE.FUNGIA_SCUTARIA){
// 			console.log("in fs");
// 			this.imgWidth = fsCoralDimensions.imgW;
// 			this.imgHeight = fsCoralDimensions.imgH;
// 		}

// 		else if(coralType === CORAL_TYPE.ACROPORA_LORIPES){
// 			console.log("in al");
// 			this.imgWidth = alCoralDimensions.imgW;
// 			this.imgHeight = alCoralDimensions.imgH;
// 		}

// 		else if(coralType === CORAL_TYPE.ACROPORA_MILLEPORA){
// 			console.log("in am");
// 			this.imgWidth = amCoralDimensions.imgW;
// 			this.imgHeight = amCoralDimensions.imgH;
// 		}
// 	}

// 	drawSelf(row, col, offsetX, offsetY){

// 		let xCoord = (row * this.imgHeight) + offsetX;
// 		let yCoord = (col * this.imgWidth) + offsetY;

// 		const fontSize = 18;
// 		textSize(18);
// 		textAlign(CENTER);
// 		text(this.name, xCoord, yCoord-fontSize);

// 		const alpha = 255;
// 		//tint(0, 0, 255, alpha); // Tint blue
// 	  	tint(this.red, this.green, this.blue, alpha); // Tint blue
// 		imageMode(CORNER);
// 		image(this.img, xCoord, yCoord+fontSize, this.imgWidth, this.imgHeight);
// 	}

// }