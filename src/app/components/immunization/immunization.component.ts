import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

import {FirebaseListObservable, AngularFire} from 'angularfire2';

import {AccountService} from '../../services/account.service';
import {Immunization} from '../../models/immunization';

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
  providers: [MdRadioDispatcher, AccountService]
})
export class ImmunizationComponent implements OnInit {
  @Input('personIndex') personIndex: number;
  private upcoming$: FirebaseListObservable<any[]>;
  @Output() addImmunizationEvent = new EventEmitter<boolean>();

  constructor(
    private af: AngularFire,
    private accountSvc: AccountService
  ) {}

  ngOnInit() {
    this.upcoming$ = this.af.database
      .list(this.accountSvc.accountUri + '/family/' + this.personIndex + '/upcoming');
  }

  onCancel() {
    this.addImmunizationEvent.emit(false);
  }

  onSubmit(value: Immunization) {
    this.upcoming$.push(value);
    this.addImmunizationEvent.emit(true);
  }
}