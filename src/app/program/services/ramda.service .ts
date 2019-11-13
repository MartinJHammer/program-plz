import { Injectable } from '@angular/core';
import map from 'ramda/src/map';
import filter from 'ramda/src/filter';
import reject from 'ramda/src/reject';
import find from 'ramda/src/find';
import complement from 'ramda/src/complement';
import reduce from 'ramda/src/reduce';
import either from 'ramda/src/either';
import both from 'ramda/src/both';
import pipe from 'ramda/src/pipe';

@Injectable({ providedIn: 'root' })
export class RamdaService {

    constructor() { this.init(); }

    public init(): void {
        const double = x => x * 2;
        const isEven = x => x % 2 === 0;
        const isOdd = complement(isEven);
        const add = (accum, value) => accum + value;

        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result: any = {};

        // General
        result.map = map(double, data);
        result.filter = filter(isEven, data);
        result.reject = reject(isEven, data);
        result.find = find(isEven, data);
        result.reduce = reduce(add, 5, data);
        result.complement = filter(isOdd, data);

        // 
        const wasBornInCountry = person => person.birthCountry === 'Denmark';
        const wasNaturalized = person => Boolean(person.naturalizationDate);
        const isOver18 = person => person.age >= 18;

        const isCitizen = either(wasBornInCountry, wasNaturalized);
        const isEligibleToVote = both(isOver18, isCitizen);

        const somePerson = {
            birthCountry: 'Denmark',
            age: 17
        };

        result.isEligibleToVote = isEligibleToVote(somePerson);


        const multiply = (a, b) => a * b;
        const addOne = x => x + 1;
        const square = x => x * x;

        const operate = pipe(
            multiply,
            addOne,
            square
        );

        result.pipe = operate(2, 2);


        console.log(JSON.stringify(result, undefined, 2));
    }
}
