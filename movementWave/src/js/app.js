import {WaveGroup} from "./wavegroup.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        // this.animate();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;

        this.canvas.width = this.width * 2;
        this.canvas.height = this.height * 2;
        this.ctx.scale(2, 2);
        this.waveGroup.resize(this.width, this.height);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.waveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};