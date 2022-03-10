const { isMac } = require('./utils')
exports.defaultShortcuts = [
  {
    action: 'switch_opend_tab',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl'],
      key: ["1-9"]
    },
  },
  {
    action: 'settings',
    key: {
      functionalKeys: ['CommandOrControl'],
      key: [',']
    },
    isEditing: false,
  },
  {
    action: 'import_local_log',
    key: {
      functionalKeys: ['CommandOrControl', 'Shift'],
      key: ['I']
    },
    isEditing: false,
  },
  {
    action: 'import_shared_log',
    key: {
      functionalKeys: ['CommandOrControl', 'Shift'],
      key: ['S']
    },
    isEditing: false,
  },
  {
    action: 'close_current_tab',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl'],
      key: ['W']
    }
  },
  {
    action: 'close_all_tabs',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl', 'Shift'],
      key: ['W']
    }
  },
  {
    action: 'close_other_tabs',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl', isMac ? 'Option' : 'Alt'],
      key: ['T']
    }
  },
  {
    action: 'search_log_file',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl'],
      key: ['P']
    }
  },
  {
    action: 'setting_general',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_shortcut',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_account',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_about',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_log',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_theme',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_update',
    isEditing: false,
    key: null,
  },
  {
    action: 'search_log_rule',
    isEditing: false,
    key: null,
  },
  {
    action: 'search_log_field',
    isEditing: false,
    key: null,
  },
  {
    action: 'share_log',
    isEditing: false,
    key: null,
  }
]