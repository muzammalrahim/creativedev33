(function() {
	
	var DROPS_URL = "https://eyqvrh2b2a.execute-api.ap-east-1.amazonaws.com/dev/drop";
	var DROP_REDEEM_URL = "https://eyqvrh2b2a.execute-api.ap-east-1.amazonaws.com/dev/drop/redeem";
	var DROP_ENTER_URL = "https://eyqvrh2b2a.execute-api.ap-east-1.amazonaws.com/dev/drop/enter";
	

	var dropsApp = angular.module('dropsApp', ['ngRoute'], function($interpolateProvider) {
		$interpolateProvider.startSymbol('[{');
		$interpolateProvider.endSymbol('}]');
	});
	
	function generateSlug(name) {
		return name.toLowerCase().replace(/ /g, '-').replace(/\/\\/g, '-').replace(/[^a-zA-Z0-9 -]/g, '')
	}

/*
var payButton = jQuery("#pay-now").get(0);
    Frames.init("pk_test_c8419cc1-5510-4fbd-b762-485f0fbd3a89");
    
    Frames.addEventHandler(
      Frames.Events.CARD_VALIDATION_CHANGED,
      function (event) {
        console.log("CARD_VALIDATION_CHANGED: %o", event);
        payButton.disabled = !Frames.isCardValid();
      }
    );
    
    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZED,
      function (event) {
        var el = document.querySelector(".success-payment-message");
        el.innerHTML = "Card tokenization completed<br>" +
          "Your card token is: <span class=\"token\">" + event.token + "</span>";
      }
    );
    
    jQuery("#pay-now").click(function() {
      Frames.submitCard();
    })
*/

	dropsApp.controller('dropCheckoutController', function($scope, $http, $location) {

		var token = new URL(window.location.href).searchParams.get("token");

		$scope.isCardValid = false;
		$scope.test = this; 
		$scope.subTotal = 0; 
		$scope.deliveryPrice = 0; 
		$scope.currency = ''; 
	 	$scope.diffshippingAddress = 0; 
	 	$scope.showdrop = false;
	 	$scope.changeChekoutBg = false;
	 	$scope.paymentType = 'Credit / Debit Card';
	 	$scope.billingAddress = 'Same as Shiping Address';
	 	$scope.borderGreen = false; 
	 
	
		
		$http.post(DROP_REDEEM_URL, JSON.stringify({
				'token': token
		}), {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(tokenResponse) {

			if (tokenResponse.data && tokenResponse.data.drop.Images) {
				$scope.showdrop = true;
			}

			console.log("Ships ", tokenResponse.data.ship.Rates);

			var new_ship_data = [];
			angular.forEach(tokenResponse.data.ship.Rates, function(ship, key) {
				// console.log(' each Rates', ship.Name );
				
				var str = ship.Name;
				
				var countries = [];
				var first_country = [];
				var last_country = [];
				
				if (ship.Countries.length == 2) {
					
					countries = ship.Countries;
					
					first_country = countries[0];
					last_country = countries[1];

					var singleName = str.substring(0, str.lastIndexOf("/") + 1);
					if (singleName) {
						ship.Name[key] = singleName;
						
						var singleNameWithoutSlash = singleName.replace(/\//g, '');

						var last = str.substring(str.lastIndexOf("/") + 1, str.length).trim();

						new_ship_data.push({...ship, Countries:[first_country], Name:singleNameWithoutSlash});
						new_ship_data.push({...ship, Countries:[last_country], Name:last});
						
					} else {
						new_ship_data.push(ship);
					}
				}
				else if (ship.Countries.length == 15) {
					
					countries = ship.Countries;

					first_country = countries[0];

					var singleName = str.substring(0, str.lastIndexOf("/") + 1);
					
					if (singleName) {
						ship.Name[key] = singleName;
						
						var singleNameWithoutSlash = singleName.replace(/\//g, '');

						new_ship_data.push({...ship, Countries:[first_country], Name:singleNameWithoutSlash});
						new_ship_data.push({...ship, Countries:["BR"], Name:"Brazil"});
						new_ship_data.push({...ship, Countries:["CO"], Name:"Colombia"});
						new_ship_data.push({...ship, Countries:["AR"], Name:"Argentina"});
						new_ship_data.push({...ship, Countries:["PE"], Name:"Peru"});
						new_ship_data.push({...ship, Countries:["VE"], Name:"Venezuela"});
						new_ship_data.push({...ship, Countries:["CL"], Name:"Chile"});
						new_ship_data.push({...ship, Countries:["EC"], Name:"Ecuador"});
						new_ship_data.push({...ship, Countries:["BO"], Name:"Bolivia"});
						new_ship_data.push({...ship, Countries:["PY"], Name:"Paraguay"});
						new_ship_data.push({...ship, Countries:["UY"], Name:"Uruguay"});
						new_ship_data.push({...ship, Countries:["GY"], Name:"Guyana"});
						new_ship_data.push({...ship, Countries:["SR"], Name:"Suriname"});
						new_ship_data.push({...ship, Countries:["GF"], Name:"French Guiana"});
						new_ship_data.push({...ship, Countries:["FK"], Name:"Falkland Islands"});

					} else {
						new_ship_data.push(ship);
					}

				} 
				else if (ship.Countries.length == 26) {
		
					new_ship_data.push({...ship, Countries:["AT"], Name:"Austria"});
					new_ship_data.push({...ship, Countries:["BE"], Name:"Belgium"});
					new_ship_data.push({...ship, Countries:["BG"], Name:"Bulgaria"});
					new_ship_data.push({...ship, Countries:["HR"], Name:"Croatia"});
					new_ship_data.push({...ship, Countries:["CY"], Name:"Cyprus"});
					new_ship_data.push({...ship, Countries:["CZ"], Name:"Czechia"});
					new_ship_data.push({...ship, Countries:["DK"], Name:"Denmark"});
					new_ship_data.push({...ship, Countries:["EE"], Name:"Estonia"});
					new_ship_data.push({...ship, Countries:["FI"], Name:"Finland"});
					new_ship_data.push({...ship, Countries:["DE"], Name:"Germany"});
					new_ship_data.push({...ship, Countries:["GR"], Name:"Greece"});
					new_ship_data.push({...ship, Countries:["HU"], Name:"Hungary"});
					new_ship_data.push({...ship, Countries:["IE"], Name:"Ireland"});
					new_ship_data.push({...ship, Countries:["IT"], Name:"Italy"});
					new_ship_data.push({...ship, Countries:["LV"], Name:"Latvia"});
					new_ship_data.push({...ship, Countries:["LT"], Name:"Lithuania"});
					new_ship_data.push({...ship, Countries:["LU"], Name:"Luxembourg"});
					new_ship_data.push({...ship, Countries:["MT"], Name:"Malta"});
					new_ship_data.push({...ship, Countries:["NL"], Name:"Netherlands"});
					new_ship_data.push({...ship, Countries:["PL"], Name:"Poland"});
					new_ship_data.push({...ship, Countries:["PT"], Name:"Portugal"});
					new_ship_data.push({...ship, Countries:["RO"], Name:"Romania"});
					new_ship_data.push({...ship, Countries:["SK"], Name:"Slovakia"});
					new_ship_data.push({...ship, Countries:["SI"], Name:"Slovenia"});
					new_ship_data.push({...ship, Countries:["ES"], Name:"Spain"});
					new_ship_data.push({...ship, Countries:["SE"], Name:"Sweden"});
				}
				else if (ship.Countries.length == 6) {
					
					new_ship_data.push({...ship, Countries:["SG"], Name:"Singapore"});
					new_ship_data.push({...ship, Countries:["MY"], Name:"Malaysia"});
					new_ship_data.push({...ship, Countries:["TH"], Name:"Thailand"});
					new_ship_data.push({...ship, Countries:["PH"], Name:"Philippines"});
					new_ship_data.push({...ship, Countries:["KR"], Name:"Korea"});
					new_ship_data.push({...ship, Countries:["VN"], Name:"Viet Nam"});
				}
				else if (ship.Countries.length == 16) { 

					new_ship_data.push({...ship, Countries:["EG"], Name:"Egypt"});
					new_ship_data.push({...ship, Countries:["IR"], Name:"Iran"});
					new_ship_data.push({...ship, Countries:["IQ"], Name:"Iraq"});
					new_ship_data.push({...ship, Countries:["SA"], Name:"Saudi Arabia"});
					new_ship_data.push({...ship, Countries:["YE"], Name:"Yemen"});
					new_ship_data.push({...ship, Countries:["SY"], Name:"Syrian Arab Republic"});
					new_ship_data.push({...ship, Countries:["JO"], Name:"Jordan"});
					new_ship_data.push({...ship, Countries:["AE"], Name:"United Arab Emirates"});
					new_ship_data.push({...ship, Countries:["IL"], Name:"Israel"});
					new_ship_data.push({...ship, Countries:["LY"], Name:"Libya"});
					new_ship_data.push({...ship, Countries:["LB"], Name:"Lebanon"});
					new_ship_data.push({...ship, Countries:["OM"], Name:"Oman"});
					new_ship_data.push({...ship, Countries:["PS"], Name:"Palestine"});
					new_ship_data.push({...ship, Countries:["KW"], Name:"Kuwait"});
					new_ship_data.push({...ship, Countries:["QA"], Name:"Qatar"});
					new_ship_data.push({...ship, Countries:["BH"], Name:"Bahrain"});

				}
				else if (ship.Countries.length == 60) { 

					new_ship_data.push({...ship, Countries:["NG"], Name:"Nigeria"});
					new_ship_data.push({...ship, Countries:["CG"], Name:"Congo (the Republic of the Congo)"});
					new_ship_data.push({...ship, Countries:["CD"], Name:"Congo (the Democratic Republic of the Congo)"});
					new_ship_data.push({...ship, Countries:["ET"], Name:"Ethiopia"});
					new_ship_data.push({...ship, Countries:["ZA"], Name:"South Africa"});
					new_ship_data.push({...ship, Countries:["TZ"], Name:"Tanzania"});
					new_ship_data.push({...ship, Countries:["KE"], Name:"Kenya"});
					new_ship_data.push({...ship, Countries:["UG"], Name:"Uganda"});
					new_ship_data.push({...ship, Countries:["DZ"], Name:"Algeria"});
					new_ship_data.push({...ship, Countries:["SD"], Name:"Sudan (the)"});
					new_ship_data.push({...ship, Countries:["MA"], Name:"Morocco"});
					new_ship_data.push({...ship, Countries:["MZ"], Name:"Mozambique"});
					new_ship_data.push({...ship, Countries:["GH"], Name:"Ghana"});
					new_ship_data.push({...ship, Countries:["AO"], Name:"Angola"});
					new_ship_data.push({...ship, Countries:["SO"], Name:"Somalia"});
					new_ship_data.push({...ship, Countries:["CI"], Name:"Côte d'Ivoire"});
					new_ship_data.push({...ship, Countries:["MG"], Name:"Madagascar"});
					new_ship_data.push({...ship, Countries:["CM"], Name:"Cameroon"});
					new_ship_data.push({...ship, Countries:["BF"], Name:"Burkina Faso"});
					new_ship_data.push({...ship, Countries:["NE"], Name:"Niger (the)"});
					new_ship_data.push({...ship, Countries:["MW"], Name:"Malawi"});
					new_ship_data.push({...ship, Countries:["ZM"], Name:"Zambia"});
					new_ship_data.push({...ship, Countries:["ML"], Name:"Mali"});
					new_ship_data.push({...ship, Countries:["SN"], Name:"Senegal"});
					new_ship_data.push({...ship, Countries:["ZW"], Name:"Zimbabwe"});
					new_ship_data.push({...ship, Countries:["TD"], Name:"Chad"});
					new_ship_data.push({...ship, Countries:["TN"], Name:"Tunisia"});
					new_ship_data.push({...ship, Countries:["GN"], Name:"Guinea"});
					new_ship_data.push({...ship, Countries:["RW"], Name:"Rwanda"});
					new_ship_data.push({...ship, Countries:["BJ"], Name:"Benin"});
					new_ship_data.push({...ship, Countries:["BI"], Name:"Burundi"});
					new_ship_data.push({...ship, Countries:["SS"], Name:"South Sudan"});
					new_ship_data.push({...ship, Countries:["ER"], Name:"Eritrea"});
					new_ship_data.push({...ship, Countries:["SL"], Name:"Sierra Leone"});
					new_ship_data.push({...ship, Countries:["TG"], Name:"Togo"});
					new_ship_data.push({...ship, Countries:["LY"], Name:"Libya"});
					new_ship_data.push({...ship, Countries:["CF"], Name:"Central African Republic (the)"});
					new_ship_data.push({...ship, Countries:["MR"], Name:"Mauritania"});
					new_ship_data.push({...ship, Countries:["LR"], Name:"Liberia"});
					new_ship_data.push({...ship, Countries:["NA"], Name:"Namibia"});
					new_ship_data.push({...ship, Countries:["BW"], Name:"Botswana"});
					new_ship_data.push({...ship, Countries:["LS"], Name:"Lesotho"});
					new_ship_data.push({...ship, Countries:["GM"], Name:"Gambia (the)"});
					new_ship_data.push({...ship, Countries:["GA"], Name:"Gabon"});
					new_ship_data.push({...ship, Countries:["GW"], Name:"Guinea-Bissau"});
					new_ship_data.push({...ship, Countries:["MU"], Name:"Mauritius"});
					new_ship_data.push({...ship, Countries:["GQ"], Name:"Equatorial Guinea"});
					new_ship_data.push({...ship, Countries:["SZ"], Name:"Eswatini"});
					new_ship_data.push({...ship, Countries:["DJ"], Name:"Djibouti"});
					new_ship_data.push({...ship, Countries:["RE"], Name:"Réunion"});
					new_ship_data.push({...ship, Countries:["KM"], Name:"Comoros (the)"});
					new_ship_data.push({...ship, Countries:["EH"], Name:"Western Sahara"});
					new_ship_data.push({...ship, Countries:["CV"], Name:"Cabo Verde"});
					new_ship_data.push({...ship, Countries:["YT"], Name:"Mayotte"});
					new_ship_data.push({...ship, Countries:["ST"], Name:"Sao Tome and Principe"});
					new_ship_data.push({...ship, Countries:["SC"], Name:"Seychelles"});
					new_ship_data.push({...ship, Countries:["SH"], Name:"Saint Helena, Ascension and Tristan da Cunha"});
					new_ship_data.push({...ship, Countries:["AC"], Name:"Ascension Island"});
					new_ship_data.push({...ship, Countries:["TA"], Name:"Tristan da Cunha"});
				}
				else
				{


					var singleName = str.substring(0, str.lastIndexOf("/") + 1);
					if (singleName) {
						ship.Name[key] = singleName;
						
						var singleNameWithoutSlash = singleName.replace(/\//g, '');

						var last = str.substring(str.lastIndexOf("/") + 1, str.length);
						console.log(' First Country '+ first_country);
						console.log(' Last Country '+ last_country);

						new_ship_data.push({...ship, Name:singleNameWithoutSlash});
						new_ship_data.push({...ship, Name:last});
						
					} else {
						new_ship_data.push(ship);
					}

				}

				// console.log(' each Rates After Replace', ship.Name );
			});
			console.log("After Split Ships ", new_ship_data);

			tokenResponse.data.ship.Rates = new_ship_data;

			$scope.drop = tokenResponse.data.drop;
			$scope.ship = tokenResponse.data.ship;
			$scope.subTotal = $scope.drop.Price;
			$scope.currency = $scope.drop.Currency;
			console.log($scope.drop.Images, "Images");
		}, function(tokenError) {
			console.log(tokenError, "Token Error Response")
		})

		Frames.addEventHandler(
			Frames.Events.CARD_VALIDATION_CHANGED,
			function (event) {
				console.log(' CARD_VALIDATION_CHANGED ', event); 
				
				if (event.isValid === true) {	
					document.getElementById("card-frame").style.borderColor = "#21cb21";
					document.getElementById("card-error").innerText = null;			
				} else if (event.isValid === false) {
					document.getElementById("card-frame").style.borderColor = "#ccc";
					document.getElementById("card-error").innerText = "Wrong data!";
				}

				$scope.isCardValid = Frames.isCardValid();

				$scope.changeCheckoutColor();
			}
		);

		Frames.addEventHandler(
			Frames.Events.CARD_TOKENIZED,
			function (event) {
				console.log(' CARD_TOKENIZED '); 
				$scope.cardToken = event.token;
			}
		);

		$scope.checkoutHandle = function() {
			console.log(' checkoutHandle '); 
			event.preventDefault();
			
			if(!$scope.selectedVariant) {
				alert('Please select a variant');
				return;
			}

			if(!$scope.firstName) {
				alert('Please enter a first name');
				return;
			}

			if(!$scope.lastName) {
				alert('Please enter a last name');
				return;
			}

			if(!$scope.address1) {
				alert('Please enter a address1');
				return;
			}

			if(!$scope.city) {
				alert('Please enter a city');
				return;
			}

			if(!$scope.country) {
				alert('Please enter a country');
				return;
			}

			if(!$scope.phoneNo) {
				alert('Please enter a phone number');
				return;
			}
			

			if(!$scope.isCardValid) {
				alert('Please enter Credit Card information');
				return;
			}


			

			// return false; 

			$scope.cardToken = "";

			var _pipe = new Promise(function(resolve) { resolve(true) });


			_pipe = _pipe.then(function() {
				return new Promise(function(resolve, reject) {
					Frames.submitCard().then(function(response) {

						console.log(' Frames.submitCard ', response); 

//bin: "424242"
// card_category: "Consumer"
// card_type: "Credit"
// expires_on: "2021-01-07T14:40:54Z"
// expiry_month: 2
// expiry_year: 2021
// issuer: "JPMORGAN CHASE BANK NA"
// issuer_country: "US"
// last4: "4242"
// product_id: "A"
// product_type: "Visa Traditional"
// scheme: "Visa"
// token: "tok_on53mqxyiqjexfdqewkllw4gwi"
// type: "card"

						if(response.hasOwnProperty("token")) {
							$scope.cardToken = response.token;
							return resolve(response);
						}
						return reject(response);
					})
				})
			});

/*{
"token": "5fa7af4c4485039299901953153d6dc5bb9b2dadc0d3363edcc4f35c063c5194",
"variant": "US 9",
"shipping": {
"firstName": "Leighton",
"lastName": "Ige",
"address1": "Address string 1",
"city": "Hong Kong",
"country": "HK",
"phone": "12345678"
},
"cardToken": "tok_5tvi7wbkxocurh7ghu3yetzzzm"
}*/

			//Processed to Enter
			_pipe = _pipe.then(function() {
				$http.post(DROP_ENTER_URL, JSON.stringify({
					'cardToken': $scope.cardToken,
					'token': token,
					'variant': $scope.selectedVariant,
					'shipping': {
						'firstName': $scope.firstName,
						'lastName': $scope.lastName,
						'address1': $scope.address1,
						'address2': $scope.address2,
						'additonalAddress': $scope.additonalAddress,
						'city': $scope.city,
						'state': $scope.state,
						'postalCode': $scope.postalCode,
						'country': $scope.country,
						'phone': $scope.phoneNo
					},
					'billing': {
						'firstName': $scope.firstNameDiff,
						'lastName': $scope.lastNameDiff,
						'address1': $scope.address1Diff,
						'address2': $scope.address2Diff,
						'additionaladdressDiff': $scope.additionaladdressDiff,
						'city': $scope.cityDiff,
						'stateDiff': $scope.stateDiff,
						'postalCodeDiff': $scope.postalCodeDiff,
						'country': $scope.countryDiff,
						'phone': $scope.phoneNoDiff,
					}
				}), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(enterResponse) {
					console.log(' pipe_ enterResponse', enterResponse);
					console.log(enterResponse.data, "enterResponse");
				}, function(error) {
					console.log(error, "Order Error Response")
				})
			})

		}

		$scope.handleVariantSelect = function(event) {
			//console.log($scope.selectedVariant);
			console.log(' handleVariantSelect ', event, $scope.selectedVariant );
			console.log(' drop.Variants ', $scope.drop.Variants );

			angular.forEach($scope.drop.Variants, function(varient, key) {
				console.log(' each ', key, varient );
				if ( varient.Title == $scope.selectedVariant ){
					$scope.subTotal = varient.Price; 
				}
			});

			$scope.changeCheckoutColor();

			/*// $scope.drop.Variants.each(function(ind, elem){
			// 	console.log(' each ', ind, elem );
			// });


			$scope.selectedVariant = variant.Title;
			// console.log("Title is " + $scope.selectedVariant);
			$scope.subTotal = variant.Price; */
		}


		$scope.handleDeliverySelect = function(event) {
			console.log(' handleDeliverySelect ', event, $scope.selectedShipping );

			angular.forEach($scope.ship.Rates, function(ship, key) {
				console.log(' each ', key, ship );
				if ( ship.Name == $scope.selectedShipping ){
				$scope.country = $scope.selectedShipping;
				
				console.log(ship.Name );
					$scope.deliveryPrice = ship.Price; 
				}
			});

			$scope.changeCheckoutColor();

		}


		$scope.toggleDiffAddress = function(shipStatus) {
			$scope.diffshippingAddress = shipStatus;

			if ($scope.diffshippingAddress) {
				$scope.billingAddress = "Use a different billing Address";

				$scope.changeCheckoutColor();
			}else {
				$scope.billingAddress = "Same as Shiping Address";

				$scope.changeCheckoutColor();
				
			}
		}

		$scope.changePaymentType = function(event) {

			if (event.target.value == "credit-debit" ) {
				$scope.paymentType = 'Credit / Debit Card';
			} else if (event.target.value == "paypal" )	{
				$scope.paymentType = "Paypal";
			} 

			$scope.changeCheckoutColor();
		}


		$scope.changeCheckoutColor = function() {
			document.getElementById("checkoutButton").style.background='#efefef';

			if (!$scope.diffshippingAddress ) {

				if ( $scope.selectedVariant && $scope.firstName && $scope.lastName && $scope.address1 && $scope.city && $scope.country && $scope.phoneNo && $scope.isCardValid ) {
					document.getElementById("checkoutButton").style.background='#FF0000';
				}
			}
			else if($scope.diffshippingAddress) {
				
				if ( $scope.selectedVariant && $scope.isCardValid && $scope.firstNameDiff && $scope.lastNameDiff && $scope.address1Diff && $scope.cityDiff && $scope.selectedShipping ) {
					document.getElementById("checkoutButton").style.background='#FF0000';
				}
			} 
		}

		
	});
	
	/*dropsApp.controller('dropController', function($scope, $http, $location) {
		$http({
			method: 'GET',
			url: DROPS_URL
		}).then(function(response) {
			
			$scope.currentTimestamp = new Date().getTime();
			$scope.drops = response.data.data;
			
			var currentSlug = $location.path().substr(1);
			$scope.drop = $scope.drops.find(function(drop) {
				dropSlug = generateSlug(drop.Name);
				return currentSlug === dropSlug;
			});
			var timerSeconds = 0;
			$scope.drop.url = "https://skycaptest-juice.myshopify.com/pages/drop-detail#!/" + generateSlug($scope.drop.Name);
			$scope.drop.yetToBegin = $scope.drop.Status === 1;
			$scope.drop.yetToEnd = $scope.drop.Status === 2;
			$scope.drop.isEnded = $scope.drop.Status >= 3;
			if($scope.drop.yetToBegin) {
				timerSeconds = Math.floor((($scope.drop.TimeStart*1000) - $scope.currentTimestamp)/1000);
			} else if($scope.drop.yetToEnd) {
				timerSeconds = Math.floor((($scope.drop.TimeEnd*1000) - $scope.currentTimestamp)/1000);
			} else {
				timerSeconds = 0;
			}
			if(timerSeconds < 0) timerSeconds = 0;
			var _timer = new Timer();
			_timer.start({
				countdown: true,
				startValues: {seconds: timerSeconds},
				callback: function (timer) {
					jQuery('.timer-'+ $scope.drop.ID).html(
							_timer.getTimeValues().toString(['days', 'hours', 'minutes', 'seconds'])
					);
				}
			});

		}, function(error) {});
		$scope.enterInDrop = function() {

			if(customerId) {
				$http.post(DROP_GET_TOKEN_URL, JSON.stringify({
						'id': customerId,
						'dropId': $scope.drop.ID
				}), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(tokenResponse) {
					console.log(tokenResponse, "Token Response")
				}, function(tokenError) {
					console.log(tokenError, "Token Error Response")
				})
			} else {
				alert('Please login to roll in');
			}

		}
	});*/


	


	
})()