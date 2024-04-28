const mainContainer = document.getElementById("mainContainer");

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
window.addEventListener('load', () => 
{
  setTimeout(function()
  {
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