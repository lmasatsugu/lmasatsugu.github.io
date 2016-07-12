function initialize(){
  var mapOptions = {
    zoom: 13,
    center: {lat: 40.736410, lng: -73.993803}
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var locations = [
    {name: 'Ice & Vice', address: '221 E Broadway, New York, NY 10002', website: 'http://www.iceandvice.com', category: 'Dessert', area: 'East Manhattan', lat: 40.714819, lng: -73.986874},
    {name: 'Raku', address: '342 E 6th St, New York, NY 10003', website: 'http://www.rakunyc.com', category: 'Japanese', area: 'East Manhattan', lat: 40.727240, lng: -73.986367},
    {name: 'Llama Inn', address: '50 Withers St, Brooklyn, NY 11211', website: 'http://www.llamainnnyc.com', category: 'Peruvian', area: 'Brooklyn', lat: 40.716743, lng:  -73.949567},
    {name: 'Toro', address: '85 10th Ave, New York, NY 10011', website: 'http://toro-nyc.com/', category: 'Tapas', area: 'West Manhattan', lat: 40.744085, lng: -74.008107},
    {name: 'Emmy Squared', address: '364 Grand St, Brooklyn, NY 11211', website: 'http://pizzalovesemily.com/emmy-squared/', category: 'Pizza', area: 'Brooklyn', lat: 40.712462, lng: -73.953930},
    {name: 'Sushi Choshi', address: '77 Irving Pl #3, New York, NY 10003', website: 'http://sushichoshi.com/', category: 'Japanese', area: 'East Manhattan', lat: 40.737757, lng: -73.986840},    
    {name: 'Snowdays', address: '167 7th Ave S, New York, NY 10014', website: 'http://www.snowdaysnyc.com/', category: 'Dessert', area: 'West Manhattan', lat: 40.735863, lng: -74.001393}, 
    {name: 'Speedy Romeo', address: '376 Classon Ave, Brooklyn, NY 11238', website: 'http://www.speedyromeo.com/', category: 'Pizza', area: 'Brooklyn', lat: 40.687757, lng: -73.960044},     
    {name: 'Javelina', address: '119 E 18th St, New York, NY 10003', website: 'http://javelinatexmex.com/', category: 'Mexican', area: 'East Manhattan', lat: 40.736881, lng: -73.987430},    
    {name: 'Rosies', address: '29 E 2nd St, New York, NY 10003', website: 'http://rosiesnyc.com/', category: 'Mexican', area: 'East Manhattan', lat: 40.724978, lng: -73.990775}, 
  ];

  var markers = [];

  function createMarker(element){
    var coordinates = new google.maps.LatLng(element.lat, element.lng); 

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: element.name
    });

    markers.push(marker);
    return marker;
  }

  function createInfoWindow(element, marker){
    var contentString;

    contentString = "<div><span>" + element.name + "</span></div>" + element.address + "</div>";

    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 150
    });

    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.open(map, marker);
    });
  }

  function createList(element){
  var listItems;

    listItems = "<div><span>" + element.name + ": " + element.category + "</span></div><a href='" + element.website + "' target='_blank'>" + element.website + "</a></div>";

    $(".foodList").append("<li>"+listItems+"</li>");
  } 

  function clearMarkers(element){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  $(".select").change(function(){

    var area = $("#area :selected").val();
    var category = $("#category :selected").val();

    $("#listTitle").html("Restaurant List: " + category + " in " + area);
    $("#mapTitle").html("Map: " + category + " in " + area);
    $(".foodList").html("");
    
    locations.sort(compare);

    locations.forEach(function(element, index, array){
      var marker;

      marker = clearMarkers(element);;

    });

      
    if (area === "I Don't Care" & category === "I Don't Care") {

      locations.forEach(function(element, index, array){
        var marker, content, list;

        marker = createMarker(element);
        content = createInfoWindow(element, marker);
        list = createList(element);

      });

    } else if (area === "I Don't Care" & category !== "I Don't Care"){
     
      var category = $("#category :selected").val();
      var locationsCategory = $.grep(locations, function(element, index) {
        return element.category === category;
      });
      
      locationsCategory.forEach(function(element, index, array){
        var marker, content, list;

        marker = createMarker(element);
        content = createInfoWindow(element, marker);
        list = createList(element);

      });      

    } else if (area !== "I Don't Care" & category === "I Don't Care"){

      var area = $("#area :selected").val();
      var locationsArea = $.grep(locations, function(element, index) {
        return element.area === area;
      });
      
      locationsArea.forEach(function(element, index, array){
        var marker, content, list;

        marker = createMarker(element);
        content = createInfoWindow(element, marker);
        list = createList(element);
      });      

    } else if (area !== "I Don't Care" & category !== "I Don't Care"){

      var area = $("#area :selected").val();
      var category = $("#category :selected").val();
      var locationsBoth = $.grep(locations, function(element, index) {
        return element.area === area && element.category === category;
      });
      
      locationsBoth.forEach(function(element, index, array){
        var marker, content, list;

        marker = createMarker(element);
        content = createInfoWindow(element, marker);
        list = createList(element);
      });  

    }


  })

}

google.maps.event.addDomListener(window, 'load', initialize);
