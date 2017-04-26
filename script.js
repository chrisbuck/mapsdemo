(function(window, google){
// ---- MATH ---- //
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};


// ---- DEFINE THE MAP ---- //
//Constructor function
var MyMap = function(){
  function MyMap() {
    
  }
};
// ---- IMAGES ---- //
var golferImg = "/golfer.png";

// ---- MAP PROPERTIES ---- //

//element
MyMap.element = document.getElementById('map-canvas');
var mapEl = MyMap.element;

//options
MyMap.options = {
  center: {
    lat: 43.2706725,
    lng: -70.9046947
  },
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};
var mapOpts = MyMap.options;

// ---- CREATE THE MAP ---- //

//Factory function
MyMap.create = function() {
  return new google.maps.Map(mapEl, mapOpts);
};

//Map object
var gMap = MyMap.create();
var playerBool = false; //toggles the player img (for judging distances)
var recordBool = false; //toggles recording polygons
var lineBool = false; //allows drawing of lines
var polyDots = [];
var tempPolys = [];
var lines = [];
var playerWins = [];

//Map events
//player img (for judging distances)
gMap.addListener('dblclick', function(e){
    if (playerBool == false) {
        //zoom, center, and add the player img/obj
        var myLat = e.latLng.lat();
        var myLng = e.latLng.lng();
        var clickCent = {
            lat: myLat,
            lng: myLng
        };
        MyMap.addPlayer(clickCent);
        playerBool = true;
    } else {
        //move the playerImg to the new location
    }
});

//map rightclick (for creating polygons)
gMap.addListener('rightclick', function(e){
  if (recordBool === false) {
  //get the new position property
    var myLat = e.latLng.lat();
	  var myLng = e.latLng.lng();
	  var polyDot = {
	    lat: myLat,
        lng: myLng
	  };
	//add a dot to the array
	  //polyDots.push(polyDot);    //comment out to omit center dot in poly
	//center the map on the new dot center
	  gMap.setCenter(polyDot);
	//zoom to 24
	  gMap.setZoom(24);
  //for each item in the array, add a dot, and add a polygon
    Dots.addDot(polyDot);
  //add a listener for map clicks using a boolean, stop function in Dots.addDot
	  recordBool = true;
	  gMap.addListener('click', function(e){
	    if (recordBool === true) {
	      myLat = e.latLng.lat();
	      myLng = e.latLng.lng();
	      polyDot = {
	        lat: myLat,
          lng: myLng
	      };
	      //add a dot to the array
	      polyDots.push(polyDot);
	      
	      //for each
	      var i;
	      var dotCoords = [];
	      polyDots.forEach(function(dotArr){
	        var dotLat = dotArr.lat;
	        var dotLng = dotArr.lng;
	        var dotCoord = {
	          lat: dotLat,
	          lng: dotLng
	        };
	        dotCoords.push(dotCoord);
	        //alert(dotCoords);
	      });
	      i = dotCoords.length;
	      //checkTemp(dotCoords, i);
	      var cnt = tempPolys.length;
	      var polyItem;
	      if (tempPolys.length === 0) {
	        polyItem = Poly.addTemp(dotCoords, i);
	        tempPolys.push(polyItem);
	        //alert(tempPolys);
	      } else {
	        tempPolys[0].setMap(null);
          tempPolys.splice(0, 1);
          polyItem = Poly.addTemp(dotCoords, i);
          tempPolys.push(polyItem);
	      }
	    }
	  });
  }
  //for each item in the array, add a dragend listener function to modify the position of the coord
  //add a listener function to return the code for the new polygon
});
/*
gMap.addListener('rightclick', function(e){
	var myLat = e.latLng.lat();
	var myLng = e.latLng.lng();
	var polyDot = '{lat: ' + myLat + ', lng: ' + myLng + '}';
	polyDots.push(polyDot);
	var myLatLng = 'lat: ' + myLat + ',</br> lng: ' + myLng;
  var toolContent = '<div id="toolDivOuter">';
    toolContent += '<div id="toolDivInner">';
      toolContent += '<div id="toolDivTopRow">';
        toolContent += '<div id="toolDivHeader">';
          toolContent += '<h3>Developer Options</h3>';
          toolContent += myLatLng;
        toolContent += '</div>';
      toolContent += '</div>';
      toolContent += '<div id="toolDivMidRow"></br>';
        toolContent += '<img id="recordBtn" class="devBtn" onclick="record()" src="https://www.dropbox.com/s/s83pqbqh7217063/recordBtn.png?dl=1"></img>';
        toolContent += '<img id="stopBtn" class="devBtn" onclick="stopRecording()" src="https://www.dropbox.com/s/vj6siudfc9086fg/stopBtn.png?dl=1"></img>';
      toolContent += '</div>';
      toolContent += '<div id="toolDivBottomRow">';
      toolContent += '</div>';
    toolContent += '</div>';
  toolContent += '</div>';
  var toolWin = new google.maps.InfoWindow({
    id: 'toolWin',
    content: toolContent
  });
  toolWin.open(gMap, gMap);
  toolWin.setPosition(e.latLng);
  alert(polyDots);
  return toolWin;
});

// ---- TOOLBAR FUNCTIONS ---- //
var recording = false;
function record(){
  if (recording === false) {
    alert('Now recording. Click the next point in the polygon. Click on the last point to stop recording.');
    recording === true;
    gMap.addListener('click', function(e){
      var myLat = e.latLng.lat();
	    var myLng = e.latLng.lng();
	    var polyDot = 'lat: ' + myLat + ', lng: ' + myLng + ')';
	    Dots.push(polyDot);
	    Dots.addDot({polyDot});
	    //alert(e.getCenter());
    });
    //Dots.addDot();
  }
}
*/

// ---- OTHER OBJECTS ---- //

//Markers
var Mrkr = function(){
  function Mrkr(){
  }
};
    
//Circles
var Dots = function(){
	function Dots(){
	}
};

//Lines
var Line = function(){
  function Line(){
    
  }
};

//default options
Line.opts = {
    map: gMap,
    strokeOpacity: 0.25, 
    strokeWeight: 2,
    fillOpacity: 0.15,
    strokeColor: '#FFFFFF',
    fillColor: '#FFFFFF'
};

//line constructor
Line.show = function(e, anch, pWin){
    if(lineBool == true){
        var anchLat = anch.lat;
        var anchLng = anch.lng;
        var anchPos = {
            lat: anchLat,
            lng: anchLng
        };
        var endLat = e.latLng.lat();
        var endLng = e.latLng.lng();
        var endPos = {
            lat: endLat,
            lng: endLng
        };
        var lineArr = [];
        if(lineArr.length < 1){
            lineArr.push(anchPos);
            lineArr.push(endPos);
        } else if (lineArr.length == 2){
            lineArr.splice(1, 1);
            lineArr.push(endPos);
        }
        this.opts.id = 'distanceLine';
        this.opts.paths = lineArr;

        var newLine = new google.maps.Polygon(this.opts);
        
        newLine.addListener('click', function(){
            lineBool = false;
        });
        if (lines.length == 0) {
            lines.push(newLine);
        } else if (lines.length > 0) {
            var oldLine = lines.pop();
            oldLine.setMap(null);
            lines.push(newLine);
        }
        
        //distance mrkr
        var distArr = [];
        var dist = getDistance(anchPos, endPos);
        dist = (dist * 1.09361);
        distStr = Math.round(dist) + ' yards';
        console.log(distStr);
        var distSpan = document.getElementById('distanceSpan');
        distSpan.innerHTML = distStr;
        return distSpan;

        /*
        var distArr = [];
        if (distArr.length == 0) {
            distArr.push(distanceDiv);
            var divObj = distArr[0];
            divObj.innerText = dist + ' yards';
            var divHTML = divObj.outerHTML;
            xMap.insertAdjacentHTML('beforeBegin', divHTML);
            return divObj;
        } else if(distArr.length > 0){
            var oldDiv = distArr.pop();
            var oldEl = document.getElementById('distanceMeter');
            distArr.push(oldDiv);
            var nextObj = distArr[0];
            nextObj.innerText = dist + ' yards';
            var nextHTML = nextObj.outerHTML;
            document.removeChild(oldEl);
            xMap.insertAdjacentHTML('beforeBegin', nextHTML);
            return nextObj;
        }
        */
        return newLine;
    }
};

//InfoWindows
var IWin = function(){
  function IWin(){
  }
};

IWin.attach = function(obj, eventType, cont){
  var infoWindow = new google.maps.InfoWindow({content: cont});
  obj.addListener(eventType, function(){
    infoWindow.open(gMap, obj);
      //infoWindow.setPosition(obj.center);
    });
    return infoWindow;
};

//Toolbar
var Toolbar = function(){
  function Toolbar(){
    
  }
};


//Polygons

//color options
var blueTee = '#08088A';
var blackTee = '#000000';
var whiteTee = '#FFFFFF';
var goldTee = '#DBA901';
var jrTee = '#21610B';
var greenColor = '#31B404';
var bunkerColor = '#F6E3CE';
var bunkerBorder = '#36220d';

//Poly object (empty constructor)
var Poly = function(){
  function Poly(){
    
  }
};

//Default options
Poly.opts = {
  map: gMap,
  strokeOpacity: 0.25,
  strokeWeight: 2,
  fillOpacity: 0.15
};

//Blue polyogons
Poly.addBlue = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = blueTee;
  this.opts.fillColor = blueTee;
    
    var blueMrkr = new google.maps.Polygon(this.opts);
    blueMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    blueMrkr.addListener('mouseover', function(){
        this.setOptions({fillColor: "#0000f2"});
        this.setOptions({fillOpacity: 0.3});
    });
    blueMrkr.addListener('mouseout', function(){
        this.setOptions({fillColor: "#08088A"});
        this.setOptions({fillOpacity: 0.15});
    });

    return blueMrkr;

};

