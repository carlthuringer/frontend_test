(function() {
  describe('Text Search', function() {
    beforeEach(function() {
      this.elFixtures = document.getElementById('jasmine-fixtures');
      this.elInput = document.createElement('input');
      this.elFixtures.appendChild(this.elInput);
      this.elSearchDiv = document.createElement('div');
      this.elSearchDiv.innerHTML = 'Searching over some quick brown fox jumps over the <a href="http://en.wikipedia.org/Lazy">lazy</a> dog. Lazy dogs jumping over quick vulpines.';
      this.elResultsDiv = document.createElement('p');
      this.elFixtures.appendChild(this.elResultsDiv);
      this.elFixtures.appendChild(this.elSearchDiv);
    })

    afterEach(function() {
      document.getElementById('jasmine-fixtures').innerHTML = ''
    })

    describe('general usage', function() {
      it('is bound to an input and any element with text inside', function() {
        var searcher = new window.Searcher(this.elInput, this.elResultsDiv, this.elSearchDiv);
        spyOn(searcher, 'bindInput')
        searcher.prepareUI();
        expect(searcher.elInput).toBe(this.elInput);
        expect(searcher.bindInput).toHaveBeenCalled();
      });

      it('strips html tags from the text', function() {
        var searcher = new window.Searcher(this.elInput, this.elResultsDiv, this.elSearchDiv),
        strippedText = 'Searching over some quick brown fox jumps over the lazy dog. Lazy dogs jumping over quick vulpines.';
        searcher.prepareUI();
        expect(searcher.elSearchable).toBe(strippedText);
      });
    });

    describe('#findWordCount', function() {
      it('counts two occurances of lazy in the sentence', function() {
        var searcher = new window.Searcher(this.elInput, this.elResultsDiv, this.elSearchDiv);
        expect(searcher.findWordCount('lazy')).toBe(2);
      });
    });

    describe('#updateResultCount', function() {
      it('updates the text contents of the bound element', function() {
        var searcher = new window.Searcher(this.elInput, this.elResultsDiv, this.elSearchDiv),
        fakeEvent = {currentTarget: {value: 'over'}};
        searcher.handleKeyUp(fakeEvent);
        expect(this.elResultsDiv.textContent).toBe('Found 3 occurances of the word "over" in the below text.');
      });
    });
  });
}());
