import { useEffect } from "react";
import { EventBus, EventType, EventHandler, Event, Unsubscriber } from "@zenstack/zen-bus";

const subscribeHandlers = <T extends Event>(
    eventBus: EventBus,
    subscribeMap: Map<EventType<T>, EventHandler<T>>
): Unsubscriber[] => {
    const unsubscribers: Unsubscriber[] = [];

    subscribeMap.forEach((handler, eventType) => {
        const unsubscribe = eventBus.subscribe(eventType, handler);
        unsubscribers.push(unsubscribe);
    });

    return unsubscribers;
}

const unsubscribeHandlers = (unsubscribers: Unsubscriber[]) => {
    unsubscribers.forEach(unsubscribe => unsubscribe());
}

const useSubscribe = <T extends Event>(eventBus: EventBus, subscribeMap: Map<EventType<T>, EventHandler<T>>) => {
    useEffect(() => {
        const unsubscribers = subscribeHandlers(eventBus, subscribeMap);
        return () => unsubscribeHandlers(unsubscribers);
    }, [eventBus, subscribeMap]);
};

export default useSubscribe;
