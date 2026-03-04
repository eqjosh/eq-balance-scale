import { toBlob } from 'html-to-image';

export async function captureScreenshot(element, filename = 'eq-balance-scale.png') {
  try {
    const blob = await toBlob(element, {
      backgroundColor: '#f8f9fa',
      pixelRatio: 2,
      filter: (node) => {
        // Exclude buttons that shouldn't appear in screenshot
        if (node.classList && node.classList.contains('no-screenshot')) return false;
        return true;
      },
    });

    if (!blob) throw new Error('Failed to generate image');

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Screenshot failed:', err);
    alert('Screenshot failed. Please try again.');
  }
}
