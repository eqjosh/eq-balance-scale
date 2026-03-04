// Sends height to parent window for iframe auto-resize
export function initEmbedResize() {
  if (window.self === window.top) return; // Not in iframe

  const sendHeight = () => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'SCALE_RESIZE', height }, '*');
  };

  // Observe body for size changes
  const observer = new ResizeObserver(sendHeight);
  observer.observe(document.body);

  // Also send on load
  sendHeight();
  window.addEventListener('load', sendHeight);
}

// Listen for theme configuration from parent
export function initEmbedMessaging(onThemeChange) {
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SET_THEME') {
      onThemeChange(e.data);
    }
  });
}
