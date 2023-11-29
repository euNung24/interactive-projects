export class Ball {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }

    animate(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}