export class Block {
    constructor(ctx, width, height) {
        this.fromX = 300;
        this.fromY = 200;
        this.width = width;
        this.height = height;
        this.gapX = 30;
        this.gapY = 40;
        this.draw(ctx);
    }

    draw(ctx) {
        const toX = this.fromX + this.width;
        const toY = this.fromY + this.height;
        ctx.beginPath();
        ctx.fillStyle = "#a60404";
        ctx.moveTo(this.fromX , this.fromY);
        ctx.lineTo(toX, this.fromY);
        ctx.lineTo(toX, toY);
        ctx.lineTo(this.fromX, toY);
        ctx.fill();
        ctx.closePath();
        this.drawShadow(ctx, this.fromX, toY);
        this.drawSide(ctx, this.fromX, this.fromY);
    }

    drawShadow(ctx, fromX, fromY) {
        const toX = fromX + this.width;
        const toY = fromY + this.gapY;
        ctx.beginPath();
        ctx.fillStyle = "#1e0e3b";
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, fromY);
        ctx.lineTo(toX - this.gapX, toY);
        ctx.lineTo(fromX - this.gapX, toY);
        ctx.fill();
        ctx.closePath();
    }

    drawSide(ctx, fromX, fromY) {
        ctx.beginPath();
        ctx.fillStyle = "#520d0d";
        ctx.moveTo(fromX - this.gapX, fromY+ this.gapY);
        ctx.lineTo(fromX, fromY);
        ctx.lineTo(fromX,  fromY + this.height);
        ctx.lineTo(fromX - this.gapX, fromY + this.height + this.gapY);
        ctx.fill();
        ctx.closePath();
    }
}