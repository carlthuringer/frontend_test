(function() {
  'use strict'

  var dictionary = {},
  elSearchForm,
  elFoundText,
  elSearchText

  window.onload = setup

  function setup() {
    elSearchText = document.querySelector('#search_text')
    elSearchForm = document.querySelector('form')
    elFoundText = document.querySelector('.js-found-text')
    dictionary = indexText(elSearchText)
    console.log(dictionary)
    elSearchForm.addEventListener('submit', doSearch)
  }

  function indexText(text) {
    var wordRegex = /[a-z]+/ig,
    matchedWords = text.textContent.match(wordRegex),
    wordKey,
    wordKeyFragment,
    workingDictionary = {}
    for(var _i = 0; _i < matchedWords.length; _i++){
      wordKey = matchedWords[_i].toLowerCase()
      for(var _i2 = wordKey.length; _i2 > 0; _i2--){
        wordKeyFragment = wordKey.slice(0, _i2)
        if(workingDictionary[wordKeyFragment] == null) {
          workingDictionary[wordKeyFragment] = 1
        } else {
          workingDictionary[wordKeyFragment]++
        }
      }
    }
    return workingDictionary
  }

  function doSearch(event) {
    event.preventDefault()
    var searchTarget = event.target[0].value.toLowerCase(),
    count = dictionary[searchTarget]
    updateFoundText(searchTarget, count)
  }

  function updateFoundText(target, count) {
    if(count == undefined) count = 0
    var foundText = 'Found ' + count + ' occurances of the word "' + target + '" in the below text.'
    elFoundText.innerHTML = foundText
  }
})()
