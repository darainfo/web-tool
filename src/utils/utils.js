export function isMinimumSize(window) {
  return window.innerWidth > 1024;
}

// 모바일 체크.
export function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipod|android|blackberry|mobile|webos/i.test(userAgent);
}

export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // 이미 로드된 경우 바로 resolve
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve; // 스크립트가 로드되면 resolve
    script.onerror = reject; // 로드 오류 시 reject
    document.body.appendChild(script);
  });
}
