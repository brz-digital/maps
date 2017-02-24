(function ($) {

  $.fn.gmaps = function(options) {

  return this.each(function() {
    var zoom = $(this).data('zoom');

    var settings = $.extend({
      zoom: zoom,
      scrollwheel: false,
      center: new google.maps.LatLng(-8.381525,-34.969482)
    }, options);

    var openWindow = [];
    var map = new google.maps.Map(this,settings);
    var markerOptions = {};

    var dataUrl = $(this).data('json-url');
    var dataLat;
    var dataLng;
    var dataTitle;
    var dataText;
    var markerIcon = $(this).data('icon');
    var data;

    if($(this).data('json-url') !== undefined){

      $.getJSON(dataUrl, data, function (result) {
        data = result.data;
        for(var k in data) {
          dataLat = data[k].latitude;
          dataLng = data[k].longitude;
          dataTitle = data[k].title;
          dataText = data[k].text;
          setMap(map, markerOptions, markerIcon, dataLat, dataLng, dataTitle, dataText);
        }
      });

    } else {

      dataLat = $(this).data('latitude');
      dataLng = $(this).data('longitude');
      dataTitle = $(this).data('title');
      dataText = $(this).data('text');
      setMap(map, markerOptions, markerIcon, dataLat, dataLng, dataTitle, dataText);

    }

    function setMap( map, markerOptions, markerIcon, dataLat, dataLng, dataTitle, dataText ) {
      markerOptions['icon'] = new google.maps.MarkerImage(markerIcon, null, null, null, new google.maps.Size(24, 24));
      markerOptions['position'] = new google.maps.LatLng(dataLat, dataLng);
      markerOptions['content'] = ['<b>',dataTitle,'</b><br>',dataText].join('');

      var markerSettings = $.extend({
        map: map
      }, markerOptions);

      var marker = new google.maps.Marker(markerSettings);

      map.setCenter(markerOptions['position']);

      markerClick(marker, markerOptions['content']);
    };

    function markerClick(marker, content) {
      var infowindow = new google.maps.InfoWindow({
        content: content
      });

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

}(jQuery));
