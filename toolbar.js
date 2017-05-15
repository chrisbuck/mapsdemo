var $j = jQuery;

// -- Settings Bar -- //
// - HTML - //
var sBarCode = '<table id="settingsTbl"><tr><th colspan="2">Settings</th></tr>';
    sBarCode += '<tr><td>Elevation (heatmap):</td><td class="toggleCell"><div id="heatOuterToggle"><div id="heatInnerToggle"></div></div></td></tr>';
    sBarCode += '</table>';

//Count
var sBarCnt = 0;
var heatBool = false;

//jQuery
var $sBar = $j('#settingsBar');
//Settings Icon
//dimensions - 50x50
//padding-right: 3px
//padding-top: 3px
$j('#settingsIcon').hover(function(){
    $j(this).css('opacity', '0.8');
    }, function(){
    $j(this).css('opacity', '0.3');
});
$j('#settingsIcon').click(function(){
    $j(this).css('opacity', '1');
    if (sBarCnt == 0){
        $sBar.html(sBarCode);
        $sBar.animate({width: 175}, 150);
    } else if ($sBar.width() == 175){
        $sBar.animate({width: 0}, 100, function(){
            $j(this).hide();
        });
    } else if ($sBar.width() == 0){
        //$sBar.html(sBarCode);
        $sBar.show();
        $sBar.animate({width: 175}, 150);
    }
    sBarCnt++;
    $j('#heatInnerToggle').click(function(){
        var btn = $j(this);
        var prnt = $j(this).parent();
        if(heatBool == false){
            btn.css({
                position: 'relative',
                left: 0
            }).animate({
                left: 18
            },100, function(){
                prnt.css('background-color','#279cff');
            });
            dotAddLoop();
            heatBool = true;
        } else {
            btn.css({
                position: 'relative',
                left: 18
            }).animate({
                left: 0
            },100, function(){
                prnt.css('background-color','darkgray');
            });
            dotRemoveLoop();
            heatBool = false;
        }
        });
});
