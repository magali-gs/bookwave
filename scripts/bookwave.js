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
    let rgbFilter = new PIXI.filters.RGBSplitFilter({
        red: [0, 0],
        green: [0, 0],
        blue: [0, 0]
    });

    // load the image into a texture
    const imageTexture = await PIXI.Assets.load(originalImageSrc);
    const displacementTexture = await PIXI.Assets.load('./assets/displacement1.jpg');

    image = new PIXI.Sprite(imageTexture);
    displacementImage = PIXI.Sprite.from(displacementTexture);

    image.x = 100 + 450;
    image.y = 100 + 300;
    image.width = 900;
    image.height = 600;
    image.interactive = true;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;

    displacementImage.width = 600;
    displacementImage.height = 600;
    // Set wrap mode to REPEAT so the displacement map wraps around
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const displacementFilter = new PIXI.DisplacementFilter({
        sprite: displacementImage,
        scale: 100,
        padding: 10,
    });

    image.filters = [displacementFilter, rgbFilter];

    app.stage.addChild(image);
    app.stage.addChild(displacementImage);

    let currentX = 0;
    let currentY = 0;
    let aimX = 0;
    let aimY = 0;

    // listening to mouse movements
    section.addEventListener('mousemove', (event) => {
        aimX = event.pageX;
        aimY = event.pageY;
    });

    // making the animation
    const animate = () => {
        // currentX should get towards aimX every frame
        const diffX = aimX - currentX;
        const diffY = aimY - currentY;

        currentX = currentX + (diffX * 0.05);
        currentY = currentY + (diffY * 0.05);

        // if there is a displacement image loaded, move it
        if (displacementImage) {
            displacementImage.x = currentX;
            displacementImage.y = displacementImage.y + 1 + (diffY * 0.01);

            rgbFilter.red = [diffX * 0.1, 0];
            rgbFilter.green = [0, diffY * 0.1];
            rgbFilter.blue = [diffX * 0.5, diffY * 0.5];
        }
        // keep running this animation every frame
        requestAnimationFrame(animate);
    }

    animate();
});