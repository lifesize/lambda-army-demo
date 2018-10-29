const _log = console.log;
const _error = console.error;

export function log(...args: Array<String>) {
  // this.logger.log(args.join(" "));
  if (process.env.LOGGING) {
    _log.apply(console, args);
  }
}

export function error(...args: Array<String>) {
  // this.logger.error(args.join(" "));
  _error.apply(console, args);
}

export function debug(...args: Array<String>) {
  // this.logger.debug(args.join(" "));
  _log.apply(console, args);
}
