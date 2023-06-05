import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ToyotaComponent } from './toyota/toyota.component';
import { MercedesComponent } from './mercedes/mercedes.component';
import { FerrariComponent } from './ferrari/ferrari.component';
import { HondaComponent } from './honda/honda.component';
import { DodgeComponent } from './dodge/dodge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PorscheComponent } from './porsche/porsche.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomepageComponent,
    ToyotaComponent,
    MercedesComponent,
    FerrariComponent,
    HondaComponent,
    DodgeComponent,
    PorscheComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