//White polygons
Poly.addWhite = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = whiteTee;
  this.opts.fillColor = whiteTee;
  
    var whiteMrkr = new google.maps.Polygon(this.opts);
    whiteMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    whiteMrkr.addListener('mouseover', function(){
        this.setOptions({fillOpacity: 0.3});
    });
    whiteMrkr.addListener('mouseout', function(){
        this.setOptions({fillOpacity: 0.15});
    });

    return whiteMrkr;
  
};

//Black polygons
Poly.addBlack = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = blackTee;
  this.opts.fillColor = blackTee;
  
    var blackMrkr = new google.maps.Polygon(this.opts);
    blackMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    blackMrkr.addListener('mouseover', function(){
        this.setOptions({fillOpacity: 0.3});
    });
    blackMrkr.addListener('mouseout', function(){
        this.setOptions({fillOpacity: 0.15});
    });

    return blackMrkr;
  
};

//Gold polygons
Poly.addGold = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = goldTee;
  this.opts.fillColor = goldTee;
  
    var goldMrkr = new google.maps.Polygon(this.opts);
    goldMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    goldMrkr.addListener('mouseover', function(){
        this.setOptions({fillOpacity: 0.3});
    });
    goldMrkr.addListener('mouseout', function(){
        this.setOptions({fillOpacity: 0.15});
    });

    return goldMrkr;
  
};

