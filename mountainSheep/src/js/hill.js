export class Hill {
    constructor(color, speed, total) {
        this.speed = speed;
        this.color = color;
        this.totalPoint = total;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.gap = Math.ceil(this.stageWidth / (this.totalPoint - 2));

        for (let i = 0; i < this.totalPoint; i++) {
            this.points[i] = {
                x: this.gap * i,
                y: this.getY()
            };
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let cur = this.points[0];
        let last = this.points.length
        let prev = cur;
        let dots = [];
        cur.x += this.speed;  // 0.2

        if(cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            })
            if (this.points[last].x - this.gap > this.stageWidth + this.gap) {
                this.points.splice(-1);
            }
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;
        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;

            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy
            })

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        // ctx.closePath();

        return dots;
    }

    getY() {
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}