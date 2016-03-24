
function save_options() {

  let color = document.getElementById('color').value;
  let favicons = document.getElementById('show-favicons').checked;

  chrome.storage.sync.set({
    theme: color,
    favicons: favicons
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {

  chrome.storage.sync.get({
    theme: '2196F3',
    favicons: true
  }, function(items) {
    document.getElementById('color').value = items.theme;
    document.getElementById('show-favicons').checked = items.favicons;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