//Green tee (juniors) polygons
Poly.addJr = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = jrTee;
  this.opts.fillColor = jrTee;
  
    var jrMrkr = new google.maps.Polygon(this.opts);
    jrMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    jrMrkr.addListener('mouseover', function(){
        this.setOptions({fillColor: '#2e9d08'});
        this.setOptions({fillOpacity: 0.3});
    });
    jrMrkr.addListener('mouseout', function(){
        this.setOptions({fillColor: '#21610B'});
        this.setOptions({fillOpacity: 0.15});
    });

    return jrMrkr;
  
};

//Greens polygons
Poly.addGreen = function(coords, mycap){
var obj = this;
    //obj.opts.title = mycap;
  obj.opts.paths = coords;
  obj.opts.strokeColor = greenColor;
  obj.opts.fillColor = greenColor;

    var greenMrkr = new google.maps.Polygon(this.opts);
    greenMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    greenMrkr.addListener('mouseover', function(){
        this.setOptions({fillColor: "#00FF00"});
    });
    greenMrkr.addListener('mouseout', function(){
        this.setOptions({fillColor: "#31B404"});
    });

    return greenMrkr;
  
};


Poly.addBunker = function(coords) {
    this.opts.paths = coords;
    this.opts.strokeColor = bunkerBorder;
    this.opts.fillColor = bunkerColor;
    
    var bunkerMrkr = new google.maps.Polygon(this.opts);
    bunkerMrkr.addListener('rightclick', function(e){
        alert(e.latLng.lat() + ', ' + e.latLng.lng());
    });
    bunkerMrkr.addListener('mouseover', function(){
        this.setOptions({fillOpacity: 0.5});
    });
    bunkerMrkr.addListener('mouseout', function(){
        this.setOptions({fillOpacity: 0.15});
    });

    return bunkerMrkr;
};

Poly.addTemp = function(coords, cnt){
  var newId = 'myPoly' + cnt;
  this.opts.id = newId;
  this.opts.class = 'tempPolys';
  this.opts.paths = coords;
  this.opts.strokeColor = whiteTee;
  this.opts.fillColor = whiteTee;
  this.opts.editable = true;
  return new google.maps.Polygon(this.opts);
};

// ---- METHODS ---- //

//Add Marker
MyMap.addMarker = function(myLat, myLng, myTitle, myId){
  var markerOpts = {
    id: myId,
    title: myTitle,
    position: {
      lat: myLat,
      lng: myLng
    },
    map: gMap //gMap recreates the map (necessary) upon adding a marker
  };
  var newMarker = new google.maps.Marker(markerOpts);
  return newMarker;
};

MyMap.teeMarker = function(myLat, myLng, myImg, myTitle, myId) {
    var markerOpts = {
    id: myId,
    title: myTitle,
    position: {
      lat: myLat,
      lng: myLng
    },
    draggable: true,
    opacity: 0.3,
    map: gMap //gMap recreates the map (necessary) upon adding a marker
  };
  var newMarker = new google.maps.Marker(markerOpts);
    newMarker.setIcon(myImg);
    google.maps.event.addListener(newMarker,"mouseover",function(){
        this.setOptions({opacity: 0.8});
    });
    google.maps.event.addListener(newMarker,"mouseout",function(){
        this.setOptions({opacity: 0.3});
    });
  return newMarker;
};

//Function to edit marker options (with form) - use teeMarker first
//Function to add a dynamic arrow to the player marker
/*function dynaLine(e, mrkr){
    
}*/
//Function to add the player marker
MyMap.addPlayer = function(cent){
    if (lineBool == false) {
        var markerOpts = {
        id: 'playerMarker',
        title: 'Current Location',
        position: cent,
        draggable: true,
        opacity: 0.75,
        map: gMap //gMap recreates the map (necessary) upon adding a marker
        };
        playerMarker = new google.maps.Marker(markerOpts);
        playerMarker.setAnimation(google.maps.Animation.DROP);
        playerMarker.setIcon(golferImg);
        var newPos = cent;
        gMap.setCenter(newPos);
        gMap.setZoom(24);

        playerMarker.addListener('dragend', function(e){
            var cLat = e.latLng.lat();
            var cLng = e.latLng.lng();
            var newCent = {
                lat: cLat,
                lng: cLng
            };
            cent = newCent;
            gMap.setCenter(cent);
            gMap.setZoom(24);
            var oldLine = lines.pop();
            oldLine.setMap(null);
        });
        playerMarker.addListener('click', function(){
            if (lineBool == false) {
                //boolean:true allows the line and distance functions to execute
                lineBool = true;
                var winContent = '<strong>Distance:</strong> &nbsp; <span id="distanceSpan"></span>';
                var defaults = {
                    id: 'playerWin',
                    content: winContent
                };
                var playerWin = new google.maps.InfoWindow(defaults);
                playerWins.push(playerWin);
                playerWin.open(gMap, playerMarker);

                playerWin.addListener('closeclick', function(){
                    //set line bool to false, and remove any existing lines
                    lineBool = false;
                    var distLine = lines.pop();
                    distLine.setMap(null);
                });

                gMap.addListener('click', function(){
                    lineBool = false;
                    playerWin.setMap(null);
                });
                if(lineBool == true){
                    gMap.addListener('mousemove', function(e){
                       Line.show(e, cent, playerWin);
                    });
                }
            }
        });

    }
        return playerMarker;
};

