var Box = function() {
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.minX = -1;
    this.minY = -1;
    this.maxX = -1;
    this.maxY = -1;
    this.size = 100;
    this.isMoved = false;
    this.scale = 1;
    this.drawer = undefined;
}

Box.prototype = {
    init: function(opt) {
        this.x = opt.x? opt.x : this.x;
        this.y = opt.y? opt.y : this.y;
        this.r = opt.r? opt.r : this.r;
        this.minX = opt.minX? opt.minX : this.minX;
        this.minY = opt.minY? opt.minY : this.minY;
        this.maxX = opt.maxX? opt.maxX : this.maxX;
        this.maxY = opt.maxY? opt.maxY : this.maxY;
        this.size = opt.size? opt.size : this.size;
        this.isMoved = opt.isMoved? opt.isMoved : this.isMoved;
        this.scale = opt.scale? opt.scale : this.scale;
        this.drawer = opt.drawer? opt.drawer : this.drawer;
    },
    setPosition: function(x, y) {
        this.x = this.checkMinMax(x, this.minX, this.maxX - this.getBoxSize());
        this.y = this.checkMinMax(y, this.minY, this.maxY - this.getBoxSize());
    },
    draw: function() {
        if(!this.drawer.drawBox) {
            return;
        }
        var cp = this.getCenterPosition();
        this.drawer.drawBox(this.x, this.y, this.getBoxSize(), cp.x, cp.y, this.r);
    },
    checkMinMax: function (value, min, max) {
        if(value < min) {
            return min;
        }

        if(value > max) {
            return max;
        }
        return value;
    },
    getBoxSize: function () {
        return this.size * this.scale;
    },
    getCenterPosition: function () {
        var center = this.getBoxSize() * 0.5;
        var cx = this.x + center;
        var cy = this.y + center;
        return {x: cx, y: cy};
    }
}

Box.prototype.constructor = Box;
