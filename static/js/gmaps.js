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
		var locale = new google.maps.LatLng(30,0);
		var mapOptions = {
			center: locale,
			zoom: 2,
		};
		Map.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		// the following removes the annoying equator and date lines:
		var mapStyle = [
		      {
			 featureType: "administrative",
			 elementType: "geometry.fill",
			 stylers: [
			    { visibility: "off" }
			 ]
		       }
		];
		var styledMap = new google.maps.StyledMapType(mapStyle);
		Map.map.mapTypes.set('myCustomMap', styledMap);
		Map.map.setMapTypeId('myCustomMap');
		// end part that removes equator and date lines here 

                var xhReq = new XMLHttpRequest();
		var url = '/ips';
                xhReq.open("GET", url, false);
                xhReq.send(null);
                var json = JSON.parse(xhReq.responseText);

		Map.slowAdd(json);
		
	},
	incrIpTotal: (function() {
		var total = 0;
		var item = document.getElementById('ipTotalText');
		return function increment() {
			total++;
			item.innerHTML = "Total IPs Plotted: " + total;
		}
	})(),	
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

	slowAdd: function(siteList) {
		function delay(siteList) {
			if ( siteList.length > 0 ) {	
				console.log(siteList[0]);
				// random jitter, plusOrMinus to get sign:
				var plusOrMinus = function() { return Math.random() < 0.5 ? -1 : 1 };
				if ( siteList[0]['latitude'] != undefined && siteList[0]['longitude'] != undefined) {
					Map.addMarker(siteList[0]['latitude']+Math.random()*2*plusOrMinus(),
							siteList[0]['longitude']+Math.random()*2*plusOrMinus(),
							siteList[0]['url']);
					Map.incrIpTotal();
				}
				setTimeout(function() { delay(siteList.slice(1)); }, 100);
			}
		};
		delay(siteList);
	}
};
				

detectBrowser();
google.maps.event.addDomListener(window, 'load', Map.build);
