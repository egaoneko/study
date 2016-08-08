var Drawer = function(canvas) {
    if (!canvas) {
        throw "Does not found canvas";
        return;
    } else if (!canvas.getContext) {
        throw "Incorrect canvas";
        return;
    };
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
}

Drawer.prototype = {
    refresh: function() {
        this.ctx.save();
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    },
    drawBox: function(x, y, size, cx, cy, r) {
        this.refresh();
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(r);
        this.ctx.translate(-cx, -cy);
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.rect(x, y, size, size);
        this.ctx.fill();
        this.ctx.restore();
    }
}
