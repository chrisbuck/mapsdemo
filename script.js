(function(window, google, mwin){

// ---- MAP PROPERTIES ---- //
//element
var mapEl = document.getElementById('map-canvas');

//options

var mapOpts = {
    center: {
        lat: 43.2706725,
        lng: -70.9046947
    },
    zoom: 20,
    minZoom: 15,
    keyboardShortcuts: true,
    mapTypeControlOptions: {
        mapTypeIds: 'satellite'
        //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR //DROPDOWN_MENU, HORIZONTAL_BAR, DEFAULT
        //position: google.maps.ControlPosition.TOP_LEFT
    },
    mapTypeId: google.maps.MapTypeId.SATELLITE
};
    
//bounds (doesn't actually cut off the map at the boundary)
/*
console command:
gMap.fitBounds({
    east: -70.90400805449218,
    north: 43.28042099516316,
    west: -70.92713942503661,
    south: 43.26448514498841
    })
*/
    

mwin = mwin.create(mapEl, mapOpts);
gMap = mwin.gMap;

var mapBounds = {
    east: -70.88126292204589,
    north: 43.28057720833307,
    west: -70.92821230864257,
    south: 43.26464139906769
    };

//Keep within bounds function (for zoom):
    gMap.addListener('zoom_changed', function(){
        var myZoom = gMap.getZoom();
        if (myZoom <= 15){
            gMap.fitBounds(mapBounds);
        }
    });
// ---- FUNCTIONS ---- //
//Elevation:
function cb_elevDiff(results){
    var resB = results[1];
    var metersB = resB.elevation;
    var yardsB = metersB * 1.09361;
    var resA = results[0];
    var metersA = resA.elevation;
    var yardsA = metersA * 1.09361;
    var diff = Math.round(yardsA - yardsB);
    var diffStr = diff + ' yds';
    var diffSpan = document.getElementById('elevSpan');
    diffSpan.innerHTML = diffStr;
}
function getElevByPoints (locArr, callback){
                    var eServ = new google.maps.ElevationService();
                    var locObj = {
                        locations: locArr
                    };
                    eServ.getElevationForLocations(locObj, callback);
                    //return queryRes;
}
function showElevDiff(pntB, pntA){
    var locArr = [];
    Array.prototype.push.apply(locArr, [pntB, pntA]);
    getElevByPoints(locArr, cb_elevDiff);
}

// ---- DEFINE THE MAP ---- //
//Constructor function
var MyMap = function(){
  function MyMap() {
    
  }
};
    
var playerBool = false; //toggles the player img (for judging distances)
var recordBool = false; //toggles recording polygons
var lineBool = false; //allows drawing of lines

//Collections (arrays)
var polyDots = [];
var tempPolys = [];
var lines = [];
var playerWins = [];

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
        
        showElevDiff(endPos, anchPos);
        
        var lineArr = [];
        if(lineArr.length < 1){
            lineArr.push(anchPos);
            lineArr.push(endPos);
        } else if (lineArr.length == 2){
            lineArr.splice(1, 1);
            lineArr.push(endPos);
        }

        //Draw an arrow
        var arrow = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };
        this.opts = {
            id: 'distanceLine',
            path: lineArr,
            map: gMap,
            icons: [{
                icon: arrow,
                offset: '100%'
            }],
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            strokeOpacity: 0.8,
            fillOpacity: 0.8
        };

        var newLine = new google.maps.Polyline(this.opts);
        
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

// ---- METHODS ---- //
//Function to add the player marker

MyMap.addPlayer = function(cent){
    var golferImg = "https://www.dropbox.com/s/p0amgjaaous9rn9/golfer.png?dl=1&raw=true";
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
        
        google.maps.event.addListener(playerMarker, 'rightclick', function(){
            playerMarker.setMap(null);
        });

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
        playerMarker.addListener('rightclick', function(){
            if (playerBool == true) {
                lineBool = false;
                playerBool = false;
                if (lines.length > 0) {
                    var distLine = lines.pop();
                    distLine.setMap(null);
                }
                if (playerWins.length > 0) {
                    var pWins = playerWins.pop();
                    pWins.setMap(null);
                }
                playerMarker.setMap(null);
            }
        });
        playerMarker.addListener('click', function(){
            if (lineBool == false) {
                //boolean:true allows the line and distance functions to execute
                lineBool = true;
                var winContent = '<p><strong>Distance:</strong> &nbsp; <span id="distanceSpan"></span></p><p><strong>Elevation +/-:</strong> &nbsp; <span id="elevSpan"></span></p>';
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

//Map events
gMap.addListener('rightclick', function(e){
  if (recordBool == false) {
      recordBool = true;
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
        mwin.addDot(polyDot);
  }
  //for each item in the array, add a dragend listener function to modify the position of the coord
  //add a listener function to return the code for the new polygon
});
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
// ---- POLYGONS ---- //
// draw the shapes //

//Put Green
var putGreen = mwin.addGreen(putCoords);
    
//Hole 1
var blackTee1 = mwin.addBlack(black1Coords);
var blueTee1 = mwin.addBlue(blue1Coords);
var whiteTee1 = mwin.addWhite(white1Coords);
var goldTee1 = mwin.addGold(gold1Coords);
var jrTee1 = mwin.addJr(jr1Coords);
var bunker1A = mwin.addBunker(bunker1ACoords);
var bunker1B = mwin.addBunker(bunker1BCoords);
var bunker1C = mwin.addBunker(bunker1CCoords);
var green1 = mwin.addGreen(green1Coords);
    
//Hole 2
var blackTee2 = mwin.addBlack(black2Coords);
var blueTee2 = mwin.addBlue(blue2Coords);
var whiteTee2 = mwin.addWhite(white2Coords);
var goldTee2 = mwin.addGold(gold2Coords);
var jrTee2 = mwin.addJr(jr2Coords);
var green2 = mwin.addGreen(green2Coords);
var bunker2A = mwin.addBunker(bunker2ACoords);
var bunker2B = mwin.addBunker(bunker2BCoords);
//Hole 3
var blackTee3 = mwin.addBlack(black3Coords);
var blueTee3 = mwin.addBlue(blue3Coords);
var blueTee3B = mwin.addBlue(blue3BCoords);
var whiteTee3 = mwin.addWhite(white3Coords);
var goldTee3 = mwin.addGold(gold3Coords);
var jrTee3 = mwin.addJr(jr3Coords);
var green3 = mwin.addGreen(green3Coords);
var bunker3B = mwin.addBunker(bunker3BCoords);
//Hole 4
var blackTee4 = mwin.addBlack(black4Coords);
var blueTee4 = mwin.addBlue(blue4Coords);
var whiteTee4 = mwin.addWhite(white4Coords);
var goldTee4 = mwin.addGold(gold4Coords);
var jrTee4 = mwin.addJr(jr4Coords);
var green4 = mwin.addGreen(green4Coords);
//Hole 5
var blackTee5 = mwin.addBlack(black5Coords);
var blueTee5 = mwin.addBlue(blue5Coords);
var whiteTee5 = mwin.addWhite(white5Coords);
var goldTee5 = mwin.addGold(gold5Coords);
var jrTee5 = mwin.addJr(jr5Coords);
var green5 = mwin.addGreen(green5Coords);
//Hole 6
var blackTee6 = mwin.addBlack(black6Coords);
var blueTee6 = mwin.addBlue(blue6Coords);
var whiteTee6 = mwin.addWhite(white6Coords);
var goldTee6 = mwin.addGold(gold6Coords);
var jrTee6 = mwin.addJr(jr6Coords);
var green6 = mwin.addGreen(green6Coords);
//Hole 7
var blackTee7 = mwin.addBlack(black7Coords);
var blueTee7 = mwin.addBlue(blue7Coords);
var whiteTee7 = mwin.addWhite(white7Coords);
var goldTee7 = mwin.addGold(gold7Coords);
var jrTee7 = mwin.addGreen(jr7Coords);
var green7 = mwin.addGreen(green7Coords);
//Hole 8
var blackTee8 = mwin.addBlack(black8Coords);
var blueTee8 = mwin.addBlue(blue8Coords);
var whiteTee8 = mwin.addWhite(white8Coords);
var goldTee8 = mwin.addGold(gold8Coords);
var jrTee8 = mwin.addJr(jr8Coords);
var green8 = mwin.addGreen(green8Coords);
//Hole 9
var blackTee9 = mwin.addBlack(black9Coords);
var blueTee9 = mwin.addBlue(blue9Coords);
var whiteTee9 = mwin.addWhite(white9Coords);
var goldTee9 = mwin.addGold(gold9Coords);
var jrTee9 = mwin.addJr(jr9Coords);
var green9 = mwin.addGreen(green9Coords);
var bunker9C = mwin.addBunker(bunker9CCoords);
//Hole 10
//var white10 = mwin.addWhite(white10Coords);
//Hole 11
//Hole 12
//Hole 13
//Hole 14
//Hole 15
//Hole 16
//Hole 17
//Hole 18
//var green18 = mwin.addGreen(green18Coords);

// // ---- Draw Objects Using MarkerWin Function ---- // //

var markers = [];
var teeMarks = [];

//Clubhouse
var clubMrkr = mwin.addMrkr(43.270438141949775, -70.90466251349028, 'clubhouse','Clubhouse');

// InfoWindows //
var infoWins = [];
var teeWins = [];
    
// Marker-Window Objects & Events //
//Hole 1
    var black1Mrkr = mwin.newMrkrWin(43.27013588291049, -70.90537548065186, 'black1', 'Hole 1 Black Tee', 4, 326, 13, green1Center);
    var blue1Mrkr = mwin.newMrkrWin(43.26999526695053, -70.90519845485687, 'blue1', 'Hole 1 Blue Tee', 4, 306, 13, green1Center);
    var white1Mrkr = mwin.newMrkrWin(43.26988199274653, -70.90506434440613, 'white1', 'Hole 1 White Tee', 4, 289, 13, green1Center);
    var gold1Mrkr = mwin.newMrkrWin(43.26967497382899, -70.90474784374237, 'gold1', 'Hole 1 Gold Tee', 4, 258, 13, green1Center);
    var jr1Mrkr = mwin.newMrkrWin(43.269619312962206, -70.90469554066658, 'jr1', 'Hole 1 Jr Tee', 4, 251, 13, green1Center);
//Hole 2
    var black2Mrkr = mwin.newMrkrWin(43.267983641957905, -70.90287029743195, 'black2', 'Hole 2 Black Tee', 4, 283, 11, green2Center);
    var blue2Mrkr = mwin.newMrkrWin(43.267745367409425, -70.90289175510406, 'blue2', 'Hole 2 Blue Tee', 4, 261, 11, green2Center);
    var white2Mrkr = mwin.newMrkrWin(43.26739381309361, -70.90283811092377, 'white2', 'Hole 2 White Tee', 4, 225, 11, green2Center);
    var gold2Mrkr = mwin.newMrkrWin(43.26720241044578, -70.9027361869812, 'gold2', 'Hole 2 Gold Tee', 4, 202, 11, green2Center);
    var jr2Mrkr = mwin.newMrkrWin(43.267143817678175, -70.90270936489105, 'jr2', 'Hole 2 Jr Tee', 4, 195, 11, green2Center);
//Hole 3
    var black3Mrkr = mwin.newMrkrWin(43.266778588155255, -70.90168207883835, 'black3', 'Hole 3 Black Tee', 3, 173, 17, green3Center);
    var blue3Mrkr = mwin.newMrkrWin(43.266887961932085, -70.90168207883835, 'blue3', 'Hole 3 Blue Tee', 3, 161, 17, green3Center);
    var white3Mrkr = mwin.newMrkrWin(43.26711061508483, -70.90168207883835, 'white3', 'Hole 3 White Tee', 3, 136, 17, green3Center);
    var gold3Mrkr = mwin.newMrkrWin(43.26736646989504, -70.90142458677292, 'gold3', 'Hole 3 Gold Tee', 3, 108, 17, green3Center);
    var jr3Mrkr = mwin.newMrkrWin(43.26771216514419, -70.90138703584671, 'jr3', 'Hole 3 Jr Tee', 3, 71, 17, green3Center);
//Hole 4
    var black4Mrkr = mwin.newMrkrWin(43.26817113602884, -70.90297222137451, 'black4', 'Hole 4 Black Tee', 5, 527, 1, green4Center);
    var blue4Mrkr = mwin.newMrkrWin(43.26846409435847, -70.90284883975983, 'blue4', 'Hole 4 Blue Tee', 5, 497, 1, green4Center);
    var white4Mrkr = mwin.newMrkrWin(43.268591042530105, -70.90273350477219, 'white4', 'Hole 4 White Tee', 5, 481, 1, green4Center);
    var gold4Mrkr = mwin.newMrkrWin(43.26885079719457, -70.90265572071075, 'gold4', 'Hole 4 Gold Tee', 5, 456, 1, green4Center);
    var jr4Mrkr = mwin.newMrkrWin(43.26907734923001, -70.9024840593338, 'jr4', 'Hole 4 Jr Tee', 5, 428, 1, green4Center);
//Hole 5
    var black5Mrkr = mwin.newMrkrWin(43.27226656554652, -70.89851975440979, 'black5', 'Hole 5 Black Tee', 3, 187, 15, green5Center);
    var blue5Mrkr = mwin.newMrkrWin(43.272349564964685, -70.89865386486053, 'blue5', 'Hole 5 Blue Tee', 3, 173, 15, green5Center);
    var white5Mrkr = mwin.newMrkrWin(43.272872946923556, -70.89889660477638, 'white5', 'Hole 5 White Tee', 3, 123, 15, green5Center);
    var gold5Mrkr = mwin.newMrkrWin(43.2729149344603, -70.89906558394432, 'gold5', 'Hole 5 Gold Tee', 3, 109, 15, green5Center);
    var jr5Mrkr = mwin.newMrkrWin(43.27293641644464, -70.89913800358772, 'jr5', 'Hole 5 Jr Tee', 3, 103, 15, green5Center);
//Hole 6
    var black6Mrkr = mwin.newMrkrWin(43.27325376305718, -70.89914336800575, 'black6', 'Hole 6 Black Tee', 4, 396, 3, green6Center);
    var blue6Mrkr = mwin.newMrkrWin(43.27353302670735, -70.89936196804047, 'blue6', 'Hole 6 Blue Tee', 4, 360, 3, green6Center);
    var white6Mrkr = mwin.newMrkrWin(43.27377127859866, -70.89954569935799, 'white6', 'Hole 6 White Tee', 4, 330, 3, green6Center);
    var gold6Mrkr = mwin.newMrkrWin(43.274081785811155, -70.89973613619804, 'gold6', 'Hole 6 Gold Tee', 4, 292, 3, green6Center);
    var jr6Mrkr = mwin.newMrkrWin(43.27422727449457, -70.89991182088852, 'jr6', 'Hole 6 Jr Tee', 4, 271, 3, green6Center);
//Hole 7
    var black7Mrkr = mwin.newMrkrWin(43.2768128140178, -70.90291321277618, 'black7', 'Hole 7 Black Tee', 4, 363, 5, green7Center);
    var blue7Mrkr = mwin.newMrkrWin(43.27670150528916, -70.90312376618385, 'blue7', 'Hole 7 Blue Tee', 4, 357, 5, green7Center);
    var white7Mrkr = mwin.newMrkrWin(43.27657652682487, -70.903150588274, 'white7', 'Hole 7 White Tee', 4, 345, 5, green7Center);
    var gold7Mrkr = mwin.newMrkrWin(43.276220141513186, -70.90313047170639, 'gold7', 'Hole 7 Gold Tee', 4, 307, 5, green7Center);
    var jr7Mrkr = mwin.newMrkrWin(43.276023884601045, -70.9030057489872, 'jr7', 'Hole 7 Jr Tee', 4, 283, 5, green7Center);
//Hole 8
    var black8Mrkr = mwin.newMrkrWin(43.2734480760123, -70.90234994888306, 'black8', 'Hole 8 Black Tee', 4, 312, 9, green8Center);
    var blue8Mrkr = mwin.newMrkrWin(43.273319185076176, -70.90215414762497, 'blue8', 'Hole 8 Blue Tee', 4, 292, 9, green8Center);
    var white8Mrkr = mwin.newMrkrWin(43.27322251669492, -70.90198114514351, 'white8', 'Hole 8 White Tee', 4, 274, 9, green8Center);
    var gold7Mrkr = mwin.newMrkrWin(43.27305359077118, -70.90160965919495, 'gold8', 'Hole 8 Gold Tee', 4, 239, 9, green8Center);
    var jr8Mrkr = mwin.newMrkrWin(43.27297254521939, -70.90149030089378, 'jr8', 'Hole 8 Jr Tee', 4, 226, 9, green8Center);
//Hole 9
    var black9Mrkr = mwin.newMrkrWin(43.27172169596734, -70.89997887611389, 'black9', 'Hole 9 Black Tee', 4, 363, 7, green9Center);
    var blue9Mrkr = mwin.newMrkrWin(43.27158108367115, -70.90031951665878, 'blue9', 'Hole 9 Blue Tee', 4, 332, 7, green9Center);
    var white9Mrkr = mwin.newMrkrWin(43.27148831843679, -70.9004294872284, 'white9', 'Hole 9 White Tee', 4, 318, 7, green9Center);
    var gold9Mrkr = mwin.newMrkrWin(43.271141668151756, -70.90076074004173, 'gold9', 'Hole 9 Gold Tee', 4, 274, 7, green9Center);
    var jr9Mrkr = mwin.newMrkrWin(43.27107429082491, -70.90083986520767, 'jr9', 'Hole 9 Jr Tee', 4, 265, 7, green9Center);
    
////end self-instigating function.
}(window, window.google, window.MapUtil || (window.MapUtil = {})));