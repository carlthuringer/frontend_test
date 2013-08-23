(function() {
  'use strict';

  window.Searcher = function(elInput, elResults, elSearchable) {
    this.elInput = elInput;
    this.elResults = elResults;
    this.elSearchable = elSearchable.textContent;
  };

  window.Searcher.prototype.prepareUI = function() {
    this.bindInput(this.elInput);
  };

  window.Searcher.prototype.bindInput = function(input) {
    var _this = this;
    input.addEventListener('keyup', function applyHandleKeyup(event) {
      _this.handleKeyUp.call(_this, event);
    });
  };

  window.Searcher.prototype.handleKeyUp = function(event) {
    var searchTerm = event.currentTarget.value,
    resultCount = this.findWordCount.call(this, searchTerm);
    this.elResults.innerHTML = 'Found ' + resultCount + ' occurances of the word "' + searchTerm + '" in the below text.';
  };

  window.Searcher.prototype.findWordCount = function(word) {
    if(word.match(/\w+/) === null) {
      return 0;
    }
    var wordRegex = new RegExp(word, 'gi'),
    matches = this.elSearchable.match(wordRegex);
    if(matches) {
      return matches.length;
    } else {
      return 0;
    }
  };
}());
