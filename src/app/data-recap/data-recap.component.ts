import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-data-recap',
  templateUrl: './data-recap.component.html',
  styleUrls: ['./data-recap.component.scss']
})

// Essaie de mise en place d'un pipe
@Pipe({name: 'format'})

export class DataRecapComponent implements OnInit {

  // instructions input pour pouvoir recevoir des informations du père (composant form)
  @Input() recapForm: string;
  @Input() tel: string;
  @Input() validSaisie: boolean;
  @Input() pays: string;

  constructor() { }

  ngOnInit() {
  }

  transform(value: string) {
    return "+33" + value;
  }

}
