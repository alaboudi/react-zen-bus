import { useEffect } from "react";
import { EventBus, EventType, EventHandler, Unsubscriber } from "@zenstack/zen-bus";

type Subscriptions = [EventType<any>, EventHandler<any>][];

const subscribeHandlers = (
    eventBus: EventBus,
    subscriptionTuples: Subscriptions
): Unsubscriber[] => {
    return subscriptionTuples.map(
        ([eventType, handler]) => eventBus.subscribe(eventType, handler)
    );
}

const unsubscribeHandlers = (unsubscribers: Unsubscriber[]) => {
    unsubscribers.forEach(unsubscribe => unsubscribe());
}

const useSubscribe = (eventBus: EventBus, subscriptionTuples: Subscriptions) => {
    useEffect(() => {
        const unsubscribers = subscribeHandlers(eventBus, subscriptionTuples);
        return () => unsubscribeHandlers(unsubscribers);
    }, [eventBus, subscriptionTuples]);
};

export default useSubscribe;
