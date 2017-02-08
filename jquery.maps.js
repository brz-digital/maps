(function ($) {

  $.fn.gmaps = function(options) {

  return this.each(function() {

    if($(this).data('json-url') !== undefined){

      var settings = $.extend({
        zoom: 5,
        scrollwheel: false,
        center: new google.maps.LatLng(-8.381525,-34.969482)
      }, options);

      var openWindow = [];
      var map = new google.maps.Map(this,settings);
      var markerOptions = {};

      var dataURL = $('.Map').attr('data-json-url');
      var markerIcon = $('.Map').attr('data-icon');
      var data;

      $.getJSON(dataURL, data, function (result) {
        data = result.data;
        for(var k in data) {
          markerOptions['icon'] = new google.maps.MarkerImage(markerIcon, null, null, null, new google.maps.Size(24, 24));
          markerOptions['position'] = new google.maps.LatLng(data[k].latitude,data[k].longitude);
          markerOptions['content'] = ['<b>',data[k].name,'</b><br>',data[k].address].join('');

          var markerSettings = $.extend({
            map: map
          }, markerOptions);

          var marker = new google.maps.Marker(markerSettings);

          map.setCenter(markerOptions['position']);

          markerClick(marker, markerOptions['content']);
        }
      });

    }

    var markerClick = function(marker, content) {
      var infowindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', function() {
        //map.panTo(marker.getPosition());

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
