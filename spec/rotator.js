(function() {
  describe('Rotator', function() {
    beforeEach(function() {
      this.elFixtures = document.getElementById('jasmine-fixtures')
      this.rotatorDiv = document.createElement('div')
      this.rotatorDiv.id = 'rotator'
      this.elList = document.createElement('ul')
      this.elList.innerHTML = "<li><div><img width=100 height=100 /></div></li>"
      this.rotatorDiv.appendChild(this.elList)
      this.elFixtures.appendChild(this.rotatorDiv)
    })

    afterEach(function() {
      document.getElementById('jasmine-fixtures').innerHTML = ''
    })

    describe('#stepper', function() {
      it('returns 1 when the time is 1000 and duration 1000', function(){
        var rotator = new Rotator()
        expect(rotator.stepper(1000, 1000)).toBe(1)
      })

      it('returns 2 when the time is 2000 and duration 1000', function(){
        var rotator = new Rotator()
        expect(rotator.stepper(2000, 1000)).toBe(2)
      })

      it('returns 1 when the time is 1234 and duration 1000', function(){
        var rotator = new Rotator()
        expect(rotator.stepper(1234, 1000)).toBe(1)
      })
      it('returns 2 when the time is 1000 and duration 500', function(){
        var rotator = new Rotator()
        expect(rotator.stepper(1000, 500)).toBe(2)
      })
    })

    describe('#linearCeilingWave returns a linear value sloped by the duration, capped by the frequency', function() {
      it('returns 0.5 when the time is 500, duration is 1000, and frequency is 3', function() {
        var rotator = new Rotator()
        expect(rotator.linearCeilingWave(500, 1000, 3)).toBe(0.5)
      })

      it('returns 1 when the time is 1500, duration is 1000, and frequency is 3', function() {
        var rotator = new Rotator()
        expect(rotator.linearCeilingWave(1500, 1000, 3)).toBe(1)
      })

      it('returns 0.5 when the time is 3500, duration is 1000, and frequency is 3', function() {
        var rotator = new Rotator()
        expect(rotator.linearCeilingWave(3500, 1000, 3)).toBe(0.5)
      })
    })

    describe('#squareCeilingWave gradually accelerates to 0.5, then slows down as it approaches 1', function() {
      it('gradually accelerates with increasing time, then slows approaching the duration', function(){
        var rotator = new Rotator(),
        table = [
          [100, '0.005'],
          [200, '0.020'],
          [300, '0.045'],
          [400, '0.080'],
          [500, '0.125'],
          [600, '0.180'],
          [700, '0.245'],
          [800, '0.320'],
          [900, '0.405'],
          [1000, '0.500']
        ]
        for(var _i = 0; _i < table.length; _i++ ) {
          var row = table[_i]
          expect(rotator.squareCeilingWave(row[0], 1000, 3).toFixed(3)).toBe(row[1])
        }
      })
    })

    describe('General usage with lists of images', function() {
      it('gets the width of the contained elements', function() {
        var rotator = new Rotator(this.rotatorDiv)

        expect(rotator.imageWidth).toBe(100)
      })

      it('gets the length of the UL by counting the LIs inside', function() {
        var rotator = new Rotator(this.rotatorDiv)

        expect(rotator.length).toBe(1)
      })
    })

    describe('#draw', function() {
      it('sets the style of the list to the pixel value of the calculated position', function() {
        var rotator = new Rotator(this.rotatorDiv)
        spyOn(rotator, 'calculatePosition').andReturn(1)
        spyOn(rotator, 'queueNextFrame')
        rotator.draw()
        expect(this.elList.style.left).toBe('-100px')
      })

      it('queues up the next frame of the animation', function() {
        var rotator = new Rotator(this.rotatorDiv)
        spyOn(rotator, 'calculatePosition').andReturn(1)
        spyOn(rotator, 'queueNextFrame')
        rotator.draw()
        expect(rotator.queueNextFrame).toHaveBeenCalled()
      })
    })

    describe('#prepareUI modifies the dom so it is ready to animate', function() {
      it('clones the first LI and appends it to the UL', function() {
        var rotator = new Rotator(this.rotatorDiv)
        rotator.prepareUI()
        expect(this.elList.querySelectorAll('li').length).toBe(2)
      })

      it('sets the parent div overflowX to hidden', function() {
        var rotator = new Rotator(this.rotatorDiv)
        rotator.prepareUI()
        expect(this.rotatorDiv.style.overflowX).toBe('hidden')
      })

      it('is idempotent', function() {
        var rotator = new Rotator(this.rotatorDiv)
        rotator.prepareUI()
        rotator.prepareUI()
        expect(this.rotatorDiv.style.overflowX).toBe('hidden')
        expect(this.elList.querySelectorAll('li').length).toBe(2)
      })
    })
  })
}())

