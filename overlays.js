var overlayBool = false;
//var overlays = [];
var overObj1 = {
    img: './images/overlays/map01.png',
    swLat: 43.27057042323355,
    swLng: -70.90546265244484,
    neLat: 43.270920006230334,
    neLng: -70.90422615408897
};

if(overlayBool == true){
    // Ground Overlay //
    function addOverlay(obj){
        var myOverlay;

        /*var oBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng({
                lat: obj.swLat,
                lng: obj.swLng
            }),
            new google.maps.LatLng({
                lat: obj.neLat,
                lng: obj.neLng
            })
        );*/
        var oBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(obj.swLat, obj.swLng),
            new google.maps.LatLng(obj.neLat, obj.neLng)
        );
        //console.log(oBounds);
        var oImg = obj.img;
        myOverlay = new google.maps.GroundOverlay(oImg, oBounds);
        console.log(myOverlay);
        myOverlay.setMap(gMap);
        myOverlay.clickable = true;
        myOverlay.opacity = 1;

        return myOverlay;
        //Notes:
            //need to trigger markers, polygons, and click events to fire on the tiled overlays.
            //maybe create one "super" overlay (high res), for the entire map.
            //or trigger markers, polygons and clicks on the window, instead of map canvas.

        //--// end test ground overlay
    };
    var over1 = addOverlay(overObj1);
}