//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];

        //Add to array
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // fetch from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();
    
    //Prevents form from submitting automatically
    e.preventDefault();
}

//Delete Bookmark

function deleteBookmark(url) {
    //get bookmarks from LS
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Loop through bookmarks
    for(var i =0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Reset localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<ul class="list-group">' + 
                                        '<li class="list-group-item"><h3>' + name + 
                                        ' <a class="btn btn-primary" target="_blank" href="' + url +'">Visit</a> ' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                        '</h3></li>' + 
                                        '</div>';
    }

}

//Validate form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false; //stops an infinite loop
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false; //stops an infinite loop
    }

    return true;
}