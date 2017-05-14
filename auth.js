//User Authentication (AuthO)
//lock
var lock = new Auth0Lock('Sy3LfWdLUKI3FDD054pwhn1QOVroeBPg', 'chrisbuck.auth0.com');
//implement login
var btn_login = document.getElementById('btn-login');
btn_login.addEventListener('click', function() {
  lock.show();
});
//on authentication
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('id_token', authResult.idToken);
    // Display user information
    show_profile_info(profile);
  });
});