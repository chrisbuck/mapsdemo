var fs = require('fs');
var holeFile = require('./holedata.json');
var holes = {
    hole_1: {
    tees: {
        black: {
            center: null,
            coords: null
        },
        blue: {
            center: null,
            coords: null
        },
        white: {
            center: null,
            coords: null
        },
        gold: {
            center: null,
            coords: null
        },
        jr: {
            center: null,
            coords: null
        }
    }
    }
};
console.log(holes.hole_1);
var writeStr = JSON.stringify(holes);
console.log(writeStr);
fs.writeFile('./holedata.json', writeStr);
/*, function(err, status){
   status = 'ok';
    console.log(status);
});*/