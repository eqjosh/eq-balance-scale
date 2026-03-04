/**
 * EQ Balance Scale — Embed Helper
 * Include this script on the parent page to auto-resize iframes.
 *
 * Usage:
 *   <script src="https://yourdomain.github.io/eq-balance-scale/embed-helper.js"></script>
 *   <iframe src="..." id="eq-scale-iframe" style="width:100%;border:none;min-height:700px;" title="Interactive Balance Scale"></iframe>
 */
(function () {
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'SCALE_RESIZE') {
      // Find all iframes on the page and resize the matching one
      var iframes = document.querySelectorAll('iframe');
      iframes.forEach(function (iframe) {
        try {
          if (iframe.contentWindow === e.source) {
            iframe.style.height = e.data.height + 'px';
          }
        } catch (err) {
          // Cross-origin, skip
        }
      });
    }
  });
})();
