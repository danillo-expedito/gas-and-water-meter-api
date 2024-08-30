"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(routes_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    }
}
exports.App = App;
exports.app = new App().app;
