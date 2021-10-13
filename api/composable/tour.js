import { useContext } from "@nuxtjs/composition-api"
import Shepherd from 'shepherd.js'

export function useTour({ onTabClick }) {
  //
  const { $sleep, $t } = useContext()

  //
  let defaultButtons = []
  const withDefaultButton = (next) => {
    const btn = [ defaultButtons[0] ]
    btn.push(next)
    return btn
  }

  const addSteps = (tour) => {
    addGroupStep1({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep2({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep3({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep4({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    return tour
  }

  const startTour = () => {
    defaultButtons = [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: $t('tour.button.prev')
      },
      {
        action() {
          return this.next();
        },
        text: $t('tour.button.next')
      }
    ]
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd-theme-square',
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    // adding steps to the tour
    addSteps(tour)

    // start tour
    tour.start();
  }

  return {
    startTour
  }
}

function addGroupStep1({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: $t('tour.steps.group1[0].title'),
    text: $t('tour.steps.group1[0].text'),
    buttons: [
    {
      text: $t('tour.steps.group1[0].prev'),
      classes: 'shepherd-button-secondary',
      action() {
        return this.hide();
      },
    },
    {
      action() {
        return this.next();
      },
      text: $t('tour.steps.group1[0].next')
    }
  ]
  });
  tour.addStep({
    title: $t('tour.steps.group1[1].title'),
    text: $t('tour.steps.group1[1].text'),
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps.group1[2].title'),
    text: $t('tour.steps.group1[2].text'),
    attachTo: {
      element: '.panel-blocks',
      on: 'bottom'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps.group1[3].title'),
    text: $t('tour.steps.group1[3].text'),
    attachTo: {
      element: '.panel-blocks > div:nth-child(3) > span',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps.group1[4].title'),
    text: $t('tour.steps.group1[4].text'),
    attachTo: {
      element: '.block-chain:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps.group1[5].title'),
    text: $t('tour.steps.group1[5].text'),
    attachTo: {
      element: '.block-chain:nth-child(2) div:nth-child(2) div:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps.group1[6].title'),
    text: $t('tour.steps.group1[6].text'),
    attachTo: {
      element: '.block-chain:nth-child(2) > div:nth-child(2) > div:nth-child(2)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
      title: $t('tour.steps.group1[7].title'),
      text: $t('tour.steps.group1[7].text'),
      attachTo: {
        element: '.block-chain:nth-child(1) > div:nth-child(2) > div:nth-child(1)',
        on: 'right'
      },
      buttons: withDefaultButton({
        text: $t('tour.button.next'),
        async action () {
          onTabClick(1)
          this.hide()
          await $sleep(500)
          return this.next()
        }
      })
    });
}

function addGroupStep2({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  // $t('tour.steps.group1[0].title'),
  tour.addStep({
    title: $t('tour.steps.group2[0].title'),
    text: $t('tour.steps.group2[0].text'),
    attachTo: {
      element: '.panel-wallet',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(0)
          this.hide()
          await $sleep(500)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: $t('tour.button.prev')
      },
      {
        text: $t('tour.button.next'),
        async action () {
          onTabClick(1)
          this.hide()
          await $sleep(500)
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: $t('tour.steps.group2[1].title'),
    text: $t('tour.steps.group2[1].text'),
    attachTo: {
      element: '.panel-wallet > div:nth-child(1) > div:nth-child(2)',
      on: 'left'
    },
    buttons: withDefaultButton({
      text: $t('tour.button.next'),
      async action () {
        const btn = document.querySelector('.panel-wallet > div:nth-child(1) > div:nth-child(2) > button')
        btn.click()
        this.hide()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group2[2].title'),
    text: $t('tour.steps.group2[2].text'),
    attachTo: {
      element: '.panel-wallet-action > div:nth-child(2) > form > div:nth-child(1)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text:  $t('tour.button.next'),
      async action () {
        this.hide()
        const input = document.querySelector('.panel-wallet-action > div:nth-child(2) > form > div:nth-child(1) > div:nth-child(2) > input')
        input.setAttribute('value', 'John Doe')
        const event = new Event('input')
        input.dispatchEvent(event)
        await $sleep(500)
        const btn = document.querySelector('.panel-wallet-action > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(2) > button')
        btn.click()
        await $sleep(1000)
        const wallet = document.querySelector('.panel-wallet > div:nth-child(2) > span > div:nth-child(2)')
        wallet.click()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group2[3].title'),
    text: $t('tour.steps.group2[3].text'),
    attachTo: {
      element: '.panel-wallet > div:nth-child(2) > span > div:nth-child(2)',
      on: 'left'
    },
    buttons: withDefaultButton({
      text: $t('tour.button.next'),
      async action () {
        onTabClick(3)
        this.hide()
        await $sleep(500)
        return this.next()
      }
    })
  });
}

function addGroupStep3({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: $t('tour.steps.group3[0].title'),
    text: $t('tour.steps.group3[0].text'),
    attachTo: {
      element: '.panel-transaction',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(1)
          this.hide()
          await $sleep(500)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: $t('tour.button.prev')
      },
      {
        text: $t('tour.button.next'),
        async action () {
          const select = document.querySelector('.panel-transaction > div > div:nth-child(3) > form > div:nth-child(2) > div:nth-child(2) > select')
          select.setAttribute('value', 0)
          select.querySelector('option:nth-child(1)').setAttribute('selected', 'selected')
          const event = new Event('input')
          select.dispatchEvent(event)
          if ("createEvent" in document) {
            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            select.dispatchEvent(evt);
          } else {
            select.fireEvent("onchange");
          }
          this.hide()
          await $sleep(500)
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: $t('tour.steps.group3[1].title'),
    text: $t('tour.steps.group3[1].text'),
    attachTo: {
      element: '.panel-transaction > div > div:nth-child(3) > form > div:nth-child(2) > div:nth-child(2)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: $t('tour.button.next'),
      async action () {
        const btn = document.querySelector('.panel-transaction > div > div:nth-child(3) > form > div:nth-child(4) > div:nth-child(2) > button')
        btn.click()
        this.hide()
        await $sleep(500)
        return this.next()
      }
    })
  });
}

function addGroupStep4({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title:  $t('tour.steps.group4[0].title'),
    text: $t('tour.steps.group4[0].text'),
    attachTo: {
      element: '.panel-pending-transaction',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(3)
          this.hide()
          await $sleep(300)
          const select = document.querySelector('.panel-transaction > div > div:nth-child(3) > form > div:nth-child(2) > div:nth-child(2) > select')
          select.setAttribute('value', 0)
          select.querySelector('option:nth-child(1)').setAttribute('selected', 'selected')
          const event = new Event('input')
          select.dispatchEvent(event)
          if ("createEvent" in document) {
            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            select.dispatchEvent(evt);
          } else {
            select.fireEvent("onchange");
          }
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        text: 'Next',
        action () {
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: $t('tour.steps.group4[1].title'),
    text: $t('tour.steps.group4[1].text'),
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        this.hide()
        const btn = document.querySelector('.panel-pending-transaction > div:nth-child(1) > div:nth-child(3) > button')
        btn.click()
        console.log('Tour listening navigating to panel blocks')
        while(true) {
          if (document.querySelector('.panel-pending-transaction').getAttribute('mining') === '1') {
            break
          }
          await $sleep(100)
        }
        onTabClick(0)
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[2].title'),
    text: $t('tour.steps.group4[2].text'),
    attachTo: {
      element: '.block-chain:nth-child(3)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[3].title'),
    text: $t('tour.steps.group4[3].text'),
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(2) > div:nth-child(1)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[4].title'),
    text: $t('tour.steps.group4[4].text'),
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(2) > div:nth-child(2)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[5].title'),
    text: $t('tour.steps.group4[5].text'),
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(3) > div:nth-child(2)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        const block = document.querySelector('.block-chain:nth-child(3)')
        block.click()
        this.hide()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[6].title'),
    text: $t('tour.steps.group4[6].text'),
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(1)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[7].title'),
    text: $t('tour.steps.group4[7].text'),
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[8].title'),
    text: $t('tour.steps.group4[8].text'),
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(2)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: $t('tour.steps.group4[9].title'),
    text: $t('tour.steps.group4[9].text'),
    buttons: withDefaultButton({
      text: 'Finish',
      action () {
        return this.hide()
      }
    })
  });
}
