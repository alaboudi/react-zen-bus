# React Zen Bus ☮️

React Zen Bus is a React binding for [Zen Bus](https://github.com/alaboudi/zen-bus). 

## Installation
```shell
yarn add @zenstack/react-zen-bus
```
or

```shell
npm install @zenstack/react-zen-bus
```

## Usage

### `useSubscribe(:eventBus, :eventToHandlerMap)`
The `useSubscribe` hooks allows your event handlers to subscribe to the event bus when your component mounts. 
In addition, it will unsubscribe your handlers when the components unmount.

```jsx
import {createEventBus} from "@zenstack/zen-bus";
import {useSubscribe} from "@zenstack/react-zen-bus";

const myTodoList = ['Clean Toilet'];
const addToList = (event) => myTodoList.push(event.title);
const logEvent = (event) => console.log(event);

const eventToHandlerMap = new Map([
    ["Todo Added", addToList],
    ["Todo Added", logEvent]
]);

/**
 * Once this component mounts, addToLis and logEvent will both 
 * susbcribe to the event bus and execute when an event of type "Todo Added" has been emitted.
 * They both will unsubscribe from the event bus when the component unmounts.
 */
const MyComponent = () => {
    useSubscribe(eventBus, eventToHandlerMap);
    
    return (
        <div>
            ...
        </div>
    );
}
```
