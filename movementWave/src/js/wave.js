import {Point} from "./point.js";

export default class Wave {

    constructor(index, totalPoint, color) {
        this.index = index;
        this.totalPoint = totalPoint;
        this.color = color;
        this.points = [];
        this.init();

    }

    init() {
        for(let i=0; i < this.totalPoint; i++) {
            this.points[i] = new Point(this.index + i, this.pointGap * i, this.centerY)
        }
    }
    resize(x, y) {
        this.width = x;
        this.height = y;
        this.centerY = y / 2;
        this.pointGap = x / (this.totalPoint - 1);
        this.init();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for(let i = 1; i < this.totalPoint; i++) {
            if(i < this.totalPoint - 1) {
                this.points[i].update();
             }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.points[0].x, this.height);
        ctx.fill();
        ctx.closePath();
    }
}
