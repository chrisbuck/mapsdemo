var $j = jQuery;

// -- Settings Bar -- //
// - HTML - //
var sBarCode = '<table><tr><th colspan="2">Settings</th></tr></table>';
var sBarCnt = 0;
var $sBar = $j('#settingsBar');
//Settings Icon
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
            $j(this).html('');
        });
    } else if ($sBar.width() == 0){
        $sBar.html(sBarCode);
        $sBar.animate({width: 175}, 150);
    }
    sBarCnt++;
});