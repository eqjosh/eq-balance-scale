// Lightweight i18n system for EQ Balance Scale
// Each language has: ui strings + per-theme translations (title, subtitle, labels, items)

const TRANSLATIONS = {
  en: {
    ui: {
      addItem: 'Add Item',
      screenshot: 'Screenshot',
      reset: 'Reset',
      dropHere: 'Drop items here',
      allPlaced: 'All items placed on the scale!',
      items: 'Items',
      label: 'Label',
      weight: 'Weight',
      light: 'Light',
      medium: 'Medium',
      heavy: 'Heavy',
      cancel: 'Cancel',
      save: 'Save Changes',
      editItem: 'Edit Item',
      addItemTitle: 'Add Item',
      poweredBy: 'Powered by Six Seconds',
      clickToRename: 'Click to rename',
      labelPlaceholder: 'e.g., Exercise',
      language: 'Language',
      version: 'Version',
    },
    themes: {
      wellbeing: {
        menuLabel: 'Balance',
        title: 'The Interactive Wellbeing Balance Scale',
        subtitle: 'Drag items onto the scale to explore what drains and supports your wellbeing',
        leftLabel: 'Drains',
        rightLabel: 'Supports',
        items: [
          'Being Busy', 'To Do List', 'Solitude', 'Eating', 'Social Media',
          'Being with People', 'Technology', 'Sleep', 'Finances', 'Creating',
          'Routine', 'Change',
        ],
      },
      respond: {
        menuLabel: 'React-Respond',
        title: 'React vs Respond Balance Scale',
        subtitle: 'Explore the balance between reacting and responding in your life',
        leftLabel: 'React',
        rightLabel: 'Respond',
        items: [
          'Going Fast', 'Time Outdoors', 'Caffeine', 'Feedback', 'Social Media',
          'Seeing the News', 'Technology', 'Sports', 'Uncertainty',
          'Direct Communication', 'Deadlines', 'AI',
        ],
      },
      workplace: {
        menuLabel: 'Wellbeing',
        title: 'Workplace Wellbeing Balance Scale',
        subtitle: 'Explore the factors that contribute to burnout or wellbeing at work',
        leftLabel: 'Burnout',
        rightLabel: 'Wellbeing',
        items: [
          'Meetings', 'Planning', 'Growth', 'Feedback', 'Change',
          'Work Culture', 'Colleagues', 'Recognition', 'Deadlines',
          'Clients', 'Policies',
        ],
      },
    },
  },

  es: {
    ui: {
      addItem: 'Agregar',
      screenshot: 'Captura',
      reset: 'Reiniciar',
      dropHere: 'Arrastra elementos aquí',
      allPlaced: '¡Todos los elementos están en la balanza!',
      items: 'Elementos',
      label: 'Nombre',
      weight: 'Peso',
      light: 'Ligero',
      medium: 'Medio',
      heavy: 'Pesado',
      cancel: 'Cancelar',
      save: 'Guardar',
      editItem: 'Editar',
      addItemTitle: 'Agregar',
      poweredBy: 'Desarrollado por Six Seconds',
      clickToRename: 'Clic para renombrar',
      labelPlaceholder: 'ej., Ejercicio',
      language: 'Idioma',
      version: 'Versión',
    },
    themes: {
      wellbeing: {
        menuLabel: 'Equilibrio',
        title: 'La Balanza Interactiva de Bienestar',
        subtitle: 'Arrastra elementos a la balanza para explorar qué te agota y qué te apoya',
        leftLabel: 'Agota',
        rightLabel: 'Apoya',
        items: [
          'Estar Ocupado', 'Lista de Tareas', 'Soledad', 'Alimentación', 'Redes Sociales',
          'Estar con Personas', 'Tecnología', 'Sueño', 'Finanzas', 'Crear',
          'Rutina', 'Cambio',
        ],
      },
      respond: {
        menuLabel: 'Reaccionar-Responder',
        title: 'Balanza de Reaccionar vs Responder',
        subtitle: 'Explora el equilibrio entre reaccionar y responder en tu vida',
        leftLabel: 'Reaccionar',
        rightLabel: 'Responder',
        items: [
          'Ir Rápido', 'Tiempo al Aire Libre', 'Cafeína', 'Retroalimentación',
          'Redes Sociales', 'Ver las Noticias', 'Tecnología', 'Deportes',
          'Incertidumbre', 'Comunicación Directa', 'Fechas Límite', 'IA',
        ],
      },
      workplace: {
        menuLabel: 'Bienestar',
        title: 'Balanza de Bienestar Laboral',
        subtitle: 'Explora los factores que contribuyen al agotamiento o bienestar en el trabajo',
        leftLabel: 'Agotamiento',
        rightLabel: 'Bienestar',
        items: [
          'Reuniones', 'Planificación', 'Crecimiento', 'Retroalimentación',
          'Cambio', 'Cultura Laboral', 'Colegas', 'Reconocimiento',
          'Fechas Límite', 'Clientes', 'Políticas',
        ],
      },
    },
  },

  it: {
    ui: {
      addItem: 'Aggiungi',
      screenshot: 'Cattura',
      reset: 'Reimposta',
      dropHere: 'Trascina gli elementi qui',
      allPlaced: 'Tutti gli elementi sono sulla bilancia!',
      items: 'Elementi',
      label: 'Nome',
      weight: 'Peso',
      light: 'Leggero',
      medium: 'Medio',
      heavy: 'Pesante',
      cancel: 'Annulla',
      save: 'Salva',
      editItem: 'Modifica',
      addItemTitle: 'Aggiungi',
      poweredBy: 'Realizzato da Six Seconds',
      clickToRename: 'Clicca per rinominare',
      labelPlaceholder: 'es., Esercizio',
      language: 'Lingua',
      version: 'Versione',
    },
    themes: {
      wellbeing: {
        menuLabel: 'Equilibrio',
        title: 'La Bilancia Interattiva del Benessere',
        subtitle: 'Trascina gli elementi sulla bilancia per esplorare cosa ti esaurisce e cosa ti sostiene',
        leftLabel: 'Esaurisce',
        rightLabel: 'Sostiene',
        items: [
          'Essere Occupati', 'Lista delle Cose da Fare', 'Solitudine',
          'Alimentazione', 'Social Media', 'Stare con le Persone', 'Tecnologia',
          'Sonno', 'Finanze', 'Creare', 'Routine', 'Cambiamento',
        ],
      },
      respond: {
        menuLabel: 'Reagire-Rispondere',
        title: 'Bilancia Reagire vs Rispondere',
        subtitle: "Esplora l'equilibrio tra reagire e rispondere nella tua vita",
        leftLabel: 'Reagire',
        rightLabel: 'Rispondere',
        items: [
          'Andare Veloci', "Tempo all'Aria Aperta", 'Caffeina', 'Feedback',
          'Social Media', 'Guardare le Notizie', 'Tecnologia', 'Sport',
          'Incertezza', 'Comunicazione Diretta', 'Scadenze', 'IA',
        ],
      },
      workplace: {
        menuLabel: 'Benessere',
        title: 'Bilancia del Benessere Lavorativo',
        subtitle: 'Esplora i fattori che contribuiscono al burnout o al benessere sul lavoro',
        leftLabel: 'Burnout',
        rightLabel: 'Benessere',
        items: [
          'Riunioni', 'Pianificazione', 'Crescita', 'Feedback', 'Cambiamento',
          'Cultura del Lavoro', 'Colleghi', 'Riconoscimento', 'Scadenze',
          'Clienti', 'Politiche',
        ],
      },
    },
  },
};

export function getTranslation(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export function getAvailableLanguages() {
  return Object.keys(TRANSLATIONS);
}

export function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || 'en';
}

export function getThemeIds() {
  return Object.keys(TRANSLATIONS.en.themes);
}