var newCoords = [];
var dotBool = false;
Dots.addDot = function(polyDot){
  //var myCenter = gMap.getCenter();
  //var dotCenter = 'lat: ' + e.latLng() + ', lng: ' + e.latLng.lng();
  //alert (polyDot);
  var dotOpts = {
    strokeColor: '#FFFFFF',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#FFFFFF',
    fillOpacity: 0.8,
    draggable: true,
    map: gMap,
    center: polyDot,
    zIndex: 4,
    radius: 1
  };
    //Add a new circle
    var newDot = new google.maps.Circle(dotOpts);
    //Click event
    newDot.addListener('click', function() {
        recordBool = false; //Prevent new points being added to the polygon.
        alert('No new points will be added to the polygon.');
    });
    //Rightclick event
    newDot.addListener('rightclick', function() {
	var myPaths = tempPolys[0].getPaths();
	myPaths = myPaths.getArray();
	myPaths = myPaths[0];
	myPaths = myPaths.getArray();
      //Info window to display marker options
    
    /*
    var mrkrContent;
    mrkrContent = '<h3>Select a marker:</h3>';
    mrkrContent += '<div id="selectMarker">';
    mrkrContent += '<div class="imgSelect" id="blackGolfer">';
    mrkrContent += '<img src="/blackGolfer.png"></img>';
    mrkrContent += '<img src="/blueGolfer.png"></img>';
    mrkrContent += '</div>';
    mrkrContent +='</div>';
    */

    var centContent = this.center;
    var pathsContent = '';
    
  
	var i;
	var pLen = myPaths.length;
	
	for (i = 0; i < pLen; i++) {
	  var pLat = myPaths[i].lat();
	  var pLng = myPaths[i].lng();
	  pathsContent += '{lat: ' + pLat + ', ';
	  if (i === (pLen - 1)){
	    pathsContent += 'lng: ' + pLng + '}';
	  } else {
	    pathsContent += 'lng: ' + pLng + '},</br>';
	  }
	}
    
    //var winContent = pathsContent + mrkrContent;
    var winContent = '<h3>Geometry:</h3>';
        winContent += '<h4>Center:</h4>';
        winContent += centContent;
        winContent += '<h4>Coordinates:</h4>';
        winContent += pathsContent;
	
	var pathsWin = new google.maps.InfoWindow({content: winContent});
	var winPos = newDot.center;
	pathsWin.open(gMap, gMap);
  pathsWin.setPosition(winPos);
  
  pathsWin.addListener('closeclick', function(){
    newDot.setMap(null);
    tempPolys[0].setMap(null);
    recordBool = false;
  });
  });
};


// ---- MARKERS ---- //
// draw the shapes //

var clubMarker = MyMap.addMarker(43.270438141949775, -70.90466251349028, 'Clubhouse', 'mrkrClub');
MyMap.teeMarker(43.26999526695053, -70.90519845485687, '/bluegolfer.png', 'Hole 1 Blue Tee');
MyMap.teeMarker(43.26988199274653, -70.90506434440613, '/whitegolfer.png', 'Hole 1 White Tee');
MyMap.teeMarker(43.27013588291049, -70.90537548065186, '/blackgolfer.png', 'Hole 1 Black Tee');
MyMap.teeMarker(43.26967497382899, -70.90474784374237, '/goldgolfer.png', 'Hole 1 Gold Tee');
MyMap.teeMarker(43.26960857138553, -70.90468883514404, '/jrgolfer.png', 'Hole 1 Jr Tee');
//IWin.attach(clubMarker, 'click', 'Clubhouse');

// ---- POLYGONS ---- //
// draw the shapes //

var putCoords = [
{lat: 43.27016960558055, lng: -70.90500717735024},
{lat: 43.270188159040565, lng: -70.90500315403648},
{lat: 43.270196947519224, lng: -70.90499644851383},
{lat: 43.27020378300189, lng: -70.90498840188673},
{lat: 43.270211594981355, lng: -70.90496157979663},
{lat: 43.270219406960216, lng: -70.90493073439325},
{lat: 43.2702272189377, lng: -70.90489988898946},
{lat: 43.27023210142308, lng: -70.90487574910816},
{lat: 43.27023210142308, lng: -70.90485831474956},
{lat: 43.270230148428986, lng: -70.90483551597299},
{lat: 43.270226242440486, lng: -70.90481539940544},
{lat: 43.27021452447353, lng: -70.90478455400216},
{lat: 43.270201830006776, lng: -70.9047617552257},
{lat: 43.270182300052475, lng: -70.90474163865747},
{lat: 43.27015691110326, lng: -70.9047282276116},
{lat: 43.270127616148756, lng: -70.90472420429717},
{lat: 43.27010320367511, lng: -70.90473225092347},
{lat: 43.270082697189984, lng: -70.90475236749091},
{lat: 43.27006707319692, lng: -70.90478455399898},
{lat: 43.27005828469878, lng: -70.90481808161144},
{lat: 43.27006219069802, lng: -70.90485026811973},
{lat: 43.270068049696334, lng: -70.9048717257919},
{lat: 43.27008757968673, lng: -70.9049039122998},
{lat: 43.270113945165065, lng: -70.90494548653976},
{lat: 43.27013347514069, lng: -70.90497767304811},
{lat: 43.27015495810669, lng: -70.9050004718249}
];

var blue1Coords = [
{lat: 43.270016295196285, lng: -70.90529819702516},
{lat: 43.27006512020196, lng: -70.90520968412807},
{lat: 43.26996161114177, lng: -70.9050983724531},
{lat: 43.269917668563686, lng: -70.90518286203769}
];

var white1Coords = [
  {lat: 43.269916692057706, lng: -70.90517883872633},
  {lat: 43.26995965813507, lng: -70.90509569024437},
  {lat: 43.26984345435775, lng: -70.90496694420813},
  {lat: 43.26979853519254, lng: -70.90504741047914}
  ];
  
var black1Coords = [
  {lat: 43.27021354797748, lng: -70.90539073323987},
  {lat: 43.27012761615222, lng: -70.9053089258623},
  {lat: 43.27009343868851, lng: -70.90536793446114},
  {lat: 43.27013933413605, lng: -70.90541084980879},
  {lat: 43.27018034706123, lng: -70.9054591295714}
  ];
  
