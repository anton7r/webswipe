//the swipe function
webswipe = function(elem, callback){
    var eventMove = {
        x:0,
        y:0
    },

    eventStart = {
        x:0,
        y:0
    },
    isTouch = window.Touch || false;

    elem.addEventListener(isTouch ? "touchstart" : "mousedown", function(ev){
        eventStart.x = isTouch ? ev.touches[0].clientX : ev.clientX;
        eventStart.y = isTouch ? ev.touches[0].clientY : ev.clientY;
    });

    elem.addEventListener(isTouch ? "touchmove" : "mousemove", function(ev){
        eventMove.x = isTouch ? ev.touches[0].clientX : ev.clientX;
        eventMove.y = isTouch ? ev.touches[0].clientY : ev.clientY;
    });

    elem.addEventListener(isTouch ? "touchend" : "mouseup", function(ev){
        var xTotal = eventStart.x - eventMove.x,
        yTotal = eventStart.y - eventMove.y,
        xDistance = Math.abs(xTotal),
        yDistance = Math.abs(yTotal),
        dir,
        moved;

        if (xDistance > yDistance){ //moved on x-axis
            if (xTotal > 0){
                dir = "left";
            } else {
                dir = "right";
            }
            moved = xDistance;

        } else { //moved on y-axis
            if (yTotal > 0){
                dir = "top";
            } else {
                dir = "bottom";
            }
            moved = yDistance;
        }

        callback(dir, moved);

    });
};