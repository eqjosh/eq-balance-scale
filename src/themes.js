export const THEMES = {
  wellbeing: {
    id: 'wellbeing',
    title: 'The Interactive Wellbeing Balance Scale',
    subtitle: 'Drag items onto the scale to explore what drains and supports your wellbeing',
    leftLabel: 'Drains',
    rightLabel: 'Supports',
    leftColor: '#c0392b',
    rightColor: '#27ae60',
    primaryColor: '#1e65a6',
    accentColor: '#e8913a',
    items: [
      { id: 'item-1', label: 'Being Busy', weight: 0.5 },
      { id: 'item-2', label: 'To Do List', weight: 0.5 },
      { id: 'item-3', label: 'Solitude', weight: 0.5 },
      { id: 'item-4', label: 'Eating', weight: 0.5 },
      { id: 'item-5', label: 'Social Media', weight: 0.5 },
      { id: 'item-6', label: 'Being with People', weight: 0.5 },
      { id: 'item-7', label: 'Technology', weight: 0.5 },
      { id: 'item-8', label: 'Sleep', weight: 0.5 },
      { id: 'item-9', label: 'Finances', weight: 0.5 },
      { id: 'item-10', label: 'Creating', weight: 0.5 },
      { id: 'item-11', label: 'Routine', weight: 0.5 },
      { id: 'item-12', label: 'Change', weight: 0.5 },
    ],
  },

  respond: {
    id: 'respond',
    title: 'React vs Respond Balance Scale',
    subtitle: 'Explore the balance between reacting and responding in your life',
    leftLabel: 'React',
    rightLabel: 'Respond',
    leftColor: '#c0392b',
    rightColor: '#27ae60',
    primaryColor: '#1e65a6',
    accentColor: '#e8913a',
    items: [
      { id: 'item-1', label: 'Going Fast', weight: 0.5 },
      { id: 'item-2', label: 'Time Outdoors', weight: 0.5 },
      { id: 'item-3', label: 'Caffeine', weight: 0.5 },
      { id: 'item-4', label: 'Feedback', weight: 0.5 },
      { id: 'item-5', label: 'Social Media', weight: 0.5 },
      { id: 'item-6', label: 'Seeing the News', weight: 0.5 },
      { id: 'item-7', label: 'Technology', weight: 0.5 },
      { id: 'item-8', label: 'Sports', weight: 0.5 },
      { id: 'item-9', label: 'Uncertainty', weight: 0.5 },
      { id: 'item-10', label: 'Direct Communication', weight: 0.5 },
      { id: 'item-11', label: 'Deadlines', weight: 0.5 },
      { id: 'item-12', label: 'AI', weight: 0.5 },
    ],
  },

  workplace: {
    id: 'workplace',
    title: 'Workplace Wellbeing Balance Scale',
    subtitle: 'Explore the factors that contribute to burnout or wellbeing at work',
    leftLabel: 'Burnout',
    rightLabel: 'Wellbeing',
    leftColor: '#c0392b',
    rightColor: '#27ae60',
    primaryColor: '#1e65a6',
    accentColor: '#e8913a',
    items: [
      { id: 'item-1', label: 'Meetings', weight: 0.5 },
      { id: 'item-2', label: 'Planning', weight: 0.5 },
      { id: 'item-3', label: 'Growth', weight: 0.5 },
      { id: 'item-4', label: 'Feedback', weight: 0.5 },
      { id: 'item-5', label: 'Change', weight: 0.5 },
      { id: 'item-6', label: 'Work Culture', weight: 0.5 },
      { id: 'item-7', label: 'Colleagues', weight: 0.5 },
      { id: 'item-8', label: 'Recognition', weight: 0.5 },
      { id: 'item-9', label: 'Deadlines', weight: 0.5 },
      { id: 'item-10', label: 'Clients', weight: 0.5 },
      { id: 'item-11', label: 'Policies', weight: 0.5 },
    ],
  },
};

export function getTheme(id) {
  return THEMES[id] || THEMES.wellbeing;
}

export function getThemeFromURL() {
  const params = new URLSearchParams(window.location.search);
  const themeId = params.get('theme') || 'wellbeing';
  return getTheme(themeId);
}
