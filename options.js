function save_options() {
	const color = document.getElementById("color").value;
	const favicons = document.getElementById("show-favicons").checked;
	const darkmode = document.getElementById("use-dark-mode").checked;
	const monochrome = document.getElementById("monochrome-favicons").checked;
	const storage = chrome.storage || browser.storage;

	storage.sync.set(
		{
			theme: color,
			favicons: favicons,
			darkmode: darkmode,
			monochrome: monochrome,
		},
		function () {
			const status = document.getElementById("status");
			status.textContent = "Options saved.";
			setTimeout(() => {
				status.textContent = "";
			}, 750);
		},
	);
}

function restore_options() {
	chrome.storage.sync.get(
		{
			theme: "307EBB",
			favicons: true,
			darkmode: false,
			monochrome: false,
		},
		(items) => {
			document.getElementById("color").value = items.theme;
			document.getElementById("show-favicons").checked = items.favicons;
			document.getElementById("use-dark-mode").checked = items.darkmode;
			document.getElementById("monochrome-favicons").checked = items.monochrome;
		},
	);
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