var gold1Coords = [
  {lat: 43.26969258441065, lng: -70.90481472885483},
  {lat: 43.26972773860596, lng: -70.90475169694213},
  {lat: 43.26966817176307, lng: -70.90469000613496},
  {lat: 43.26963301753338, lng: -70.90476242577847}
  ];
  
var jr1Coords = [
  {lat: 43.269629111507214, lng: -70.90475840246455},
  {lat: 43.26966524224357, lng: -70.90468866502925},
  {lat: 43.26963008801557, lng: -70.90465379631138},
  {lat: 43.26960176931443, lng: -70.90462160980269},
  {lat: 43.269562709017244, lng: -70.90468598281825},
  {lat: 43.269595910269246, lng: -70.90472219264092}
  ];

var bunker1BCenter = '(43.2683703478464, -70.90385735034943)';
var bunker1BCoords = [
{lat: 43.268414291541895, lng: -70.90389892458916},
{lat: 43.26842112722503, lng: -70.90388149023056},
{lat: 43.268426498118366, lng: -70.90386338531971},
{lat: 43.26842332440872, lng: -70.90384494513273},
{lat: 43.2684149018708, lng: -70.90383304283023},
{lat: 43.26840483144348, lng: -70.90382843278348},
{lat: 43.26839296054368, lng: -70.90382746886462},
{lat: 43.26837921287919, lng: -70.9038296691142},
{lat: 43.268361597249076, lng: -70.90381869929843},
{lat: 43.26834593466851, lng: -70.9037996828556},
{lat: 43.26832677031702, lng: -70.9037985932082},
{lat: 43.268309559015314, lng: -70.90380286797881},
{lat: 43.26830052613163, lng: -70.90381678193808},
{lat: 43.26829613175528, lng: -70.90383388102055},
{lat: 43.26829710828337, lng: -70.90384930372238},
{lat: 43.26830296745167, lng: -70.90386673808098},
{lat: 43.26831273273089, lng: -70.90388014912605},
{lat: 43.26833659662538, lng: -70.90388115495443},
{lat: 43.268354601347816, lng: -70.90388484299183},
{lat: 43.26836717413386, lng: -70.90389490127563},
{lat: 43.26838255443166, lng: -70.9039069712162},
{lat: 43.26839378448795, lng: -70.9039069712162}
];

var bunker1ACenter = '(43.26848753096394, -70.90405583381653)';
var bunker1ACoords = [
{lat: 43.26852561542855, lng: -70.90410143136978},
{lat: 43.26852756847739, lng: -70.90408600866795},
{lat: 43.26852952152615, lng: -70.90406890958548},
{lat: 43.2685246389041, lng: -70.90405097231269},
{lat: 43.26851926801944, lng: -70.90403932146728},
{lat: 43.268508770379846, lng: -70.90403081383556},
{lat: 43.2684996154601, lng: -70.90402119560167},
{lat: 43.26849503799973, lng: -70.90400565764867},
{lat: 43.26848396054417, lng: -70.90399788867217},
{lat: 43.26846865656297, lng: -70.9039913219749},
{lat: 43.268453192366735, lng: -70.9039934030443},
{lat: 43.26844448374141, lng: -70.90400383131055},
{lat: 43.26843622332496, lng: -70.90401843317522},
{lat: 43.2684359992199, lng: -70.90403914515264},
{lat: 43.26844272284808, lng: -70.90405754776839},
{lat: 43.268454873392606, lng: -70.90405870244922},
{lat: 43.26846876086721, lng: -70.90405793868513},
{lat: 43.268475704603276, lng: -70.90406426232562},
{lat: 43.26848112952135, lng: -70.90407949408643},
{lat: 43.26849165418047, lng: -70.90410722653445},
{lat: 43.26848264833852, lng: -70.90409472584724},
{lat: 43.26850462014971, lng: -70.90410947799683},
{lat: 43.26851682670806, lng: -70.90411081910133}
];

var bunker1CCenter = '(43.26761646439604, -70.90348720550537)';
var bunker1CCoords = [
{lat: 43.267552012786965, lng: -70.90342015028},
{lat: 43.267554454137056, lng: -70.9034463018179},
{lat: 43.267563487131454, lng: -70.90346608310938},
{lat: 43.2675816751837, lng: -70.90347463265061},
{lat: 43.2675946753654, lng: -70.90348829515278},
{lat: 43.26759922237663, lng: -70.90351524297148},
{lat: 43.26759173048875, lng: -70.90353005798534},
{lat: 43.267589937623434, lng: -70.90355355874635},
{lat: 43.26760075966307, lng: -70.90356799133588},
{lat: 43.26761788915118, lng: -70.90357252542162},
{lat: 43.26763231312628, lng: -70.90356942804647},
{lat: 43.267639525112536, lng: -70.90355715052283},
{lat: 43.26764313110536, lng: -70.90353760071594},
{lat: 43.26763907487006, lng: -70.90351709697643},
{lat: 43.267639976368294, lng: -70.90349611627062},
{lat: 43.267645309810334, lng: -70.90347757929067},
{lat: 43.26764992960817, lng: -70.90345758196463},
{lat: 43.26764442719895, lng: -70.90343953667457},
{lat: 43.26763288714604, lng: -70.90343587844757},
{lat: 43.26762028134648, lng: -70.90343673154308},
{lat: 43.26761007228937, lng: -70.90343447588174},
{lat: 43.26760106160323, lng: -70.90342932473766},
{lat: 43.26759362664162, lng: -70.90341199701601},
{lat: 43.267584049923535, lng: -70.90339930984175},
{lat: 43.26757242578627, lng: -70.90339564846352},
{lat: 43.267562754726555, lng: -70.90339869260788},
{lat: 43.26755591894704, lng: -70.90340539813042}
];

