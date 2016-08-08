var setEvents = function(target, box) {
    var manager = new Hammer.Manager(target);

    var Pan = new Hammer.Pan();
    manager.add(Pan);

    var deltaX = box.x,
        deltaY = box.y;

    var isKeyDown = false;

    manager.on('panmove', function(e) {
        var canvasClientRect = e.target.getBoundingClientRect();
        var position = {
            x: e.center.x - canvasClientRect.left,
            y: e.center.y - canvasClientRect.top,
        }

        if (isKeyDown) {
            var cp = box.getCenterPosition();

            var dx = position.x - cp.x;
            var dy = position.y - cp.y;
            var angle = Math.atan2(dy, dx);
            box.r = angle;
            box.draw();
            return;
        }

        if (!isMouseInBox(position, box) && !box.isMoved) {
            return;
        }

        if (deltaX < 0 || deltaY < 0) {
            deltaX = e.center.x;
            deltaY = e.center.y;
        }

        var dX = deltaX + (e.deltaX);
        var dY = deltaY + (e.deltaY);
        box.setPosition(dX, dY);
        box.draw();
        box.isMoved = true;
    });

    manager.on('panend', function(e) {
        if (box.isMoved) {
            var canvasClientRect = e.target.getBoundingClientRect();
            deltaX = checkMinMax(deltaX + e.deltaX, canvasClientRect.left, canvasClientRect.right);
            deltaY = checkMinMax(deltaY + e.deltaY, canvasClientRect.top, canvasClientRect.bottom);
            box.isMoved = false;
            box.setPosition(deltaX, deltaY);
            box.draw();
        }
    });

    var isMouseInBox = function(position, box) {
        if (position.x < box.x ||
            position.x > (box.x + box.getBoxSize())) {
            return false;
        }
        if (position.y < box.y ||
            position.y > (box.y + box.getBoxSize())) {
            return false;
        }
        return true;
    }

    var checkMinMax = function (value, min, max) {
        if(value < min) {
            return min;
        }

        if(value > max) {
            return max;
        }
        return value;
    }

    var expandScaleSize = 0.2;
    var wheelLocker = {
        lock: false
    };

    target.onmousewheel = function(e) {
        if (wheelLocker.lock) {
            return;
        }
        var direction = 1;
        if (e.wheelDelta > 0) {
            direction *= -1;
        }

        var timerData = {
            origin: box.scale,
            target: box.scale + direction * expandScaleSize,
            locker: wheelLocker,
            run: function(time, cTime) {
                box.scale = this.origin + (this.target - this.origin) / time * cTime;
                box.draw();
            }
        }
        timer(timerData);
    }

    var time = 600;
    var timer = function(timerData) {
        var sTime = Date.now();
        var originScale = box.scale;
        var locker = timerData.locker ? timerData.locker : undefined;

        if (locker) {
            locker.lock = true;
        }

        var timerId = setInterval(function() {
            var timeDiff = Date.now() - sTime;
            if (timeDiff < time) {
                timerData.run(time, timeDiff)
            } else {
                if (locker) {
                    locker.lock = false;
                }
                clearInterval(timerId);
            }
        }, 10);
    }

    document.onkeydown = function(e) {
        e = e ? e : window.event;
        switch (e.keyCode) {
            case 16:
                isKeyDown = true;
                break;
        }
    }

    document.onkeyup = function(e) {
        e = e ? e : window.event;
        switch (e.keyCode) {
            case 16:
                isKeyDown = false;
                break;
        }
    }
}
