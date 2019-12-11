import * as React from "react";
import {BehaviorSubject} from "rxjs";
import {render} from "@testing-library/react";
import {useBehaviorSubject} from "../useBehaviorSubject";

describe('useBehaviorSubject', () => {
  it('rerenders component when BehaviorSubject changes', () => {
    const behaviorSubject = new BehaviorSubject('');
    const renderSpy = jest.fn();
    render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={renderSpy}/>);

    behaviorSubject.next('change');
    expect(renderSpy).toHaveBeenCalledTimes(2);
  });

  it('returns the value', () => {
    const behaviorSubject = new BehaviorSubject('initial value');
    const {getByText} = render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={jest.fn()}/>);

    getByText('initial value');
  });

  it('returns an onChange dispatcher', () => {
    const behaviorSubject = new BehaviorSubject('initial value');
    const expectedValues: any[] = [];
    behaviorSubject.subscribe(v => expectedValues.push(v));

    const {getByText} = render(<TestComponent behaviorSubject={behaviorSubject} renderSpy={jest.fn()}/>);

    getByText('click me').click();

    expect(expectedValues).toHaveLength(2);
  });
});


type Props = { behaviorSubject: BehaviorSubject<string>, renderSpy: () => void };
const TestComponent: React.FC<Props> = ({behaviorSubject, renderSpy}) => {
  const [value, setValue] = useBehaviorSubject(behaviorSubject);
  renderSpy();
  return <div>
    {value}
    <button onClick={() => setValue('')}>click me</button>
  </div>
};
