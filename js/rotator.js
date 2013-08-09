var imageWidth,
movingPosition = 0,
elCardUl,
nlCards,
startPosition = 0,
maximumWidth

onload = function setupPage() {
  var elRotator, elFirstCard
  elRotator = document.querySelector('#rotator')
  nlCards = elRotator.querySelectorAll('ul li')
  elCardImg = elRotator.querySelector('img')
  elCardUl = elRotator.querySelector('ul')
  elFirstCard = elRotator.querySelector('li')
  elCardUl.appendChild(elFirstCard.cloneNode(true));
  imageWidth = elCardImg.width

  draw()
}

function draw(time) {
  var newPosition
  newPosition = Math.max(0, stepper((time - 3000)/ 3) % nlCards.length)
  if(!(stepper(time/3) < 1))
    newPosition += linearCeilingWave(time, 3)
  elCardUl.style.left = -newPosition  * nlCards[0].clientWidth + 'px'
  requestAnimationFrame(draw)
}

function stepper(time) {
  return Math.floor(time / 1000)
}

function linearCeilingWave(time, frequency) {
  return Math.min(time / 1000 % frequency)
}
