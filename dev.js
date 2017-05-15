var devBool = false;

if(devBool == true){
google.maps.event.addListenerOnce(gMap, 'click', function(a){
    //get point a
    var ptA = {
        lat: a.latLng.lat(),
        lng: a.latLng.lng()
    };
    var aPixel = a.pixel;
    var aX = aPixel.x;
    var aY = aPixel.y;
    console.log(aPixel);
    google.maps.event.addListenerOnce(gMap, 'click', function(b){
        //get point b
        var ptB = {
            lat: b.latLng.lat(),
            lng: b.latLng.lng()
        };
        var bPixel = b.pixel;
        var bX = bPixel.x;
        var bY = bPixel.y;
        console.log(bPixel);
        //compute points topR and botL
        var ptTopR = {
            lat: ptB.lat,
            lng: ptA.lng
        };
        var ptBotL = {
            lat: ptA.lat,
            lng: ptB.lng
        };
        /*
        //draw the rectangle
        var ptNE = new google.maps.LatLng(ptTopR.lat, ptTopR.lng);
        var ptSW = new google.maps.LatLng(ptBotL.lat, ptBotL.lng);
        var myBounds = new google.maps.LatLngBounds(ptNE, ptSW);
        var rectOpts = {
            bounds: myBounds,
            map: gMap,
            clickable: true,
            draggable: true,
            editable: true,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FFFFFF',
            fillOpacity: 0.5,
            zIndex: 20
        };
        var newRect = new google.maps.Rectangle(rectOpts);
        //console.log(ptNE.getStyle('top'));
        //console.log(ptNE.style.top);
        */
        var $j = jQuery;
        $j('#map-canvas').css({
            'position': 'absolute',
            'clip': 'rect(' + aY + 'px, ' + bX + 'px, ' + bY + 'px, ' + aX + 'px)'
        });
        console.log('{lat: ' + ptA.lat + ', lng: ' + ptA.lng + '},{lat: ' + ptTopR.lat + ', lng: ' + ptTopR.lng + '},{lat: ' + ptB.lat + ', lng: ' + ptB.lng + '},{lat: ' + ptBotL.lat + ', lng: ' + ptBotL.lng + '}');
        //console.log('winInnerWidth: ' + window.innerWidth);
        //console.log('winOuterWidth: ' + window.outerWidth);
        //console.log('winInnerHeight: ' + window.innerHeight);
        //console.log('winOuterHeight: ' + window.outerHeight);
        //console.log('winParentInnerWidth: ' + window.parent.innerWidth);
        //console.log('winParentOuterWidth: ' + window.parent.outerWidth);
        //console.log('winParentInnerHeight: ' + window.parent.innerHeight);
        //console.log('winParentOuterHeight: ' + window.parent.outerHeight);
        var wParentInnerWidth = window.parent.innerWidth;
        var wParentOuterWidth = window.parent.outerWidth;
        var wParentInnerHeight = window.parent.innerHeight;
        var wParentOuterHeight = window.parent.outerHeight;
        var xOff = aX;
        var yOff = (wParentOuterHeight - wParentInnerHeight) + aY;
        var iHeight = bY - aY;
        var iWidth = bX - aX;
        console.log('Crop to ' + iWidth + ' width');
        console.log('Crop to ' + iHeight + ' height');
        console.log('xOffset: ' + xOff);
        console.log('yOffset: ' + yOff);
    });
});
}