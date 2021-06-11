import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appImgBrake]'
})
export class ImagBrakeDirective {

  @Input() urlCustom: string;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('error')
  loadImage(): void {
    const element = this.elementRef.nativeElement;
    element.src = this.urlCustom || `../assets/images/not-image.png`;
  }

}
