const ch = {
  welcome: {
    header: {
      welcome_step_label_text: '欢迎',
      setting_step_label_text: '设置',
      finish_step_label_text: '完成',
    },
    content: {
      welcome: {
        description_1: "描述1",
        description_2: "描述12",
        description_3: "描述13",
        description_4: "描述14",
      },
      setting: {
        general: {
          stepper_label_text: '通用',
          theme_label_text: '主题',
          theme_selector_placeholder_text: '选择主题',
          theme_selector_option_light: '浅色',
          theme_selector_option_dark: '深色',
          theme_selector_option_system: '系统',
          language_label_text: '语言',
          language_selector_placeholder_text: '选择语言',
          language: {
            ch: "简体中文",
            en: "English",
            jp: "日本語",
            kor: "한국어",
          },
          default_folder_label_text: '默认克隆目录',
          default_folder_placeholder_text: '选择默认克隆目录',
        },
        addRepositores: {
          stepper_label_text: "添加本地仓库",
          add_repositores_title_label_text: "选择要添加的本地仓库",
        },
        service: {
          stepper_label_text: '账户信息',
          add_button_text: '添加',
          cancel_button_text: '取消',
          select_account_type_title: '选择你要添加的账户类型',
          gitlabceee: {
            authentication_label_text: '授权方式',
            host_label_text: '地址',
            host_placeholder_text: 'http://example.com',
            username_label_text: '用户名',
            username_placeholder_text: '请输入用户名',
            personal_access_token_label_text: 'Personal Access Token',
            personal_access_token_placeholder_text: 'Personal Access Token',
            password_label_text: '密码',
            password_placeholder_text: '请输入密码',
            private_token_label_text: 'Private Token',
            private_token_placeholder_text: 'Private Token',
          }
        },
        git: {
          stepper_label_text: "Git配置",
          git_binary_label_text: 'git',
          git_binary_placeholder_text: '选择git二进制文件',
          git_binary_button_text: '手动选择',
          git_global_config_label_text: '全局配置',
          git_global_name_label_text: '用户名',
          git_global_name_placeholder_text: '输入全局用户名',
          git_global_email_label_text: '邮箱',
          git_global_email_placeholder_text: '输入全局邮箱',
        }
      }
    },
    bottom: {
      prev_button_text: '上一步',
      next_button_text: '下一步',
      finish_button_text: '完成',
      select_all_button_text: '全选',
      deselect_all_button_text: '全不选',
    }
  },
  setting: {
    general: {
      header_text: "通用",
      default_cloned_folder_text: "默认克隆目录",
      language_label_text: "语言",
      language: {
        ch: "简体中文",
        en: "English",
        jp: "日本語",
        kor: "한국어",
      },
      open_on_login_label_text: "登陆时打开",
    },
    account: {
      header_text: "账户",
    },
    theme: {
      header_text: "主题",
    },
    shortcut: {
      header_text: "快捷键",
    },
    update: {
      header_text: "更新",
    },
    about: {
      header_text: "关于",
    },
    common: {
      yes_text: "是",
      no_text: "否",
    }
  }
}

export default ch