var green1Coords = [
{lat: 43.26759888669124, lng: -70.90370446443558},
{lat: 43.26759571293844, lng: -70.90372055768967},
{lat: 43.26757886763239, lng: -70.90375006198883},
{lat: 43.267550059706835, lng: -70.90376615524292},
{lat: 43.26753589987406, lng: -70.90376414358616},
{lat: 43.26752881995644, lng: -70.90376045554876},
{lat: 43.267494396896865, lng: -70.90375676751137},
{lat: 43.26746754201422, lng: -70.90373933315277},
{lat: 43.267458264870164, lng: -70.9037272632122},
{lat: 43.267442640203306, lng: -70.90368568897247},
{lat: 43.26743189824256, lng: -70.90363338589668},
{lat: 43.26741334394219, lng: -70.9036011993885},
{lat: 43.267395766178744, lng: -70.90356901288033},
{lat: 43.26738307112419, lng: -70.90353548526764},
{lat: 43.267374282238734, lng: -70.90348318219185},
{lat: 43.26737525878164, lng: -70.90346708893776},
{lat: 43.26738600075242, lng: -70.9034375846386},
{lat: 43.267414320484455, lng: -70.90340539813042},
{lat: 43.267442151932414, lng: -70.90339198708534},
{lat: 43.26745631178703, lng: -70.90339198708534},
{lat: 43.26747095990901, lng: -70.90339869260788},
{lat: 43.26749146727389, lng: -70.90340808033943},
{lat: 43.267500744412885, lng: -70.90342015028},
{lat: 43.26751221876704, lng: -70.90343423187733},
{lat: 43.26753345852323, lng: -70.90346977114677},
{lat: 43.26754684017624, lng: -70.90350874699652},
{lat: 43.267554362586466, lng: -70.9035343118012},
{lat: 43.26755964200562, lng: -70.90355057269335},
{lat: 43.267562388524105, lng: -70.90356431901455},
{lat: 43.267569834640256, lng: -70.90358108282089},
{lat: 43.26757886763239, lng: -70.90359047055244},
{lat: 43.26758521513956, lng: -70.90360924601555},
{lat: 43.26758912129752, lng: -70.9036286920309},
{lat: 43.26759595707329, lng: -70.9036617167294},
{lat: 43.26759888669124, lng: -70.90367864817381}
  ];
  
var blue2Coords = [
{lat: 43.2677473204833, lng: -70.90292930603027},
{lat: 43.26779663557752, lng: -70.90293802320957},
{lat: 43.26784009141949, lng: -70.90294137597084},
{lat: 43.26785083330823, lng: -70.90285286307335},
{lat: 43.267788335019866, lng: -70.90283945202827},
{lat: 43.267728766279056, lng: -70.90283140540123},
{lat: 43.26768286901278, lng: -70.90282335877419},
{lat: 43.26764673709794, lng: -70.90281531214714},
{lat: 43.26761646439604, lng: -70.9028086066246},
{lat: 43.267588144758044, lng: -70.90280190110207},
{lat: 43.26758130898138, lng: -70.90283676981926},
{lat: 43.26757642628329, lng: -70.90287297964096},
{lat: 43.26757642628329, lng: -70.9028984606266},
{lat: 43.267607187274706, lng: -70.90289913117886},
{lat: 43.26765284046346, lng: -70.90291019529104},
{lat: 43.26770398664229, lng: -70.90292109176517}
  ];
  
var black2Coords = [
{lat: 43.267925049942285, lng: -70.90289980173111},
{lat: 43.26794702195474, lng: -70.9029058367014},
{lat: 43.267978759292085, lng: -70.90290650725365},
{lat: 43.26801537927616, lng: -70.90291522443295},
{lat: 43.26803051552977, lng: -70.90291857719421},
{lat: 43.268040280852716, lng: -70.90283811092377},
{lat: 43.268008055281115, lng: -70.90283006429672},
{lat: 43.26793628008299, lng: -70.90281531214714}
  ];
  
var white2Coords = [
{lat: 43.26732838470516, lng: -70.90284749865532},
{lat: 43.26737379396728, lng: -70.9028622508049},
{lat: 43.267430921700566, lng: -70.9028796851635},
{lat: 43.26744459328691, lng: -70.90279251337051},
{lat: 43.26738893038047, lng: -70.9027797728777},
{lat: 43.2673459624881, lng: -70.90276535600424}
  ];
  
var gold2Coords = [
{lat: 43.26722584753706, lng: -70.90276166796684},
{lat: 43.267237566079295, lng: -70.90269729495049},
{lat: 43.267171160976744, lng: -70.90267717838287},
{lat: 43.26716237206071, lng: -70.90274222195148}
];

var jr2Coords = [
{lat: 43.26716334860697, lng: -70.90273886919022},
{lat: 43.26717116097677, lng: -70.90267851948738},
{lat: 43.267129169477464, lng: -70.90266779065132},
{lat: 43.26712135710229, lng: -70.90272814035416}
];

