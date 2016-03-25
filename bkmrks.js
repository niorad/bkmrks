'use strict';

chrome.storage.sync.get({
    theme: '2196F3',
    favicons: true
  }, (items) => {

    chrome.bookmarks.getTree((results) => {

      let app = document.getElementById('app');
      const themeStyles = `<style>#app>li>h1 {background: #${items.theme};} li li h1 {color: #${items.theme}}</style>`;

      if(!items.favicons) {
        app.className = 'no-favicon';
      }

      const bookmarks = results[0].children[0].children;

      console.log(bookmarks);

      if(bookmarks.length > 0) {
        app.innerHTML = `${themeStyles} ${renderBookmarks(bookmarks, items.favicons)}`;
      } else {
        app.innerHTML = '<h1>You have no bookmarks :(</h1><p>To use this extension, please add some bookmarks to Chrome.</p>'
      }
    });

  });


function getFaviconUrl(rawUrl) {
  return `http://www.google.com/s2/favicons?domain=${rawUrl.split('/')[0]}//${rawUrl.split('/')[2]}/`;
}

function renderBookmarks(list, _showFavicons) {

  let returnString = '';

  for(let element of list) {
    if(element.children) {
      returnString += `<li class="sublist-title"><h1>${element.title}</h1><ul>${renderBookmarks(element.children, _showFavicons)}</ul></li>`;
    } else {
      returnString += `<li class="link-item"><a style="background-image:url(${_showFavicons ? getFaviconUrl(element.url) : ''});" href="${element.url}"><span>${element.title}</span></a></li> `;
    }
  }

  return returnString;
}


