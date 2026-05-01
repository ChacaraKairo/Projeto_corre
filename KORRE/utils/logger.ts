type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const writeLog = (
  level: LogLevel,
  message: string,
  ...args: unknown[]
) => {
  if (!__DEV__ && level !== 'error') {
    return;
  }

  const prefix = `[KORRE] ${message}`;

  switch (level) {
    case 'debug':
      console.debug(prefix, ...args);
      break;
    case 'info':
      console.info(prefix, ...args);
      break;
    case 'warn':
      console.warn(prefix, ...args);
      break;
    case 'error':
      console.error(prefix, ...args);
      break;
  }
};

export const logger = {
  debug: (message: string, ...args: unknown[]) =>
    writeLog('debug', message, ...args),
  info: (message: string, ...args: unknown[]) =>
    writeLog('info', message, ...args),
  warn: (message: string, ...args: unknown[]) =>
    writeLog('warn', message, ...args),
  error: (message: string, ...args: unknown[]) =>
    writeLog('error', message, ...args),
};
