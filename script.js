// ---- DEFINE THE MAP ---- //
//Constructor function
var MyMap = function(){
  function MyMap() {
    
  }
};

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
var recordBool = false;
//Map Listener Function (Toolbar)
//Listener for the Developer Options
var polyDots = [];
var tempPolys = [];

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
	  polyDots.push(polyDot);
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

//InfoWindows
var IWin = function(){
  function IWin(){
  }
};

IWin.attach = function(obj, eventType, cont){
  var infoWindow = new google.maps.InfoWindow({content: cont});
  obj.addListener(eventType, function(){
    infoWindow.open(this.gMap, obj.position);
    });
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
  
  return new google.maps.Polygon(this.opts);
  
};

//White polygons
Poly.addWhite = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = whiteTee;
  this.opts.fillColor = whiteTee;
  
  return new google.maps.Polygon(this.opts);
  
};

//Black polygons
Poly.addBlack = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = blackTee;
  this.opts.fillColor = blackTee;
  
  return new google.maps.Polygon(this.opts);
  
};

//Gold polygons
Poly.addGold = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = goldTee;
  this.opts.fillColor = goldTee;
  
  return new google.maps.Polygon(this.opts);
  
};

//Green tee (juniors) polygons
Poly.addJr = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = jrTee;
  this.opts.fillColor = jrTee;
  
  return new google.maps.Polygon(this.opts);
  
};

//Greens polygons
Poly.addGreen = function(coords){
  this.opts.paths = coords;
  this.opts.strokeColor = greenColor;
  this.opts.fillColor = greenColor;
  
  return new google.maps.Polygon(this.opts);
  
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
MyMap.addMarker = function(myLat, myLng, myId, myTitle){
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
  var newDot = new google.maps.Circle(dotOpts);
  newDot.addListener('click', function() {
    recordBool = false; //Prevent new points being added to the polygon.
    alert('No new points will be added to the polygon.');
  });
  newDot.addListener('rightclick', function() {
	var myPaths = tempPolys[0].getPaths();
	myPaths = myPaths.getArray();
	myPaths = myPaths[0];
	myPaths = myPaths.getArray();
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
	
	var pathsWin = new google.maps.InfoWindow({content: pathsContent});
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

var clubMarker = MyMap.addMarker(43.270438141949775, -70.90466251349028);
IWin.attach(clubMarker, 'click', 'Clubhouse');

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

var putGreen = Poly.addGreen(putCoords);
var green1 = Poly.addGreen(green1Coords);
var blueTee1 = Poly.addBlue(blue1Coords);
var whiteTee1 = Poly.addWhite(white1Coords);
var blackTee1 = Poly.addBlack(black1Coords);
var goldTee1 = Poly.addGold(gold1Coords);
var jrTee1 = Poly.addJr(jr1Coords);
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

// ---- TEST (DRAW) OBJECTS ---- //
IWin.attach(clubMarker, 'rightclick', 'Clubhouse: Pro Shop and Grill');

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