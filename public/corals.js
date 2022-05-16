const CORAL_TYPE = {
  FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  ACROPORA_LORIPES: "ACROPORA_LORIPES",
  ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
}; 

class Coral{

	Coral(coralType, img, name, red, green, blue,){
		this.coralType = coralType;
		this.img = img;
		this.name = name;
		this.red = Number(red);
		this.blue = Number(blue);
		this.green = Number(green);
	}

	drawSelf(){
		//image(imgPath, );
	}

}