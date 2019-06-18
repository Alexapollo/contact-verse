import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/models';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.css']
})
export class ContactPanelComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: number;

  private subscriptions: Array<Subscription> = [];
  private initialContact: Contact;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  ngOnInit() {
    this.initialContact = new Contact();
    this.form = this.fb.group({
      ContactId: this.fb.control(0),
      Name: this.fb.control(null, [Validators.required]),
      Email: this.fb.control(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      Address: this.fb.control(null)
    });

    this.subscriptions.push(this.activateRoute.params.subscribe(param => {
      this.id = param['id'];
      if (this.id != 0) { this.contactsService.getContact(this.id); }

      this.setFields(this.initialContact);
    }));

    this.subscriptions.push(this.contactsService.readContact().subscribe(_ => {
      this.initialContact = _;
      this.setFields(_);
    }));
  }

  private setFields(contact: Contact) {
    this.form.get('ContactId').setValue(contact.ContactId);
    this.form.get('Name').setValue(contact.Name);
    this.form.get('Email').setValue(contact.Email);
    this.form.get('Address').setValue(contact.Address);
  }

  resetForm() {
    if (this.form != null) { this.form.reset(); }
    this.setFields(this.initialContact);
  }

  onSubmit() {
    if (!this.form.valid) { return; }
    if (this.id == 0) {
      this.contactsService.postContact(this.form.value)
        .subscribe(_ => {
          this.router.navigate(['contact', _['ContactId']]);
        });
    } else {
      this.contactsService.putContact(this.form.value)
        .subscribe(_ => {
          this.router.navigate(['contacts-view']);
        });
    }
  }

  deleteContact() {
    const result = confirm('You are going to delete this contact. Are you absolutely sure?');
    if (!result) { return; }

    if (this.id == null) { return; }
    this.contactsService.deleteContact(this.form.get('ContactId').value)
      .subscribe(_ => {
        this.router.navigate(['contacts-view']);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => { subscription.unsubscribe() });
  }
}
