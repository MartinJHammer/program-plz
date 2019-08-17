import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ppDynamicFormField]',
})
export class DynamicFormFieldDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}