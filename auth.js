window.addEventListener('load', function() {
var username;
    
  var auth = new auth0.WebAuth({
    domain: 'chrisbuck.auth0.com',
    clientID: '25lcf0JbC5KbrKZrbc1hUYYGbkJ0_uIN',
    redirectUri: 'https://chrisbuck.github.io/mapsdemo/',
    responseType: 'token id_token'
  });

  document.getElementById('btn-login').addEventListener('click', login);
  document.getElementById('btn-register').addEventListener('click', signup);
  document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
  document.getElementById('btn-logout').addEventListener('click', logout);

  function login() {
    username = document.getElementById('username').value;
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
        console.log(username);
      show_logged_in(username);
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

  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  parseHash();

});