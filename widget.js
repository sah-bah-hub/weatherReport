var widget = document.createElement( 'iframe' );
widget.src = "https://sah-bah-hub.github.io/weatherReport/"
widget.style.border = 0 
widget.height = 370

var widgetContainer = document.querySelector("weather-widget");
widgetContainer.append(widget)


window.addEventListener('message', function (e) {
    widget.height = e.data;
});