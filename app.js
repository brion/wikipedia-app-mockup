function checkOrientation() {
	var width = window.innerWidth,
		height = window.innerHeight,
		isPortrait = (width < height),
		body = document.getElementsByTagName('body')[0];
	if (isPortrait) {
		body.className = 'portrait';
	} else {
		body.className = 'landscape';
	}
}

checkOrientation();
window.addEventListener('resize', checkOrientation);
