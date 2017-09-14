// listrn for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);


//save bookmarks 
function saveBookmark(e)
{   //Get from values
    var siteName=document.getElementById('siteName').value;
      var siteUrl=document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName,siteUrl))
        {
            return false;
        }
     
var bookmark=
    {
        name:siteName,
        url:siteUrl
        
    }
/*
//local storage test
    localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
*/

//test if bookmarks is null
    if(localStorage.getItem('bookmarks')===null)
        {   //Init array
            var bookmarks=[];
            //Add t array
            bookmarks.push(bookmark);
           //Set to local storage 
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
    else
        {  //Get bookmarks from localStorage
            var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
            //ADD to array
            bookmarks.push(bookmark);
            //Reset it back to the local storage
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
            
            
            
        }

        //Clear form
    document.getElementById('myForm').reset();
   //refetch bookmark
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}
//Delete bookmarks
function deleteBookmark(url)
{
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++)
        {
            if(bookmarks[i].url==url)
                {
                    //remove from the array
                    bookmarks.splice(i,1);
                }
        }
    //reset back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //refetch bookmark
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks()
{
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);
    //Get output id 
    var bookmarksResults=document.getElementById('bookmarksResults');
    //Build ouput
    bookmarksResults.innerHTML='';
   
    for (var i=0;i<bookmarks.length;i++)
        {
            var name=bookmarks[i].name;
            var url=bookmarks[i].url;
            bookmarksResults.innerHTML+='<div class="well">'+'<h2>'+name+
                '<a class="btn btn-default" target="_blank" href="'+url+'"> visit </a>'+
                '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_self" href="#"> delete </a>'+
                '</h2>'+'</div>';
        
            
        }
}
//validate form
function validateForm( siteName, siteUrl)
{
    if(!siteName || !siteUrl)
        {
            alert('please fill the form');
            return false;
        }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
    
    if(!(siteUrl.match(regex)))
        {
            alert('please use a valid url');
    return false;
        }
    
    return true;
}