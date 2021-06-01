const webswipe = (elem, whileMoveCallback, callback) => {

    var eventMove = { x: 0, y: 0 };
    var start = { x: 0, y: 0 };
    const isTouch = window.Touch || false;
    var previousMove;

    var isDone = false,
        touched = false;

    var untilDone = function () {
        if (isDone) return;

        var xTotal = start.x - eventMove.x,
            yTotal = start.y - eventMove.y,
            xDistance = Math.abs(xTotal),
            yDistance = Math.abs(yTotal),
            dir,
            moved;

        if (xDistance > yDistance) { //moved on x-axis
            dir = xTotal > 0 ? "left" : "right";
            moved = xDistance;
        } else { //moved on y-axis
            dir = yTotal > 0 ? "top" : "bottom";
            moved = yDistance;
        }

        if (previousMove !== moved) {
            whileMoveCallback(dir, moved);
        }

    };

    const done = () => {
        touched = false;
        isDone = true;
        var xTotal = start.x - eventMove.x,
            yTotal = start.y - eventMove.y,
            xDistance = Math.abs(xTotal),
            yDistance = Math.abs(yTotal),
            dir,
            moved;

        if (xDistance > yDistance) { //moved on x-axis
            dir = xTotal > 0 ? "left" : "right";
            moved = xDistance;
        } else { //moved on y-axis
            dir = yTotal > 0 ? "top" : "bottom";
            moved = yDistance;
        }

        callback(dir, moved);

    }

    elem.addEventListener(isTouch ? "touchstart" : "mousedown", ev => {
        isDone = false;
        touched = true;
        start.x = isTouch ? ev.touches[0].clientX : ev.clientX;
        start.y = isTouch ? ev.touches[0].clientY : ev.clientY;
    });

    elem.addEventListener(isTouch ? "touchmove" : "mousemove", ev => {
        if (touched === true) {
            eventMove.x = isTouch ? ev.touches[0].clientX : ev.clientX;
            eventMove.y = isTouch ? ev.touches[0].clientY : ev.clientY;
            untilDone();
        }
    });

    elem.addEventListener(isTouch ? "touchcancel" : "mouseleave", done);
    elem.addEventListener(isTouch ? "touchend" : "mouseup", done);
};

module.exports = webswipe;