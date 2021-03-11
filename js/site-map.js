// Sitemap Generator Script for sitemap-visual.php //
(function($){ // here code can always use $ as in alias for jQuery, regardless if the user has repointed $ to something else.

    function initCount() {
        var initResultCount = $('div.sitemap-page').length;
        $("#resultcount").html(initResultCount);
        // console.log(initResultCount);
    }
    
    function updateCount() {
        var resultCount = $('div.sitemap-page:visible').length;
        $("#resultcount").html(resultCount);
    }

    // A $( document ).ready() block.
    $( document ).ready(function() {

    $( window ).on('load', function (event) {

    // sitemap file
    var sitemapFile = 'sitemap.xml';

    getXMLSitemapObject(sitemapFile, function(sitemapObject) {

        // retrieve properties from the sitemap object
        var urls = sitemapObject.getElementsByTagName('url');

        for (var i = 0; i < urls.length; i++) {
            var urlElement = urls[i];

            var title = urlElement.getElementsByTagName('title')[0].textContent;
            var loc = urlElement.getElementsByTagName('loc')[0].textContent;
            var lastmod = urlElement.getElementsByTagName('lastmod')[0].textContent;
            var changefreq = urlElement.getElementsByTagName('changefreq')[0].textContent;
            var priority = urlElement.getElementsByTagName('priority')[0].textContent;
            var key = urlElement.getElementsByTagName('keywords')[0].textContent;
            var description = urlElement.getElementsByTagName('description')[0].textContent;

            // Generate Page HTML from sitemap.xml data being parsed
            var content = document.getElementById("sitemap-wrapper");
            var innerDiv = document.createElement('div');
            innerDiv.classList.add('col-12', "sitemap-page", changefreq);
            innerDiv.setAttribute('id', i);
            innerDiv.setAttribute('data-priority', priority)

            var data = {
                    terminate: function( executed ) {
                        innerDiv.innerHTML = "<!-- Object Placeholder for div content -->";
                        content.appendChild(innerDiv); // <!-- Create New div to put div content into foreach in loop -->
                        $( "#" + i ).html("<div class='row'><div class='col-sm-12 col-md-4 col-lg-3 col-xl-2'><img class='image lazy-loaded' src='//via.placeholder.com/200x150' data-lazy-type='image' data-src='//via.placeholder.com/200x150' style='vertical-align: top !important;'></div><div class='col-sm-12 col-md-8 col-lg-9 col-xl-10'><a href='" + loc + 
                        "' target='_blank' class='btn btn-sm btn-primary' style='margin: 5px !important;'>" + title + 
                        "</a><br><div style='margin: 5px !important;'>" + description + 
                        "</div></div></div><br><div class='row keywords'><b><span class='col-md-12'>○ Keywords : </b>" + key + 
                        "</span></div> ○ <b>Link (URL) :</b> <a href='" + loc + "' target='_blank' class='textlink'>" + loc + 
                        "</a><div class='row'><b><div class='col-md-4 lastmod'>○ Last Modified : </b>" + lastmod + 
                        "</div><b> <div class='col-md-4 changefreq'>○ Update Frequency : </b>" + changefreq + 
                        "</div><b> <div class='col-md-4 priority'>○ Search Priority : </b>" + priority + 
                        "</div> </div><hr style='border-top: 1px solid rgba(245, 128, 37, 1.0); margin-top: 1.5rem; margin-bottom: 1.5rem; border: 4;'>");
                        
                        //console.log(executed); // Created New div to put div content into foreach in loop
                }
            },
            defer = $.Deferred(); // Create a Deferred Object
            defer.promise(data);  // Set object as a promise //* Answer to the Ultimate Question of Life, the Universe, and Everything *// R. Chris Ferrell's killer deferred function
            defer.resolve("New divs created to insert div content into foreach page listed in sitemap.xml"); // Resolve the deferred

            // Use the object as a Promise
            data.done(function( executed ) {
                data.terminate( executed ); // <!-- Deferred div content data -->
            });

        }  initCount();
    });

    $("#search-url").hide();
    $("#search-keywords").hide();

    $( "#search" ).change(function() {
      var search = $(this).children("option:selected").val();

       $(".on-page-search").val("");
       $(".on-page-title-search").val("");

      if ( search == "title" ) {
        $("#search-keywords").hide();
        $("#search-url").hide();
        $("#search-title").show();
      }
       else if ( search == "keywords" ) {
        $("#search-title").hide();
        $("#search-url").hide();
        $("#search-keywords").show();
      }
      else if ( search == "url" ) {
        $("#search-title").hide();
        $("#search-keywords").hide();
        $("#search-url").show();
      }
    });

    $(".on-page-title-search").on("keyup", function() {
      $("button.filter").removeClass("active");
      var x = $(this).val();
      $(".results").removeClass("results");
      $(".noresults").removeClass("noresults");
      $("div.sitemap-page a.btn").each(function() {
        if (x != "" && $(this).text().search(new RegExp(x, 'gi')) != -1) {
          $(this).parent().parent().parent().addClass("results").show();
        } else if (x != "" && $(this).text().search(x) != 1) {
          $(this).parent().parent().parent().addClass("noresults").hide();
        }
      });
      updateCount();
    });
    
    $(".on-page-keywords-search").on("keyup", function() {
      $("button.filter").removeClass("active");
      var y = $(this).val();
      $(".results").removeClass("results");
      $(".noresults").removeClass("noresults");
      $("div.sitemap-page div.keywords").each(function() {
        if (y != "" && $(this).text().search(new RegExp(y, 'gi')) != -1) {
          $(this).parent().addClass("results").show();
        } else if (y != "" && $(this).text().search(y) != 1) {
          $(this).parent().addClass("noresults").hide();
        }
      });
      updateCount();
    });


    $(".on-page-search").on("keyup", function() {
      $("button.filter").removeClass("active");
      var z = $(this).val();
      $(".results").removeClass("results");
      $(".noresults").removeClass("noresults");
      $("div.sitemap-page a.textlink").each(function() {
        if (z != "" && $(this).text().search(new RegExp(z, 'gi')) != -1) {
          $(this).parent().addClass("results").show();
        } else if (z != "" && $(this).text().search(z) != 1) {
          $(this).parent().addClass("noresults").hide();
        }
      });
      updateCount();
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    $( "button.filter" ).click(function() { // Clear search input function
        $(".on-page-search").val
        $(".on-page-keywords-search").val("");
        $(".on-page-title-search").val("");
    });

    $( "#showAll" ).click(function() { // Show all function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").show();
        initCount();
    });

    $( "#showAlways" ).click(function() { // Show Always function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.always").show();
        updateCount();
    });

    $( "#showDaily" ).click(function() { // Show Daily function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.daily").show();
        updateCount();
    });

    $( "#showWeekly" ).click(function() { // Show Weekly function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.weekly").show();
        updateCount();
    });

    $( "#showMonthly" ).click(function() { // Show Monthly function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.monthly").show();
        updateCount();
    });

    $( "#showYearly" ).click(function() { // Show Yearly function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.yearly").show();
        updateCount();
    });

    $( "#showNever" ).click(function() { // Show Never function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page.never").show();
        updateCount();
    });

    $( "#showTop" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='1.0']").show();
        updateCount();
    });

    $( "#showSecond" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='0.8']").show();
        updateCount();
    });

    $( "#showAverage" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='0.6']").show();
        updateCount();
    });

    $( "#showDeep" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='0.4']").show();
        updateCount();
    });

    $( "#showLow" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='0.2']").show();
        updateCount();
    });

    $( "#showArchive" ).click(function() { // Show Top Search function
        $("button.filter").removeClass("active");
        $(this).addClass('active');
        $(".sitemap-page").hide();
        $(".sitemap-page[data-priority='0.0']").show();
        updateCount();
    });

    // get sitemap content and parse it to Document Object Model
    function getXMLSitemapObject(sitemapFile, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if ((this.readyState === 4) && (this.status === 200)) {
                var sitemapContent = this.responseText;
                var sitemapObject = parseXMLSitemap(sitemapContent);
                callback(sitemapObject);
            }
        };
        xhttp.open('GET', sitemapFile, true);
        xhttp.send();
    }

    // parse a text string into an XML DOM object
    function parseXMLSitemap(sitemapContent) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(sitemapContent, 'text/xml');
        return xmlDoc;
    }

    }); // End of window load

    }); // End of A $( document ).ready() block.

    })(jQuery); // End of explicit jQuery
