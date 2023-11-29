import {Point} from "./point.js";

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 260;
const HEIGHT = 260;


export class Dialog {
    constructor() {
        this.pos = new Point();
        this.target = new Point();
        this.prevPos = new Point();
        // 고정값
        this.downPos = new Point();
        // 고정값
        this.startPos = new Point();
        // 고정값
        this.mousePos = new Point();
        this.centerPos = new Point();
        // this.origin = new Point();
        this.rotation = 0;
        this.sideValue = 0;
        this.isDown = false;
    }

    resize(stageWidth, stageHeight) {
        // this.pos(x, y) 위치 화면 내 random 배치
        this.pos.x = Math.random() * (stageWidth - WIDTH);
        this.pos.y = Math.random() * (stageHeight - HEIGHT);
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    animate(ctx) {
        // pos(x, y) => target(x, y) 까지 도달하는 속도
        const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);
        // == target.(x, y)
        this.pos.add(move);
        // == mouseDown(x, y)
        this.centerPos = this.pos.clone().add(this.mousePos);

        // ctx.beginPath();
        // ctx.fillStyle = '#b4b472';
        // ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);

        this.swingDrag(ctx);
        this.prevPos = this.pos.clone();
    }

    swingDrag(ctx) {
        const dx = this.pos.x - this.prevPos.x;
        // dx를 1초에 60에 한번씩 계산?
        const speedX = Math.abs(dx) / FPS;
        const speed = Math.min(Math.max(speedX, 0), 1);

        let rotation = MAX_ANGLE * speed; // 0 ~ 30deg
        rotation = rotation * (dx > 0 ? 1 : -1) - this.sideValue;       // 방향에 따라 -30.5 < rotation < 30.5

        this.rotation += (rotation - this.rotation) * ROTATE_SPEED;     // (현재각도 - 이전각도) * 회전속도 + 이전각도
                                                                        // => 이전각도에서 현재각도까지 자연스럽게 모션을 주기 위함

        // const tmpPos = this.pos.clone().add(this.origin);
        const tmpPos = this.pos.clone().add(this.mousePos);
        ctx.save();
        ctx.translate(tmpPos.x, tmpPos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.fillStyle = '#b4b472';
        // ctx.fillRect(-this.origin.x, -this.origin.y, WIDTH, HEIGHT);
        ctx.fillRect(-this.mousePos.x, -this.mousePos.y, WIDTH, HEIGHT);
        ctx.restore();
    }

    down(point) {
        if(point.collide(this.pos, WIDTH, HEIGHT)) {
            this.isDown = true;
            // boxStart(x, y)
            this.startPos = this.pos.clone();
            // mouseDown(x, y)
            this.downPos = point.clone();
            // mouseDown(x, y) - boxStart(x,y)
            this.mousePos = point.clone().subtract(this.pos);

            const xRatioValue = this.mousePos.x / WIDTH;    // 0 < xRatioValue < 1
            // this.origin.x = WIDTH * xRatioValue;
            // this.origin.y = HEIGHT * this.mousePos.y / HEIGHT;

            this.sideValue = xRatioValue - 0.5;     // -0.5 < this.sideValue < 0.5

            return this;
        } else {
            return null;
        }
    }

    move(point) {
        if(this.isDown) {
            // boxStart(x, y) + moved(x, y) - mouseDown(x, y)
            this.target = this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up() {
        this.isDown = false;
    }
}