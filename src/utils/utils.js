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

export function loadAssets(assert) {
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(); // 이미 로드된 경우 바로 resolve
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const loadCSS = (href) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${href}"]`)) {
        resolve(); // 이미 로드된 경우 바로 resolve
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve(href);
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
      document.head.appendChild(link);
    });
  };

  let js = assert.js && Array.isArray(assert.js) ? assert.js : assert.js ? [assert.js] : [];
  let css = assert.css && Array.isArray(assert.css) ? assert.css : assert.css ? [assert.css] : [];

  const jsPromises = js.map(loadScript);

  const cssPromises = css.map(loadCSS);

  return Promise.all([...jsPromises, ...cssPromises]);
}
