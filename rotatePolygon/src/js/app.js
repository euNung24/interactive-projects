import {Polygon} from "./Polygon.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.resize();
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('pointerdown', this.onDown.bind(this), false);
        window.addEventListener('pointermove', this.onMove.bind(this), false);
        window.addEventListener('pointerup', this.onUp.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 5,
            3
        )

        this.polygon2 = new Polygon(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 2.5,
            3
        )

        this.polygon3 = new Polygon(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 4,
            3
        )

        this.polygon4 = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + this.stageHeight / 2,
            this.stageHeight / 1.5,
            15
        )

        this.polygon5 = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + this.stageHeight / 4,
            this.stageHeight / 1.5,
            15
        )
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.moveX *= 0.92; // pointerUp 동작 시 뚝 끊기는 것을 막기 위해
        this.polygon.animate(this.ctx, this.moveX);
        this.polygon2.animateCircles(this.ctx, this.moveX);
        this.polygon3.animateSquare(this.ctx, this.moveX, 30);
        this.polygon4.animateSquare(this.ctx, this.moveX, 80);
        this.polygon5.animateSquare(this.ctx, this.moveX, 100, true);
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e) {
        if(this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }

    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}
