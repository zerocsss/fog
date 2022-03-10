const { TouchBar } = require("electron")

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

exports.touchBar = new TouchBar({
  items: [
    new TouchBarSpacer({ size: 'large' }),
    new TouchBarLabel({
      label: "touchBar will comming soon",
      textColor: '#fff',
      backgroundColor: '#000'
    }),
  ]
})