var green2Coords = [
{lat: 43.26580788727419, lng: -70.90137228369713},
{lat: 43.26580691070614, lng: -70.90138971805573},
{lat: 43.265800563013556, lng: -70.9014118462801},
{lat: 43.265792262183716, lng: -70.90144336223602},
{lat: 43.26577028939348, lng: -70.90146012604237},
{lat: 43.26576003542198, lng: -70.90146213769913},
{lat: 43.265734156343356, lng: -70.90145610272884},
{lat: 43.26571804294924, lng: -70.90145006775856},
{lat: 43.26568581614819, lng: -70.9014393389225},
{lat: 43.265653589330086, lng: -70.90142861008644},
{lat: 43.265632104775186, lng: -70.90142324566841},
{lat: 43.265607690499074, lng: -70.90141251683235},
{lat: 43.2655852293564, lng: -70.90140178799629},
{lat: 43.265565697921254, lng: -70.90138971805573},
{lat: 43.26554909619645, lng: -70.90137362480164},
{lat: 43.26553835390151, lng: -70.9013494849205},
{lat: 43.265540307046194, lng: -70.90131998062134},
{lat: 43.265545189907584, lng: -70.90128779411316},
{lat: 43.26555007276862, lng: -70.90125426650047},
{lat: 43.26556179163348, lng: -70.90121805667877},
{lat: 43.26558132306987, lng: -70.90119659900665},
{lat: 43.265612573355085, lng: -70.90119391679764},
{lat: 43.2656418704829, lng: -70.90120196342468},
{lat: 43.26566921445615, lng: -70.90121269226074},
{lat: 43.26569265213772, lng: -70.9012234210968},
{lat: 43.26571218353212, lng: -70.90123817324638},
{lat: 43.26573269148953, lng: -70.90125158429146},
{lat: 43.26575319944002, lng: -70.90126365423203},
{lat: 43.26577077767778, lng: -70.90128242969513},
{lat: 43.26578444963698, lng: -70.90130656957626},
{lat: 43.265796168456724, lng: -70.90133339166641},
{lat: 43.26580691070614, lng: -70.90136021375656}
];

var blue3Coords = [
{lat: 43.266972921783825, lng: -70.90173706412315},
{lat: 43.26703151471595, lng: -70.90173974633217},
{lat: 43.26703542090942, lng: -70.90161100029945},
{lat: 43.26700221825695, lng: -70.9016103297472},
{lat: 43.26697682798108, lng: -70.90160463005304},
{lat: 43.26697487488251, lng: -70.90167671442032}
];

var blue3BCoords = [
{lat: 43.266833275068244, lng: -70.90172901749611},
{lat: 43.26687038401691, lng: -70.90173035860062},
{lat: 43.26690163364038, lng: -70.90173035860062},
{lat: 43.26690553984217, lng: -70.90165793895721},
{lat: 43.266903098466074, lng: -70.90162105858326},
{lat: 43.26687502263394, lng: -70.90162139385939},
{lat: 43.26683364127511, lng: -70.90161887928843}
];

var black3Coords = [
{lat: 43.266716088765975, lng: -70.9017276763916},
{lat: 43.266773705392794, lng: -70.90172901749611},
{lat: 43.266833275068244, lng: -70.90172968804836},
{lat: 43.2668342516198, lng: -70.9016227349639},
{lat: 43.26676345159032, lng: -70.90162156149745},
{lat: 43.266718286011226, lng: -70.90162097476423}
];

var white3Coords = [
{lat: 43.2670334678127, lng: -70.90173840522766},
{lat: 43.26706667044814, lng: -70.90174242854118},
{lat: 43.26709791997081, lng: -70.90174242854118},
{lat: 43.2671311225711, lng: -70.90173706412315},
{lat: 43.26716139551439, lng: -70.90173974633217},
{lat: 43.267181902983545, lng: -70.90174242854118},
{lat: 43.26718776225917, lng: -70.90165391564369},
{lat: 43.26719118016969, lng: -70.90161971747875},
{lat: 43.26713234325459, lng: -70.90161468833685},
{lat: 43.26708632347013, lng: -70.9016135148704},
{lat: 43.26703597021784, lng: -70.90161292813718}
];

var gold3Coords = [
{lat: 43.26729713530083, lng: -70.90137630701065},
{lat: 43.26729371739621, lng: -70.90145476162434},
{lat: 43.26742017973771, lng: -70.90146884322166},
{lat: 43.26742603899042, lng: -70.90138837695122}
];

var jr3Coords = [
{lat: 43.26768872824018, lng: -70.9013307094574},
{lat: 43.26767554497771, lng: -70.90140782296658},
{lat: 43.2677404847245, lng: -70.90142592787743},
{lat: 43.267754644509694, lng: -70.90134881436825}
];

var green3Coords = [
{lat: 43.268387925328405, lng: -70.90177997946739},
{lat: 43.26841331501569, lng: -70.90178936719894},
{lat: 43.26844163426978, lng: -70.90179204940796},
{lat: 43.268459211731205, lng: -70.90177863836288},
{lat: 43.26847678918756, lng: -70.90175718069077},
{lat: 43.26849436663883, lng: -70.90173035860062},
{lat: 43.26850999103569, lng: -70.90170219540596},
{lat: 43.268526591952984, lng: -70.90167135000229},
{lat: 43.26853928676901, lng: -70.90163916349411},
{lat: 43.26853928676901, lng: -70.90161234140396},
{lat: 43.268535380672056, lng: -70.9015841782093},
{lat: 43.26851877975718, lng: -70.90155333280563},
{lat: 43.26849631968866, lng: -70.90153723955154},
{lat: 43.26847776571275, lng: -70.901530534029},
{lat: 43.268456282154645, lng: -70.901530534029},
{lat: 43.26842503332932, lng: -70.90153187513351},
{lat: 43.26840159669981, lng: -70.9015291929245},
{lat: 43.26838304269503, lng: -70.90152516961098},
{lat: 43.268360582576406, lng: -70.9015104174614},
{lat: 43.26834105203177, lng: -70.90149834752083},
{lat: 43.26831761536989, lng: -70.90148761868477},
{lat: 43.26830003786758, lng: -70.90147286653519},
{lat: 43.268278554246756, lng: -70.90145945549011},
{lat: 43.268260976733174, lng: -70.90144604444504},
{lat: 43.26824535227237, lng: -70.90142995119095},
{lat: 43.26823070433674, lng: -70.90140715241432},
{lat: 43.26821019722093, lng: -70.90138703584671},
{lat: 43.2681926196876, lng: -70.9013856947422},
{lat: 43.26816722990826, lng: -70.90138703584671},
{lat: 43.26814867583205, lng: -70.90139240026474},
{lat: 43.26813793399588, lng: -70.90141385793686},
{lat: 43.26812816868861, lng: -70.90144068002701},
{lat: 43.26812035644166, lng: -70.90147286653519},
{lat: 43.26811449725579, lng: -70.90150505304337},
{lat: 43.26811449725579, lng: -70.90153992176056},
{lat: 43.26812575406356, lng: -70.90155814454192},
{lat: 43.268140171242806, lng: -70.90157262035063},
{lat: 43.26815421554424, lng: -70.901582540464},
{lat: 43.26817002646557, lng: -70.90159420604323},
{lat: 43.268203414918084, lng: -70.90160855383147},
{lat: 43.268222022381565, lng: -70.90162354172207},
{lat: 43.2682436128302, lng: -70.9016374242492},
{lat: 43.26826335702177, lng: -70.9016544604674},
{lat: 43.26828136176578, lng: -70.9016724396497},
{lat: 43.26830565290358, lng: -70.90169498696923},
{lat: 43.2683327515484, lng: -70.90172667056322},
{lat: 43.26835960604933, lng: -70.90175248682499}
];

