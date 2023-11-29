export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.originY = y;
        this.speed = 0.1;
        this.cur = index;
        this.max = Math.random() * 100 + 150;
    }

    update() {
        this.cur += this.speed;
        this.y = this.originY + (Math.sin(this.cur) * this.max);
    }
}