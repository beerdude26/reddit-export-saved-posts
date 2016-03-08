function fetchSavedPosts(after,authorizationToken,username) {
$.ajax({
            type:"GET",
            beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", authorizationToken);
            },
            data: {
                'limit': 100,
                'after': after
            },
            url: "https://oauth.reddit.com/user/" + username + "/saved",
            success: function(results) {
                if (results && results.kind === "Listing") {
                    var savedPosts = results.data.children;
                    for ( var i = 0; i < savedPosts.length; i++ ) {
                        var post = savedPosts[i];
                        generateAndClickDownloadLink( post.data, post.kind );
                    }
                }
            
                console.log("Fetched " + results.data.children.length + " results.");
                
                if( results.data.after && results.data.after != "" ) {
                    console.log("More data available, fetching after two seconds.");
                    setTimeout( function() { fetchSavedPosts( results.data.after, authorizationToken, username ); }, 2000 );
                }
            }
    });
}

function generateAndClickDownloadLink( data, kind ) {
    // Generate link
    var title = data.name;
    var payload = encodeURIComponent( generatePayload( data, kind ) );
    payload.replace(/'/g, "\\'");
    var link = "<a id='temp' download='" + title + ".md' href='data:text;charset=utf-8," + payload + "'>File</a>";
    
    // Add to body
    document.body.innerHTML += link;
    
    // Click it
    document.getElementById('temp').click();
    
    // Remove it again
    document.getElementById('temp').remove();
}

function generatePayload( data, kind ) {

    var templateName = "#comment-template";

    if ( kind == "t1" ) {
        data.kind = "comment";
    }
    else if ( kind == "t3" ) {
        data.kind = "thread";
        templateName = "#thread-template";
    }
    else {
        data.kind = "unknown";
    }
    
    var source = jQuery(templateName).text();

    var template = Handlebars.compile(source);
    
    return template( data );
}