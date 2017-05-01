(function(window, google){

// ---- MAP PROPERTIES ---- //
var GoogMap = (function(element, opts){
    function GoogMap(element, opts){
        this.gMap = new google.maps.Map(element, opts);
    }
    GoogMap.prototype = {
        addNew: function(element, opts){
            
        }
    }
    return GoogMap;
    GoogMap.create = function(element, opts){
        var myMap = new GoogMap(element, opts);
        return myMap;
    };
    
    window.GoogMap = GoogMap;
}());
//element
var mapEl = document.getElementById('map-canvas');

//options
var mapOpts = {
  center: {
    lat: 43.2706725,
    lng: -70.9046947
  },
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};
map = GoogMap(mapEl, mapOpts);
    
//Image urls
var golferImg = "https://www.dropbox.com/s/p0amgjaaous9rn9/golfer.png?dl=1&raw=true";
var blackGolferImg = 'https://www.dropbox.com/s/x86xjzvqjcliseb/blackgolfer.png?dl=1&raw=true';
var blueGolferImg = "https://www.dropbox.com/s/yigs3afxedjog8h/bluegolfer.png?dl=1&raw=true";
var whiteGolferImg = "https://www.dropbox.com/s/hzytbncyboackkf/whitegolfer.png?dl=1&raw=true";
var goldGolferImg = "https://www.dropbox.com/s/cq840ydfci4npto/goldgolfer.png?dl=1&raw=true";
var jrGolferImg = "https://www.dropbox.com/s/lujzxsl9r68og2u/jrgolfer.png?dl=1&raw=true";
var greenImg = "https://www.dropbox.com/s/gy6jxbqxksyj2i9/greenicon.png?dl=1&raw=true";


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

    
//Function: Select image file/url by prefix
function getImgByPref(pref){
    var myImg;
    if (pref.search('black') > -1){
        myImg = blackGolferImg;
    } else if (pref.search('blue') > -1){
        myImg = blueGolferImg;
    } else if (pref.search('white') > -1) {
        myImg = whiteGolferImg;
    } else if (pref.search('gold') > -1){
        myImg = goldGolferImg;
    } else if (pref.search('jr') > -1){
        myImg = jrGolferImg;
    } else if (pref.search('green') > -1){
        myImg = greenImg;
    }
    return myImg;
};


//Map object
//var gMap = MyMap.create();
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
            lineBool = false;
            playerBool = false;
            var distLine = lines.pop();
            distLine.setMap(null);
            var pWins = playerWins.pop();
            pWins.setMap(null);
            this.setMap(null);
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

// ---- POLYGONS ---- //
// draw the shapes //

//Put Green
var putGreen = Poly.addGreen(putCoords);
    
//Hole 1
var bunker1ACenter = '(43.26848753096394, -70.90405583381653)';
var bunker1BCenter = '(43.2683703478464, -70.90385735034943)';
var bunker1CCenter = '(43.26761646439604, -70.90348720550537)';
var blackTee1 = Poly.addBlack(black1Coords);
var blueTee1 = Poly.addBlue(blue1Coords);
var whiteTee1 = Poly.addWhite(white1Coords);
var goldTee1 = Poly.addGold(gold1Coords);
var jrTee1 = Poly.addJr(jr1Coords);
var bunker1A = Poly.addBunker(bunker1ACoords);
var bunker1B = Poly.addBunker(bunker1BCoords);
var bunker1C = Poly.addBunker(bunker1CCoords);
var green1 = Poly.addGreen(green1Coords);
    
//Hole 2
var blackTee2 = Poly.addBlack(black2Coords);
var blueTee2 = Poly.addBlue(blue2Coords);
var whiteTee2 = Poly.addWhite(white2Coords);
var goldTee2 = Poly.addGold(gold2Coords);
var jrTee2 = Poly.addJr(jr2Coords);
var green2 = Poly.addGreen(green2Coords);
var bunker2A = Poly.addBunker(bunker2ACoords);
var bunker2BCenter = '(43.265868434461865, -70.90236201882362)';
var bunker2B = Poly.addBunker(bunker2BCoords);
    
//Hole 3
var blackTee3 = Poly.addBlack(black3Coords);
var blueTee3 = Poly.addBlue(blue3Coords);
var blueTee3B = Poly.addBlue(blue3BCoords);
var whiteTee3 = Poly.addWhite(white3Coords);
var goldTee3 = Poly.addGold(gold3Coords);
var jrTee3 = Poly.addJr(jr3Coords);
var green3 = Poly.addGreen(green3Coords);
var bunker3BCenter = '(43.26832347453623, -70.90139508247375)';
var bunker3B = Poly.addBunker(bunker3BCoords);
    
    
//Hole 4
//Hole 5
//Hole 6
//Hole 7
//Hole 8
//Hole 9
var green9Center = '(43.26978824841828, -70.90358912944794)';
var green9 = Poly.addGreen(green9Coords);
var bunker9C = Poly.addBunker(bunker9CCoords);
    
//Hole 10
var white10 = Poly.addWhite(white10Coords);
    
//Hole 11
//Hole 12
//Hole 13
//Hole 14
//Hole 15
//Hole 16
//Hole 17
//Hole 18
var green18Center = '(43.27144340048304, -70.90403571724892)';
var green18 = Poly.addGreen(green18Coords);

// ---- DESCRIPTIONS --- //
        
// // ---- MarkerWin ----// //
    //Markers and InfoWindows (or combos of both)
    //Create a new MarkerWin object first, then call prototype methods
    //Example:
    //  //var mwin = new MarkerWin
    //  //mwin.addMrkr(43.27101081936183, -70.90431869029999)
(function(window, google){
    //Constructor function:
        var MarkerWin = (function(){
            function MarkerWin(){
            }
            
        //Prototype:
            MarkerWin.prototype = {
                newTeeWin: function(obj, pref, par, yds, hcp){
                    var desc = makeDesc(pref, par, yds, hcp);
                    var mObj = obj;
                    var iWin = new google.maps.InfoWindow({content: desc});
                    obj.addListener('click', function(){
                        iWin.open(gMap, mObj);
                    });
                    infoWins.push(iWin);
                    return iWin;
                },
                newTeeMrkr: function(mLat, mLng, pref, mTitle) {
                    var markerOpts = {
                        id: 'teeMrkr-' + pref,
                        title: mTitle,
                        position: {
                          lat: mLat,
                          lng: mLng
                        },
                        draggable: true,
                        opacity: 0.3,
                        map: gMap //gMap recreates the map (necessary) upon adding a marker
                        };
                    var mImg = getImgByPref(pref);
                    var newMarker = new google.maps.Marker(markerOpts);
                        newMarker.setIcon(mImg);
                        google.maps.event.addListener(newMarker,"mouseover",function(){
                            newMarker.setOptions({opacity: 0.8});
                            newMarker.addListener('click', function(){
                                newMarker.setOpacity(1);
                            });
                            newMarker.addListener('drag', function(){
                                newMarker.setOpacity(1);
                            });
                        });
                        google.maps.event.addListener(newMarker,"mouseout",function(){
                            newMarker.setOptions({opacity: 0.3});
                        });
                    markers.push(newMarker);
                    return newMarker;
                },
                newMrkrWin: function(mLat, mLng, pref, mTitle, par, yds, hcp, gPos){
                    var newMarker = this.newTeeMrkr(mLat, mLng, pref, mTitle);
                    var newWin = this.newTeeWin(newMarker, pref, par, yds, hcp)
                    this._teeDrag(newMarker, pref, gPos);
                    return newMarker;
                },
                addHover: function(obj, over, out){
                //add default (standard) events to the marker
                    var mObj = obj;
                    mObj.setOpacity(out);
                    google.maps.event.addListener(mObj, 'mouseover', function(){
                        mObj.setOpacity(over);
                        mObj.addListener('click', function(){
                            mObj.setOpacity(1);
                        });
                        mObj.addListener('drag', function(){
                            mObj.setOpacity(1);
                        });
                    });
                    google.maps.event.addListener(mObj, 'mouseout', function(){
                        mObj.setOpacity(out);
                    });
                },
                _createMarker: function(mLat, mLng, pref, mTitle){
                //generate new marker id (always equal to number of markers in array)
                    var mId = markers.length;
                //default options
                    var defOpts = {
                        id: 'mrkr' + pref,
                        title: mTitle,
                        position: {
                            lat: mLat,
                            lng: mLng
                        },
                        draggable: true,
                        opacity: 0.75,
                        map: gMap
                    };
                //create the marker
                    var newMrkr = new google.maps.Marker(defOpts);
                //add new marker to the array
                    markers.push(newMrkr);
                    
                    return newMrkr;
                },
                addMrkr: function(mLat, mLng, pref, mTitle){
                    var newMrkr = this._createMarker(mLat, mLng, pref, mTitle);
                    this.addHover(newMrkr, 0.9, 0.75); //default hover behavior (modifiable with .addHover())
                    console.log(markers);
                    return newMrkr;
                },
                _editInfoWin: function(obj){
                    var iWin = obj;
                    var winContent = iWin.content;
                    var mytop = 0;
                    var myleft = window.innerWidth - 300;
                    var myZ = 11;
                    //var tArea = document.createElement('textarea');
                    //tArea.nodeValue = winContent;
                    //editDiv.innerHTML = tArea;
                    //var outer = editDiv.outerHTML;
                    var thisMap = document.getElementById('map-canvas');
                    var myContent = '<div id="winEdit" style="position: absolute; width: 600px; height: 400px; top: ' + mytop + '; left: ' + myleft + '; z-index: ' + myZ + ';"><table><tr><td></td></tr><tr><td><textarea id="winEditText">' + winContent + '</textarea></td></tr><tr><td><button name="Save">Save</button></td></tr></table></div>';
                    thisMap.insertAdjacentHTML('beforeBegin', myContent);
                },
                _createInfoWin: function(obj){
                    var defContent = '<h3>Info Window Content:</h4>(modifiable with .winContent())';
                    var defOpts = {
                        content: defContent
                    };
                    var newIWin = new google.maps.InfoWindow(defOpts);
                    //listener on the marker to open the info window
                    obj.addListener('click', function(){
                        newIWin.open(gMap, obj);
                    });
                    //listener on dragging the marker to close the info window
                    //// need separate function/object for player markers (tee box)
                    //// or a function to remove this listener.
                    obj.addListener('drag', function(){
                        newIWin.close();
                    });
                    
                    return newIWin;
                },
                addInfoWin: function(obj){
                    var newIWin = this._createInfoWin(obj);
                    //listener for double-clicking the infoWin:
                    newIWin.addListener('rightclick', function(){
                        this._editInfoWin(newIWin);
                    });
                    return newIWin;
                },
                winContent: function(obj, cont){
                    var newIWin = obj;
                    obj.content = cont;
                    return newIWin;
                },
                _teeDrag: function(mrk, pref, gPos){
                    var mObj = mrk;
                    mObj.addListener('click',function(e){
                        var myLat = e.latLng.lat();
                        var myLng = e.latLng.lng();
                        var myPos = {
                            lat: myLat,
                            lng: myLng
                        };
                        gMap.setCenter(myPos);
                        gMap.setZoom(24);
                    });
                    mObj.addListener('drag', function(e){
                        var ydId = pref + 'yds';
                        var ydCell = document.getElementById(ydId);
                        if (ydCell == null) {
                        } else {
                            myLat = e.latLng.lat();
                            myLng = e.latLng.lng();
                            myPos = {
                                lat: myLat,
                                lng: myLng
                            };
                            var toGreen = getDistance(myPos, gPos);
                            toGreen = Math.round(toGreen);
                            ydCell.innerHTML = 'Yds: ' + toGreen;
                        }
                    });
                },
                addMrkrEvents: function(mrk, pref, gPos){
                    this._teeDrag(mrk, pref, gPos);
                },
                teeLoop: function(mArr, hNum, gCent){
                    var pref;
                    var num = mArr.length - 1;
                    for (var i = 0; num; i++) {
                        if (i == mArr.length) {break;}
                        if (i == 0) {
                            pref = 'black' + hNum;
                        } else if (i == 1) {
                            pref = 'blue' + hNum;
                        } else if (i == 2) {
                            pref = 'white' + hNum;
                        } else if (i == 3) {
                            pref = 'gold' + hNum;
                        } else if (i == 4) {
                            pref = 'jr' + hNum;
                        }
                        //console.log(mArr[i]);
                    this._teeDrag(mArr[i], pref, gCent);
                    }
                }
            };
            
            return MarkerWin;
    }());
    
    //Factory function:
        MarkerWin.create = function(){
            return new MarkerWin();
        };
        window.MarkerWin = MarkerWin;
}(window, window.google));


// // ---- Draw Objects Using MarkerWin Function ---- // //
//Create an instance of the MarkerWin
var markers = [];
var mwin = new MarkerWin();
// Markers //
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


////end self-instigating function.
}(window, window.google));