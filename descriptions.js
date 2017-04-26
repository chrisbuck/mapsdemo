(function(win, google){

var Desc = (function(holeNum, pos, par, yds, hcp){
  function Desc(){
      this.opts = {};
      var gMap = this.map;
  }
});   
    Desc.prototype = (function(){
        addNew = function(holeNum, pos){
            var defOpts = {
                content: 'Hole ' + holeNum,
                position: pos
            };
            var dWin = new google.maps.InfoWindow(defOpts);
            return dWin;
        };
    });

    
var desc = new Desc();
    
return desc;
    
})(window, window.google);