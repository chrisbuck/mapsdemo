var $j = jQuery;

// -- Settings Bar -- //
// - HTML - //
var sBarCode = '<table id="settingsTbl"><tr><th colspan="2">Settings</th></tr>';
    sBarCode += '<tr><td>Elevation (heatmap):</td><td class="toggleCell"><div id="heatOuterToggle"><div id="heatInnerToggle"></div></div></td></tr>';
    sBarCode += '</table>';
var profileCode = '<form class="form-signin"><h2 class="form-signin-heading">Please Log In</h2><input type="text" id="username" class="form-control" placeholder="Email address" autofocus required><input type="password" id="password" class="form-control" placeholder="Password" required><button class="btn btn-lg btn-default" type="button" id="btn-login">Log In</button><button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button><button class="btn btn-lg btn-danger" type="button" id="btn-google">Log In with Google</button></form><div class="form-signin logged-in"><button class="bton btn-lg btn-default btn-block" type="button" id="btn-logout">Log out</button></div>';

//Count
var sBarCnt = 0;
var userCnt = 0;
var heatBool = false;

//js objects
var btn_login;
var btn_logout;
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
$j('#profileIcon').hover(function(){
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
$j('#profileIcon').click(function(){
    $j(this).css('opacity', '1');
    if (userCnt == 0){
        $sBar.html(profileCode);
        $sBar.animate({width: 175}, 150);
        btn_login = document.getElementById('btn-login');
        btn_logout = document.getElementById('btn-logout');
        document.getElementById('btn-login').addEventListener('click', login);
        document.getElementById('btn-register').addEventListener('click', signup);
        document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
        document.getElementById('btn-logout').addEventListener('click', logout);
        
        btn_login.addEventListener('click', function() {
          lock.show();
        });

        btn_logout.addEventListener('click', function() {
          logout();
        });
        
    } else if ($sBar.width() == 175){
        $sBar.animate({width: 0}, 100, function(){
            $j(this).hide();
        });
    } else if ($sBar.width() == 0){
        //$sBar.html(sBarCode);
        $sBar.show();
        $sBar.animate({width: 175}, 150);
    }
    userCnt++;
});