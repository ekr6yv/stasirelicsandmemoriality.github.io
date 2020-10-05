// Global variables
var mapCenter = [13.424929, 52.513175];
var mapZoom = 11.5;


// --------------------------------------------------------
// 1. Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWtyNnl2IiwiYSI6ImNrZjQ5anJodjAxZnQydGt5NjdjdWx6YmsifQ.bjLImJTthV1qncZ6HHpAvA'; // replace this value with your own access token from Mapbox Studio

    // for more mapboxgl.Map options, see https://docs.mapbox.com/mapbox-gl-js/api/#map)
    var map = new mapboxgl.Map({
    	container: 'map', // this is the ID of the div in index.html where the map should go
        center: mapCenter, // set the centerpoint of the map programatically. Note that this is [longitude, latitude]!
        zoom: mapZoom, // set the default zoom programatically
    	style:'mapbox://styles/ekr6yv/ckfpfrmzv12z519mzn8cce6b3', // replace this value with the style URL from Mapbox Studio
    });

// -------------------------------------------------------- 
// 2. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [MapboxlayerName, layerDisplayName]
        ['BerlinWall', 'Berlin Wall'],
        ['Police', 'Police Presence'],
        ['Police Heatmap', 'Police Presence HeatMap'],
        ['berlin', 'Stasi Officers Presence'],
        ['Hospitals', 'Stasic Informers Presence'],
        ['Cameras', 'CCTVs'],
        ['Cameras HeatMap', 'CCTVs HeatMap'],
        ['London Camers', 'London CCTVs'],// 'Point_O':layers[0][0],'PizzaHut': layers[0][1]     
        ['MMM', 'Museums, Mounuments and Memorials'],         
        ['MMM Heatmap', 'MMM HeatMap'],
        ['Case Study', 'Case Studies'],
        // add additional live data layers here as needed  
    ]; 


    //DON'T CHANGE
    //functions to perform when map loads
    map.on('load', function () {     
        for (i=0; i<layers.length; i++) {
            // add a button for each layer
            $("#layers-control").append("<a href='#' class='button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {
                var clickedLayer = e.target.id;
                e.preventDefault();
                e.stopPropagation();
            
                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  
                //see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none'); //https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); 
                    //see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });  
    });


// -------------------------------------------------------- 
// 3. Scroll to zoom through sites
// See example at https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    
    // A JavaScript object containing all of the data for each site "chapter" (the sites to zoom to while scrolling)
    var chapters = {
        'chapter01': {
            name: "",
            description: "Stasi Surveillance:Informant Profile:<br> Studies of the Stasi Surveillance system as it occured in history and how it compares in contemporary society. The document below is a Stasi Informants pledge of service.",
            bearing: 0.0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Police','Cameras HeatMap','Cameras','MM','MMM Heatmap','Case Study'],
            imagepath: '/images/informantprofile.png',
        },
        'chapter02': {
            name: "",
            description: "Stasi Surveillance:Profile:<br> A typical profile of a perosn entering and exiting East Berlin and East Germany. Oftentimes, information is provided from a neighbor or friend of the suject.",
            bearing: 0.0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Police','Cameras HeatMap','Cameras','MM','MMM Heatmap','Case Study'],
            imagepath: '/images/profile.png',
        },
        'chapter03': {
            name: "",
            description: "Stasi Surveillance:Interrogation:<br> A report depicting the questions that the Stasi officials usually ask when being interrogated at the Investigative Prison. Questions depict little phisiological approach and focus on the logical and practicalities of the world. Notice every little discrepancy.",
            bearing: 0.0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Police','Cameras HeatMap','Cameras','MM','MMM Heatmap','Case Study'],
            imagepath: '/images/interview.png',
        }, 
        'chapter04': {
            name: "",
            description: "Stasi Surveillance:Cellmate Report:<br> Report that entails a cellmate being a Stasi informer. Shows the distrust of the East Berlin officials as well as the increasing distrust and trauma of the typical East Berliner.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','Case Study'],
            speed:0.1,
            imagepath: '/images/cellmate.png',
        }, 
        'chapter05': {
            name: "",
            description: "Stasi Surveillance:Witness Interrogation:<br> Every detail of a person's life is cross-referenced with their family, friends, neighbors and acquaintances. Can spend days on a detail that doesn't match.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','Case Study'],
            speed:0.1,
            imagepath: '/images/interview2.png',
        }, 
        'chapter06': {
            name: "",
            description: "Stasi Surveillance:Cellmate Report:<br> Describes the psychological and physical trauma that a prisoner experienced on a daily basis. From sleep deprivation to the beginning of suspicion of his friends.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','Case Study'],
            speed:0.1,
            imagepath: '/images/cellmate2.png',
        }, 
        'chapter07': {
            name: "",
            description: "Stasi Surveillance:Diary of Aftereffects:<br> A perspective from the survivor of the Investigative Prison after reading his Stasi File. The anxiety, the fear of putting others in risk and the general hopelessness are the undertones of the Stasi era in East Berlin.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['berlin','Hospitals','BerlinWall'], 
            layersHide:['London Camers','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','Case Study'],
            speed:0.1,
            imagepath: '/images/afterreading.png',
        },
        'chapter08': {
            name: "",
            description: "Modern Berlin Police Presence:<br> Due to the underlying apprehension and distrust of surveillance within Berlin, Police need to be seen in a better light. Even though the Stasi and modern day police have similar numbers, the way in which they conduct themselves and the information gathering make them worlds apart.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['Police'], 
            layersHide:['London Camers','berlin','Hospitals','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','BerlinWall','Case Study'],
            speed:0.1,
            imagepath: '/images/state security.png',
        },
        'chapter09': {
            name: "",
            description: "Regulations on Modern Poice Forces:<br> Berlin Police officers follow the EU regulations on warrants, and search and seizures. The NSA, however, is able to collect 47 billion internet and mobile phone records in a month, released by Snowden. The vastness of this disregard for privacy resulted in German protests and protection of Snowden. Germans are against being surveilled massively.",
            bearing: 0,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['Police'], 
            layersHide:['London Camers','berlin','Hospitals','Police Heatmap','Cameras HeatMap','Cameras','MMM Heatmap','MMM','BerlinWall','Case Study'],
            speed:0.1,
            imagepath: '/images/files.png',
        },
        'chapter10': {
            name: "",
            description: "Contemporary Surveillance:<br> CCTVs are the main form of surveillance, very different from the human surveyors in the GDR. Due to the people of Germany's, especially Berlin, aversion to surveillance the slowing increasing CCTVs have halted. Compared to London, Berlin has much less CCTVs as well as a lower crime index.",
            bearing: 0.00,
            center: [13.404224, 52.521757],
            zoom: 11.13,
            pitch: 0.00,
            layersVis:['Cameras','BerlinWall','Camera HeatMap'], 
            layersHide:['London Camers','berlin','Hospitals','Police Heatmap','Police','MMM Heatmap','MMM','Case Study'],
            speed:0.1,
            imagepath: '/images/cameras.png',
        },
        'chapter11': {
            name: "",
            description: "Contemporary Surveillence Comparison:<br> The differences between these cities shows the lasting impact of the Stasi reign in East Germany. Many people of the public have been traumatized by mass surveillance, but live in an increasingly surveilled world.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0.00,
            center: [-0.125092, 51.523691],
            zoom:9.62,
            pitch: 0.00,
            layersVis:['London Camers'], 
            layersHide:['berlin','Hospitals','Police Heatmap','Police','Cameras HeatMap','Cameras','MMM','MMM Heatmap','BerlinWall','Case Study'],
            speed:0.1,
            imagepath: '/images/surveillance-protection.jpg',
        },
        'chapter12': {
            name: "",
            description: "Memorials, Monuments and Museums:<br> With the psychological trauma that plagues the public of former East Berlin, the need for a commemmoration of this era is needed to relieve the stress of this generation and their descendants. I have chosen three typologies to compare and focus public healing towards.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0.00,
            center: [13.389507, 52.517563],
            zoom:14.36,
            pitch: 0.00,
            layersVis:['MMM','BerlinWall','Case Study'], 
            layersHide:['berlin','Hospitals','Police Heatmap','Police','Cameras HeatMap','Cameras','MMM Heatmap','London Camers','Case Study'],
            speed:0.1,
            imagepath: '/images/MMM.png',
        },
        'chapter13': {
            name: "",
            description: "Memorial to the Sinti and Roma Victims of National Socialism:<br> A memorial commemorates an event with a focus on memory of the tragedy. Place of inner sympathy removed from the noises of the city so that people can mourn in their own way. We should never let the destruction of an event fall into oblivion and be forgotten. Much be built in a way in which the citizens never forget the past.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0.00,
            center: [13.389507, 52.517563],
            zoom:14.36,
            pitch: 0.00,
            layersVis:['MMM','BerlinWall','Case Study'], 
            layersHide:['berlin','Hospitals','Police Heatmap','Police','Cameras HeatMap','Cameras','MMM Heatmap','London Camers'],
            speed:0.1,
            imagepath: '/images/Artboard 3.png',
        }, 
        'chapter14': {
            name: "",
            description: "DDR Museum:<br> A Museum collects and studies historical relics of culture, history or science.  Serves the purpose of educating the general public, while visitors can experience living in the past while in the public. Often a romanticization of a dark history, allows for perpentrators of the dark past to come forwards and spread their ideals again.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0.00,
            center: [13.389507, 52.517563],
            zoom:14.36,
            pitch: 0.00,
            layersVis:['MMM','BerlinWall','Case Study'], 
            layersHide:['berlin','Hospitals','Police Heatmap','Police','Cameras HeatMap','Cameras','MMM Heatmap','London Camers'],
            speed:0.1,
            imagepath: '/images/Artboard 2.png',
        }, 
         'chapter15': {
            name: "",
            description: "Brandenburg Gate Monument:<br> A monument commemorates an event that has become important to a social group. Often a landmark that symbolizes a nation. The meaning of a monument can change over time with the context of the surroundings. Grand architecture to make a staement about a larger subject.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0.00,
            center: [13.389507, 52.517563],
            zoom:14.36,
            pitch: 0.00,
            layersVis:['MMM','BerlinWall','Case Study'], 
            layersHide:['berlin','Hospitals','Police Heatmap','Police','Cameras HeatMap','Cameras','MMM Heatmap','London Camers'],
            speed:0.1,
            imagepath: '/images/a.png',
        },        
    };


    console.log(chapters['chapter01']['name']);
    console.log(Object.keys(chapters)[0]);

     //Add the chapters to the #chapters div on the webpage
    for (var key in chapters) {
        var newChapter = $("<div class='chapter' id='" + key + "'></div>").appendTo("#chapters");
        if (chapters[key]['imagepath']=='') {
            var chapterHTML = $("<h3>" +"<br>"+ chapters[key]['name'] +"<br><br>"+"</h3>" + "<p>" + chapters[key]['description'] + "</p>"+ "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>").appendTo(newChapter);
                }
        else {
            var chapterHTML = $("<h3>" + chapters[key]['name'] + "</h3>"+"<p>" + chapters[key]['description'] + "</p>"+"<img src='" + chapters[key]['imagepath'] + "'>"+"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>").appendTo(newChapter);   
        }
    }


    $("#chapters").scroll(function(e) {
        var chapterNames = Object.keys(chapters);

        for (var i = 0; i < chapterNames.length; i++) {

            var chapterName = chapterNames[i];
            var chapterElem = $("#" + chapterName);

            if (chapterElem.length) {
                if (checkInView($("#chapters"), chapterElem, true)) {
                    setActiveChapter(chapterName);
                    $("#" + chapterName).addClass('active');
                    break;
                } else {
                    $("#" + chapterName).removeClass('active');
                }
            }
        }
    });

    var activeChapterName = '';
    
    function setActiveChapter(chapterName) {
        if (chapterName === activeChapterName) return;
        
        map.flyTo(chapters[chapterName]);
        
         // Reset layers to visible
        for (i=0; i<chapters[chapterName]['layersVis'].length; i++) {
            map.setLayoutProperty(chapters[chapterName]['layersVis'][i], 'visibility', 'visible'); 
        }  
        for (i=0; i<chapters[chapterName]['layersHide'].length; i++) {
            map.setLayoutProperty(chapters[chapterName]['layersHide'][i], 'visibility', 'none'); 
        }  

        activeChapterName = chapterName;
    }

    function checkInView(container, elem, partial) {
        var contHeight = container.height();
        var contTop = container.scrollTop();
        var contBottom = contTop + contHeight ;

        var elemTop = $(elem).offset().top - container.offset().top;
        var elemBottom = elemTop + $(elem).height();

        var isTotal = (elemTop >= 0 && elemBottom <=contHeight);
        var isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.height())) && partial ;

        return  isTotal  || isPart ;
    }
