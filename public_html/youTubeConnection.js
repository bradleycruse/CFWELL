
		/*
		 * YouTube: Retrieve Title, Description and Thumbnail
		 * http://salman-w.blogspot.com/2010/01/retrieve-youtube-video-title.html
		 */
                
       window.onload = getYouTubeData();         
                
	function getYouTubeData() {
            
                
              var yt_rootDiv = document.getElementById('youtuberoot');
                
				var videoid = "ucbxYIVztz8";
				var matches = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i);
				if (matches) {
					videoid = matches[1];
				}
				if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
					$("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo(yt_rootDiv);
					return;
				}
				$.getJSON("https://www.googleapis.com/youtube/v3/videos",{
					key: "AIzaSyBtJc9CqRXIIjcMjxJkaLmYUeqq-8ootMQ",
					part: "snippet,statistics",
					id: videoid
				}, function(data) {
					if (data.items.length === 0) {
						$("<p style='color: #F00;'>Video not found.</p>").appendTo(yt_rootDiv);
						return;
					}
					$("<img>", {
						src: data.items[0].snippet.thumbnails.medium.url,
						width: data.items[0].snippet.thumbnails.medium.width,
						height: data.items[0].snippet.thumbnails.medium.height
					}).appendTo(yt_rootDiv);
					$("<h1></h1>").text(data.items[0].snippet.title).appendTo(yt_rootDiv);
					$("<p></p>").text(data.items[0].snippet.description).appendTo(yt_rootDiv);
					$("<li></li>").text("Published at: " + data.items[0].snippet.publishedAt).appendTo(yt_rootDiv);	
				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo(yt_rootDiv);
				});
			
        }