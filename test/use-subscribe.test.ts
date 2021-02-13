import {Event, createEventBus, EventHandler, EventType} from "@zenstack/zen-bus";
import { renderHook, act  } from "@testing-library/react-hooks";
import useSubscribe from "../src/use-subscribe";

describe('useSubscribe',() => {
    it('should subscribe event handlers upon mount', async () => {
        const eventHandler1 = jest.fn();
        const eventHandler2 = jest.fn();
        const event: Event = { type: 'my Event' };
        const eventBus = createEventBus();
        const subscriptions: [EventType<any>, EventHandler<any>][] = [
            [event.type, eventHandler1],
            [event.type, eventHandler2]
        ];

        const { waitFor } = renderHook(() => useSubscribe(eventBus, subscriptions));
        act(() => {
            eventBus.emit(event);
        });

        await waitFor(() => expect(eventHandler1).toBeCalledTimes(1));
        await waitFor(() => expect(eventHandler1).toBeCalledWith(event));
        await waitFor(() => expect(eventHandler2).toBeCalledTimes(1));
        await waitFor(() => expect(eventHandler2).toBeCalledWith(event));
    });

    it('should unsubscribe event handlers upon unmount', async () => {
        const eventHandler1 = jest.fn();
        const eventHandler2 = jest.fn();
        const event: Event = { type: 'my Event' };
        const eventBus = createEventBus();
        const subscriptions: [EventType<any>, EventHandler<any>][] = [
            [event.type, eventHandler1],
            [event.type, eventHandler2],
        ];

        const { waitFor, unmount } = renderHook(() => useSubscribe(eventBus, subscriptions));
        unmount();
        act(() => {
            eventBus.emit(event);
        });

        await waitFor(() => expect(eventHandler1).toBeCalledTimes(0));
        await waitFor(() => expect(eventHandler2).toBeCalledTimes(0));
    });
});
