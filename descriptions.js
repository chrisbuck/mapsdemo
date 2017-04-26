(function(window, google){

var Desc = (function(element, opts){
    function Desc(){
        this.gMap = document.getElementById('map-canvas');
    }
    Desc.prototype = {
        addNew: function(element, cont){
            var descWin = new google.maps.InfoWindow({content: cont});
            descWin.open(gMap, element);
            return descWin;
        }
    }
    return Desc;
}());
    
    Desc.create = function(element, opts){
        return new Desc(element, opts);
    };
    
    window.Desc = Desc;
    
}(window, window.google));