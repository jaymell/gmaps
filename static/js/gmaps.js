function detectBrowser() {
	var useragent = navigator.userAgent;
	var mapdiv = document.getElementById("map-canvas");

	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	} /*else {
		mapdiv.style.width = '600px';
		mapdiv.style.height = '800px';
	}*/
}
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(33, -97),
		zoom:3,
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),
	    mapOptions);
	// put marker on center of map:
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		map: map,
		title: 'Click to zoom'
	});
	// zoom to marker when clicked:
	google.maps.event.addListener(marker, 'click', function() {
		map.setZoom(8);
		map.setCenter(marker.getPosition());
	});

}

google.maps.event.addDomListener(window, 'load', initialize);
detectBrowser();
