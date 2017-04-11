(function(window) {
  var List = (function() {
    function List(params) { 
      //constructor function
      this.items = [];
    }
    List.prototype = {
      add: function(item) {
        this.items.push(item);
      },
      remove: function(item) {
        var indexOf = this.items.indexOf(item);
        if (indexOf !== -1) {
          this.items.splice(indexOf, 1);
        }
      },
      find: function(callback, action) {
        var callbackReturn,
          items = this.items,
          length = items.length,
          matches = []; //array because several items may match condition.
        var i;
          
        for(i = 0; i < length; i++) {
          callbackReturn = callback(items[i], i);
          if (callbackReturn) {
            matches.push(items[i]);
          }
        }
        
        if (action) {
          action.call(this, matches);
        }
        
        return matches;
      }
    };
    return List;
  }());
  
  //Factory method
  List.create = function(params) {
    return new List(params);
  };
  
  window.List = List;
  
}(window));