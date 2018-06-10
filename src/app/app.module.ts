import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { MainComponent } from './components/main/main.component'
import { FormFieldComponent } from './components/form-field/form-field.component'
import { FormFieldsComponent } from './components/form-fields/form-fields.component'
import { CheckoutService } from './services/checkout.service'

@NgModule({
  declarations: [AppComponent, MainComponent, FormFieldComponent, FormFieldsComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [CheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule {}
