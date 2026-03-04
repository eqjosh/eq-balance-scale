export class Modal {
  constructor(onSave, strings = {}) {
    this.onSave = onSave;
    this.editingItem = null;
    this.strings = strings;
    this.render();
    this.bindEvents();
  }

  render() {
    const s = this.strings;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${s.addItemTitle || 'Add Item'}</h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="item-label">${s.label || 'Label'}</label>
            <input type="text" id="item-label" class="form-input" placeholder="${s.labelPlaceholder || 'e.g., Exercise'}" maxlength="30" autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="item-weight">${s.weight || 'Weight'}</label>
            <div class="weight-slider-container">
              <input type="range" id="item-weight" class="weight-slider" min="1" max="10" value="5" step="1" />
              <div class="weight-labels">
                <span class="weight-label-light">${s.light || 'Light'}</span>
                <span class="weight-value">${s.medium || 'Medium'}</span>
                <span class="weight-label-heavy">${s.heavy || 'Heavy'}</span>
              </div>
            </div>
            <div class="weight-preview">
              <div class="weight-preview-bar">
                <div class="weight-preview-fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary modal-cancel">${s.cancel || 'Cancel'}</button>
          <button class="btn btn-primary modal-save">${s.addItemTitle || 'Add Item'}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.modal = overlay.querySelector('.modal');
    this.titleEl = overlay.querySelector('.modal-title');
    this.labelInput = overlay.querySelector('#item-label');
    this.weightSlider = overlay.querySelector('#item-weight');
    this.weightValue = overlay.querySelector('.weight-value');
    this.weightFill = overlay.querySelector('.weight-preview-fill');
    this.saveBtn = overlay.querySelector('.modal-save');
  }

  bindEvents() {
    // Close
    this.overlay.querySelector('.modal-close').addEventListener('click', () => this.close());
    this.overlay.querySelector('.modal-cancel').addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Weight slider
    this.weightSlider.addEventListener('input', () => this.updateWeightPreview());

    // Save
    this.saveBtn.addEventListener('click', () => this.save());

    // Enter key
    this.labelInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.save();
    });

    // Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  }

  updateWeightPreview() {
    const s = this.strings;
    const val = parseInt(this.weightSlider.value);
    const normalized = val / 10;
    let label = s.medium || 'Medium';
    if (normalized < 0.4) label = s.light || 'Light';
    else if (normalized >= 0.75) label = s.heavy || 'Heavy';
    this.weightValue.textContent = label;
    this.weightFill.style.width = `${val * 10}%`;

    // Color the fill based on weight
    if (normalized < 0.4) {
      this.weightFill.style.background = '#27ae60';
    } else if (normalized >= 0.75) {
      this.weightFill.style.background = '#c0392b';
    } else {
      this.weightFill.style.background = '#e8913a';
    }
  }

  updateStrings(strings) {
    this.strings = strings;
    // Update static labels in the DOM
    const s = this.strings;
    this.overlay.querySelector('.form-group label[for="item-label"]').textContent = s.label || 'Label';
    this.overlay.querySelector('.form-group label[for="item-weight"]').textContent = s.weight || 'Weight';
    this.overlay.querySelector('.weight-label-light').textContent = s.light || 'Light';
    this.overlay.querySelector('.weight-label-heavy').textContent = s.heavy || 'Heavy';
    this.overlay.querySelector('.modal-cancel').textContent = s.cancel || 'Cancel';
    this.labelInput.placeholder = s.labelPlaceholder || 'e.g., Exercise';
  }

  open(item = null) {
    const s = this.strings;
    this.editingItem = item;
    if (item) {
      this.titleEl.textContent = s.editItem || 'Edit Item';
      this.saveBtn.textContent = s.save || 'Save Changes';
      this.labelInput.value = item.label;
      this.weightSlider.value = Math.round(item.weight * 10);
    } else {
      this.titleEl.textContent = s.addItemTitle || 'Add Item';
      this.saveBtn.textContent = s.addItemTitle || 'Add Item';
      this.labelInput.value = '';
      this.weightSlider.value = 5;
    }
    this.updateWeightPreview();
    this.overlay.classList.add('active');
    // Focus input after transition
    setTimeout(() => this.labelInput.focus(), 200);
  }

  close() {
    this.overlay.classList.remove('active');
    this.editingItem = null;
  }

  save() {
    const label = this.labelInput.value.trim();
    if (!label) {
      this.labelInput.classList.add('error');
      setTimeout(() => this.labelInput.classList.remove('error'), 600);
      return;
    }

    const weight = parseInt(this.weightSlider.value) / 10;
    this.onSave({
      id: this.editingItem?.id || `item-${Date.now()}`,
      label,
      weight,
    }, !!this.editingItem);
    this.close();
  }
}
