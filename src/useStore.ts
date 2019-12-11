import {BehaviorSubject} from "rxjs";
import {useLayoutEffect, useState} from "react";

export function useStore<T>(store: BehaviorSubject<T[]>): [T[], (value: T[]) => void] {
  const [, setValue] = useState('');
  useLayoutEffect(() => {
    const subscription = store.subscribe(v => setValue(JSON.stringify(v)));

    return () => subscription.unsubscribe();
  }, [store]);

  return [store.getValue(), (v: T[]) => store.next(v)];
}
