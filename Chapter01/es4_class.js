function Point() {
    this.x = 0;
    this.y = 0;

    this.setX = (x=0) => {
        this.x = x;
    };

    this.setY = (y=0) => {
        this.y = y;
    };

    this.getXY = () => `${this.x}:${this.y}`
}

let point = new Point();
point.setX(10);
point.setY(20);
console.log(point.getXY()); // 10:20