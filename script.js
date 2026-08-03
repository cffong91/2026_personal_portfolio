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