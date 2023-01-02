const TO_PIXELS = (num, property) => num * window[property];

const IS_COLLIDING_HORIZONTALLY = (currStartX, currLength, newStartX, newLength) => {

	if(
		currStartX <= newStartX &&
		currStartX + currLength >= newStartX
	){
		//console.log("CURR IS LEFT");
		return true;
	}
	if(newStartX <= currStartX && 
		newStartX + newLength >= currStartX
	){
		//console.log('NEW IS LEFT');
		return true;
	}

	return false;
};

const IS_COLLIDING_VERTICALLY = (currStartY, currHeight, newStartY, newHeight) => {

	if(
		currStartY <= newStartY &&
		currStartY + currHeight >= newStartY
	){
		//console.log("CURR IS TOP");
		return true;
	}
	if(newStartY <= currStartY && 
		newStartY + newHeight >= currStartY
	){
		//console.log('NEW IS TOP');
		return true;
	}

	return false;
};

const IS_COLLIDING = (currDimensions, newDimensions) => {

	const { currStartX , currStartY, currLength , currHeight } = currDimensions;
	const { newStartX, newStartY, newLength, newHeight } = newDimensions;

	return (
		IS_COLLIDING_HORIZONTALLY(currStartX, currLength, newStartX, newLength) && IS_COLLIDING_VERTICALLY(currStartY, currHeight, newStartY, newHeight)
	); 
};

//TESTS
{
	const horizontalTests = () => {

	//HORIZONTAL
	const test0 = IS_COLLIDING_HORIZONTALLY(
		0,
		50,
		0,
		50
	);
	console.log(`Test 0 should be TRUE - actually is: ${test0}`);

	{

		// LEFT = CURR
		const test1A = IS_COLLIDING_HORIZONTALLY(
			0,
			100,
			25,
			50
		);
		console.log(`Test 1A should be TRUE - actually is: ${test1A}`);

		const test1B = IS_COLLIDING_HORIZONTALLY(
			0,
			100,
			50,
			150,
		);
		console.log(`Test 1B should be TRUE - actually is: ${test1B}`);

		const test1C = IS_COLLIDING_HORIZONTALLY(
			0,
			100,
			200,
			50,
		);
		console.log(`Test 1C should be FALSE - actually is: ${test1C}`);
	}

	{
		// LEFT = NEW
		const test2A = IS_COLLIDING_HORIZONTALLY(
			0,
			50,
			-50,
			150
		);
		console.log(`Test 2A should be TRUE - actually is: ${test2A}`);

		const test2B = IS_COLLIDING_HORIZONTALLY(
			-10,
			50,
			-25,
			25,
		);
		console.log(`Test 1B should be TRUE - actually is: ${test2B}`);

		const test2C = IS_COLLIDING_HORIZONTALLY(
			1000,
			25,
			-50,
			100,
		);
		console.log(`Test 2C should be FALSE - actually is: ${test2C}`);
	}
	}

	const verticalTests = () => {

		const test0 = IS_COLLIDING_VERTICALLY(
			50,
			100,
			50,
			100
		);
		console.log(`Test 0 should be TRUE - actually is: ${test0}`);

		{

			// TOP = CURR
			const test1A = IS_COLLIDING_VERTICALLY(
				0,
				100,
				25,
				50
			);
			console.log(`Test 1A should be TRUE - actually is: ${test1A}`);

			const test1B = IS_COLLIDING_VERTICALLY(
				50,
				100,
				75,
				75,
			);
			console.log(`Test 1B should be TRUE - actually is: ${test1B}`);

			const test1C = IS_COLLIDING_VERTICALLY(
				0,
				20,
				50,
				50,
			);
			console.log(`Test 1C should be FALSE - actually is: ${test1C}`);
		}

		{
			// TOP = NEW
			const test2A = IS_COLLIDING_VERTICALLY(
				75,
				50,
				50,
				100
			);
			console.log(`Test 2A should be TRUE - actually is: ${test2A}`);

			const test2B = IS_COLLIDING_VERTICALLY(
				25,
				75,
				-50,
				100,
			);
			console.log(`Test 1B should be TRUE - actually is: ${test2B}`);

			const test2C = IS_COLLIDING_VERTICALLY(
				75,
				25,
				-100,
				150,
			);
			console.log(`Test 2C should be FALSE - actually is: ${test2C}`);
		}
	};

	const collisionTests = () => {

		const test0 = IS_COLLIDING(
			{
				currStartX: 0,
				currStartY: 0,
				currLength: 100 ,
				currHeight: 75,
			},
			{
				newStartX: 25,
				newStartY: 15,
				newLength: 100,
				newHeight: 85,
			}
		);
		console.log(`Test 0 should be TRUE - actually is: ${test0}`);

		const test3A = IS_COLLIDING(
			{
				currStartX: -50,
				currStartY: 25,
				currLength: 150,
				currHeight: 50,
			},
			{
				newStartX: -75,
				newStartY: 50,
				newLength: 225,
				newHeight: 50,
			}
		);
		console.log(`Test 3A should be TRUE - actually is: ${test3A}`);

		const test3B = IS_COLLIDING(
			{
				currStartX: 0,
				currStartY: 0,
				currLength: 75,
				currHeight: 100,
			},
			{
				newStartX: -25,
				newStartY: 25,
				newLength: 50,
				newHeight: 50,
			}
		);
		console.log(`Test 3B should be TRUE - actually is: ${test3B}`);

		const test3C = IS_COLLIDING(
			{
				currStartX: -100,
				currStartY: 15,
				currLength: 50,
				currHeight: 35,
			},
			{
				newStartX: 0,
				newStartY: 50,
				newLength: 25,
				newHeight: 75,
			}
		);
		console.log(`Test 3C should be FALSE - actually is: ${test3C}`);
	};

	//horizontalTests();
	//verticalTests();
	//collisionTests();
}
