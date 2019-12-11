import * as React from "react";
import {BehaviorSubject, Subject} from "rxjs";
import {rerenderOnChange} from "../rerenderOnChange";
import {cleanup, render} from "@testing-library/react";

describe('rerenderOnFieldChange', () => {
  let componentWillUnmountSpy = jest.fn();
  let behaviorSubject: BehaviorSubject<string>;

  afterEach(cleanup);

  beforeEach(() => {
    behaviorSubject = new BehaviorSubject('FOO');
  });

  it('unsubscribes', () => {
    const TestComponent = makeTestComponentClass();
    const component = render(<TestComponent behaviorSubject={behaviorSubject}/>);

    expect(behaviorSubject.observers.length).toBe(1);

    component.unmount();
    expect(behaviorSubject.observers.length).toBe(0);
  });

  it('calls original componentWillUnmount', () => {
    componentWillUnmountSpy = jest.fn();
    let TestComponent = makeTestComponentClass();
    TestComponent.prototype.componentWillUnmount = componentWillUnmountSpy;
    const component = render(<TestComponent behaviorSubject={behaviorSubject}/>);
    component.unmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();
  });

  it('updates component when behavior subject has new value', () => {
    const forceUpdateSpy = jest.fn();
    let TestComponent = makeTestComponentClass();
    TestComponent.prototype.forceUpdate = forceUpdateSpy;
    render(<TestComponent behaviorSubject={behaviorSubject}/>);
    behaviorSubject.next('BAR');
    expect(forceUpdateSpy).toHaveBeenCalled();
  });

  it('rerenders when subject receives new value', () => {
    let TestComponent = makeTestComponentClass();
    const {getByText} = render(<TestComponent behaviorSubject={behaviorSubject}/>);
    getByText(/FOO/i);
    behaviorSubject.next('BAR');
    getByText(/BAR/i);
  });
});

function makeTestComponentClass() {
  return class TC extends React.Component<{ behaviorSubject: BehaviorSubject<string>, lifecycleSpy?: Subject<string> }> {
    componentDidMount() {
      let lifecycleSpy = this.props.lifecycleSpy;
      if (lifecycleSpy) {
        lifecycleSpy.next('componentDidMount');
      }

      rerenderOnChange(this, this.props.behaviorSubject);
    }

    componentWillUnmount() {
      if (this.props.lifecycleSpy) {
        this.props.lifecycleSpy.next('componentWillUnmount');
      }
    }

    render() {
      return <div>{this.props.behaviorSubject.getValue()}</div>;
    }
  };
}
