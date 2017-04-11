(function(window, google, mapster){
  /* // //  RESOURCES  //  //
  Plunker: http://plnkr.co/edit/ZbovjXug7hca0FaYb1xC?p=preview
  Google Maps JavaScript API Reference: https://developers.google.com/maps/documentation/javascript/reference
  Google Maps API Key: https://console.cloud.google.com/apis/credentials?project=my-project-1490999289829
  Golf Icons: https://mapicons.mapsmarker.com/markers/sports/ball-sports/golf/
  Dropbox Icons: https://www.dropbox.com/home/Dev/APIs/Google/Maps/Icons
  jQuery UI Widget Factory: http://jqueryui.com/widget/
  GPS Visualizer: http://www.gpsvisualizer.com/geocode
  HTML Color Codes: http://html-color-codes.info/
  */
  //<a href='http://www.freepik.com/free-vector/location-icons-set_968410.htm'>Designed by Freepik</a>
  
  // map options
  var options = mapster.MAP_OPTIONS,
  element = document.getElementById('map-canvas'),
  // map
  map = mapster.create(element, options);
  map.zoom(18); //getter and setter custom function through Mapster lib
  
  var picWhiteFlag = 'https://www.dropbox.com/s/gq2arlfca4kcaoj/whiteflag.png?dl=1';
  
  //Clubhouse
  var clubhouse = map.addMarker({
	id: 'mrkrClub',
	title: 'Clubhouse',
    lat: 43.270473295717174,
	lng: -70.90466251349181,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/tutmj3cr378igbm/tree1.png?dl=1',
    event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });

/*
  var clubCoords = [
  {lat: 43.27062803621201, lng: -70.90567320585251},
  {lat: 43.270803804283815, lng: -70.90456277132034},
  {lat: 43.27038586603716, lng: -70.90443670749664},
  {lat: 43.27027649854556, lng: -70.90582072734833}
  ];

  var clubShape = new google.maps.Polygon({
	id: 'clubShape',
	paths: clubCoords,
	strokeColor: '#F00',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#F00',
    fillOpacity: 0.95,
});

clubShape.setMap(map.gMap);
*/

  //Hole 1
  var mrkr1T = map.addMarker({
	id: 'tee1',
	title: 'Hole #1 Tee Box',
    lat: 43.269913762553834,
    lng: -70.90511446571082,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
  var mrkr1Flag = map.addMarker({
	id: 'flag1',
	title: 'Hole #1 Pin',
	lat: 43.267518810416284,
	lng: -70.90358376502991,
	icon: 'https://www.dropbox.com/s/gq2arlfca4kcaoj/whiteflag.png?dl=1'
  });
  //


var Green1Coords = [
{lat: 43.26754322392589, lng: -70.90377688407898},
{lat: 43.26751392771319, lng: -70.90377688407898},
{lat: 43.267479748780524, lng: -70.90376615524292},
{lat: 43.26745728832861, lng: -70.9037446975708},
{lat: 43.267439710577854, lng: -70.90371116995811},
{lat: 43.26743287478452, lng: -70.90368032455444},
{lat: 43.26743385132646, lng: -70.90365216135979},
{lat: 43.26742017973771, lng: -70.9036186337471},
{lat: 43.267404555061084, lng: -70.90359181165695},
{lat: 43.26738990692314, lng: -70.90356230735779},
{lat: 43.267379164953056, lng: -70.90353950858116},
{lat: 43.267374282238734, lng: -70.90350866317749},
{lat: 43.26737721186737, lng: -70.90346708893776},
{lat: 43.267398695806335, lng: -70.90342283248901},
{lat: 43.26743775749411, lng: -70.90338930487633},
{lat: 43.26748267840407, lng: -70.90340003371239},
{lat: 43.267500256142434, lng: -70.90341344475746},
{lat: 43.26753150544252, lng: -70.90346172451973},
{lat: 43.26755689548701, lng: -70.9035287797451},
{lat: 43.267566660885926, lng: -70.90356767177582},
{lat: 43.26757837936257, lng: -70.90360656380653},
{lat: 43.26759595707329, lng: -70.90363472700119},
{lat: 43.26760572246592, lng: -70.90368300676346},
{lat: 43.26759595707329, lng: -70.90371653437614},
{lat: 43.26758228552095, lng: -70.90374603867531},
{lat: 43.26754322392589, lng: -70.90377688407898}
];

var Green1Shape = new google.maps.Polygon({
	paths: Green1Coords,
	strokeColor: '#088A08',
    strokeOpacity: 0.3,
    strokeWeight: 3,
    fillColor: '#088A08',
    fillOpacity: 0.15,
});

Green1Shape.setMap(map.gMap);

Green1Shape.addListener('mouseover', function() {

	Green1Shape.setOptions({
		strokeColor: '#04B404',
		strokeOpacity: 0.7,
		fillColor: '#04B404',
		fillOpacity: .35
	});

});

Green1Shape.addListener('mouseout', function() {

	Green1Shape.setOptions({
	strokeColor: '#088A08',
    strokeOpacity: 0.3,
    fillColor: '#088A08',
    fillOpacity: 0.15,
	});

});
   //Hole 2
  var mrkr2T = map.addMarker({
	id: 'tee2',
	title: 'Hole #2 Tee Box',
    lat: 43.267656047693514,
	lng: -70.90286141013951,
    draggable: true,
    visible: true,
    icon: '',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
  var mrkr2Flag = map.addMarker({
	id: 'flag2',
	title: 'Hole #2 Pin',
	lat: 43.26569655841709,
	lng: -70.9013307094574,
	icon: 'whiteflag.png'
  });
  
  //Hole 3
    var mrkr3T = map.addMarker({
	id: 'tee3',
	title: 'Hole #3 Tee Box',
    lat: 43.26682793751504,
	lng: -70.90170269584507,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr3Flag = map.addMarker({
	id: 'flag3',
	title: 'Hole #3 Pin',
	lat: 43.268419174172784,
	lng: -70.90163379907608,
	icon: 'whiteflag.png'
  });
  
  //Hole 4
    var mrkr4T = map.addMarker({
	id: 'tee4',
	title: 'Hole #4 Tee Box',
    lat: 43.26847776571275,
	lng: -70.90284079313278,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr4Flag = map.addMarker({
	id: 'flag4',
	title: 'Hole #4 Pin',
	lat: 43.271674825238044,
	lng: -70.89855194091797,
	icon: 'whiteflag.png'
  });
 
  //Hole 5
    var mrkr5T = map.addMarker({
	id: 'tee5',
	title: 'Hole #5 Tee Box',
    lat: 43.27235444727988,
	lng: -70.89866995811462,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr5Flag = map.addMarker({
	id: 'flag5',
	title: 'Hole #5 Pin',
	lat: 43.27339339504246,
	lng: -70.90027391910553,
	icon: 'whiteflag.png'
  });

  //Hole 6
    var mrkr6T = map.addMarker({
	id: 'tee6',
	title: 'Hole #6 Tee Box',
    lat: 43.27357501378869,
	lng: -70.8993673324585,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr6Flag = map.addMarker({
	id: 'flag6',
	title: 'Hole #6 Pin',
	lat: 43.27644764251472,
	lng: -70.90127170085907,
	icon: 'whiteflag.png'
  });
  
  //Hole 7
    var mrkr7T = map.addMarker({
	id: 'tee7',
	title: 'Hole #7 Tee Box',
    lat: 43.27663120493458,
	lng: -70.90312778949738,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr7Flag = map.addMarker({
	id: 'flag7',
	title: 'Hole #7 Pin',
	lat: 43.27367461093553,
	lng: -70.90169548988342,
	icon: 'whiteflag.png'
  });
  
  //Hole 8
    var mrkr8T = map.addMarker({
	id: 'tee8',
	title: 'Hole #8 Tee Box',
    lat: 43.27345198179401,
	lng: -70.90233117341995,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr8Flag = map.addMarker({
	id: 'flag8',
	title: 'Hole #8 Pin',
	lat: 43.27200291958508,
	lng: -70.8990266919136,
	icon: 'whiteflag.png'
  });
  
  //Hole 9
    var mrkr9T = map.addMarker({
	id: 'tee9',
	title: 'Hole #9 Tee Box',
    lat: 43.27160842497641,
	lng: -70.90027928352356,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr9Flag = map.addMarker({
	id: 'flag9',
	title: 'Hole #9 Pin',
	lat: 43.26979215443483,
	lng: -70.90353548526764,
	icon: 'whiteflag.png'
  });
  
  //Hole 10
    var mrkr10T = map.addMarker({
	id: 'tee10',
	title: 'Hole #10 Tee Box',
    lat: 43.2702725925601,
	lng: -70.90425968170166,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr10Flag = map.addMarker({
	id: 'flag10',
	title: 'Hole #10 Pin',
	lat: 43.272268518475315,
	lng: -70.90156942605972,
	icon: 'whiteflag.png'
  });
  
  //Hole 11
    var mrkr11T = map.addMarker({
	id: 'tee11',
	title: 'Hole #11 Tee Box',
    lat: 43.27251849284261,
	lng: -70.90220779180527,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr11Flag = map.addMarker({
	id: 'flag11',
	title: 'Hole #11 Pin',
	lat: 43.27590085755723,
	lng: -70.90496242046356,
	icon: 'whiteflag.png'
  });
  
  //Hole 12
    var mrkr12T = map.addMarker({
	id: 'tee12',
	title: 'Hole #12 Tee Box',
    lat: 43.276184014666434,
	lng: -70.9054908156395,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr12Flag = map.addMarker({
	id: 'flag12',
	title: 'Hole #12 Pin',
	lat: 43.27866988224291,
	lng: -70.90494096279144,
	icon: 'whiteflag.png'
  });
  
  //Hole 13
    var mrkr13T = map.addMarker({
	id: 'tee13',
	title: 'Hole #13 Tee Box',
    lat: 43.27898426988676,
	lng: -70.90387344360352,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr13Flag = map.addMarker({
	id: 'flag13',
	title: 'Hole #13 Pin',
	lat: 43.27906823649814,
	lng: -70.90542912483215,
	icon: 'whiteflag.png'
  });
  //Hole 14
    var mrkr14T = map.addMarker({
	id: 'tee14',
	title: 'Hole #14 Tee Box',
    lat: 43.27811140080761,
	lng: -70.90630352497101,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr14Flag = map.addMarker({
	id: 'flag14',
	title: 'Hole #14 Pin',
	lat: 43.27527595444685,
	lng: -70.90770900249481,
	icon: 'whiteflag.png'
  });
  //Hole 15
    var mrkr15T = map.addMarker({
	id: 'tee15',
	title: 'Hole #15 Tee Box',
    lat: 43.27535406768659,
	lng: -70.90852975845337,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr15Flag = map.addMarker({
	id: 'flag15',
	title: 'Hole #15 Pin',
	lat: 43.27290126410268,
	lng: -70.90930223464966,
	icon: 'whiteflag.png'
  });
  //Hole 16
    var mrkr16T = map.addMarker({
	id: 'tee16',
	title: 'Hole #16 Tee Box',
    lat: 43.27274893705286,
	lng: -70.9088422358036,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr16Flag = map.addMarker({
	id: 'flag16',
	title: 'Hole #16 Pin',
	lat: 43.273895286386114,
	lng: -70.9080496430397,
	icon: 'whiteflag.png'
  });  
  //Hole 17
    var mrkr17T = map.addMarker({
	id: 'tee17',
	title: 'Hole #17 Tee Box',
    lat: 43.27374296182436,
	lng: -70.90681046247482,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
    var mrkr17Flag = map.addMarker({
	id: 'flag17',
	title: 'Hole #17 Pin',
	lat: 43.27685772800855,
	lng: -70.90631425380707,
	icon: 'whiteflag.png'
  });    
  //Hole 18
    var mrkr18T = map.addMarker({
	id: 'tee18',
	title: 'Hole #18 Tee Box',
    lat: 43.27569971756893,
	lng: -70.9054733812809,
    draggable: true,
    visible: true,
    icon: 'https://www.dropbox.com/s/mdy5bxsqahwm0pk/swing1.png?dl=1',
	event: {
      name: 'dragend',
      callback: function(e){
        window.prompt("Do you want to copy the new location coordinates?",e.latLng.toString());
      }
    }
  });
  var mrkr18Flag = map.addMarker({
	id: 'flag18',
	title: 'Hole #18 Pin',
	lat: 43.27143656513934,
	lng: -70.90402901172638,
	icon: 'whiteflag.png'
  });    
  /*Simple event listener
	// - alerts on dblclick, logs the event in the console.
	google.maps.event.addListener(map.gMap, 'dblclick', function(e) {
	  alert('dblclick');
	  console.log(e);
  });//end event listener example*/
  
  //Right click event listener
  google.maps.event.addListener(map.gMap, 'rightclick', function(e){
	//alert('right'); //for testing purposes
	//display an info window with the lat and lng at the top
	var inner,
		mylat,
		mylng,
		iWin,
		winMrkr;
		
	console.log(e);
	
	mylat = e.latLng.lat();
	mylng = e.latLng.lng();
	
	console.log(mylat);
	
	inner = "<div id='rClickWin'>Lat: " + mylat + "</br>"
	inner += "Lng: " + mylng + "</div>"
	
	iWin = new google.maps.InfoWindow({
		content: inner
	});
	
	var i = 0;
	
	winMrkr = map.addMarker({
		id: 'winMrkr' + i + 0,
		lat: mylat,
		lng: mylng
	});
	
	google.maps.event.addListener(iWin, 'closeclick', function() {
		winMrkr.visible = false;
		winMrkr.setMap(null);
		List.remove(winMrkr);
	});
	
	iWin.open(map.gMap, winMrkr);
	
  });
  
  
}(window, window.google, window.Mapster || (window.Mapster = {})));