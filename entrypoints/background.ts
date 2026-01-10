import { browser } from 'wxt/browser'

export default {
  main() {
    browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    })
  },
}