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
          <div class="sv-logo">
            <img src="/6s-logo.svg" alt="Six Seconds" width="28" height="28" />
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
