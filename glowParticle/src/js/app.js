import Particle from "./particle.js";

const COLORS = [
    {r: 45, g: 74, b: 227},
    {r: 250, g: 225, b: 89},
    {r: 255, g: 104, b: 248},
    {r: 44, g: 209, b: 252},
    {r: 54, g: 233, b: 84},
]
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.totalParticle = 15;
        this.particles = [];

        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);

        const minRadius = 400;
        const maxRadius = 900;
        this.ctx.globalCompositeOperation = "saturation"
        for (let i = 0; i < this.totalParticle; i++) {
            const x = Math.random() * this.stageWidth;
            const y = Math.random() * this.stageHeight;
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;

            this.particles.push(new Particle(x, y, radius, COLORS[i % 5]));
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        requestAnimationFrame(this.animate.bind(this));
        for (let i = 0; i < this.totalParticle; i++) {
            this.particles[i].animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}

window.onload = () => {
    new App();
}