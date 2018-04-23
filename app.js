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


                // random the position of gifs
                $(function () {
                    const parent = $("#gifs");
                    const divs = parent.children();
                    while (divs.length) { 
                        parent.append (divs.splice(Math.floor(Math.random() * divs.length),1)[0]);
                    }
                });


                var points = 0;
                var score = $("h2");

                $(".gif").click(function () {
                  
                  /* Toggle the flip class */
                  $(this).toggleClass("flipped");
                  
                  /* Get all of the currently flipped cards */
                  var flipped = $(".flipped");
                  
                  /* Check to make sure at least 2 are flipped */  
                  if ( flipped.length === 2 ) {
                    /* Select the first and second cards from the collection */
                    var firstCard = flipped.first();
                    var secondCard = flipped.last();

                    /* Compare to see if the first and second in our collection are equal */
                    if ( firstCard.text() === secondCard.text() ) {
                      points++;
                      score.text("You've found " + points + " points.");
                      firstCard.hide();
                      secondCard.hide();
                      
                    }
                  
                    setTimeout(function () {
                      $(".flipped").removeClass("flipped");
                    }, 1000);
                  }
                  
                });

                   
                 
                
            
			});//the end of json function
		}//the end of even .which
	});//the end of event function
}); //the end of ready function
