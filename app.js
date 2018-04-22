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
						+ "&limit=10"
						+ "&offset="
						+ offset;
			
			$.getJSON(url, function(json) {
				console.log(json);
                document.getElementById('gifs').innerHTML = "";
                
                var gifs = []
                var matches = 2;
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
                   
				var clickedCards = [];
				// each card/image needs clicks event
				$('.gif').click(function() {
					const $card = $(this);
					// reveal images
					$card.children().show();
					// is there another image to compare
					console.log(clickedCards.length, matches);
					if (clickedCards.length == matches - 1) {
						// compare images
						var allMatch = true;
						for (let i = 0; i < clickedCards.length; i++) {
							if (clickedCards[i].num = $card.data().num) {
								allMatch = false;
							}
						}
						if (allMatch) {
                            // not a match, hide the images
							$card.children().fadeIn(0);
							for (let i = 0; i < clickedCards.length; i++) {
								clickedCards[i].img.hide(0);
							}
							
						} else {
				            // match, stay face up
                            $card.children().show(0);
							console.log("this is a match");
							// if all matches game is won
						}
						// clear the current image
						clickedCards = [];
					} else {
						// keep track of current image
						clickedCards.push({
							num: $card.data().num,
							img: $card.find('img')
						});
					}
				});
                
                
			});//the end of json function
		}//the end of even .which
	});//the end of event function
}); //the end of ready function
