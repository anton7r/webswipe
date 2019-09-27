//the swipe function


var webswipe = function(elem, whileMoveCallback, callback){

    var eventMove = {
        x:0,
        y:0
    },

    eventStart = {
        x:0,
        y:0
    },
    isTouch = window.Touch || false;
    var previousMove;

    var isDone = false;
    
    var untilDone = function (){

        if(isDone === true){
            return;
        }

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

        if(previousMove !== moved){
            whileMoveCallback(dir, moved);
        }
        
    };
    
    function done(){
        isDone = true;
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
    
    }

    elem.addEventListener(isTouch ? "touchstart" : "mousedown", function(ev){
        isDone = false;
        eventStart.x = isTouch ? ev.touches[0].clientX : ev.clientX;
        eventStart.y = isTouch ? ev.touches[0].clientY : ev.clientY;
    });

    elem.addEventListener(isTouch ? "touchmove" : "mousemove", function(ev){
        eventMove.x = isTouch ? ev.touches[0].clientX : ev.clientX;
        eventMove.y = isTouch ? ev.touches[0].clientY : ev.clientY;
        untilDone();
    });

    elem.addEventListener(isTouch ? "touchcancel" : "mouseleave", done);
    elem.addEventListener(isTouch ? "touchend" : "mouseup", done);
};

module.exports = webswipe;