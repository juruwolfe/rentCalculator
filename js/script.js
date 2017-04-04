//We wait until the document is "ready" (loaded) before including any code
$(document).ready(function(){
	//Store our average rents in an object, it'll make it easier to 
	//retrieve the data, and allow us to keep it neat should this list grow
	var averageRents = {
		"Montreal":760,
		"Denver":1367,
		"Buenos_Aires":818
	}

	//When a user clicks on our button, the magic happens. This line
	//listens for that click, and everything inside our function will happen after a click
	$(".btn").click(function(){
		/**
		Here's where we get the info we need to write our mad-lib sentence
		**/
		// We get how much the user has set their budget at by using the jquery 'val' function. But we wrap it in 'parseFloat' so that gets back to us as a number (no rounding!) rather than a string
		var userAmount = parseFloat($(".budget").val());
		//We want the city as a string, so no rounding needed
		var userCity = $("#citiesSelector").val();
		//Here's where that object comes in handy! Because we used an object, we can use square brackets to get info from the object. More on why and when you use square brackets: https://medium.com/@prufrock123/js-dot-notation-vs-bracket-notation-797c4e34f01d 
		var userCityRent = averageRents[userCity];

		//Okay, so we've got the basics but we need to write that sentence. So let's select our .results paragraph with jquery, and set it's text to be equal to whatever the custom function 'writeText' returns. And since 'writeText' has a different scope than this function, we need to pass, using arguments, the three tidbits of info we grabbed earlier. In this case, order is very important! It needs to match what our function expects
		$(".results").text( writeText(userAmount, userCity, userCityRent) )

	//End the button click function
	});
	
	//This is our custom writeText function, no jquery here! Just pure, vanilla javascript. But you knew that, right?
	function writeText(userAmount, userCity, userCityRent){
		//We want to write our results differently depending on if they have budgeted more or less than the average rent. Enter: the mighty 'if' statement! 
		//If the user's budget is larger than the average rent of the city they want to live in
		if (userAmount > userCityRent){
			// Huzzah! You've likely got a surplus on your hands. With some string and variable concatanation, we're able to take the variables we already calculated and construct a decent english sentence. We can even pause to do some math here (subtracting the userAmount from the userCityRent) so long as they are in parenthesis. But even better, pass that as an argument to our custom numberWithCommas function so we can pretty it up.
			return "Sounds doable! " + userCity + " costs $" + numberWithCommas(userCityRent) + ", $" + numberWithCommas(userAmount - userCityRent) + " less than you budgeted."; 
		}
		else if(userCityRent > userAmount){
			//What if the average rent is more expensive than they city they want to live in? Similar logic (though we flip what number comes first when we subtract), just different language
 			return "Might be tough! " + userCity + " costs $" + numberWithCommas(userCityRent) + ", $" + numberWithCommas(userCityRent - userAmount) + " more than you budgeted."; 
		}
		else{
			//If all is equal? No math required, we don't need to calucate the $0 difference between the two 
			return "Sounds doable! " + userCity + " costs $" + numberWithCommas(userCityRent) + ", exactly what you budgeted.";
		}
	//End of our custom 'writeText' function
	}

	//I found this on the internet by googling "js add commas to number" and grabbing the simplest one I saw. 
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

//End of our document ready code, nothing should come after these closing brackets!
})