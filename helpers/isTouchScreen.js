export default function isTouchScreen() {
  if (process.browser) {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  } else {
    return false;
  }
}
