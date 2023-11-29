import {Ball} from "./ball.js";
import {BounceString} from "./string.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.resize();
        this.xGap = 50;
        this.yGap = this.stageHeight / 2;
        this.string = new BounceString(
            this.xGap, this.yGap, this.stageWidth - this.xGap, this.yGap, '#ff0000'
        );
        this.x = -5000;
        this.y = -5000;
        this.isDown = false;

        this.ball = new Ball(20, '#ff00ff');


        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        window.addEventListener('resize', this.resize.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        // this.string.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        requestAnimationFrame(this.animate.bind(this));
        this.string.animate(this.ctx, this.x, this.y);
        this.ball.animate(this.ctx, this.x, this.y);
    }

    onDown(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.isDown = true;
    }
    onMove(e) {
        if(this.isDown) {
            this.x = e.clientX;
            this.y = e.clientY;
        }
    }

    onUp(e) {
        this.isDown = false;
        this.x = -5000;
        this.y = -5000;
    }
}

window.onload = () => {
    new App();
}