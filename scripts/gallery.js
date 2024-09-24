document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close");

  const sources = [
    "https://natural-connection-0f2ac61546.strapiapp.com/api/formato1-caracterizacions",
    "https://natural-connection-0f2ac61546.strapiapp.com/api/formato2-complementos",
    "https://natural-connection-0f2ac61546.strapiapp.com/api/especies-formato3s",
    "https://natural-connection-0f2ac61546.strapiapp.com/api/formato5-monitoreo-restauracions",
    "https://natural-connection-0f2ac61546.strapiapp.com/api/formato-4-hijos-semanas",
  ];

  // Function to fetch and display images from each source
  function fetchAndDisplayImages(url) {
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.status);
        }

        return response.json();
      })
      .catch((error) => console.error("Error fetching data:", error))
      .then((data) => {
        if (!data) return;

        data.data.forEach((item) => {
          const imageItem = document.createElement("div");
          imageItem.className = "image-item";

          const itemLatitude =
            item.attributes?.Latitud ?? item.attributes?.CoordMestricas_AL_N;
          const itemLongitude =
            item.attributes?.Longitud ?? item.attributes?.CoordMestricas_AL_W;

          const info = `
                        <p style="font-weight: bold; font-family: sans-serif; color: #FF7401; font-size: 18px;"><strong></strong> ${
                          item.attributes.createdAt
                        }</p>
                        <p style="font-weight: regular; font-family: sans-serif; font-size: 15px;"><strong>Latitud:</strong> ${
                          itemLatitude === undefined || itemLatitude === ""
                            ? "Sin información"
                            : itemLatitude
                        }</p>
                        <p style="font-weight: regular; font-family: sans-serif; font-size: 15px;"><strong>Longitud:</strong> ${
                          itemLongitude === undefined || itemLongitude === ""
                            ? "Sin información"
                            : itemLongitude
                        }</p>
                    `;

          const slideshowContainer = document.createElement("div");
          slideshowContainer.className = "slideshow-container";

          const itemImages = item.attributes?.fotos ?? item.attributes?.Fotos;

          if (itemImages) {
            const itemImagesLength = Object.keys(itemImages).length;

            for (let i = 0; i < itemImagesLength; i++) {
              const imageData = itemImages[i];
              if (imageData) {
                const slide = document.createElement("div");
                slide.className = "mySlides";

                const imgElement = document.createElement("img");
                imgElement.src = `data:image/jpeg;base64,${imageData}`;
                imgElement.addEventListener("click", () => {
                  modal.style.display = "flex";
                  modalImg.src = imgElement.src;
                });
                slide.appendChild(imgElement);

                slideshowContainer.appendChild(slide);
              }
            }
          }

          imageItem.innerHTML = info;
          imageItem.appendChild(slideshowContainer);
          imageContainer.appendChild(imageItem);
        });

        initializeSlideshows();
      });
  }

  // Fetch images from all sources
  sources.forEach((url) => fetchAndDisplayImages(url));

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function initializeSlideshows() {
  const slideshows = document.querySelectorAll(".slideshow-container");

  slideshows.forEach((slideshow) => {
    const slides = slideshow.querySelectorAll(".mySlides");

    if (!slides.length) return;

    slides[0].style.display = "block";

    for (let i = 1; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    let currentSlide = 0;

    function showSlide() {
      slides[currentSlide].style.display = "none";
      currentSlide = currentSlide + 1 === slides.length ? 0 : currentSlide + 1;
      slides[currentSlide].style.display = "block";
    }

    let intervalId = setInterval(() => {
      showSlide();
    }, 3000);

    slideshow.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      clearInterval(intervalId);

      intervalId = setInterval(() => {
        showSlide();
      }, 3000);

      showSlide();
    });
  });
}
