import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'checked' })
export class CheckedPipe implements PipeTransform {
    transform(value: any, compareValues: any[]): boolean {
        if (!compareValues) {
            return false;
        }
        return compareValues.find(val => val === value) ? true : false;
    }
}