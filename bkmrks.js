"use strict";

class Bkmrks {
	constructor() {
		const storage = chrome.storage || browser.storage;
		const bookmarks = chrome.bookmarks || browser.bookmarks;

		storage.sync
			.get({
				theme: "307EBB",
				favicons: true,
				darkmode: false,
				monochrome: false,
			})
			.then((userPreferenceItems) => {
				const userThemeColor = userPreferenceItems.theme;
				const showFavicons = userPreferenceItems.favicons;
				const darkmode = userPreferenceItems.darkmode;
				const monochrome = userPreferenceItems.monochrome;

				bookmarks.getTree((chromeBookmarks) => {
					let appContainer = document.getElementById("app");

					const userThemeCss = `
            #app {
              --primary-color: #${userThemeColor};
            }
          `;

					if (!showFavicons) {
						appContainer.classList.add("no-favicon");
					}
					if (monochrome) {
						appContainer.classList.add("monochrome-favicons");
					}

					const bookmarkList = chromeBookmarks[0].children[0].children;

					console.log(chromeBookmarks[0]);

					if (bookmarkList.length > 0) {
						appContainer.innerHTML = `<style>${userThemeCss}</style> ${this.renderBookmarks(bookmarkList, showFavicons)}`;
					} else {
						appContainer.innerHTML = `
            <h1>You have no bookmarks :(</h1>
            <p>To use this extension, please add some bookmarks to your browser.</p>
          `;
					}
				});
			});
	}

	renderBookmarks(bookmarkList, showFavicons) {
		let returnString = "";

		for (let bookmark of bookmarkList) {
			if (bookmark.children) {
				returnString += `<li class="sublist-title">
            <h1>${bookmark.title}</h1>
            <ul>${this.renderBookmarks(bookmark.children, showFavicons)}</ul>
          </li>`;
			} else {
				returnString += `<li class="link-item">
            <a href="${bookmark.url}">
            <i style="background-image:url(${showFavicons ? this.getFaviconUrl(bookmark.url) : ""});"></i>
            <span>${bookmark.title}</span>
            </a>
          </li>`;
			}
		}

		return returnString;
	}

	getFaviconUrl(rawUrl) {
		return `http://www.google.com/s2/favicons?domain=${rawUrl.split("/")[0]}//${rawUrl.split("/")[2]}/`;
	}
}

const bkmrks = new Bkmrks();
