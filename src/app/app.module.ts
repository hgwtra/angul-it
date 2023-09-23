import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { TextComponent } from './captcha/text/text.component';
import { MathComponent } from './captcha/math/math.component';
import { ImageComponent } from './captcha/image/image.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    CaptchaComponent,
    TextComponent,
    MathComponent,
    ImageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
