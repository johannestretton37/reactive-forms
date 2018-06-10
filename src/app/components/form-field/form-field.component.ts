import { Component, OnInit, Input, AfterViewInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { CheckoutService } from '../../services/checkout.service'

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  @Input() field: any
  public formGroup: FormGroup
  public formControlName: string

  constructor(private _checkoutService: CheckoutService) {}

  ngAfterViewInit() {}

  ngOnInit() {
    if (this.field) {
      const [formGroupString, formControlName] = this.field.formPath.split('.')
      this.formControlName = formControlName
      const formGroup = this._checkoutService.checkoutForm.get(formGroupString) as FormGroup
      this.formGroup = formGroup
    }
  }
}
