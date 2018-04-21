// document ready event
$(document).ready(function() {
	$('#query').on("keypress", function(event) {
		if (event.which == 13) {
			var offset = Math.round(Math.random() * 1000);
			var query = this.value;
			var key = "NrLDBd9NkS2S00vCJ0WnGQWzmn1ZYPht";
			var url = "https://api.giphy.com/v1/gifs/search?q="
						+ query
						+ "&api_key="
						+ key
						+ "&limit=5"
						+ "&offset="
						+ offset;
			
			$.getJSON(url, function(json) {
				console.log(json);
                document.getElementById('gifs').innerHTML = "";
                
                var gifs = []
                var cards
                var $game = $('#gifs');
                var matches = 4;
                for (let m = 0; m < matches; m++) {
                    for (let i = 0; i < json.data.length; i++) {
                        const img = json.data[i];
                        if (img.images.downsized.url) {
                            const imgElem = $('<img>')
                                .attr('src', img.images.downsized.url);

                            const imgContainer = $('<div>')
                                .addClass('gif');

                            imgContainer.append(imgElem);

                             $('#gifs').append(imgContainer);
                        }
                    }
				}
            $(function () {
                const parent = $("#gifs");
                const divs = parent.children();
                while (divs.length) { 
                    parent.append (divs.splice(Math.floor(Math.random() * divs.length),1)[0]);
                }
            });
                
                
			});//the end of json function
		}//the end of even .which
	});//the end of event function
}); //the end of ready function
