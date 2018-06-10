import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor() {}

  public checkoutForm: FormGroup
}
