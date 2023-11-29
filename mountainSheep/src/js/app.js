import {Hill} from "./hill.js";
import {SheepController} from "./SheepController.js";
import {Sun} from "./Sun.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);
        this.sun = new Sun();

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.2, 6),
        ];

        this.SheepController = new SheepController();
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.animate();
        // requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(2, 2);
        this.sun.resize(this.stageWidth, this.stageHeight);

        for (const hill of this.hills) {
            hill.resize(this.stageWidth, this.stageHeight);
        }

        this.SheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.sun.draw(this.ctx, t)

        let dots;
        for (const hill of this.hills) {
            dots = hill.draw(this.ctx);
        }
        this.SheepController.draw(this.ctx, t, dots); // 마지막 hills 의 dots => 양이 가장 마지막 언덕에 보이기 위함
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}