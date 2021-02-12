import { Event, createEventBus } from "@zenstack/zen-bus";
import { renderHook, act  } from "@testing-library/react-hooks";
import useSubscribe from "../src/use-subscribe";

describe('useSubscribe',() => {
    it('should subscribe event handlers upon mount', async () => {
        const eventHandler = jest.fn();
        const event: Event = { type: 'my Event' };
        const eventBus = createEventBus();
        const subscriptionMap = new Map([
            [event.type, eventHandler]
        ]);

        const { waitFor } = renderHook(() => useSubscribe(eventBus, subscriptionMap));
        act(() => {
            eventBus.emit(event);
        });

        await waitFor(() => expect(eventHandler).toBeCalledTimes(1));
        await waitFor(() => expect(eventHandler).toBeCalledWith(event));
    });

    it('should unsubscribe event handlers upon unmount', async () => {
        const eventHandler = jest.fn();
        const event: Event = { type: 'my Event' };
        const eventBus = createEventBus();
        const subscriptionMap = new Map([
            [event.type, eventHandler]
        ]);

        const { waitFor, unmount } = renderHook(() => useSubscribe(eventBus, subscriptionMap));
        unmount();
        act(() => {
            eventBus.emit(event);
        });

        await waitFor(() => expect(eventHandler).toBeCalledTimes(0));
    });
});
