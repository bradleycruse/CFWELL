/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = initializeValues();

var filterCategory;
var categoryFilter;
var filterTags;
var tagsFilter;

function initializeValues(){
    
filterCategory = true;
categoryFilter = "Care Team";
filterTags = false;
tagsFilter = "";
setVideos();
}

//used for menu filters and toggle their images
function setCategoryFilter(category, imageIcon){
    //is filter alreaddy on?
   /* if(categoryFilter == category && filterCategory){
        categoryFilter = "";
        filterCategory = false;
       // imageIcon.css("background-color","white");
        
    }else{
        categoryFilter = category;
        filterCategory = true;
        //imageIcon.css("background-color","red");
    }*/
	
	
	categoryFilter = category;
   filterCategory = true;
	
    setVideos();
}

//use currently not used at the moment
//Filters based off tags
function setTagFilter(tag){
    //is filter alreaddy on?
    if(tagsFilter == tag && filterTags){
        tagsFilter = "";
        filterTags = false;
        
    }else{
        tagsFilter = tag;
        filterTags = true;
    }
    setVideos();
}


//Get Categeories from json file
// gets videos per category
// Can filter videos based off tags and categories
// inserts html snippits in videoroot
function setVideos(){
 
 //Read json file
var myVideos = (function() {
   
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "myVideoData.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
    
    //get root div
    var rootDiv = document.getElementById('videoroot');
    
    //remove any children if any
while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
}       
     
    //get all categories in file
    var divCategories = getCategories(myVideos);
   
   //cycles through each category on file
   for(var i = 0; i < divCategories.length; i++ ){
      
      //Category Filter Check
      if(filterCategory && divCategories[i] === categoryFilter.toString()){
      
      
       //create New Category Div
        var catDiv = document.createElement('div');
        catDiv.className="categoryDIV";
        
        var content = '<h2>'+divCategories[i]+'</h2>';
        catDiv.innerHTML = content;
        
        //get videos from category
        var categoryVideos = getVideos(myVideos, divCategories[i]);
      
        
        //cycles all video content from current category
        for(var v = 0; v < categoryVideos.length; v++ ){
           
         //Tags filter check
        if(filterTags && categoryVideos[v].Tags === tagsFilter.toString() || !filterTags){
        
        //Create new div for content
         var contentDiv = document.createElement('div');
            contentDiv.className="resourceBox";
           
           // Self explanatory 
          setTitleWithSubCategories(categoryVideos[v], contentDiv);
          
           //Create the tooltip popup video description from file and asign to target the youtube player
           var a = document.createElement('a');
            a.setAttribute('data-tip', categoryVideos[v].Description);
            a.setAttribute('class', 'tooltip');
            a.target= "youtube_iframe";
            var tempURL = "https://www.youtube.com/embed/"+categoryVideos[v].vidSource.toString();
            a.href = tempURL;
            
            //Create image icon for video from youtube & set link value  
            var oImg=document.createElement("img");
                oImg.setAttribute('src', "https://img.youtube.com/vi/"+categoryVideos[v].vidSource+"/0.jpg");
                oImg.setAttribute('class', 'vidselect');
               
                //set image to Link    
                a.appendChild(oImg);
                
              //Apply link to content 
              contentDiv.appendChild(a);
              
              //apply content to base div category
              catDiv.appendChild(contentDiv);
              
              //Used to generate all information from youtube currently not used yet
              //getYouTubeData(categoryVideos[v].vidSource, contentDiv);
          }
        }
       
       //Apply category and all its video contents to main root
        $("#videoroot").prepend(catDiv);
      }
   }
 

        
    
}

//You can read right?
function getCategories(obj){
    
    var categories= [];
    
    //Get Categories
    categories = jQuery.map(obj, function(video, i){
        return video.Category;
    });
    //removes duplicates
    categories = jQuery.unique(categories);
    return categories;
}

//Yet another self explanitory function
function getVideos(obj, category){
    
    var videos= [];
     videos = jQuery.map(obj, function(video, i){
        if(video.Category === category){
            return video;
        }
    });
    
    
    return videos;
    
}

//insert generic description here
function setTitleWithSubCategories(video, root){
    
    // split string with comma seperators
   var myTempString = video.subCategories.toString();
   var mySubCat = [];
   mySubCat = myTempString.split(/,/g);
  
   var myHTML="";

   if(mySubCat.length > 0){
   for(var c = 0; c < mySubCat.length; c++){        
            
            var subCat = mySubCat[c].trim();
                     
       switch(subCat){
           
                case "Care Team":
                    myHTML += "<a href='#'><img id='CareTeam' title='Care Team' class='s_iconbox' src='./icons/care_team.png'></a>";
                    break;
  
                case "Anatomy":
                    myHTML += "<a href='#'><img id='Anatomy' title='Anatomy' class='s_iconbox' src='./icons/anatomy.png'></a>";
                    break;
                    
                case "Airway Clearance Techniques":
                    myHTML += "<a href='#'><img id='ACT' title='Airway Clearance Techniques' class='s_iconbox' src='./icons/ACT.png'></a>";
                    break;
  
                case "Exercise":
                    myHTML += "<a href='#'><img id='Exercise' title='Exercise' class='s_iconbox' src='./icons/exercise.png'></a>";
                    break;
  
                case "Insurance & Finance":
                    myHTML += "<a href='#'><img id='Finance' title='Insurance & Finance' class='s_iconbox' src='./icons/finance.png'></a>";
                    break;
  
                case "Hygiene":
                    myHTML += "<a href='#'><img id='Hygiene' title='Infection Control' class='s_iconbox' src='./icons/hygiene.png'></a>";
                    break;
  
                case "Medicine":
                    myHTML += "<a href='#'><img id='Medicine' title='Medicine'  class='s_iconbox' src='./icons/medicine.png'></a>";
                    break;
  
                case "Mindfulness":
                    myHTML += "<a href='#'><img id='Mindfulness' title='Mindfulness' class='s_iconbox' src='./icons/mindfulness.png'></a>";
                    break;
  
                case "Nutrition":
                    myHTML += "<a href='#'><img id='Nutrition' title='Nutrition' class='s_iconbox' src='./icons/nutrition.png'></a>"
                    break;
  
                case "School":
                    myHTML += "<a href='#'><img id='School' title='School' class='s_iconbox' src='./icons/school.png'></a>";
                    break;
  
                case "Sleep":
                    myHTML += "<a href='#'><img id='Sleep' title='Sleep' class='s_iconbox' src='./icons/sleep.png'></a>";
                    break;
  
                case "Time Management":
                    myHTML += "<a href='#'><img id='TimeManagement' title='Time Management' class='s_iconbox' src='./icons/time_management.png'></a>";
                    break;
  
                case "Patient Engagement":
                     myHTML += "<a href='#'><img id='PatientEngagement' title='Patient Engagement' class='s_iconbox' src='./icons/patient_engagement.png'></a>";
                    break; 
       }
   }
  
    myHTML = video.title + myHTML;
      
   }
        var newElement = "<h1 class='vidTitle'>"+myHTML+"</h1>";
          
            $(newElement).appendTo(root);
  }


//Adds 
function getYouTubeData(id, root) {
            
                
              var yt_rootDiv = document.getElementById('youtuberoot');
                
				var videoid = "ucbxYIVztz8";
				var matches = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i);
				if (matches) {
					videoid = matches[1];
				}
				if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
					$("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo(root);
					return;
				}
				$.getJSON("https://www.googleapis.com/youtube/v3/videos",{
					key: "AIzaSyBtJc9CqRXIIjcMjxJkaLmYUeqq-8ootMQ",
					part: "snippet,statistics",
					id: videoid
				}, function(data) {
					if (data.items.length === 0) {
						$("<p style='color: #F00;'>Video not found.</p>").appendTo(root);
						return;
					}
					//Add Title
					$("<h1></h1>").text(data.items[0].snippet.title).appendTo(root);
                                       
                                       //create tool tip description
                                var a = document.createElement('a');
                                         a.setAttribute('data-tip', id.Description);
                                         a.setAttribute('class', 'tooltip');
                                         a.href = 'https://www.youtube.com/watch?v='+id.vidSource;
                                         a.target = "youtube_iframe";
                                
                                // insert image from youtube
                                        $("<img></img>", {
                                                //class: 'img-tip',
						src: data.items[0].snippet.thumbnails.medium.url,
						//width: '200px'
					}).appendTo(root);

                                            // add date
					$("<li></li>").text("Published at: " + data.items[0].snippet.publishedAt).appendTo(root);	
				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo(root);
				});
        }
 
        
	function generateDownloads(category) {
		
//visible		
		switch(category){
           
                case "Care Team":
                    document.getElementById('DLcontainer').style.visibility = 'hidden'; 
                    break;
  
                case "Anatomy":
                   //add elements to div
                    break;
		}
	}
		
//jquerry click functions  for  classes
$(".iconbox").click(function(){
    var iconTitle = $(this).attr('title').toString();
    setCategoryFilter(iconTitle, $(this));
	generateDownloads(iconTitle);
	//hide function
	//$(this).attr('class').show();
	
	//$(iconTitle).show();
	//show
	//show(iconTitle);
});

	
	
$(".nav_Resources").click(function(){
    var teamName = $(this).attr('id').toString();
	document.getElementById("CareTeam").src="./images/"+teamName+".jpg";
});


















       