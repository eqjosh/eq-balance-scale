import Sortable from 'sortablejs';
import { ScaleVisual } from './scale-visual.js';
import { Modal } from './modal.js';
import { captureScreenshot } from './screenshot.js';
import { initEmbedResize, initEmbedMessaging } from './embed.js';
import { getTranslation, getAvailableLanguages, getLangFromURL, getThemeIds } from './i18n.js';
import { THEMES, getTheme } from './themes.js';

export class BalanceScale {
  constructor(container, theme) {
    this.container = container;
    this.currentThemeId = theme.id;
    this.currentLang = getLangFromURL();
    this.i18n = getTranslation(this.currentLang);

    // Apply translated labels to the theme
    const themeT = this.i18n.themes[this.currentThemeId];
    this.theme = {
      ...theme,
      title: themeT.title,
      subtitle: themeT.subtitle,
      leftLabel: themeT.leftLabel,
      rightLabel: themeT.rightLabel,
    };

    this.items = this.buildItems(this.currentThemeId);
    this.nextId = Date.now();

    this.init();
  }

  buildItems(themeId) {
    const themeData = this.i18n.themes[themeId];
    const baseTheme = getTheme(themeId);
    return baseTheme.items.map((item, i) => ({
      id: item.id,
      label: themeData ? themeData.items[i] || item.label : item.label,
      weight: item.weight,
      zone: 'tray',
    }));
  }

  init() {
    this.buildDOM();
    this.scaleVisual = new ScaleVisual(
      this.container.querySelector('.scale-container'),
      this.theme
    );
    this.modal = new Modal(
      (itemData, isEdit) => this.handleModalSave(itemData, isEdit),
      this.i18n.ui
    );
    this.initSortable();
    this.renderItems();
    this.updateScale();

    // Embed support
    initEmbedResize();
    initEmbedMessaging((data) => this.handleEmbedTheme(data));
  }

  buildDOM() {
    const ui = this.i18n.ui;
    const themeT = this.i18n.themes[this.currentThemeId];

    this.container.innerHTML = `
      <div class="app">
        <div class="capture-area">
          <header class="header">
            <h1>${themeT.title}</h1>
            <p>${themeT.subtitle || ''}</p>
          </header>

          <div class="scale-container"></div>

          <div class="columns">
            <div class="drop-zone left-zone">
              <div class="zone-header">
                <span class="zone-title" data-zone="left" title="${ui.clickToRename}">${this.theme.leftLabel}</span>
                <span class="zone-weight left-weight">0.0</span>
              </div>
              <div class="zone-items" id="left-items"></div>
            </div>
            <div class="drop-zone right-zone">
              <div class="zone-header">
                <span class="zone-title" data-zone="right" title="${ui.clickToRename}">${this.theme.rightLabel}</span>
                <span class="zone-weight right-weight">0.0</span>
              </div>
              <div class="zone-items" id="right-items"></div>
            </div>
          </div>
        </div>

        <div class="toolbar no-screenshot">
          <button class="toolbar-btn primary" id="btn-add">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ${ui.addItem}
          </button>
          <button class="toolbar-btn" id="btn-screenshot">
            <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            ${ui.screenshot}
          </button>
          <button class="toolbar-btn" id="btn-reset">
            <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            ${ui.reset}
          </button>
          <span class="toolbar-sep"></span>
          <select class="settings-select version-select">
            ${getThemeIds().map((id) => {
              const t = this.i18n.themes[id];
              return `<option value="${id}"${id === this.currentThemeId ? ' selected' : ''}>${t.menuLabel}</option>`;
            }).join('')}
          </select>
          <select class="settings-select lang-select">
            ${getAvailableLanguages().map((lang) =>
              `<option value="${lang}"${lang === this.currentLang ? ' selected' : ''}>${lang.toUpperCase()}</option>`
            ).join('')}
          </select>
        </div>

        <div class="tray-section">
          <div class="tray-header">
            <span class="tray-title">${ui.items}</span>
          </div>
          <div class="item-tray" id="item-tray"></div>
        </div>

        <footer class="footer">
          <a href="https://6seconds.org" target="_blank" rel="noopener">${ui.poweredBy}</a>
        </footer>
      </div>
    `;

    // Bind toolbar
    this.container.querySelector('#btn-add').addEventListener('click', () => {
      this.modal.open();
    });

    this.container.querySelector('#btn-screenshot').addEventListener('click', () => {
      const captureArea = this.container.querySelector('.capture-area');
      captureScreenshot(captureArea, `${this.theme.id}-balance-scale.png`);
    });

    this.container.querySelector('#btn-reset').addEventListener('click', () => {
      this.resetAll();
    });

    // Zone title click-to-edit
    this.container.querySelectorAll('.zone-title').forEach((el) => {
      el.addEventListener('click', (e) => this.editZoneTitle(e.target));
    });

    // Version dropdown
    this.container.querySelector('.version-select').addEventListener('change', (e) => {
      this.switchVersion(e.target.value);
    });

    // Language dropdown
    this.container.querySelector('.lang-select').addEventListener('change', (e) => {
      this.switchLanguage(e.target.value);
    });
  }

