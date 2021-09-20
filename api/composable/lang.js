import { useContext } from "@nuxtjs/composition-api"
import Shepherd from 'shepherd.js'

export function useSelectLanguage() {
  const { i18n } = useContext()
  const startSelectLanguage = () => new Promise((resolve) => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-square',
      }
    })
    tour.addStep({
      title: 'Language',
      text: 'Select your language want to use!',
      buttons: [
        {
          text: 'English',
          action() {
            i18n.setLocale('en')
            this.hide()
            resolve()
          }
        },
        {
          text: 'Indonesian',
          action() {
            i18n.setLocale('id')
            this.hide()
            resolve()
          }
        }
      ]
    })
    tour.start()
  })

  return {
    startSelectLanguage
  }
}
