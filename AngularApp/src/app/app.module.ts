import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { AppComponent } from './app.component';
import { FaqComponent } from './faq/faq.component';
import { Help1Component } from './help1/help1.component';

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    Help1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    {path: 'faq', component: FaqComponent},
    {path: 'help1', component: Help1Component},
  ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
