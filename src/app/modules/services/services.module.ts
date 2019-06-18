import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpErrorHandler } from '../../services/http-error-handler/http-error-handler.service';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { TelephonesService } from 'src/app/services/telephones/telephones.service';
import { MessageService } from 'src/app/services/http-error-handler/message.service';

@NgModule({
  providers: [
    HttpErrorHandler,
    ContactsService,
    TelephonesService,
    MessageService
  ]
})
export class ServicesModule {
  constructor(@Optional() @SkipSelf() core: ServicesModule) {
    if (core) {
      throw new Error('You must import ServicesModule only in AppModule!');
    }
  }
}
