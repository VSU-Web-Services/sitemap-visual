// Sitemap Generator Script for sitemap-visual.php //
(function($){ // here code can always use $ as in alias for jQuery, regardless if the user has repointed $ to something else.
  
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

        // Generate Page HTML from sitemap.xml data being parsed
        var content = document.getElementById("sitemap-wrapper");

        var innerDiv = document.createElement('div');
        innerDiv.classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-12', changefreq);
        innerDiv.setAttribute('id', i);
        innerDiv.setAttribute('priority', priority)

        var data = { 
                terminate: function( executed ) {            
                    innerDiv.innerHTML = "<!-- Object Placeholder for div content -->";
                    content.appendChild(innerDiv); // <!-- Create New div to put div content into foreach in loop -->
                    $( "#" + i ).html("<a href='" + loc + "' target='_blank' class='btn btn-sm btn-primary'>" + title + "</a> ○ Link (URL): <a href='" + loc + "' target='_blank' class='textlink'>" + loc + "</a><br><br><b>○ Last Modified: </b>" + lastmod + "<b> ○ Update Frequency: </b>" + changefreq + "<b> ○ Search Priority: </b>" + priority + "<br><hr>");
                    console.log(executed); // Created New div to put div content into foreach in loop
            } 
        },
        defer = $.Deferred(); // Create a Deferred Object //* Answer to the Ultimate Question of Life, the Universe, and Everything *// R. Chris Ferrell's killer deferred function
        defer.promise(data);  // Set object as a promise 
        defer.resolve("Created New div to put div content into foreach in loop"); // Resolve the deferred

        // Use the object as a Promise
        data.done(function( executed ) {
            data.terminate( executed ); // <!-- Deferred div content data -->
        });

    }
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