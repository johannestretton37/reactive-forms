import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms'
import { CheckoutService } from '../../services/checkout.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  get form() {
    return this._checkoutService.checkoutForm.value
  }
  backendResponse = {
    account: {
      title: 'Konto',
      description: 'Välj konto eller logga in',
      fields: [
        {
          type: 'email',
          label: 'Användarnamn eller epost',
          placeholder: 'username',
          validators: ['email'],
          formPath: 'loginGroup.username',
          value: ''
        },
        {
          type: 'password',
          label: 'Superhemligt lösenord',
          placeholder: 'password',
          validators: ['required', 'minLength(6)'],
          formPath: 'loginGroup.password',
          value: 'hemligt'
        },
        {
          type: 'text',
          label: 'Leveransadress',
          placeholder: 'delivery address',
          validators: ['required', 'minLength(8)'],
          formPath: 'delivery.deliveryAddress',
          value: 'Storgatan 1'
        },
        {
          type: 'checkbox',
          label: 'Postbox eller inte?',
          placeholder: 'is postbox',
          formPath: 'delivery.postbox',
          value: true
        },
        {
          type: 'radios',
          label: 'Välj en av dessa',
          formPath: 'song.chooser',
          fields: [
            {
              label: 'The first',
              value: 'first'
            },
            {
              label: 'Cut',
              value: 'cut'
            },
            {
              label: 'Is the deepest',
              value: 'deep'
            }
          ]
        }
      ]
    }
  }

  constructor(private _checkoutService: CheckoutService) {}

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    const formGroup = {}
    Object.entries(this.backendResponse).forEach(([stepKey, stepInfo]) => {
      console.log(`--- '${stepInfo.title}' [${stepKey}] ---`)
      stepInfo.fields.forEach(field => {
        const [group, controlName] = field.formPath.split('.')
        formGroup[group] = (formGroup[group] as FormGroup) || new FormGroup({})
        let newControl
        if (field.type === 'radios') {
          newControl = new FormControl(field.fields[0].value)
        }
        newControl = new FormControl(field.value, this.validators(field.validators))
        formGroup[group].addControl(controlName, newControl)
      })
    })
    this._checkoutService.checkoutForm = new FormGroup(formGroup)
  }

  /**
   * Returns a list of Validator functions from a list of string representations
   *
   * Since we can't pass functions from backend, editors can select from a list
   * of validations that should be performed on a field.
   * This method converts that string into a real function
   *
   * @param validators - Angular validator functions as an `array` of `string`s
   * @returns - An array of validator functions, `ValidatorFn[]`
   */
  private validators(validators: string[] = []): ValidatorFn[] {
    const regex = /([a-z]*)\(([a-z0-9]*)\)/gi
    return validators.map(validator => {
      const match = regex.exec(validator)
      if (match) {
        return Validators[match[1]](match[2]) as ValidatorFn
      }
      return Validators[validator] as ValidatorFn
    })
  }
}
