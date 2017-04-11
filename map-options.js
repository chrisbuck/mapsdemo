(function(window, google, mapster){
  
  mapster.MAP_OPTIONS = {
    center: {
      lat: 43.2706725,
      lng: -70.9046947
    },
    zoom: 18,
    disableDefaultUI: false, //disables native zoom buttons
    scrollwheel: true, //enable or disable scroll wheel for zoom
    draggable: true, // enable or disable draggable
    mapTypeId: google.maps.MapTypeId.SATELLITE,  //map type
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT,
      style: google.maps.ZoomControlStyle.SMALL
    },
    panControlOptions: {
      position: google.maps.ControlPosition.RIGHT
    },
    cluster: {
      options: {
        styles: [{
          url: 'https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m1.png',
          height: 56,
          width: 55,
          textColor: '#F00',
          textSize: 18
        },{
          url: 'https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m2.png',
          height: 56,
          width: 55,
          textColor: '#F00',
          textSize: 18
        }]
      }
    }
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))