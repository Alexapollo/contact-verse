import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';
import { ContactPanelComponent } from './components/contact-panel/contact-panel.component';
import { TelephonesViewComponent } from './components/telephones-view/telephones-view.component';
import { TelephonePanelComponent } from './components/telephone-panel/telephone-panel.component';
import { RoutingModule } from './routing-module';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './modules/services/services.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactsViewComponent,
    ContactPanelComponent,
    TelephonesViewComponent,
    TelephonePanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
