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
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};

mwin = mwin.create(mapEl, mapOpts);
gMap = mwin.gMap;
    
//var gMap = MapUtil.create(mapEl,mapOpts);

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

//Poly object (empty constructor)
var Poly = function(){
  function Poly(){
    
  }
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

/*    
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
*/
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

//Map events
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
      

  }
  //for each item in the array, add a dragend listener function to modify the position of the coord
  //add a listener function to return the code for the new polygon
});
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
//Hole 5
//Hole 6
//Hole 7
//Hole 8
var green8 = mwin.addGreen(green8Coords);
//Hole 9
var green9 = mwin.addGreen(green9Coords);
var bunker9C = mwin.addBunker(bunker9CCoords);
    
//Hole 10
var white10 = mwin.addWhite(white10Coords);
    
//Hole 11
//Hole 12
//Hole 13
//Hole 14
//Hole 15
//Hole 16
//Hole 17
//Hole 18
var green18 = mwin.addGreen(green18Coords);

// ---- DESCRIPTIONS --- //
        
// // ---- MarkerWin ----// //
/*
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
*/

// // ---- Draw Objects Using MarkerWin Function ---- // //
//Create an instance of the MarkerWin
var markers = [];

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
//Hole 8
    
////end self-instigating function.
}(window, window.google, window.MapUtil || (window.MapUtil = {})));