import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdRadioButton, MdRadioGroup } from '@angular2-material/radio';

import { FirebaseListObservable, AngularFire } from 'angularfire2';

import { AccountService } from '../../../services/account.service';
import { Immunization } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'add-immunization',
  templateUrl: 'immunization.component.html',
  styleUrls: ['immunization.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
    MdRadioButton,
    MdRadioGroup
  ],
  providers: [MdUniqueSelectionDispatcher]
})
export class ImmunizationComponent implements OnInit {
  @Input() personId: string;
  @Output() addImmunizationEvent = new EventEmitter<boolean>();
  immunization: Immunization = {
    name: '',
    type: '',
    scheduledDate: new Date(),
    dosageValue: null,
    dosageUnit: ''
  };

  private upcoming$: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService
  ) {}

  ngOnInit() {
    this.upcoming$ = this.af.database
      .list(this.accountSvc.accountUri + '/family/' + this.personId + '/upcoming');
    this.upcoming$.subscribe(upcoming => this.upcomingWatcher(upcoming));
  }

  onCancel() {
    this.addImmunizationEvent.emit(false);
  }

  onSubmit(immunization: Immunization) {
    this.upcoming$.push(immunization);
    this.addImmunizationEvent.emit(true);
  }

  private upcomingWatcher(upcoming) {
    console.log(upcoming);
  }

}
