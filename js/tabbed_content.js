(function(){
  'use strict';

  window.Tabber = function(elTabDiv) {
    if(elTabDiv !== undefined) {
      this.elTabDiv = elTabDiv;
      this.elTabUl = elTabDiv.querySelector('ul');
      this.nlTabs = this.elTabUl.querySelectorAll('li');
      this.tabClassList = this.getClassData(this.nlTabs);
    }
  };

  window.Tabber.prototype.prepareUI = function() {
    for(var i = 0; i < this.nlTabs.length; i++) {
      this.bindTabClickHandler(this.nlTabs[i]);
    }
  };

  window.Tabber.prototype.bindTabClickHandler = function(elTab) {
    var _this = this;
    elTab.addEventListener('click', function tabHandlerCallback(event){
      _this.switchTabHandler.call(_this, event);
    })
  };

  window.Tabber.prototype.switchTabHandler = function(event) {
    var clickedTab = event.currentTarget,
    tabClass = clickedTab.dataset.tab;
    this.removeAllTabClasses();
    this.removeAllActiveClasses();
    clickedTab.classList.add('active')
    this.elTabDiv.classList.add(tabClass);
  };

  window.Tabber.prototype.removeAllActiveClasses = function() {
    for(var i = 0; i < this.nlTabs.length; i++) {
      this.nlTabs[i].classList.remove('active');
    }
  }

  window.Tabber.prototype.getClassData = function(nlTabs) {
    var _res = [];
    for(var i = 0; i < this.nlTabs.length; i++) {
      _res[i] = this.nlTabs[i].dataset.tab;
    }
    return _res;
  };

  window.Tabber.prototype.removeAllTabClasses = function() {
    for(var _i = 0; _i < this.tabClassList.length; _i++) {
      this.elTabDiv.classList.remove(this.tabClassList[_i])
    }
  };
})();
