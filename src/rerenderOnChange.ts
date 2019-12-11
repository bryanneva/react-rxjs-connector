import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as React from "react";

export function rerenderOnChange(component: React.Component, ...fields: Array<Observable<any>>) {
    const unsubscribe = new Subject<void>();
    fields.forEach(f => f
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => component.forceUpdate()));

    const originalComponentWillUnmount = component.componentWillUnmount;
    component.componentWillUnmount = () => {
        unsubscribe.next();
        unsubscribe.complete();
        if (originalComponentWillUnmount) {
            originalComponentWillUnmount.apply(component);
        }
    }
}
