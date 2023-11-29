export default class Particle {
    constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4;
        this.vy = Math.random() * 4;

        this.sinValue = Math.random();
    }

    animate(ctx, stageWidth, stageHeight) {
        this.x += this.vx;
        this.y += this.vy;

        this.sinValue += 0.01;
        this.radius += Math.sin(this.sinValue)

        if(this.x < 0) {
            this.vx *= -1;
            this.x += 10;
        } else if (this.x > stageWidth) {
            this.vx *= -1;
            this.x -= 10;
        }

        if (this.y < 0) {
            this.vy *= -1;
            this.y += 10;
        } else if (this.y > stageHeight) {
            this.vy *= -1;
            this.y -= 10;
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.radius * 0.01,
            this.x, this.y, this.radius
        );

        const {r, g, b} = this.rgb;

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;

        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        ctx.fill();
        ctx.closePath();
    }


}