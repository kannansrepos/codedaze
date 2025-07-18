/* eslint-disable @typescript-eslint/no-explicit-any */
const Logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`INFO: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`ERROR: ${message}`, ...args);
  },
};

export default Logger;
