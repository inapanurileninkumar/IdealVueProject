export const promiseMixin = {
    methods: {
        getResolvablePromise: function () {
            let resolvablePromise = {};
            let promise = new Promise((resolve, reject) => {
                resolvablePromise = {
                    'resolve': resolve,
                    'reject': reject
                };
            });
            resolvablePromise['promise'] = promise;
            return resolvablePromise;
        },
    }
}