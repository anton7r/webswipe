//test
detectSwipe(document.body, function(direction, moved){
    if(direction === "left"){
        console.log("left");
    } else if (direction === "right"){
        console.log("right");
    }
    console.log(moved + "px");
});