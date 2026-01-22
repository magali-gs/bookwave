// loop over each section, get an image and replace with a canvas
const sections = document.querySelectorAll('section');

sections.forEach(async section => {
    const originalImage = section.querySelector('img');
    const originalImageSrc = originalImage.getAttribute('src');

    section.innerHTML = "";

    // set up pixi application
    const app = new PIXI.Application()

    await app.init({
        width: 1100,
        height: 800,
        backgroundAlpha: 0,
    });

    // add the pixi application to the section tag
    section.appendChild(app.canvas);

    let image = null;

    // load the image into a texture
    const texture = await PIXI.Assets.load(originalImageSrc);
    image = new PIXI.Sprite(texture);

    image.x = 100;
    image.y = 100;
    image.width = 900;
    image.height = 600;
    image.interactive = true;

    app.stage.addChild(image);
});