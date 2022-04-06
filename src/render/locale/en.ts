const en = {
  welcome: {
    header: {
      welcome_step_label_text: 'Welcone',
      setting_step_label_text: 'Setting',
      finish_step_label_text: 'Ready to go',
    },
    content: {
      welcome: {
        description_1: "description_1",
        description_2: "description_2",
        description_3: "description_3",
        description_4: "description_4",
      },
      setting: {
        general: {
          stepper_label_text: 'General',
          theme_label_text: 'Theme',
          theme_selector_placeholder_text: 'Select theme',
          theme_selector_option_light: 'Light',
          theme_selector_option_dark: 'Dark',
          theme_selector_option_system: 'System',
          language_label_text: 'Language',
          language_selector_placeholder_text: 'Select language',
          language: {
            ch: "简体中文",
            en: "English",
            jp: "日本語",
            kor: "한국어",
          },
          default_folder_label_text: 'Default clone folder',
          default_folder_placeholder_text: 'Select default clone folder',
        },
        addRepositores: {
          stepper_label_text: "Add Repositores",
          add_repositores_title_label_text: "Add Local Git Repositoies",
        },
        service: {
          stepper_label_text: 'Service Account',
          add_button_text: 'Add Account',
          cancel_button_text: 'Cancel',
          select_account_type_title: 'Select The Type of Account You Want To Add',
          gitlabceee: {
            authentication_label_text: 'Authentication',
            host_label_text: 'Host',
            host_placeholder_text: 'http://example.com',
            username_label_text: 'Username',
            username_placeholder_text: 'Username',
            personal_access_token_label_text: 'Personal Access Token',
            personal_access_token_placeholder_text: 'Personal Access Token',
            password_label_text: 'Password',
            password_placeholder_text: 'Password',
            private_token_label_text: 'Private Token',
            private_token_placeholder_text: 'Private Token',
          }
        },
        git: {
          stepper_label_text: "Git Config",
          git_binary_label_text: 'Git binary',
          git_gpg_binary_label_text: 'GPG binary',
          git_minimum_tip: 'Minimum required Git version is 2.1.0',
          gpg_minimum_tip: 'Minimum required GPG version is 2.1.0',
          git_binary_placeholder_text: 'Select git binary file',
          git_gpg_key_label_text: 'GPG key',
          git_gpg_binary_placeholder_text: 'Select git gpg binary file',
          git_gpg_key_placeholder_text: 'Select gpg key file',
          git_binary_button_text: 'Select manually',
          create_gpg_key_button_text: 'Create GPG key',
          git_global_config_label_text: 'Global Config',
          git_global_name_label_text: 'User name',
          git_global_name_placeholder_text: 'Input your global user name',
          git_global_email_label_text: 'User email',
          git_global_email_placeholder_text: 'Input your global user email',
        }
      },
      finish: {
        title: 'Ready to go',
        description: 'You can start using Fog now!',
        button_text: 'Let`s Start',
      }
    },
    bottom: {
      prev_button_text: 'Back',
      next_button_text: 'Next',
      finish_button_text: "Let's Start",
      select_all_button_text: 'Select All',
      deselect_all_button_text: 'Deselect All',
    }
  },
  explorer: {
    header: {
      radio_button_service_button_text: 'Service',
      radio_button_local_button_text: 'Local',
    }
  },
  context_menu: {
    service_account_list_item: {
      edit: 'Edit',
      remove: 'Remove',
      refresh: 'Refresh',
    }
  },
  setting: {
    general: {
      header_text: "General",
      default_cloned_folder_text: "Default Cloned Folder",
      default_cloned_folder_dialog_title: "Select Default Cloned Folder",
      terminal_application_text: "Terminal Application",
      select_manually_button_text: "Select manually",
      ide_application_text: "IDE Application",
      language_label_text: "Language",
      auto_fetch_text: "Automatically fetch",
      commit_counts_text: "Number of commits",
      commits_text: "Commits",
      auto_fetch: {
        never: "Manually",
        fiveMinute: "5 minutes",
        tenMinute: "10 minutes",
        thirtyMinute: "30 minutes",
        oneHour: "1 hour",
      },
      language: {
        ch: "简体中文",
        en: "English",
        jp: "日本語",
        kor: "한국어",
      },
      open_on_login_label_text: "Open on login",
    },
    account: {
      header_text: "Account",
    },
    git: {
      header_text: "Git",
      global_user_name_text: "Global user name",
      global_email: "Global email"
    },
    theme: {
      header_text: "Theme",
      theme_label_text: "Theme",
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System",
      }
    },
    shortcut: {
      key_label_text: "key",
      action_label_text: "Action",
      reset_btn_text: "Reset to default",
      header_text: "Shortcut",
      tabel_action_text: "Action",
      table_key_text: "Key",
      shorrcut_enable_label_text: "Enable",
      enable_text: "Enable",
      disable_text: "Disable",
      spin_tip: "Enable shortcut to edit",
      none_key_tip: "None key",
      edit_input_placeholder: "Esc to cancel",
    },
    update: {
      header_text: "Update",
      update_btn_text: "Check update",
      channel_label_text: "Channel",
      stable_channel_text: "Stable",
      beta_channel_text: "Beta",
      auto_check_label_text: "Auto check",
      update_interval_label_text: "Ypdate interval",
      dayly_text: "Dayly",
      weekly_text: "Weekly",
      monthly_text: "Monthly",
      last_check_time_label_text: "Last check",
    },
    about: {
      header_text: "About",
      author: "Xie Yuan",
      feedback_btn_text: "Feedback",
      changelog_btn_text: "Changelog",
      developer: "Developer",
      thanks: "Thanks",
    },
    common: {
      yes_text: "Yes",
      no_text: "No",
      show_text: "Show",
      hide_text: "Hide",
      open_text: "Open",
      close_text: "Close",
      enable_text: "Enable",
      disable_text: "Disable",
      auto_text: "Auto",
      manual_text: "Manual",
    },
  },
  dialog: {
    reward: {
      title: 'Reward',
      title_in: 'Thank you for your support',
      subtitle: 'If you like this app, please consider to donate to the author.',
      ok_btn_text: 'OK~',
      ok_btn_1_text: "I'm done paying. I need to make a request",
      cancel_btn_text: 'No, thanks',
    }
  },
  shortcut: {
    action: {
      import_local_log: 'Import local log',
      import_shared_log: 'Import shared log',
      settings: 'Settings',
      setting_general: 'Setting-general',
      setting_shortcut: 'Setting-shortcut',
      setting_account: 'Setting-account',
      setting_about: 'Setting-about',
      setting_log: 'Setting-log',
      setting_theme: 'Setting-theme',
      setting_update: 'Setting-update',
      search_log_file: 'Search log',
      search_log_rule: 'Search log rule',
      search_log_field: 'Search log field',
      switch_opend_tab: 'Switch opened tab(1-9)',
      share_log: 'Share log',
      share_log_rule: 'Share log rule',
      close_current_tab: 'Close current tab',
      close_all_tabs: 'Close all tabs',
      close_other_tabs: 'Close other tabs',
    }
  }
}

export default en