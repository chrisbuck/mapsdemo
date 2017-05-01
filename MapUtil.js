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
    
//Booleans
//var playerBool = false; //toggles the player img (for judging distances)
//var recordBool = false; //toggles recording polygons
var lineBool = false; //allows drawing of lines
    
//Image urls
var blackGolferImg = 'https://www.dropbox.com/s/x86xjzvqjcliseb/blackgolfer.png?dl=1&raw=true';
var blueGolferImg = "https://www.dropbox.com/s/yigs3afxedjog8h/bluegolfer.png?dl=1&raw=true";
var whiteGolferImg = "https://www.dropbox.com/s/hzytbncyboackkf/whitegolfer.png?dl=1&raw=true";
var goldGolferImg = "https://www.dropbox.com/s/cq840ydfci4npto/goldgolfer.png?dl=1&raw=true";
var jrGolferImg = "https://www.dropbox.com/s/lujzxsl9r68og2u/jrgolfer.png?dl=1&raw=true";
var greenImg = "https://www.dropbox.com/s/gy6jxbqxksyj2i9/greenicon.png?dl=1&raw=true";
    
var markers = [];
var infoWins = [];

//color options
var blueTee = '#08088A';
var blackTee = '#000000';
var whiteTee = '#FFFFFF';
var goldTee = '#DBA901';
var jrTee = '#21610B';
var greenColor = '#31B404';
var bunkerColor = '#F6E3CE';
var bunkerBorder = '#36220d';
    
var polyOpts = {
  strokeOpacity: 0.25,
  strokeWeight: 2,
  fillOpacity: 0.15
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
}
    
    //Constructor function:
        var MapUtil = (function(){
            function MapUtil(element, opts){
                this.gMap = new google.maps.Map(element, opts);
            }
            
        //Prototype:
            MapUtil.prototype = {
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
                    //var markers = [];
                    //var mId = markers.length;
                    
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
                        //markers.push(newMrkr);
                    
                    return newMrkr;
                },
                addMrkr: function(mLat, mLng, pref, mTitle){
                    var newMrkr = this._createMarker(mLat, mLng, pref, mTitle);
                    this.addHover(newMrkr, 0.9, 0.75); //default hover behavior (modifiable with .addHover())
                    //console.log(markers);
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
                },
                addBlack: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = blackTee;
                    polyOpts.fillColor = blackTee;
                    polyOpts.map = gMap;

                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        this.setOptions({fillOpacity: 0.3});
                    });
                    newMrkr.addListener('mouseout', function(){
                        this.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;

                },
                addBlue: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = blueTee;
                    polyOpts.fillColor = blueTee;
                    polyOpts.map = gMap;

                    var newMrkr = new google.maps.Polygon(polyOpts);
                        newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillColor: "#0000f2"});
                        newMrkr.setOptions({fillOpacity: 0.3});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillColor: "#08088A"});
                        newMrkr.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;

                },
                addWhite: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = whiteTee;
                    polyOpts.fillColor = whiteTee;
                    polyOpts.map = gMap;

                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillOpacity: 0.3});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;

                },
                addGold: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = goldTee;
                    polyOpts.fillColor = goldTee;
                    polyOpts.map = gMap;
  
                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillOpacity: 0.3});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;

                },
                addJr: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = jrTee;
                    polyOpts.fillColor = jrTee;
                    polyOpts.map = gMap;

                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillColor: '#2e9d08'});
                        newMrkr.setOptions({fillOpacity: 0.3});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillColor: '#21610B'});
                        newMrkr.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;

                },
                addGreen: function(coords){
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = greenColor;
                    polyOpts.fillColor = greenColor;
                    polyOpts.map = gMap;

                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillColor: "#00FF00"});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillColor: "#31B404"});
                    });

                    return newMrkr;
                },
                addBunker: function(coords) {
                    polyOpts.paths = coords;
                    polyOpts.strokeColor = bunkerBorder;
                    polyOpts.fillColor = bunkerColor;
                    polyOpts.map = gMap;
    
                    var newMrkr = new google.maps.Polygon(polyOpts);
                    newMrkr.addListener('rightclick', function(e){
                        alert(e.latLng.lat() + ', ' + e.latLng.lng());
                    });
                    newMrkr.addListener('mouseover', function(){
                        newMrkr.setOptions({fillOpacity: 0.5});
                    });
                    newMrkr.addListener('mouseout', function(){
                        newMrkr.setOptions({fillOpacity: 0.15});
                    });

                    return newMrkr;
                },
                addPlayer: function(cent){
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
                }
            };
            
            return MapUtil;
    }());
    
    //Factory function:
        MapUtil.create = function(element, opts){
            var mymap = new MapUtil(element, opts);
            return mymap;
        };
        window.MapUtil = MapUtil;
        
}(window, window.google));