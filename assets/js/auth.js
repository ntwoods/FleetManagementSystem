
// auth.js
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const email = profile.getEmail();

  // Allow only NT domain or authorized users
  if (!email.endsWith('@ntwoods.com')) {
    alert('Unauthorized Access');
    signOut();
    return;
  }

  sessionStorage.setItem('email', email);
  window.location.href = email === 'mis01@ntwoods.com' ? 'owner.html' : 'user.html';
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
}
