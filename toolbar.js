var $j = jQuery;

// -- Settings Bar -- //
// - HTML - //
var sBarCode = '<table id="settingsTbl"><tr><th colspan="2">Settings</th></tr>';
    sBarCode += '<tr><td>Elevation (heatmap):</td><td class="toggleCell"><div id="heatOuterToggle"><div id="heatInnerToggle"></div></div></td></tr>';
    sBarCode += '</table>';
var profileCode = '<form class="form-signin"><h2 class="form-signin-heading">Please Log In</h2><input type="text" id="username" class="form-control" placeholder="Email address" autofocus required><input type="password" id="password" class="form-control" placeholder="Password" required><button class="btn btn-lg btn-default" type="button" id="btn-login">Log In</button><button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button><button class="btn btn-lg btn-danger" type="button" id="btn-google">Log In with Google</button></form><div class="form-signin logged-in"><table id="userTbl"><tr><th></th></tr><tr><td></td></th></table><button class="bton btn-lg btn-default btn-block" type="button" id="btn-logout">Log out</button></div>';

//Count
var sBarCnt = 0;
var userCnt = 0;
var heatBool = false;

//js objects
var btn_login;
var btn_logout;
//jQuery
var $sBar = $j('#settingsBar');
/*
var $uBar = $j('#userBar');
//Settings Icon
//dimensions - 50x50
//padding-right: 3px
//padding-top: 3px

var auth = new auth0.WebAuth({
    domain: 'chrisbuck.auth0.com',
    clientID: '25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN',
    redirectUri: window.location.href,
    responseType: 'token id_token'
  });

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    auth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username: username,
      password: password,
    }, function(err) {
      if (err) return alert(err.description);
    });
  }

  function signup() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    auth.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email: username,
      password: password,
    }, function(err) {
      if (err) return alert(err.description);
    });
  }

  function loginWithGoogle() {
    auth.authorize({
      connection: 'google-oauth2'
    });
  }

  function logout() {
     localStorage.removeItem('access_token');
     localStorage.removeItem('id_token');
     window.location.href = "/";
  }

  function show_logged_in(username) {
    document.querySelector('form.form-signin').style.display = "none";
    document.querySelector('div.logged-in').style.display = "block";
  }

  function show_sign_in() {
    document.querySelector('div.logged-in').style.display = "none";
    document.querySelector('form.form-signin').style.display = "block";
  }

  function parseHash() {
    var token = localStorage.getItem('id_token');
    if (token) {
      show_logged_in();
    } else {
      auth.parseHash({ _idTokenVerification: false }, function(err, authResult) {
        if (err) {
          alert('Error: ' + err.errorDescription);
          show_sign_in();
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setUser(authResult);
          show_logged_in();
        }
      });      
    }
  }

    //parseHash();

  function checkLogin() {
    var token = localStorage.getItem('id_token');
    if (token) {
      console.log('token found');
    } else {
      auth.parseHash({ _idTokenVerification: false }, function(err, authResult) {
        if (err) {
          alert('Error: ' + err.errorDescription);
          //show_sign_in();
            console.log('not found')
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setUser(authResult);
          //show_logged_in();
            console.log('logged in - show the user picture');
        }
      });      
    }
  }

  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

var showUserProfile = function(profile) {

  // Used for editing
  var user_id = profile.user_id;
  // ...

  document.getElementById('profileIcon').src = profile.picture;

    $j('#profileIcon').css({
       width: 50,
        height: 50,
        clipPath: 'circle(25px at 47% 53%)'
    });
    
  /*
  document.getElementById('name').textContent = profile.name;
  document.getElementById('email').textContent = profile.email;
  document.getElementById('nickname').textContent = profile.nickname;
  document.getElementById('created_at').textContent = profile.created_at;
  document.getElementById('updated_at').textContent = profile.updated_at;
  
    console.log(profile.picture);
    console.log(profile.name);
    console.log(profile.email);
    console.log(profile.nickname);
    console.log(profile.created_at);
    console.log(profile.updated_at);
};

var lock = new Auth0Lock('25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN', 'chrisbuck.auth0.com');

lock.on("authenticated", function(authResult) {
  //localStorage.setItem('id_token', authResult.idToken);
  lock.getProfile(authResult.idToken, function (err, profile) {
      if (err) {

        // Remove expired token (if any)
        localStorage.removeItem('id_token');

        // Remove expired profile (if any)
        localStorage.removeItem('profile');

        return alert('There was an error getting the profile: ' + err.message);

      } else {

        localStorage.setItem('id_token', authResult.idToken);

        localStorage.setItem('profile', JSON.stringify(profile));

        showUserProfile(profile);
      }
    });

});

var init = function() {
  var id_token = localStorage.getItem('id_token');
  if (id_token) {

    // perform logic for an authenticated user
      var profile = JSON.parse(localStorage.getItem('profile'));
      console.log(profile);
    showUserProfile(profile);
  }
};

init();

var getUserDetails = function(){
    var id_token = localStorage.getItem('id_token');
  if (id_token) {

    // perform logic for an authenticated user
      var profile = JSON.parse(localStorage.getItem('profile'));
      document.querySelector('#userTbl th').innerHTML = profile.nickname;
  }
}

var logout = function() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "/";
};


checkLogin();
*/
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

/*
$j('#profileIcon').click(function(){
    $j(this).css('opacity', '1');
    if (userCnt == 0){
        $uBar.html(profileCode);
        $uBar.animate({width: 175}, 150);
        btn_login = document.getElementById('btn-login');
        btn_logout = document.getElementById('btn-logout');
        document.getElementById('btn-login').addEventListener('click', login);
        document.getElementById('btn-register').addEventListener('click', signup);
        document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
        document.getElementById('btn-logout').addEventListener('click', logout);
        
        getUserDetails();
        
        btn_login.addEventListener('click', function() {
          lock.show();
        });

        btn_logout.addEventListener('click', function() {
          logout();
        });
        
        parseHash();
        
    } else if ($uBar.width() == 175){
        $uBar.animate({width: 0}, 100, function(){
            $j(this).hide();
        });
    } else if ($uBar.width() == 0){
        //$sBar.html(sBarCode);
        $uBar.show();
        $uBar.animate({width: 175}, 150);
    }
    userCnt++;
});
*/