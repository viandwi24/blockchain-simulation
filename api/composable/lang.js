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
          text: `
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g clip-path="url(#clip0_2:20)">
              <rect width="24" height="16" fill="white"/>
              <rect width="30" height="16" fill="url(#pattern0)"/>
              </g>
              <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_2:20" transform="translate(-0.00715746) scale(0.00327198 0.00613497)"/>
              </pattern>
              <clipPath id="clip0_2:20">
              <rect width="24" height="16" fill="white"/>
              </clipPath>
              <image id="image0_2:20" width="310" height="163" xlink:href="data:image/png;base64,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"/>
              </defs>
            </svg>
            <span>English</span>
          `,
          action() {
            i18n.setLocale('en')
            this.hide()
            resolve()
          }
        },
        {
          text: `
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2:13)">
            <rect width="24" height="16" fill="white"/>
            <path d="M0 0H32V8H0V0Z" fill="#FF1010"/>
            <path d="M0 8H32V16H0V8Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_2:13">
            <rect width="24" height="16" fill="white"/>
            </clipPath>
          </defs>
          </svg>
          <span>Indonesian</span>
          `,
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
