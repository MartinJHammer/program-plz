import { SubscriptionLike } from 'rxjs';

export class SubscriptionHandler {

    public subscriptions: SubscriptionLike[] = [];

    public register(sub: SubscriptionLike) {
        this.subscriptions.push(sub);
    }

    public unsubscribe() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
