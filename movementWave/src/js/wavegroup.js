import Wave from "./wave.js";

export class WaveGroup {
    constructor() {
        this.totalWave = 3;
        this.totalPoint = 6;
        this.waves = [];
        this.colors = ['rgba(200, 100, 100, 0.4)', 'rgba(100, 100, 255, 0.4)', 'rgba(200, 100, 255, 0.4)']

        for (let i = 0; i < this.totalWave; i++) {
            this.waves[i] = new Wave(i, this.totalPoint, this.colors[i]);
        }
    }

    resize(x, y) {
        for (let i = 0; i < this.totalWave; i++) {
            this.waves[i].resize(x, y);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWave; i++) {
            this.waves[i].draw(ctx);
        }
    }
}