import { EventBus } from './EventBus';
import { promiseMixin } from './promiseMixin';
export const eventMixin = {
    mixins: [promiseMixin],
    methods: {
        emitGlobalEvent: function (action, payload) {
            EventBus.$emit(action, payload);
        },
        emitEvent: function (action, payload) {
            this.$emit('event-emitted', action, payload);
        },
        emitGlobalSignal: function (action, payload = null, timeout = null) {
            let resolvablePromise = this.getResolvablePromise();
            EventBus.$emit(action, resolvablePromise, payload);
            if (timeout) {
                Promise.race([resolvablePromise['promise'], new Promise((_r, rej) => setTimeout(rej, timeout))]);
            }
            return resolvablePromise['promise'];
        },
        addGlobalEventListener: function (action, handler) {
            EventBus.$on(action, handler);
        },
        addGlobalEventListeners: function (listeners) {
            for (let [action, handler] of Object.entries(listeners)) {
                this.addGlobalEventListener(action, handler);
            }
        },
        removeGlobalEventListener: function (action, handler = null) {
            if (action) {
                if (handler) {
                    EventBus.$off(action, handler);
                } else {
                    EventBus.$off(action);
                }
            } else {
                EventBus.$off();
            }
        },
        removeGlobalEventListeners: function (listeners) {
            for (let [action, handler] of Object.entries(listeners)) {
                this.removeGlobalEventListener(action, handler);
            }
        }
    }
};
