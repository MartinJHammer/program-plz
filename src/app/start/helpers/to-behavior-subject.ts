import { Observable, BehaviorSubject } from 'rxjs';

export const toBehaviorSubject = <T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> => {
    const behaviorSubject = new BehaviorSubject(initValue);
    observable.subscribe({
        complete: () => behaviorSubject.complete(),
        error: x => behaviorSubject.error(x),
        next: x => behaviorSubject.next(x)
    });

    return behaviorSubject;
};
