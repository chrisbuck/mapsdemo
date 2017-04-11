(function(window, google, List){
//Module
  
  //Constructor function
  var Mapster = (function(){
    function Mapster(element, opts) {
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
      if (opts.cluster) {
        this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.cluster.options);
      }

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
          opts.callback.call(self, e);
        });
      },
      addMarker: function(opts) {
        var marker;
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        },
        marker = this._createMarker(opts);
        if (this.markerClusterer) {
          this.markerClusterer.addMarker(marker);
        }
        this.markers.add(marker);
        if (opts.event) {
          this._on({
            obj: marker,
            event: opts.event.name,
            callback: opts.event.callback
          });
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
      _createMarker: function(opts) {
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
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
      }
    };
    return Mapster;
  }());
  
  //Factory function
  Mapster.create = function(element, opts) {
      return new Mapster(element, opts);
  };
  
  window.Mapster = Mapster;
  
}(window, window.google, List))