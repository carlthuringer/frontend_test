# Frontend Coding Test

Hello, and thanks for checking out this submission. I'll try to
concisely explain what I did for each problem, but it should be
self-explanator for the most part. 

##Links

* [Github Pages Hosted
  files](http://carlthuringer.github.io/frontend_test)
* [Github Pages Hosted
  tests](http://carlthuringer.github.io/frontend_test/spec/SpecRunner.html)

## Specs

I used one third party library,
[Jasmine](http://pivotal.github.io/jasmine), the Javascript BDD
framework to test all the functionality developed for the problems. I
did not TDD because my skill with Javascript is still pretty weak, and I
usually need to spike out solutions to problems which I have not
encountered before. I find it difficult to TDD something which I haven't
already solved out in my head. I wrangled my own HTML fixture framework
in the before and after hooks.


### Rotator

This was by far my favorite problem. I have recently experimented with
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame) and I am very interested in the problem of
producing [stateless animation](http://darkskyapp.github.io/skycons/)
 and efficiently updating simulations. I
think that requestAnimationFrame is usually a superior API for doing Web
animations and I was able to get this proof of concept together in a
short amount of time. 

Now, the more efficient solution would be to use the CSS transition
property and manipulate the CSS with Javascript so that the slides
animated and tweened without needing to do a low-level animation. Such a
solution would only require about half of the code, too, but wouldn't
have been as much fun to program. I also speculate that it would be
easier to have realtime touch interactions that allow a user to slide
back and forth between slides with nice release animation and resume
behavior using a manual animation system like this.

The first thing to handle when making this kind of animated carousel is
to use CSS to take over the element. I considered using
'js-bound-carousel' or 'is-carousel' or some similar class to trigger
slightly different classes that would hide the scroll bar and perhaps
change the whole UI from a regular list to a overflow-hidden window and
tape image carousel... but after I found that using the carousel via the
slider was passable UI I decided to just use an inline style to hide the
scroll bar. 

The second thing is to make possible a seamless transition from last
element to first element. My natural solution for this is to copy the
first slide on the tape to the end, and then by the magic of computers
and video, we can jump from the end of the tape to the beginning and
nobody is the wiser.

So the animation is completely stateless. After everything is set up I
have the view (the HTML page) call #draw the first time. After that,
requestAnimationFrame does the calling. the requestAnimationFrame API
will always call the function with the time in milliseconds that have
elapsed since the tab went live. I'm pretty sure that's the end of
rendering, but it may be the instant the scripts are evaluated. Anyways,
given we always call draw with a number of milliseconds, I was very keen
on coming up with a pure function that would return the position of the
carousel tape given any time T. I think that a slightly better function
could be written, but the stepper and linearCeilingWave functions proved
it possible to drive the tape perfectly without maintaining any annoying
state in the object.

After that, I just wanted to come up with a nicer tweening function, and
so linearCeilingWave can be replaced with squareCeilingWave, which I
derived from [Robert Penner's Easing Functions](http://www.robertpenner.com/easing/).

The results are pretty nice, especially if your platform has hardware
accelerated rendering. I suspect that the CSS transition property does a
smoother job, though.

One thing that I still sort of wanted to add, but decided was kind of
extraneous, was an interactive component that would allow a user to
start, stop, shift, and change easing function in real time.

### Tabbed Content

This one didn't take me long to do, since tabbed content areas are so
common in Web development. I started with a plan: I would change the
container class instead of changing the div classes. With SASS it's very
easy to define the necessary CSS for saying parent.tab1 .tab1 = visible,
but it was a bit harder in regular CSS.

I again tried to avoid state at all costs, and I think I succeeded. Any
click event on the tabs clears all classes and redefines the class on
the parent div, changing the visibility of the content divs. 

The only thing I am disappointed with was that I had a really hard time
getting a CSS attribute selector to work. I really wanted to select tab1
[data-tab='tab1']{} but it just wasn't working for me, so I conceded to
putting an active class on the convenient clickedTab element.

### Text search

I changed the implementation of the searching backend completely after
some consideration and verbalizing my solution to a peer. Initially I
thought that the natural and obvious solution to the text search problem
was a hashmap. I would simply index every word and sub-word in a big
Object hash, and then do a lookup whenever the user wanted to 'search'.

So that turned out great, and it was really fast, but the indexing
function was a bit hairy. Other solutions used String#match to simply
count the number of matches with regular expressions, and after
explaining my hash solution I came to realize that the String#match
solution was much simpler and already well supported by the language
features.

I ended up removing the search button because I decided it served no
purpose but to comfort the user. There's no penalty to searching,
really, and no harm in showing a sub-word result. In fact, it turns out
to be kind of fun to try searching for how many instances of 'ua' there
are in the text.


### Overall goal

My overall goal was to create fairly solid and reusable, object-oriented
JavaScript code that preferred pure, idempotent functions and avoided
state wherever possible. I chose not to recognize issues of backwards
compatability and degradation where JavaScript is disabled or lacking in
features. Usually these issues are very easily overcome by using any one
of the ubiquitous JavaScript libraries, or for a minimalist, solved by
adding a well-understood polyfill.
