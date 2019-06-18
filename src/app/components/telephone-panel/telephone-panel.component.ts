import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Telephone } from 'src/app/models/models';
import { TelephonesService } from 'src/app/services/telephones/telephones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-telephone-panel',
  templateUrl: './telephone-panel.component.html',
  styleUrls: ['./telephone-panel.component.css']
})
export class TelephonePanelComponent implements OnInit, OnDestroy {

  form: FormGroup;
  contactId: number;
  telephoneId: number;

  private subscriptions: Array<Subscription> = [];
  private initialTelephone: Telephone;

  constructor(
    private fb: FormBuilder,
    private telephoneService: TelephonesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initialTelephone = new Telephone();
    this.form = this.fb.group({
      TelephoneId: this.fb.control(0, [Validators.required]),
      Number: this.fb.control(null, [Validators.required]),
      ContactId: this.fb.control(0, [Validators.required])
    });

    this.subscriptions.push(this.activateRoute.params
      .subscribe(params => {
        this.contactId = params['contactId'];
        this.initialTelephone.ContactId = params['contactId'];
        this.telephoneId = params['telephoneId'];
        if (this.telephoneId != 0) { this.telephoneService.getTelephone(this.telephoneId) }

        this.setFields(this.initialTelephone);
      }));

    this.subscriptions.push(this.telephoneService.readTelephone()
      .subscribe(_ => {
        this.initialTelephone = _;
        this.setFields(_);
      }));
  }

  private setFields(telephone: Telephone) {
    this.form.get('TelephoneId').setValue(telephone.TelephoneId);
    this.form.get('ContactId').setValue(telephone.ContactId);
    this.form.get('Number').setValue(telephone.Number);
  }

  resetForm() {
    if (this.form != null) { this.form.reset(); }
    this.setFields(this.initialTelephone);
  }

  onSubmit() {
    if (!this.form.valid) { return; }
    if (this.telephoneId == 0) {
      this.telephoneService.postTelephone(this.form.value)
        .subscribe(_ => {
          this.resetForm();
        });
    } else {
      this.telephoneService.putTelephone(this.form.value)
        .subscribe(_ => {
          this.router.navigate(['contact', this.contactId]);
        });
    }
  }

  deleteTelephone() {
    const result = confirm('You are going to delete this telephone. Are you absolutely sure?');
    if (!result) { return; }
    
    if (this.telephoneId == null) { return; }
    this.telephoneService.deleteTelephone(this.form.get('TelephoneId').value)
      .subscribe(_ => {
        this.router.navigate(['contact', this.contactId]);
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => { subscription.unsubscribe() });
  }

}