  // --- Version / Language switching ---
  switchVersion(themeId) {
    this.currentThemeId = themeId;
    const baseTheme = getTheme(themeId);
    const themeT = this.i18n.themes[themeId];

    // Update theme with translated labels
    this.theme = {
      ...baseTheme,
      title: themeT.title,
      subtitle: themeT.subtitle,
      leftLabel: themeT.leftLabel,
      rightLabel: themeT.rightLabel,
    };

    // Reset items with translated labels
    this.items = this.buildItems(themeId);

    this.rebuild();
  }

  switchLanguage(lang) {
    this.currentLang = lang;
    this.i18n = getTranslation(lang);
    const themeT = this.i18n.themes[this.currentThemeId];

    // Update theme with new language labels
    this.theme = {
      ...getTheme(this.currentThemeId),
      title: themeT.title,
      subtitle: themeT.subtitle,
      leftLabel: themeT.leftLabel,
      rightLabel: themeT.rightLabel,
    };

    // Rebuild items with translated labels
    this.items = this.buildItems(this.currentThemeId);

    // Update modal strings
    this.modal.updateStrings(this.i18n.ui);

    this.rebuild();
  }

  rebuild() {
    this.destroySortables();
    this.buildDOM();
    // Re-create scale visual in the new container
    this.scaleVisual = new ScaleVisual(
      this.container.querySelector('.scale-container'),
      this.theme
    );
    this.initSortable();
    this.renderItems();
    this.updateScale();
  }

