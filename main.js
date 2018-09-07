System.register("config", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                PORT: 80
            });
        }
    };
});
System.register("main", ["config", "express", "path"], function (exports_2, context_2) {
    'use strict';
    var config_1, express, path, app;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (express_1) {
                express = express_1;
            },
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
            app = express();
            app.set("port", process.env.PORT || config_1.default.PORT);
            app.use(express.static(path.join(__dirname, "public")));
            app.use(express.static('public'));
            app.get("/", function (req, res) {
                res.send("hello world");
            });
            app.listen(app.get("port"), () => {
                console.log("Server started");
                console.log("Public files path: " + path.join(__dirname, "public"));
            });
        }
    };
});
System.register("test/first.spec", ["chai"], function (exports_3, context_3) {
    "use strict";
    var chai_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (chai_1_1) {
                chai_1 = chai_1_1;
            }
        ],
        execute: function () {
            describe("first test", () => {
                it("should pass", () => {
                    chai_1.expect(true).to.be.true;
                });
            });
        }
    };
});
System.register("public/js/main", ["pixi.js"], function (exports_4, context_4) {
    "use strict";
    var PIXI;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            }
        ],
        execute: function () {
            console.log(PIXI.VERSION);
        }
    };
});
//# sourceMappingURL=main.js.map