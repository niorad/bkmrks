
chrome.bookmarks.getTree(function(results) {
  document.getElementById("app").innerHTML = renderBookmarks(results[0].children[0].children);
});

function getFaviconUrl(rawUrl) {
  return `http://www.google.com/s2/favicons?domain=${rawUrl.split('/')[0]}//${rawUrl.split('/')[2]}/`;
}

function renderBookmarks(list) {

  let returnString = '';

  for(let element of list) {
    if(element.children) {
      returnString = `${returnString}<li class="sublist-title"><h1>${element.title}</h1><ul>${renderBookmarks(element.children)}</ul></li>`;
    } else {
      returnString = `${returnString}<li class="link-item"><a style="background-image:url(${getFaviconUrl(element.url)});" href="${element.url}">${element.title}</a></li> `;
    }
  }

  return returnString;
}