  // --- Item rendering ---
  createItemElement(item) {
    const el = document.createElement('div');
    el.className = 'item-chip';
    el.dataset.id = item.id;

    const weightPct = Math.round(item.weight * 100);
    let weightColor = '#e8913a'; // medium
    if (item.weight < 0.4) weightColor = '#27ae60';
    else if (item.weight >= 0.75) weightColor = '#c0392b';

    el.innerHTML = `
      <div class="item-grip">
        <div class="grip-dot-row"><span class="grip-dot"></span><span class="grip-dot"></span></div>
        <div class="grip-dot-row"><span class="grip-dot"></span><span class="grip-dot"></span></div>
        <div class="grip-dot-row"><span class="grip-dot"></span><span class="grip-dot"></span></div>
      </div>
      <span class="item-label">${item.label}</span>
      <div class="item-weight-bar">
        <div class="item-weight-fill" style="width: ${weightPct}%; background: ${weightColor};"></div>
      </div>
      <div class="item-actions">
        <button class="item-action-btn edit" title="Edit" aria-label="Edit ${item.label}">
          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="item-action-btn delete" title="Delete" aria-label="Delete ${item.label}">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;

    // Edit button
    el.querySelector('.edit').addEventListener('click', (e) => {
      e.stopPropagation();
      this.modal.open(item);
    });

    // Delete button
    el.querySelector('.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteItem(item.id);
    });

    return el;
  }

  renderItems() {
    const ui = this.i18n.ui;
    const leftContainer = this.container.querySelector('#left-items');
    const rightContainer = this.container.querySelector('#right-items');
    const trayContainer = this.container.querySelector('#item-tray');

    // Clear
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';
    trayContainer.innerHTML = '';

    const leftItems = this.items.filter((i) => i.zone === 'left');
    const rightItems = this.items.filter((i) => i.zone === 'right');
    const trayItems = this.items.filter((i) => i.zone === 'tray');

    leftItems.forEach((item) => leftContainer.appendChild(this.createItemElement(item)));
    rightItems.forEach((item) => rightContainer.appendChild(this.createItemElement(item)));
    trayItems.forEach((item) => trayContainer.appendChild(this.createItemElement(item)));

    // Empty states
    if (leftItems.length === 0) {
      leftContainer.innerHTML = `<div class="zone-empty">${ui.dropHere}</div>`;
    }
    if (rightItems.length === 0) {
      rightContainer.innerHTML = `<div class="zone-empty">${ui.dropHere}</div>`;
    }
    if (trayItems.length === 0) {
      trayContainer.innerHTML = `<div class="tray-empty">${ui.allPlaced}</div>`;
    }
  }

  // --- Sortable drag & drop ---
  initSortable() {
    const options = (zone) => ({
      group: 'shared',
      animation: 200,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      handle: '.item-chip',
      draggable: '.item-chip',
      fallbackOnBody: true,
      swapThreshold: 0.65,
      onStart: (evt) => {
        document.body.classList.add('dragging');
      },
      onEnd: (evt) => {
        document.body.classList.remove('dragging');
        this.syncFromDOM();
        this.updateScale();
        this.scaleVisual.bounce();
        this.renderItems();
        this.destroySortables();
        this.initSortable();
      },
      onMove: (evt) => {
        // Remove empty state divs to not interfere
        const related = evt.to;
        const emptyEl = related.querySelector('.zone-empty, .tray-empty');
        if (emptyEl) emptyEl.remove();
      },
    });

    this.sortables = [];
    const left = this.container.querySelector('#left-items');
    const right = this.container.querySelector('#right-items');
    const tray = this.container.querySelector('#item-tray');

    if (left) this.sortables.push(Sortable.create(left, options('left')));
    if (right) this.sortables.push(Sortable.create(right, options('right')));
    if (tray) this.sortables.push(Sortable.create(tray, options('tray')));
  }

  destroySortables() {
    this.sortables.forEach((s) => s.destroy());
    this.sortables = [];
  }

  syncFromDOM() {
    const getIds = (selector) =>
      [...this.container.querySelectorAll(`${selector} .item-chip`)].map(
        (el) => el.dataset.id
      );

    const leftIds = getIds('#left-items');
    const rightIds = getIds('#right-items');
    const trayIds = getIds('#item-tray');

    this.items.forEach((item) => {
      if (leftIds.includes(item.id)) item.zone = 'left';
      else if (rightIds.includes(item.id)) item.zone = 'right';
      else item.zone = 'tray';
    });
  }

  // --- Scale logic ---
  updateScale() {
    const leftItems = this.items.filter((i) => i.zone === 'left');
    const rightItems = this.items.filter((i) => i.zone === 'right');

    const leftWeight = leftItems.reduce((sum, i) => sum + i.weight, 0);
    const rightWeight = rightItems.reduce((sum, i) => sum + i.weight, 0);

    // Scale factor: how much the weight difference affects the angle
    const scaleFactor = 8;
    const angle = Math.max(-30, Math.min(30, (rightWeight - leftWeight) * scaleFactor));

    this.scaleVisual.setAngle(angle);

    // Update weight displays
    const leftWeightEl = this.container.querySelector('.left-weight');
    const rightWeightEl = this.container.querySelector('.right-weight');
    if (leftWeightEl) leftWeightEl.textContent = leftWeight.toFixed(1);
    if (rightWeightEl) rightWeightEl.textContent = rightWeight.toFixed(1);
  }

  // --- CRUD ---
  handleModalSave(itemData, isEdit) {
    if (isEdit) {
      const existing = this.items.find((i) => i.id === itemData.id);
      if (existing) {
        existing.label = itemData.label;
        existing.weight = itemData.weight;
      }
    } else {
      this.items.push({ ...itemData, zone: 'tray' });
    }
    this.renderItems();
    this.updateScale();
    this.destroySortables();
    this.initSortable();
  }

  deleteItem(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.zone = 'tray';
    }
    this.renderItems();
    this.updateScale();
    this.destroySortables();
    this.initSortable();
  }

  resetAll() {
    this.items.forEach((item) => {
      item.zone = 'tray';
    });
    this.renderItems();
    this.updateScale();
    this.destroySortables();
    this.initSortable();
  }

  // --- Editable zone titles ---
  editZoneTitle(el) {
    const zone = el.dataset.zone;
    const currentText = el.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'zone-title-input';
    input.value = currentText;
    if (zone === 'left') input.style.color = 'var(--left-color)';
    else input.style.color = 'var(--right-color)';

    el.replaceWith(input);
    input.focus();
    input.select();

    const commit = () => {
      const newText = input.value.trim() || currentText;
      const newEl = document.createElement('span');
      newEl.className = 'zone-title';
      newEl.dataset.zone = zone;
      newEl.title = this.i18n.ui.clickToRename;
      newEl.textContent = newText;
      newEl.addEventListener('click', (e) => this.editZoneTitle(e.target));
      input.replaceWith(newEl);

      // Update theme and scale visual
      if (zone === 'left') {
        this.theme.leftLabel = newText;
      } else {
        this.theme.rightLabel = newText;
      }
      this.scaleVisual.updateLabels(this.theme.leftLabel, this.theme.rightLabel);
    };

    input.addEventListener('blur', commit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
      if (e.key === 'Escape') {
        input.value = currentText;
        input.blur();
      }
    });
  }

  // --- Embed theme change ---
  handleEmbedTheme(data) {
    // Support language switching via postMessage
    if (data.lang && data.lang !== this.currentLang) {
      this.currentLang = data.lang;
      this.i18n = getTranslation(data.lang);
    }

    // Support theme switching via postMessage
    if (data.theme && THEMES[data.theme]) {
      this.switchVersion(data.theme);
      return;
    }

    // Legacy: direct label/items override
    if (data.leftLabel) this.theme.leftLabel = data.leftLabel;
    if (data.rightLabel) this.theme.rightLabel = data.rightLabel;
    if (data.items) {
      this.items = data.items.map((item, i) => ({
        id: item.id || `item-${i}`,
        label: item.label,
        weight: item.weight || 0.5,
        zone: 'tray',
      }));
    }
    this.renderItems();
    this.updateScale();
    this.destroySortables();
    this.initSortable();
    this.scaleVisual.updateLabels(this.theme.leftLabel, this.theme.rightLabel);
  }
}
