// Seleciona elementos
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");
const number = document.querySelector(".numbers");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const list = document.querySelector(".list");

let currentIndex = 0;
let isTransitioning = false;
let autoSlideInterval;

// Atualiza slide
function updateSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  items.forEach((item) => item.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  items[index].classList.add("active");
  dots[index].classList.add("active");
  number.textContent = String(index + 1).padStart(2, "0");

  list.style.transform = `translateX(-${index * 33.333}%)`;

  setTimeout(() => (isTransitioning = false), 600);
}

// Próximo
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex = (currentIndex + 1) % items.length;
  updateSlide(currentIndex);
  resetAutoSlide();
});

// Anterior
prevBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlide(currentIndex);
  resetAutoSlide();
});

// Dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (isTransitioning || index === currentIndex) return;
    currentIndex = index;
    updateSlide(currentIndex);
    resetAutoSlide();
  });
});

// Auto slide
function autoSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlide(currentIndex);
}
function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 5000);
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}
function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

document
  .querySelector(".carousel-container")
  .addEventListener("mouseenter", stopAutoSlide);
document
  .querySelector(".carousel-container")
  .addEventListener("mouseleave", startAutoSlide);

// Inicialização
updateSlide(currentIndex);
startAutoSlide();

// Teclas ← →
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});
