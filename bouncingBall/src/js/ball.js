export class Ball {
    constructor(stageWidth, stageHeight, radius, speed, block) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.vx = speed;
        this.vy = speed;
        this.radius = radius;
        this.block = block;

        const diameter = this.radius * 2;
        // 주의@@@
        this.x = Math.random() * (this.stageWidth - diameter) + radius;
        this.y = Math.random() * (this.stageHeight - diameter) + radius;

        // 초기화 된 공의 중심점이 block 내부에 있는지 확인
        let isInBlock = true;
        while(isInBlock) {
            let isInBlockX = this.x >= this.block.fromX
                && this.x <= (this.block.fromX + this.block.width);
            let isInBlockY = this.y >= this.block.fromY
                && this.y <= (this.block.fromY + this.block.height);
            if(isInBlockX) {
                this.x = Math.random() * (this.stageWidth - diameter) + radius;
            } else if (isInBlockY) {
                this.y = Math.random() * (this.stageHeight - diameter) + radius;
            } else {
                break;
            }
        }
    }

    draw(ctx) {
        this.x += this.vx;
        this.y -= this.vy;

        this.bounceWindow();
        this.bounceBlock();
        ctx.beginPath();
        ctx.fillStyle = "#E7AF34FF"
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    bounceWindow() {
        const minX = this.radius;
        const maxX = this.stageWidth - this.radius;
        const minY = this.radius;
        const maxY = this.stageHeight - this.radius;

        if(this.x < minX || this.x > maxX) {
            this.vx *= -1;
        }
        if(this.y < minY || this.y > maxY) {
            this.vy *= -1;
        }
    }

    bounceBlock() {
        const minX = this.block.fromX - this.radius;
        const maxX = this.block.fromX + this.block.width + this.radius;
        const minY = this.block.fromY - this.radius;
        const maxY = this.block.fromY + this.block.height + this.radius;

        // 해결하기
        if((this.x > minX && this.x < maxX) && (this.y > minY && this.y < maxY)) {
            const abxMinX = Math.abs(minX - this.x);
            const abxMinY = Math.abs(minY - this.y);
            const abxMaxX = Math.abs(maxX - this.x);
            const abxMaxY = Math.abs(maxY - this.y);

            const minXX = Math.min(abxMinX, abxMaxX);
            const minYY = Math.min(abxMinY, abxMaxY);
            const min = Math.min(minXX, minYY);

            if(min === minXX) {
                this.vx *= -1;
            }
            if (min === minYY){
                this.vy *= -1;
            }
        }
    }
}