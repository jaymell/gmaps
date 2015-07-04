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

var Map = {
	map: null,
	build: function() {
		var locale = new google.maps.LatLng(33,-97);
		var mapOptions = {
			center: locale,
			zoom: 2,
		};
		this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	},
	addMarker: function(lat, lon) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lon),
			title: 'TESTING',
		});
		marker.setMap(this.map);
	},
}

//detectBrowser();
google.maps.event.addDomListener(window, 'load', Map.build);
//window.onload = Map.build();

