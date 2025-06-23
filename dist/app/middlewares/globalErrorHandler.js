"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
// Not Found Route Handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `🔍 Not Found: ${req.originalUrl}`,
    });
};
exports.notFoundHandler = notFoundHandler;
