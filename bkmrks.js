'use strict';

class Bkmrks {

  constructor() {

    chrome.storage.sync.get({
      theme: '2196F3',
      favicons: true
    }, (userPreferenceItems) => {

      const userThemeColor = userPreferenceItems.theme;
      const showFavicons = userPreferenceItems.favicons;

      chrome.bookmarks.getTree((chromeBookmarks) => {

        let appContainer = document.getElementById('app');

        const userThemeCss = `
            #app > li > h1 {
              background: #${userThemeColor};
            }
            li li h1 {
              color: #${userThemeColor};
            }
          `;

        if(!showFavicons) {
          appContainer.className = 'no-favicon';
        }

        const bookmarkList = chromeBookmarks[0].children[0].children;

        if(bookmarkList.length > 0) {
          appContainer.innerHTML = `<style>${userThemeCss}</style> ${this.renderBookmarks(bookmarkList, showFavicons)}`;
        } else {
          appContainer.innerHTML = `
            <h1>You have no bookmarks :(</h1>
            <p>To use this extension, please add some bookmarks to Chrome.</p>
          `;
        }
      });
    });

  }


  renderBookmarks(bookmarkList, showFavicons) {

    let returnString = '';

    for(let bookmark of bookmarkList) {
      if(bookmark.children) {
        returnString += `
          <li class="sublist-title">
            <h1>${bookmark.title}</h1>
            <ul>${this.renderBookmarks(bookmark.children, showFavicons)}</ul>
          </li>`;
      } else {
        returnString += `
          <li class="link-item">
            <a style="background-image:url(${showFavicons ? this.getFaviconUrl(bookmark.url) : ''});" href="${bookmark.url}">
              <span>${bookmark.title}</span>
            </a>
          </li> `;
      }
    }

    return returnString;
  }

  getFaviconUrl(rawUrl) {
    return `http://www.google.com/s2/favicons?domain=${rawUrl.split('/')[0]}//${rawUrl.split('/')[2]}/`;
  }

}

const bkmrks = new Bkmrks();