// global variable for this module instance
let timer: ReturnType<typeof setTimeout>;

/**
 * prevent duplicate function call in specified time period
 *
 * @param fn - an anonymous function to delay execution
 * @param delay - delay for provided function execution (default `1000` in milliseconds)
 */
const debounce = (fn: () => void, delay = 1000) => {
  //
  clearTimeout(timer);

  timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, delay);
};

/* ============================================================================================= */

export default debounce;
