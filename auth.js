var $j = jQuery;

$j(document).ready(function() {
  var lock = new Auth0Lock('25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN', 'chrisbuck.auth0.com', {
    auth: { 
      params: { 
        scope: 'openid email' 
      }
    }
  });

var userProfile;
var loginSwitch;
var loginHeader;
var signupHeader;
var mystatus;

$j('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show();
});

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);
      
    // Display user information
    testuser.name = (profile.nickname);
    //$('.avatar').attr('src', profile.picture);
    $j('#profileIcon').attr('src', profile.picture);
    $j('#profileIcon').css({
        width: 50,
        height: 50,
        clipPath: 'circle(25px at 47% 53%)'
    });
    mystatus = 'logged_in';
      
  });
});

function refreshLogin(){
var id_token = localStorage.getItem('id_token');
if (id_token) {
    lock.getProfile(id_token, function (err, profile) {
        if (err) {
          console.log('There was an error getting the profile: ' + err.message);
        } else {
            // Display user information
            //$j('.nickname').text(profile.nickname);
            //$('.avatar').attr('src', profile.picture);
            $j('#profileIcon').attr('src', profile.picture);
            $j('#profileIcon').css({
                width: 50,
                height: 50,
                clipPath: 'circle(25px at 47% 53%)'
            });
            mystatus = 'logged_in';
        }
    });
}
}

//Form HTML

//called from profileIcon click
function setLoginStyles(){
    console.log(loginSwitch);
    if(loginSwitch == 'login'){
        $j('#loginHeader').css("background-color", "rgba(19, 26, 195, 0.6)");
        $j('#loginHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 26, 195, 0.6)");
        });
        $j('#signupHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0)");
        });
    } else if(loginSwitch == 'signup'){
        $j('#signupHeader').css("background-color", "rgba(19, 26, 195, 0.6)");
        $j('#signupHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 26, 195, 0.6)");
        });
        $j('#loginHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0)");
        });
    } else {
        $j('#loginHeader').css("background-color", "rgba(19, 26, 195, 0.6)");
        $j('#loginHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 26, 195, 0.6)");
        });
        $j('#signupHeader').hover(function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0.6)");
        }, function(){
            $j(this).css("background-color", "rgba(19, 195, 26, 0)");
        });
    }

    
}
    
function setLoginForm(sel){
var formCode;
var loginCode;
var signupCode;
    
    //login code
    loginCode = '<form class="form-signin">';
    loginCode += '<table style="width: 100%">';
    loginCode += '<tr><td style="min-width: 25%">Email:</td><td style="min-width: 50%"><input type="text" id="username" class="form-control" placeholder="Email address" autofocus required></td><td style="min-width: 25%"></tr>';
    loginCode += '<tr><td>Password:</td><td><input type="password" id="password" class="form-control" placeholder="Password" required></td>';
    loginCode += '<td><button class="btn btn-lg btn-default" type="button" id="btn-login">Log In</button></td></tr>';
    loginCode += '<tr><td></td><td><span style="text-align: center"><image class="btn btn-lg btn-danger" id="btn-google" src="/images/googlelogin.png" style="display: block; margin: 0 auto; max-width: 200px;"></span></td><td></td></tr>';
    loginCode += '</table>';
    loginCode += '</form>';
    
    //signup code
    signupCode = '<form class="form-signin">';
    signupCode += '<button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button>';
    signupCode += '</form>';
    
    if(sel == 'login'){
        formCode = loginCode;
        loginSwitch = 'login';
    } else if(sel == 'signup'){
        formCode = signupCode;
        loginSwitch = 'signup';
    } else {
        formCode = loginCode;
        loginSwitch = 'login';
    }

    $j('#userAuthCell').html(formCode);
    
    return formCode;
}

var auth = new auth0.WebAuth({
    domain: 'chrisbuck.auth0.com',
    clientID: '25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN',
    redirectUri: window.location.href,
    responseType: 'token id_token'
});

