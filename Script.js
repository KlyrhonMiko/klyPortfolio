const mainContainer = document.getElementById("mainContainer");

// * HamBurger Menu Logic
const hamburger = document.getElementById("hamburgerMenu"),
      navigation = document.getElementById("navigation"),
      homeLink = document.getElementById("homeLink"),
      aboutLink = document.getElementById("aboutLink"),
      worksLink = document.getElementById("worksLink"),
      contactsLink = document.getElementById("contactsLink"),
      ham = document.getElementById("hamburger");
let scrollActive = true;
hamburger.addEventListener("click", () =>
{
  navigation.classList.toggle("active");
  if(scrollActive)
  {
    disableScroll();
  }
  else
  {
    enableScroll();
  }
})

homeLink.addEventListener("click", () =>
{
  onClick();
})

aboutLink.addEventListener("click", () =>
{
  onClick();
})

worksLink.addEventListener("click", () =>
{
  onClick();
})

contactsLink.addEventListener("click", () =>
{
  onClick();
})

function onClick()
{
  navigation.classList.remove("active");
  ham.classList.remove("active");
  enableScroll();
}

let preventScroll = function (e) {
  e.preventDefault();
};

function disableScroll() 
{
  scrollActive = false;
  window.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('touchmove', preventScroll, { passive: false });
}

function enableScroll()
{
  scrollActive = true;
  window.removeEventListener('wheel', preventScroll, { passive: false });
  document.removeEventListener('touchmove', preventScroll, { passive: false });
}

// * Navigation Bar Logic
const navigationBar = document.getElementById("navigationBar");
let lastScroll = 0;
window.addEventListener('scroll', () =>
{
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0)
  {
    navigationBar.classList.remove("scrollUp");
  }

  if(currentScroll > lastScroll && !navigationBar.classList.contains("scrollDown"))
  {
    navigationBar.classList.remove("scrollUp");
    navigationBar.classList.add("scrollDown");
  }

  if(currentScroll < lastScroll && navigationBar.classList.contains("scrollDown"))
  {
    navigationBar.classList.add("scrollUp");
    navigationBar.classList.remove("scrollDown");
  }

  lastScroll = currentScroll;
})

// * Loading Screen Logic
disableScroll();
window.addEventListener('load', () => 
{
  setTimeout(function()
  {
    enableScroll();
    mainContainer.classList.add("loaded")
  }, 3000)
}) 

// * Cursor Trailer Logic
const cursorTrailer =  document.getElementById("cursorTrailer");
const animateTrailer = (e, interacting) => {
    const x = e.clientX - cursorTrailer.offsetWidth / 2,
          y = e.clientY - cursorTrailer.offsetHeight / 2;
    
    const keyframes = {
      transform: `translate(${x}px, ${y}px) scale(${interacting ? 3 : 1})`
    }
    
    cursorTrailer.animate(keyframes, { 
      duration: 800, 
      fill: "forwards" 
    });
}
  
const getTrailerClass = type => {
    switch(type) {
      case "video":
        return "fa-solid fa-play";
      case "click":
        return "fa-solid fa-hand-pointer";
      case "link":
        return "fa-solid fa-arrow-right";
      default:
        return "fa-solid fa-code"; 
    }
}
  
window.onmousemove = e => {
    const interactable = e.target.closest(".interactable"),
          interacting = interactable !== null;

    const icon = document.getElementById("trailerIcon");

    animateTrailer(e, interacting);

    cursorTrailer.dataset.type = interacting ? interactable.dataset.type : "";

    if(interacting) 
    {
        icon.className = getTrailerClass(interactable.dataset.type);
    }
}