export default function sleep(milliseconds = 100) {
  return new Promise(resolve => setTimeout(() => resolve(), milliseconds));
}
