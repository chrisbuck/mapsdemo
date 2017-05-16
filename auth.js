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
    //$j('.nickname').text(profile.nickname);
    //$('.avatar').attr('src', profile.picture);
    $j('#profileIcon').attr('src', profile.picture);
    $j('#profileIcon').css({
        width: 50,
        height: 50,
        clipPath: 'circle(25px at 47% 53%)'
    });
  });
});
   
/*
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      //return alert('There was an error getting the profile: ' + err.message);
    }
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
}
*/
//Form HTML
var formCode = '<form class="form-signin">';
    formCode += '<h2 class="form-signin-heading">Please Log In</h2>';
    
    formCode += '<input type="text" id="username" class="form-control" placeholder="Email address" autofocus required>';
    formCode += '<input type="password" id="password" class="form-control" placeholder="Password" required>';

    formCode += '<button class="btn btn-lg btn-default" type="button" id="btn-login">Log In</button>';
    formCode += '<button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button>';

    formCode += '<button class="btn btn-lg btn-danger" type="button" id="btn-google">Log In with Google</button>';

    formCode += '</form>';

var auth = new auth0.WebAuth({
    domain: 'chrisbuck.auth0.com',
    clientID: '25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN',
    redirectUri: window.location.href,
    responseType: 'token id_token'
});


$j('#profileIcon').click(function(){
    $j('#loginPopup').html(formCode).css('visibility', 'visible');
    
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

    $j('#btn-login').click(function(){
        login();
    });
    $j('#btn-register').click(function(){
        signup();
    });
    $j('#btn-google').click(function(){
        loginWithGoogle();
    });
    $j('#btn-logout').click(function(){
        logout();
    });
    


    
});

function show_logged_in() {
    $j('#loginPopup').hide();
    //$j('div.logged-in').show();
  }
    
//detect if logged in (outside of profileIcon function, for redirect back to main page)
/*
    function parseHash() {
    var token = localStorage.getItem('id_token');
    if (token) {
      show_logged_in();
    } /*else {
      auth.parseHash({ _idTokenVerification: false }, function(err, authResult) {
        if (err) {
          alert('Error: ' + err.errorDescription);
          //show_sign_in();
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setUser(authResult);
          show_logged_in();
        }
      });
    }
  }
/*
  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
*/
  //parseHash();

    
    
});