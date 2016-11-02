var loggedUser = localStorage.getItem('loggedUser');

if (loggedUser != null) {
	window.location = '/';
}