function login() {
        var username = $j('#username').val();
        var password = $j('#password').val();
        auth.redirect.loginWithCredentials({
            connection: 'Username-Password-Authentication',
            username: username,
            password: password,
        }, function(err) {
            //if (err) return alert(err.description);
        });
}

function signup() {
        var username = $j('#username').val();
        var password = $j('#password').val();
        auth.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email: username,
            password: password,
        }, function(err) {
            //if (err) return alert(err.description);
        });
    }

function loginWithGoogle() {
    auth.authorize({
        connection: 'google-oauth2'
    });
}

function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        window.location.href = "/";
    }
    
$j('#profileIcon').click(function(){
    var winWidth = $j(window).innerWidth();
    var popMargin = (winWidth - 350) / 2;
    $j('#loginPopup').css('left', popMargin + 'px');
    
    $j(window).resize(function(){
        winWidth = $j(window).innerWidth();
        popMargin = (winWidth - 350) / 2;
        $j('#loginPopup').css('left', popMargin + 'px');
    });

    if(mystatus == 'logged_in') {
        show_logged_in();
        $j('#loginPopup').css('visibility', 'visible');
        
    } else {
    setLoginForm('login');
    $j('#loginHeader').css('height', '8px');
    $j('#signupHeader').css('height', '8px');
    $j('#loginPopup').css('visibility', 'visible');
    
    setLoginStyles();
    
    $j('#signupHeader').click(function(){
        setLoginForm('signup');
    });
    $j('#loginHeader').click(function(){
        setLoginForm('login');
    });
        

    $j('#btn-login').click(function(){
        login();
    });
    $j('#btn-register').click(function(){
        signup();
    });
    $j('#btn-google').click(function(){
        loginWithGoogle();
    });
    }
});


    
function show_logged_in() {
    var token = localStorage.getItem('id_token');
    var userCode;
    var myName;
    var myNickname;
    var myPicture;
    var picCode;
    
    
    function getMyProfile(){
        lock.getProfile(token, function(err, profile){
            console.log(profile);
            localStorage.setItem('mypicture', profile.picture);
            localStorage.setItem('myname', profile.name);
            localStorage.setItem('mynickname', profile.nickname);
            testuser.name = (profile.nickname);
            return profile;
        });
    }
    
    myPicture = localStorage.getItem('mypicture');
    myName = localStorage.getItem('myname');
    myNickname = localStorage.getItem('mynickname');
    
    picCode = '<image src="' + myPicture + '" style="width: 75px; position: relative; left: 136px;">';
    
    var logoutCode = '<button class="btn btn-lg btn-danger" type="button" id="btn-logout">Log Out</button>';
    
    userCode = '<table style="width: 100%"><tr><td colspan="2">' + picCode + '</td></tr>';
    userCode += '<tr><td>Name:</td><td>' + myName + '</td></tr>';
    userCode += '<tr><td>Nickname:</td><td>' + myNickname + '</td></tr>';
    userCode += '<tr><td colspan="2">' + logoutCode + '</td></tr>';
    userCode += '</table>';
    
    $j('#loginPopup').html(userCode);
    refreshLogin();
    
    $j('#btn-logout').click(function(){
        logout();
    });
  }
    
    
function parseHash() {
    var token = localStorage.getItem('id_token');
    if (token) {
        mystatus = 'logged_in';
        show_logged_in();
        lock.getProfile(token, function (err, profile) {
            /*
            if (err) {
                return alert('There was an error getting the profile: ' + err.message);
            }
            */
        // Display user information
        //$j('.nickname').text(profile.nickname);
        //$('.avatar').attr('src', profile.picture);
        $j('#profileIcon').attr('src', profile.picture);
        $j('#profileIcon').css({
            width: 50,
            height: 50,
            clipPath: 'circle(25px at 47% 53%)'
        });
        });
    } else {
        auth.parseHash({ _idTokenVerification: false }, function(err, authResult) {
            if (err) {
                alert('Error: ' + err.errorDescription);
            }
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setUser(authResult);
                show_logged_in();
            }
        });
    }
}

  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  parseHash();

    
    
});