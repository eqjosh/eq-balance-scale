import anime from 'animejs';

export class ScaleVisual {
  constructor(container, theme) {
    this.container = container;
    this.theme = theme;
    this.currentAngle = 0;
    this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'scale-visual';
    // Key: beam-area and pans are SIBLINGS so they rotate independently
    // (no double-rotation from parent inheritance)
    wrapper.innerHTML = `
      <div class="sv-scale">
        <div class="sv-beam-area">
          <div class="sv-beam"></div>
        </div>
        <div class="sv-fulcrum"></div>
        <div class="sv-pans">
          <div class="sv-pan-group sv-pan-left">
            <div class="sv-string sv-string-l"></div>
            <div class="sv-string sv-string-r"></div>
            <div class="sv-pan">
              <div class="sv-pan-inner"></div>
            </div>
          </div>
          <div class="sv-pan-group sv-pan-right">
            <div class="sv-string sv-string-l"></div>
            <div class="sv-string sv-string-r"></div>
            <div class="sv-pan">
              <div class="sv-pan-inner"></div>
            </div>
          </div>
        </div>
        <div class="sv-post">
          <div class="sv-logo" role="img" aria-label="Six Seconds">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="28" height="28">
              <path fill="#0180be" d="M359.47,439.57c-122.67,0-186.52,95.69-214.43,134.34,2.33,58.72,7.44,112.57,17.46,160.33l1.69,7.78c1.45,6.56,3.26,12.78,4.92,19.16,24.8,91.1,75.48,180.08,183.59,180.08,140.19,0,189.17-119.99,189.17-246.62,0-143.58-59.1-255.07-182.41-255.07M497.93,13.88c-17.5,0-33.96,1.19-49.87,2.88-6.06.58-11.88,1.6-17.83,2.47-9.02,1.33-17.79,2.91-26.22,4.78-7.42,1.69-14.67,3.41-21.75,5.53-5.3,1.49-10.33,3.33-15.46,5.08-138.4,48.32-211.28,181.69-222.08,392.99l-.19,3.62c-.84,17.49-1.27,35.38-1.27,53.91,37.13-42.2,104.72-116.53,253.38-116.53,187.5,0,295.57,118.25,295.57,319.22,0,157.06-70.04,258.68-194.85,301.29l.58.07c309.2,0,354.78-196.57,354.78-504.04S741.39,13.88,497.93,13.88"/>
              <path fill="#808082" d="M812.51,934.87h-8.77v10.96h9.49c3.5,0,6.67-1.69,6.67-5.4,0-4.21-3.53-5.56-7.39-5.56M819.89,969.44l-6.67-16.87h-9.49v16.87h-7.89v-41.82h14.57c10.01,0,17.73,2.35,17.73,13.48,0,5.91-2.45,7.93-7.55,10.3l8.08,18.04h-8.76ZM811.46,915.81c-19.31,0-35.11,15.18-35.11,33.73s15.8,33.72,35.11,33.72,35.12-15.18,35.12-33.72-15.81-33.73-35.12-33.73M811.46,989.17c-22.66,0-41.26-17.88-41.26-39.63s18.6-39.64,41.26-39.64,41.26,17.88,41.26,39.64-18.43,39.63-41.26,39.63"/>
            </svg>
          </div>
        </div>
        <div class="sv-base"></div>
      </div>
      <div class="sv-labels">
        <span class="sv-label sv-label-left">${this.theme.leftLabel}</span>
        <span class="sv-label sv-label-right">${this.theme.rightLabel}</span>
      </div>
    `;

    this.container.appendChild(wrapper);
    this.wrapper = wrapper;
    this.beamArea = wrapper.querySelector('.sv-beam-area');
    this.pans = wrapper.querySelector('.sv-pans');
    this.panLeft = wrapper.querySelector('.sv-pan-left');
    this.panRight = wrapper.querySelector('.sv-pan-right');
  }

  setAngle(angle) {
    const clamped = Math.max(-30, Math.min(30, angle));
    const halfAngle = clamped / 2;

    // Cancel any running animations to prevent jerkiness from competing animations
    anime.remove(this.beamArea);
    anime.remove(this.pans);
    anime.remove(this.panLeft);
    anime.remove(this.panRight);

    // Beam and pans are siblings — both rotate around the same fulcrum point
    // spring(mass, stiffness, damping, velocity) gives a natural bouncy settle
    anime({
      targets: [this.beamArea, this.pans],
      rotate: halfAngle,
      easing: 'spring(2, 40, 5, 5)',
    });

    // Each pan counter-rotates to stay level (gravity keeps pans flat)
    anime({
      targets: [this.panLeft, this.panRight],
      rotate: -halfAngle,
      easing: 'spring(2, 40, 5, 5)',
    });

    this.currentAngle = clamped;
  }

  // No-op — spring physics in setAngle() provide natural bounce
  bounce() {}

  updateLabels(leftLabel, rightLabel) {
    const left = this.wrapper.querySelector('.sv-label-left');
    const right = this.wrapper.querySelector('.sv-label-right');
    if (left) left.textContent = leftLabel;
    if (right) right.textContent = rightLabel;
  }
}
