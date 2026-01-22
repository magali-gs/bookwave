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
    let displacementImage = null;

    // load the image into a texture
    const imageTexture = await PIXI.Assets.load(originalImageSrc);
    const displacementTexture = await PIXI.Assets.load('../assets/displacement1.jpg');

    image = new PIXI.Sprite(imageTexture);
    displacementImage = PIXI.Sprite.from(displacementTexture);

    image.x = 100 + 450;
    image.y = 100 + 300;
    image.width = 900;
    image.height = 600;
    image.interactive = true;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;

    const displacementFilter = new PIXI.DisplacementFilter({
        sprite: displacementImage,
        scale: 100,
        padding: 10,
    });

    image.filters = [displacementFilter];

    // Hide the displacement sprite so it's only used for the filter map
    displacementImage.visible = false;
    
    app.stage.addChild(image);
    app.stage.addChild(displacementImage);

});