import { Directive, EventEmitter, Output, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';


/**
 * NOT USED ANYMORE - KEPT FOR REFERENCE
 */
@Directive({
  selector: '[ppScrollable]'
})
export class ScrollableDirective implements OnInit, OnDestroy {
  @Output() scrollPosition = new EventEmitter<string>();

  // private subscriptionHandler = new SubscriptionHandler();

  constructor(public el: ElementRef) { }

  ngOnInit(): void {
    // this.subscriptionHandler.register(fromEvent(this.el.nativeElement, 'scroll').pipe(
    //   map((event: any) => this.onScroll(event))
    // ).subscribe());
  }

  ngOnDestroy() {
    // this.subscriptionHandler.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  public onScroll(event: any) {
    try {
      const top = event.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;
      console.log(top, height, offset);

      // Has the user reached the bottom of the element?
      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }

      // Has the user reached the top of the element?
      if (top === 0) {
        this.scrollPosition.emit('top');
      }

    } catch (error) {
      console.log(error);
    }
  }

}
