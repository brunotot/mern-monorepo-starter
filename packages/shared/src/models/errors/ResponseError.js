var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
var _ErrorResponse_instances, _ErrorResponse_buildErrorLog;
import HttpStatus from "http-status";
export class ErrorResponse extends Error {
  constructor(originalUrl, status, details, metadata = {}) {
    var _a;
    super(HttpStatus[`${status}_MESSAGE`]);
    _ErrorResponse_instances.add(this);
    this.stack = (_a = new Error().stack) !== null && _a !== void 0 ? _a : "";
    this.content = __classPrivateFieldGet(
      this,
      _ErrorResponse_instances,
      "m",
      _ErrorResponse_buildErrorLog,
    ).call(this, originalUrl, status, details, metadata);
  }
}
(_ErrorResponse_instances = new WeakSet()),
  (_ErrorResponse_buildErrorLog = function _ErrorResponse_buildErrorLog(
    originalUrl,
    status,
    details = "Unknown",
    metadata = {},
  ) {
    return {
      status: status,
      details: details,
      metadata: metadata,
      message: HttpStatus[`${status}_MESSAGE`],
      path: originalUrl,
      timestamp: new Date().toISOString(),
    };
  });
//# sourceMappingURL=ResponseError.js.map
