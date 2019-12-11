<h1 align="center">Welcome to react-rxjs-connector 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-rxjs-connector" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-rxjs-connector.svg">
  </a>
  <a href="https://github.com/bryanneva/react-rxjs-connector#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bryanneva/react-rxjs-connector/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bryanneva/react-rxjs-connector/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/bryanneva/react-rxjs-connector" />
  </a>
</p>

> Functions to help react components to respond to RxJS based observables

## Install

```sh
npm install
```

## Run tests

```sh
npm run test
```

## Usage

This library currently offers 3 functions to connect RxJS to a React component.

### rerenderOnChange

Use `rerenderOnChange` when connecting a BehaviorSubject to a React component via the `componentDidMount` lifecycle event. `rerenderOnChange` will take care of updating your component when the BehaviorSubject changes, as well as unsubscribing when the component unmounts.

Example:
```
class MyComponent extends React.Component<{ behaviorSubject: BehaviorSubject<string> }> {
    componentDidMount() {
        rerenderOnFieldChange(this, this.props.behaviorSubject);
    }

    render() {
        return <div>{this.props.behaviorSubject.getValue()}</div>;
    }
}

...

const myValue = new BehaviorSubject<string>('initial value');
<MyComponent behaviorSubject={myValue}/>

myValue.next('updated value');
```

### useBehaviorSubject

Use `useBehaviorSubject` when connecting a BehaviorSubject to a React functional component just as you would a typical React hook. `useBehaviorSubject` will return the value and a change dispatcher, similar to react hook, allowing you to manipulate the value outside of the React component.

Example:
```
const MyComponent: React.FC<Props> = ({myBehaviorSubject}) => {
  const [value, setValue] = useBehaviorSubject(myBehaviorSubject);
  
  return (
    <div>
     {value}

      <button onClick={() => setValue('updated value')}>Click Me</button>
    </div>
  )
};

...

const myValue = new BehaviorSubject<string>('initial value');
<MyComponent behaviorSubject={myValue}/>

// Clicking button will make myValue.getValue() equal "updated value"

myValue.next('updated value'); // will cause MyComponent to rerender 
```

### useStore

Use `useStore` when connecting a "Store" to a React functional component just as you would a typical React hook. A store can be an array of javascript objects, where updating an entity in place may cause React to ignore the update because of it does not check objects with deep equals. `useStore` will return the value and a change dispatcher, similar to react hook, allowing you to manipulate the value outside of the React component.

Internally, this is different from useBehaviorSubject because the observable's value is converted into a string to encourage react to rerender.

Example:
```
type Props = {myStore: BehaviorSubject<SomeBigObject[]>};
const MyComponent: React.FC<Props> = ({myStore}) => {
  const [values, setValues] = useStore(mySotre);
  
  return (
    <div>
      <ul>{values.map((v, i) => <li key={i}>{v}</li>)}</ul>

      <button onClick={() => setValue([...values, new SomeBigObject()])}>Click Me</button>
    </div>
  )
};

...

const myStore = new BehaviorSubject<SomeBigObject[]>([{foo: 'bar'}, {foo: 'baz'}]);
<MyComponent behaviorSubject={myStore}/>

// Clicking button will make myStore.getValue() add another object to myStore.

myStore.next([]); // will cause MyComponent to rerender 
```

## Author

👤 **Bryan Neva <bryan.neva@gmail.com>**

* Github: [@bryanneva](https://github.com/bryanneva)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bryanneva/react-rxjs-connector/issues). You can also take a look at the [contributing guide](https://github.com/bryanneva/react-rxjs-connector/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Bryan Neva <bryan.neva@gmail.com>](https://github.com/bryanneva).<br />
This project is [ISC](https://github.com/bryanneva/react-rxjs-connector/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
