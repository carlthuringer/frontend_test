(function () {
  describe('Tabber', function() {
    beforeEach(function() {
      this.elFixtures = document.getElementById('jasmine-fixtures');
      this.tabDiv = document.createElement('div');
      this.tabDiv.id = 'tabbed-content';
      this.tabDiv.innerHTML = "<ul class='tabs'> <li data-tab='tab1'> <h3>Tab 1</h3> </li> <li data-tab='tab2'> <h3>Tab 2</h3> </li> <li data-tab='tab3'> <h3>Tab 3</h3> </li> </ul> <div class='tab1'> <p> Gingerbread muffin gummies gingerbread macaroon. Lollipop candy applicake toffee faworki. Bear claw topping jelly toffee toffee powder tiramisu candy chupa chups. Chupa chups dragee icing applicake chupa chups dessert. Croissant jelly faworki marzipan tootsie roll marshmallow. Marshmallow toffee sweet roll fruitcake.  </p> </div> <div class='tab2'> <p> Chocolate faworki croissant brownie halvah macaroon gummi bears wypas. Chupa chups icing gummies pudding dessert carrot cake. Cupcake jelly beans sweet roll icing ice cream apple pie tootsie roll gummi bears marzipan. Brownie gummies chupa chups pie. Cupcake jujubes topping.  </p> </div> <div class='tab3'> <p> Cheesecake jelly beans ice cream lollipop sweet pastry. Chupa chups dessert cheesecake sesame snaps. Cookie ice cream candy canes pastry cake muffin. Icing chocolate sweet gummi bears powder oat cake oat cake lemon drops.  </p> </div>";
      this.elFixtures.appendChild(this.tabDiv);
    })

    afterEach(function() {
      document.getElementById('jasmine-fixtures').innerHTML = ''
    })

    describe('Basic tabber usage', function() {
      it('stores a list of all the data-tab classes in the tabs', function() {
        var tabber = new Tabber(this.tabDiv);
        expect(tabber.tabClassList).toEqual(['tab1', 'tab2', 'tab3'])
      })
    })

    describe('#prepareUI', function() {
      it('calls bindTabClickHandler 3 times because there are 3 tabs', function() {
        var tabber = new Tabber(this.tabDiv);
        spyOn(tabber, 'bindTabClickHandler')
        tabber.prepareUI();
        expect(tabber.bindTabClickHandler.calls.length).toBe(3)
      });
    });

    describe('#switchTabHandler', function() {
      it('removes existing classes from the tab div and puts on the class from the LI data element', function() {
        var tabber = new Tabber(this.tabDiv),
        secondTab = this.tabDiv.querySelectorAll('li')[1],
        fakeEvent = { currentTarget: secondTab };
        this.tabDiv.classList.add('tab1');

        tabber.switchTabHandler(fakeEvent);
        expect(this.tabDiv.classList.contains('tab1')).toBeFalsy();
        expect(this.tabDiv.classList.contains('tab2')).toBeTruthy();
      });
    });
  });
}());
