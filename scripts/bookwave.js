// loop over each section, get an image and replace with a canvas
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    const originalImage = section.querySelector('img');
    console.log(originalImage);
    const originalImageSrc = originalImage.getAttribute('src');

    section.innerHTML = originalImageSrc;
});