/** Guide
 *  Wheel.init({L:8,T:2000,I:4});//loop 8 time with 1000ms/round, winner position 4
 *  Wheel.start(4,6);//loop 6 time, winner position 4
 *  Wheel.stop(3);//winner position 3
 *
 *  Note: Wheel.init() after window onload
 */

//load script createjs
var escript = document.createElement("script");
escript.src = "https://code.createjs.com/createjs-2015.11.26.min.js";
document.body.append(escript);

var Wheel = {
    canvas: "",
    stage: "",
    image: "",
    roundly: null,
    circle: "",
    config: {
        C: "canvas", //canvas id
        U: "public/frontend/images/vongquay.png", //image url
        F: "showResult", //function name call when complete
        T: 1000, //time run one round
        N: 6, //number item in wheel
        I: 4, //winner item
        L: 6, //wheel loop
        R: 0, //running
    },
    /** Init wheel
     */
    init: function (options) {
        Object.assign(this.config, options);
        this.stage = new createjs.Stage("canvas");

        this.canvas = document.getElementById(this.config.C);
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.MotionGuidePlugin.install();

        this.image = new Image();
        this.image.src = this.config.U;
        this.image.onload = function () {
            setTimeout(function () {
                Wheel.load();
            }, 100);
        };
    },
    /** Load wheel
     */
    load: function () {
        console.log("wheel_load");
        this.circle = new createjs.Bitmap(this.image);
        this.stage.addChild(this.circle);
        this.circle.set({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            regX: this.image.width / 2,
            regY: this.image.height / 2,
        });
        this.circle.rotation = (1 / (2 * this.config.N)) * 360;
    },
    /** Start wheel
     * @param i : position winner
     * @param l : loop number
     */
    start: function (i, l) {
        console.log("wheel_start");
        this.circle.rotation = 0;
        if (this.config.R == 1) return;
        this.config.R = 1;
        if (l) this.config.L = l;
        this.loop(this.config.L);
    },
    /** Stop wheel
     * @param i : position winner
     * @param l : loop number
     */
    stop: function (i, l) {
        console.log("wheel_stop", i);
        if (this.roundly != null) this.roundly.setPaused(true);
        this.circle.rotation = 0;
        if (i) this.config.I = i;
        //loop more after pause
        if (l) this.config.L = l;
        this.loop(this.config.L);
    },
    /** Rotate wheel
     * @param l : loop number
     */
    loop: function (l) {
        this.roundly = createjs.Tween.get(this.circle)
            .to(
                { rotation: 360 * l + (this.config.I / this.config.N) * 360 - (1 / (2 * this.config.N)) * 360 },
                this.config.T * l,
                createjs.Ease.quadOut
            )
            .call(this.handleComplete, [this.config.I], this);
    },
    random_number: function (min, max) {
        return Math.floor(Math.random() * max) + min;
    },
    handleComplete: function () {
        console.log("wheel_complete");
        this.R = 0;
        //execute function
        window[this.config.F](this.config.I);
    },
};
