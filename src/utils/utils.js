export function isMinimumSize(window) {
  return window.innerWidth > 1024;
}

// 모바일 체크.
export function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipod|android|blackberry|mobile|webos/i.test(userAgent);
}
