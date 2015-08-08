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
	build: function() {
		var locale = new google.maps.LatLng(33,-97);
		var mapOptions = {
			center: locale,
			zoom: 2,
		};
		Map.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		Map.addTopSites()
		
	},
	addMarker: function(lat, lon, title) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lon),
			title: title,
		});
		marker.setMap(Map.map);
	},
	addTopSites: function() {
		// the following sucks:
		var xhReq = new XMLHttpRequest();
		var url = '/json';
		xhReq.open("GET", url, false);
		xhReq.send(null);
		var json = JSON.parse(xhReq.responseText);
		console.log(json);
		for( i = 0; i < json.length; i++ ) {
			var site = json[i]['url'];
			for ( ip in json[i]['ips'] ) {
				console.log('ip: ',ip);
				var latitude = json[i]['ips'][ip]['latitude'];
				var longitude = json[i]['ips'][ip]['longitude'];
				if ( latitude && longitude ) {
					Map.addMarker(latitude, longitude, site); 	
				}
			}
		}
	},
	slowAdd: function() {
		var i = 0, j = 0;
		function delay(i,j) {
			(i<=20 && j<=20) ? Map.addMarker(i,j) : false;
			setTimeout(function() { delay(i+1, j+1); }, 500);	
		}
		delay(i, j);
	}
};
				

detectBrowser();
google.maps.event.addDomListener(window, 'load', Map.build);

