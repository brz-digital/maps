(function($){
    $.fn.maps = function(settings){
        var config = {
            zoom: 5,
            scrollwheel: false,
            center: new google.maps.LatLng(-8.381525,-34.969482)
        };

        if (settings){
            $.extend(config, settings);
        }

        return this.each(function(){
            var openWindow = [],
                map = new google.maps.Map(this, settings),
                markerOptions = {},
                dataUrl = this.data('jsonUrl'),
                dataLat = this.data('latitude'),
                dataLng = this.data('longitude'),
                markerIcon = this.data('icon'),
                data;

            if (dataLat !== undefined && dataLng !== undefined) {

                generateMap(map, markerOptions, markerIcon, dataLat, dataLng);

            } else if(dataUrl !== undefined) {

                $.getJSON(dataURL, data, function (result) {
                    data = result.data;
                    for(var k in data) {
                        dataLat = data[k].latitude;
                        dataLng = data[k].longitude;
                        generateMap(map, markerOptions, markerIcon, dataLat, dataLng);
                    }
                });

            }

            var generateMap = function(map, markerOptions, markerIcon, dataLat, dataLng) {
                markerOptions['icon'] = new google.maps.MarkerImage(markerIcon, null, null, null, new google.maps.Size(24, 24));
                markerOptions['position'] = new google.maps.LatLng(dataLat, dataLng);
                markerOptions['content'] = ['<b>',data[k].name,'</b><br>',data[k].address].join('');

                var markerSettings = $.extend({
                        map: map
                    }, markerOptions);

                var marker = new google.maps.Marker(markerSettings);

                map.setCenter(markerOptions['position']);

                markerClick(marker, markerOptions['content']);
            };

            var markerClick = function(marker, content) {
                var infowindow = new google.maps.InfoWindow({ content: content });

                google.maps.event.addListener(marker, 'click', function() {
                    if(typeof openWindow[0] !== 'undefined')
                        openWindow[0].close();
                        openWindow.pop();

                    infowindow.open(map,marker);
                    openWindow.push(infowindow);
                });
            };
        });
    };
})(jQuery);
