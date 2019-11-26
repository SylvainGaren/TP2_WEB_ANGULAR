import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPhoneDirective]'
})
export class PhoneDirectiveDirective {

  @Input() appPhoneDirective: boolean = false;

  constructor(private _element: ElementRef) { }

  ngOnChanges() {
    if (this.appPhoneDirective) {
      this._element.nativeElement.style.color = 'green';
    }
    else {
      this._element.nativeElement.style.color = 'red';
    }
  }

}
