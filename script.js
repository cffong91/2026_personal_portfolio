const experienceItems = document.querySelectorAll(
  "#experience .timeline-item"
);

const setActiveExperience = () => {
  const screenCenter = window.innerHeight / 2;

  let closestItem = null;
  let closestDistance = Infinity;

  experienceItems.forEach((item) => {
    const box = item.getBoundingClientRect();
    const itemCenter = box.top + box.height / 2;
    const distance = Math.abs(screenCenter - itemCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  experienceItems.forEach((item) => {
    item.classList.toggle("is-active", item === closestItem);
  });
};

setActiveExperience();

window.addEventListener("scroll", setActiveExperience, {
  passive: true,
});

window.addEventListener("resize", setActiveExperience);

const portraitAbout = document.querySelector(".portrait-about");
const aboutTypewriter = document.querySelector(".about-typewriter");

if (portraitAbout && aboutTypewriter) {
  const aboutText = aboutTypewriter.dataset.text;
  let typingTimer;
  let characterIndex = 0;

  const showAbout = () => {
    clearInterval(typingTimer);
    portraitAbout.classList.add("is-revealed");
    aboutTypewriter.textContent = "";
    characterIndex = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      aboutTypewriter.textContent = aboutText;
      return;
    }

    typingTimer = setInterval(() => {
      aboutTypewriter.textContent += aboutText[characterIndex];
      characterIndex += 1;

      if (characterIndex >= aboutText.length) {
        clearInterval(typingTimer);
      }
    }, 22);
  };

  const hideAbout = () => {
    clearInterval(typingTimer);
    portraitAbout.classList.remove("is-revealed");
    aboutTypewriter.textContent = "";
  };

  portraitAbout.addEventListener("mouseenter", showAbout);
  portraitAbout.addEventListener("mouseleave", hideAbout);
  portraitAbout.addEventListener("focus", showAbout);
  portraitAbout.addEventListener("blur", hideAbout);

  portraitAbout.addEventListener("click", () => {
  const touchDevice = window.matchMedia("(hover: none)").matches;

  if (!touchDevice) {
    return;
  }

  if (portraitAbout.classList.contains("is-revealed")) {
    hideAbout();
  } else {
    showAbout();
  }
});
}