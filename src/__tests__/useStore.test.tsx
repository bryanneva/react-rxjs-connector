import {BehaviorSubject} from "rxjs";
import {cleanup, render} from "@testing-library/react";
import * as React from "react";
import {useStore} from "../useStore";
import {act} from "react-dom/test-utils";

describe('useStore', () => {
  afterEach(cleanup);

  it('rerenders component when store changes', () => {
    const behaviorSubject = new BehaviorSubject(['']);
    const renderSpy = jest.fn();
    act(() => {
      render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={renderSpy}/>);
      behaviorSubject.next(['', '']);
    });

    expect(renderSpy).toHaveBeenCalledTimes(2);
  });

  it('returns values', () => {
    const behaviorSubject = new BehaviorSubject(['initial value']);
    const {getByText} = render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={jest.fn()}/>);

    getByText('initial value');
  });

  it('returns change dispatcher', () => {
    const behaviorSubject = new BehaviorSubject(['initial value']);
    const expectedValues: any[] = [];
    behaviorSubject.subscribe(v => expectedValues.push(v));

    const {getByText} = render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={jest.fn()}/>);

    getByText('click me').click();

    expect(expectedValues).toHaveLength(2);
  });
});

type Props = { behaviorSubject: BehaviorSubject<string[]>, renderSpy: () => void };
const TestComponent: React.FC<Props> = ({behaviorSubject, renderSpy}) => {
  const [values, setValues] = useStore(behaviorSubject);
  renderSpy();
  return <div>
    <ul>
      {values.map((v, i) => <li key={i}>{v}</li>)}
    </ul>
    <button onClick={() => setValues([...values, ''])}>click me</button>
  </div>
};
