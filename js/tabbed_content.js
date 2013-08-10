(function(){
  'use strict'
  var nlTabs,
  elContents

  window.onload = setup

  function setup() {
    var tab
    nlTabs = document.querySelectorAll('.tabs li')
    elContents = document.querySelector('.content')
    for(var i = 0; i < nlTabs.length; i++) {
      tab = nlTabs[i]
      tab.addEventListener('click', switchTabHandler)
    }
  }

  function switchTabHandler(event) {
    var clickedTab = event.currentTarget,
    tabClass = clickedTab.dataset.tab
    elContents.className = 'content ' + tabClass
  }
})()
