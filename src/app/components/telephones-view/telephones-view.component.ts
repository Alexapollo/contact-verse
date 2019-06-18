import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Telephone } from 'src/app/models/models';
import { TelephonesService } from 'src/app/services/telephones/telephones.service';

@Component({
  selector: 'app-telephones-view',
  templateUrl: './telephones-view.component.html',
  styleUrls: ['./telephones-view.component.css']
})
export class TelephonesViewComponent implements OnInit, OnDestroy {
  @Input() contactId: number;

  private subscriptions: Array<Subscription> = [];
  telephoneList: Telephone[];

  constructor(
    private telephonesService: TelephonesService
  ) {
    this.subscriptions.push(this.telephonesService.readTelephones()
      .subscribe(_ => {
        this.telephoneList = _;
      }));
  }

  ngOnInit() {
    this.telephonesService.getTelephones(this.contactId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
