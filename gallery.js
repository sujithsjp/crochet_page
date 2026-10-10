const photoGrid = document.querySelector("#photo-grid");
const photoCount = document.querySelector("#photo-count");
const viewer = document.querySelector("#viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCaption = document.querySelector("#viewer-caption");
const photos = window.CROCHET_PHOTOS || [];
let activePhoto = 0;

function getDailyPhotoIndex(dayOffset = 0) {
  const now = new Date();
  const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000) + dayOffset;
  let seed = dayNumber >>> 0;
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) % photos.length;
}

function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  viewerImage.src = photo.url;
  viewerImage.alt = `Crochet photograph ${activePhoto + 1}`;
  viewerCaption.textContent = `${String(activePhoto + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function openViewer(index) {
  showPhoto(index);
  viewer.showModal();
}

function buildGallery() {
  if (!photos.length) {
    photoCount.textContent = "No photos found";
    return;
  }

  const hero = document.querySelector(".hero-image");
  let heroIndex = getDailyPhotoIndex();
  if (heroIndex === getDailyPhotoIndex(-1)) heroIndex = (heroIndex + 1) % photos.length;
  hero.src = photos[heroIndex].url;

  photoCount.textContent = `${photos.length} handmade moments`;
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const number = document.createElement("span");

    button.className = "photo-card";
    button.type = "button";
    button.setAttribute("aria-label", `Open crochet photograph ${index + 1}`);
    image.src = photo.url;
    image.alt = "";
    image.loading = index < 4 ? "eager" : "lazy";
    image.decoding = "async";
    number.className = "photo-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1).padStart(2, "0");
    button.append(image, number);
    button.addEventListener("click", () => openViewer(index));
    fragment.append(button);
  });

  photoGrid.append(fragment);
}

document.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
document.querySelector(".viewer-previous").addEventListener("click", () => showPhoto(activePhoto - 1));
document.querySelector(".viewer-next").addEventListener("click", () => showPhoto(activePhoto + 1));

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});

viewer.addEventListener("keydown", (event) => {
  if (event.key === "Escape") viewer.close();
  if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
});

buildGallery();