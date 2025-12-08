document.getElementById('ipt_text').onkeydown = async function (e) {
  if (e.key === 'Enter') {
    var TABID = await getCurrentTab()
    chrome.tabs.create({ "url": "https://www4.bing.com/search?q=" + this.value });
    chrome.tabs.remove(TABID);
    //window.open("https://www4.bing.com/search?q=" + this.value, '_blank')
  }
}
document.getElementById('btn_search1').onclick = function (e) {
  var _val = document.getElementById('ipt_text').value
  if (_val) window.open("https://www4.bing.com/search?q=" + _val, '_blank');
  else window.open("https://www4.bing.com/", '_blank');
}

async function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        var tabId = tabs[0].id;
        resolve(tabId)
      }
    });
  })

}
document.getElementById('gopage').onclick = async () => {
  var TABID = await getCurrentTab()
  chrome.tabs.create({ "url": "webnav/home.html" });
  chrome.tabs.remove(TABID);
}


function tplSection(data) {
  var ss = ''
  data.data.forEach((v, k) => {
    let { link, comment, favicon, text } = v
    if (favicon) {
      favicon = `<img src="${favicon}" alt="" class="link-item-favicon">`
    } else {
      favicon = `<div class="link-item-nofav"></div>`
    }
    ss += `<a href="${link}" title="${comment}" class="link-item">${favicon}${text}</a>`
  })
  return (
    `<div class="box-wrap">
        <div class="panel-head">${data.title}</div>
        <div class="panel-body">${ss}</div>
    </div>`
  )
}

function render(data) {
  var cc = ''
  data.forEach((v, k) => {
    cc += tplSection(v)
  })
  document.getElementById('ctx').innerHTML = cc
}
render(global_data)