var bunker9CCoords = [
{lat: 43.269951324396416, lng: -70.90374201536179},
{lat: 43.2699708544244, lng: -70.90372055768967},
{lat: 43.269977201682146, lng: -70.90367697179317},
{lat: 43.269961089411176, lng: -70.90363338589668},
{lat: 43.26995913640837, lng: -70.90360254049301},
{lat: 43.26997476042921, lng: -70.90357437729836},
{lat: 43.269975002706886, lng: -70.90353693519774},
{lat: 43.26997524498455, lng: -70.90352095076923},
{lat: 43.269967917530074, lng: -70.90351043958435},
{lat: 43.26995326261848, lng: -70.90349746384163},
{lat: 43.26994152981805, lng: -70.90349565223732},
{lat: 43.26993368824178, lng: -70.90350007565576},
{lat: 43.26992191109444, lng: -70.90351428691065},
{lat: 43.269913980829415, lng: -70.90353198058438},
{lat: 43.269911791328454, lng: -70.90354859246872},
{lat: 43.269913271339554, lng: -70.90356840519235},
{lat: 43.269912325353076, lng: -70.90358925517648},
{lat: 43.26990848037561, lng: -70.90360949747264},
{lat: 43.2698988374152, lng: -70.90362584218383},
{lat: 43.26988736351095, lng: -70.90363707393408},
{lat: 43.26987808673572, lng: -70.90365417301655},
{lat: 43.26987515722745, lng: -70.90366959571838},
{lat: 43.26987515722745, lng: -70.903689712286},
{lat: 43.26987906323845, lng: -70.90370580554008},
{lat: 43.269888828264804, lng: -70.90372189879417},
{lat: 43.269906405308305, lng: -70.90374067425728},
{lat: 43.269930817860306, lng: -70.9037446975708}    
];

var putGreen = Poly.addGreen(putCoords);
var green1 = Poly.addGreen(green1Coords);
var blueTee1 = Poly.addBlue(blue1Coords);
var whiteTee1 = Poly.addWhite(white1Coords);
var blackTee1 = Poly.addBlack(black1Coords);
var goldTee1 = Poly.addGold(gold1Coords);
var jrTee1 = Poly.addJr(jr1Coords);
var bunker1A = Poly.addBunker(bunker1ACoords);
var bunker1B = Poly.addBunker(bunker1BCoords);
var bunker1C = Poly.addBunker(bunker1CCoords);
var blueTee2 = Poly.addBlue(blue2Coords);
var blackTee2 = Poly.addBlack(black2Coords);
var whiteTee2 = Poly.addWhite(white2Coords);
var goldTee2 = Poly.addGold(gold2Coords);
var jrTee2 = Poly.addJr(jr2Coords);
var green2 = Poly.addGreen(green2Coords);
var blueTee3 = Poly.addBlue(blue3Coords);
var blueTee3B = Poly.addBlue(blue3BCoords);
var blackTee3 = Poly.addBlack(black3Coords);
var whiteTee3 = Poly.addWhite(white3Coords);
var goldTee3 = Poly.addGold(gold3Coords);
var jrTee3 = Poly.addJr(jr3Coords);
var green3 = Poly.addGreen(green3Coords);
var bunker9C = Poly.addBunker(bunker9CCoords);

// ---- TEST (DRAW) OBJECTS ---- //
/*
google.maps.event.addListener(putGreen,"mouseover",function(e){
 this.setOptions({fillColor: "#00FF00"});
google.maps.event.addListener(putGreen,"mouseout",function(){
 this.setOptions({fillColor: "#31B404"});
});
*/
    /*
    var pths = this.getPaths();
    var pArr = pths.getArray();
    var p1 = pArr[0];
    var coords = p1.getArray();
    var pLat = coords[0].lat();
    var pLng = coords[0].lng();
    var pos = new google.maps.LatLng(pLat, pLng);
    var lbl = document.getElementById('testlbl');
    lbl.style.visibility = 'visible';
    //alert(this.top);
    
});
*/



/*
blueTee1.addListener('click', function(){
  console.log(blueTee1);
  //gMap.setCenter({center: blueTee1.getPosition()});
  //alert(gMap.getTilt());
  alert(gMap.getHeading());
});
*/
/*
var testMarker = MyMap.addMarker(43.2706725, -70.9046947, 'testMrkr');
IWin.attach(testMarker, 'click', 'Hello hello');
*/
})(window, window.google);