class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get xy() {
        return this.getXY();
    }
    setX(x=0) {
        this.x = x;
    }
    setY(y=0) {
        this.y = y;
    }
    getXY() {
        return `${this.x}:${this.y}`;
    }
}

let point = new Point();
point.setX(10);
point.setY(20);
console.log(point.getXY()) // 10:20
console.log(point.xy) // 10:20