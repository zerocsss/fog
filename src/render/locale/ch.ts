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
        },
        service: {
          stepper_label_text: '账户信息',
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
    }
  }
}

export default ch