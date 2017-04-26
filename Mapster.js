(function(window, google, List){
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
  
  var Mapster = (function(){
    function Mapster(element, opts) {
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
    }
    Mapster.prototype = {
      zoom: function(level){
        if (level) {
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },
      _on: function(opts) {
        var self = this; //changes this to Mapster library
        google.maps.event.addListener(opts.obj, opts.event, function(e){
          opts.callback.call(self, e, opts.obj);
        });
      },
	  getCurrentPosition: function(callback) {
		  if(navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				  callback.call(this, position);
			  });
		  }
	  },
      setPano: function(element, opts) {
        var panorama = new google.maps.StreetViewPanorama(element, opts);
        if (opts.events) {
          this._attachEvents(panorama, opts.events);
        }
        this.gMap.setStreetView(panorama);
      },
      addMarker: function(opts) {
        var marker,
          self = this;  //used in markers.add, to reference Mapster library.
        
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        },
        marker = this._createMarker(opts);
        this.markers.add(marker);
        if (opts.events) {
          this._attachEvents(marker, opts.events);
        }
        if (opts.content) {
          this._on({
            obj: marker,
            event: 'click',
            callback: function() {
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content
              });
              
              infoWindow.open(this.gMap, marker);
              
            }
          });
        }
        return marker;
      },
      _attachEvents: function(obj, events) {
        var self = this;
        events.forEach(function(event) {//foreach function on events array (to deal with multiple events)
            self._on({//originally this._on - needs to be "self," to indicate that "this" is the Mapster library.
              obj: obj,
              event: event.name,
              callback: event.callback
            });
          });
      },
      findBy: function(callback) {
        this.markers.find(callback); //(not necessary to include a return, unless to demonstrate it works???)
      },
      removeBy: function(callback) {
        this.markers.find(callback, function(markers) {
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
        });
      },
/* Removed and incorporated in List.js
      findMarkerByLat: function(lat) {
        var i = 0;
        for(; i < this.markers.length; i++) {
          var marker = this.markers[i];
          if (marker.position.lat() === lat) {
            return marker;
          }
        }
      },
*/
      _createMarker: function(opts) {
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
      }
    };
    return Mapster;
  }());
  
  Mapster.create = function(element, opts) {
      return new Mapster(element, opts);
  };
  
  window.Mapster = Mapster;
  
}(window, window.google, List))