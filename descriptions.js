function makeDesc(pref, par, yds, hcap){
    var bg;
    var txt;
    var hNum;
    if (pref.search('blue') > -1){
        bg = '#010179;';
        txt = '#FFFFFF;';
        hNum = pref.replace('blue','');
    } else if (pref.search('white') > -1){
        bg = '#FFFFFF;';
        txt = '#000000;';
        hNum = pref.replace('white','');
    } else if (pref.search('black') > -1){
        bg = '#000000;';
        txt = '#FFFFFF;';
        hNum = pref.replace('black','');
    } else if (pref.search('gold') > -1){
        bg = '#DBA901;';
        txt = '#000000;';
        hNum = pref.replace('gold','');
    } else if (pref.search('jr') > -1){
        bg = '#21610B;';
        txt = '#000000;';
        hNum = pref.replace('jr','');
    } else if (pref.search('green') > -1){
        bg = '#31B404;';
        txt = '#000000;';
        hNum = pref.replace('green','');
    }
    var holeTbl = '<div class="dscTbl" id="' + pref + 'DescTbl"><table border="1px solid #F2F2F2"><tr><td style="background-color: ' + bg + ' padding-left: 3px; padding-right: 1px;"><span style="color: ' + txt + '"><strong>Hole ' + hNum + '</strong></span></td><td style="padding-left: 3px; padding-right: 1px;"><strong>Par ' + par + '</strong></td><td id="' + pref + 'yds" style="padding-left: 3px; padding-right: 1px;">Yds: ' + yds + '</td><td style="padding-left: 3px; padding-right: 1px;">Hcp: ' + hcap + '</td></tr></table></div><div class="dscTxt" id="' + pref + 'DescTxt">';
    return holeTbl;
}

//Hole 1
var blue1Details = '<p>From the blue tees, the first set of bunkers (~180 yds) are reachable for many golfers. Trouble spots off the tee box are the bunkers and right-side trees (with most golfers hitting left-right fades).</p><em>Strategy:&nbsp;</em></br><ul><li>Drive:&nbsp; Easy swing off the tee box, left side fairway.</li><li>2nd:&nbsp; (~150 yds) Wedge to the right-side green (pin hunting is high risk, low payoff, with a greenside bunker and a green that is hard to hold).</li><li>Green:&nbsp; 2-put for par.</li></ul><p><em>Birdie Chance:&nbsp;</em><strong>Low</strong></p></div>';
var blue1Desc = makeDesc('blue1', 4, 306, 18) + blue1Details;