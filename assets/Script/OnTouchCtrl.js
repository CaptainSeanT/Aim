cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        star: {
            default: null,
            type: cc.Node
        },

        starSpeed: 200,

    },

    onLoad () {
        var self = this;
        self.winSize = cc.director.getWinSize();

        self.moveToPos = cc.p(0, 0);
        self.isMouseOn = false;

        self.draw = new cc.DrawNode();
        self.canvas._sgNode.addChild(this.draw);

        console.log("width==" + self.winSize.width + ";;;height ==== " + self.winSize.height);

/*
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.star.parent.convertToNodeSpaceAR(touchLoc);
            //self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);

        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.star.parent.convertToNodeSpaceAR(touchLoc);
            //self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);
        
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; // when touch ended, stop moving
        }, self.node);

*/

        self.canvas.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            var mouse_loc = event.getLocation();
            self.isMouseOn = true;
            self.moveToPos = self.star.parent.convertToNodeSpaceAR(mouse_loc);
        }, self.node);


        self.canvas.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            var mouse_loc = event.getLocation();
            self.draw.clear();
            self.moveToPos = self.star.parent.convertToNodeSpaceAR(mouse_loc);
        }, self.node);

        self.canvas.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            self.isMouseOn = false;
        }, self.node);

        //self.testVec();

    },

    update: function (dt) {
        //this.star.x += this.starSpeed * dt;
        //this.star.y += this.starSpeed * dt;

        if (!this.isMouseOn) return;
        this.drawShootLocus();
        //this.draw.drawSegment(this.star.position, this.moveToPos, 1, cc.color(255, 0, 255, 255));   
    },

    drawShootLocus: function () {


        //console.log("star.position.x===" + this.star.position.x + "star.position.y===" + this.star.position.y);
        //console.log("moveToPos.x===" + this.moveToPos.x + "moveToPos.y===" + this.moveToPos.y);
/*
        if (this.moveToPos.x >= this.star.position.x) {
            var end_p_x = this.winSize.width - this.star.position.x;
            var end_p_y = (this.moveToPos.y - this.star.position.y) / ((this.moveToPos.x - this.star.position.x) / (this.winSize.width - this.star.position.x));
        } else {
            var end_p_x = this.moveToPos.x - (this.winSize.width / 2);
            var end_p_y = this.moveToPos.y / (this.moveToPos.x / this.star.position.x);
        }
*/

        var start_p = this.star.position;
        //var end_p = cc.p(end_p_x, end_p_y);
        var end_p = this.moveToPos;

        if (this.moveToPos.x > this.star.position.x) {
            if (this.moveToPos.y > this.star.position.y) {
                var reflex_p_end = (this.moveToPos.y - this.star.position.y) * 2;
            } else if (this.moveToPos.y < this.star.position.y) {
                var reflex_p_end = (this.star.position.y - this.moveToPos.y) * 2;
            } else {
                var reflex_p_end = this.star.position.y;
            }
        } else if (this.moveToPos.x < this.star.position.x) {
            if (this.moveToPos.y > this.star.position.y) {
                var reflex_p_end = (this.moveToPos.y - this.star.position.y) * 2;
            } else if (this.moveToPos.y < this.star.position.y) {
                var reflex_p_end = (this.star.position.y - this.moveToPos.y) * 2;
            } else {
                var reflex_p_end = this.star.position.y;
            }
        } else {
                var reflex_p_end = this.star.position.y;
        }

        var reflex_p = cc.p(this.star.position.x, reflex_p_end);

        this.draw.drawSegment(start_p, end_p, 1, cc.color(255, 0, 255, 255));
        this.draw.drawSegment(end_p, reflex_p, 1, cc.color(255, 0, 255, 255));

    },

    testVec: function() {

        var vecA = cc.v2(1000, 700);
        var vecB = cc.v2(500, 500);
        var vecD = cc.v2(0, 700);

        var vecI = vecA.sub(vecB);
        var vecN = vecD.sub(vecB);

        var vecR = vecI.sub(vecN.scale(vecN.scale(vecI.mul(2))));
        //var vecR = vecI.mul(2);
        //vecR = vecN.scale(vecR);

        console.log("vecR.x ==== " + vecR.x + "vecR.y =====" + vecR.y);

    },


});
