export class BounceString {
    constructor(pos, color) {
        const middleX = ((pos.x2 - pos.x1) / 2) + pos.x1;
        const middleY = ((pos.y2 - pos.y1) / 2) + pos.y1;

        this.points = [
            {
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0,
            },
            {
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0,
            },
            {
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0,
            },
        ];
        this.detect = 10;

        this.color = color;
    }

    animate(ctx, pointX, pointY) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.moveTo(this.x1, this.y1);

        let prevX = this.x1;
        let prevY = this.y1;

        if(pointX > 0 && pointX < this.x2) {
            let cx =
            ctx.quadraticCurveTo(pointX, pointY, this.x2, this.y2);
        }
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}