import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/models';
import { Subscription } from 'rxjs';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];

  contactList: Contact[];

  constructor(
    private contactService: ContactsService) {
    this.subscriptions.push(this.contactService.readContacts()
      .subscribe(_ => {
        this.contactList = _;
      }));
  }

  ngOnInit() {
    this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
