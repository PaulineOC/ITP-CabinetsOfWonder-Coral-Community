
const checkShelfPositions2 = (currRockShelf, newCoral) => {

  console.log(currRockShelf);

  const currShelfCorals = ROCK_SHELF_CORALS[currRockShelf];

  const { top, left, endX, endY } = ROCK_SHELF_COORDINATES[currRockShelf];

  let newPos = null;

  for(let i = 0; i < NUM_TRIES; i++){

    const x = TO_PIXELS((Math.random() * (endX - left) + left), 'innerWidth');
    const y = TO_PIXELS((Math.random() * (endY - top) + top), 'innerHeight');

    console.log(`\n\nTRY #: ${i}:\nStart X: ${x}\n Final X: ${(newCoral.dimensions.totalWidth+x)}`);

    if(currShelfCorals.length <= 0){
      return { left: x , top: y };
    }

    if(!isCollidingWithOtherShelfCorals(currShelfCorals, newCoral, x, y)){
      return { left: x , top: y };
    }

    console.log(`%% Invalid shelf candidate: ${currRockShelf}`);


    // for (const [j, curr] of currShelfCorals.entries()) {
    //   console.log(`Checking Curr Coral:  - ${j}:`);

    //   isValidPosition = checkCollision(curr.dimensions, newCoral.dimensions, x, y);

    //   if(!isValidPosition){
    //     newPos = null;
    //   }
    //   else{
    //     newPos = { left: x , top: y, } ;
    //   }

    //   //newPos = isValidPosition ? : null ;


    //   // if (isValidPosition) {
    //   //   newPos = ;
    //   // }
    // }

  }

  return null ;

    //const x = (Math.random() * (endX - left) + left);
    //const y = (Math.random() * (endY - top) + top);
    //console.log(`Try ${i}: x: ${x}, y: ${y}`);
    // console.log(`top: ${top},  End: ${endY}, final: ${newY} - ${newY * window.innerHeight} `);

};

const isCollidingWithOtherShelfCorals = (currShelfCorals, newCoral, x, y) => {
   for (const [j, curr] of currShelfCorals.entries()) {
      console.log(`Checking Curr Coral:  - ${j}:`);
      isValidPosition = checkCollision(curr.dimensions, newCoral.dimensions, x, y);

      if(!isValidPosition){
        return true;
      }
    }
    return false;
};

const  checkCollision = (currDim, newDim, x, y) => {

  newDim.groupStartXPx = x;
  newDim.groupStartYPx = y;

  console.log("Checking against:");
  console.log(`Curr Dimensions:\nStart X: ${currDim.groupStartXPx }\nFinal X: ${currDim.groupStartXPx + currDim.totalWidth} `); 

 
  const left  = currDim.groupStartXPx < newDim.groupStartXPx ? currDim : newDim;
  const right = currDim.groupStartXPx < newDim.groupStartXPx ? newDim : currDim;


  const sideCollision = left.groupStartXPx + left.totalWidth > right.groupStartXPx;


  if(sideCollision) {
    console.log("**HORIZONTAL COLLISION** ");

    if(currDim.groupStartXPx < newDim.groupStartXPx){
      console.log(`Left coral: CURR`);
      
    }
    else{
      console.log('Left coral: NEW');
    }

    //console.log(`New Dimensions:\nStart X: ${newDim.groupStartXPx }\nFinal X: ${newDim.groupStartXPx + newDim.totalWidth} `); 
    //console.log(`   New Dimensions:\nStart X: ${newDim.groupStartXPx }\nFinal X: ${newDim.groupStartXPx + newDim.totalWidth} `); 
    return false;
  }


  // const currStartX = currDim.groupStartXPx;
  // const newStartX  = x;
  // const currEndX   = currStartX + currDim.totalWidth;
  // const newEndX    = newStartX + newDim.totalWidth;


  // if(
  //   currStartX < newStartX && x < currEndX || 
  //   currStartX > newStartX && currStartX < newEndX
  //   ){

  //   console.log("X INTERCEPTION");

  //   return false;

  // }

  // newDim.groupStartXPx = null;
  // newDim.groupStartYPx = null;

  // this.dimensions.groupStartXPx = groupStartXPx;
  // this.dimensions.groupStartYPx = nameYPx;

  console.log("**VALID POSITION**");
  return true;
};



  // console.log(`\n ** TRY #${i}: 
    //     \n Start X: ${x}
    //     \n Final X: ${(x + newCoral.dimensions.totalWidth)}
    //     \n StartY: ${y}
    //     \n Final Y : ${(y + newCoral.dimensions.totalHeight)}
    // `);