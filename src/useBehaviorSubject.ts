import {BehaviorSubject} from "rxjs";
import {useLayoutEffect, useState} from "react";

export function useBehaviorSubject<T>(behaviorSubject: BehaviorSubject<T>): [T, (value: T) => void] {
  const [value, setValue] = useState(behaviorSubject.getValue());
  useLayoutEffect(() => {
    const subscription = behaviorSubject.subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    }
  }, [behaviorSubject]);

  return [value, (v: T) => behaviorSubject.next(v)];
}
