import {Sheep} from "./Sheep.js";

export class SheepController {
    constructor() {
        this.image = new Image();
        this.image.onload = () => {
            this.loaded();
        }
        this.image.src = "./src/images/sheep.png";
        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addSheep();
    }

    addSheep() {
        this.items.push(
            new Sheep(this.image, this.stageWidth)
        )
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur += 1;
            if (this.cur > 200) { // 200이 지나면 양 추가
                this.cur = 0;
                this.addSheep();
            }
            for (let i = this.items.length -1; i >= 0; i--) {
                const item = this.items[i];
                if (item.x < -item.width) {     // 양이 언덕을 다 오르면 사라지게 함
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }
}