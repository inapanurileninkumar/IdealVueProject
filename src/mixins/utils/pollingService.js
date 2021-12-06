import axios from 'axios'

export const pollingService = {
    'name': 'pollingService',
    'data': function () {
        return {
            'activePollers': {},
        };
    },
    'methods': {
        /**
         * @param payload
         */
        createPoll: function (payload) {
            let newPoller = this.getBasePoller(payload);
            if (newPoller) {
                this.setPoller(newPoller['uuid'], newPoller);
                return newPoller['uuid'];
            }
            return undefined;
        },
        /**
         * @param uuid
         * @param poller
         */
        setPoller: function (uuid, poller) {
            this.$set(this.activePollers, uuid, poller);
        },
        /**
         * @param uuid
         */
        removePoller: function (uuid) {
            clearInterval(this.activePollers[uuid]['poller']);
            delete this.activePollers[uuid];
        },
        /**
         * @param payload
         * @returns {undefined|{isPolling: boolean, poller: number, uuid: string}}
         */
        getBasePoller: function (payload) {
            if (this.getAuthToken()) {
                let interval = payload['interval'] || 5;
                let pollerUUID = this.getUUID();
                return {
                    'uuid': pollerUUID,
                    'isPolling': false,
                    'poller': setInterval(() => {
                        this.axiosPollingCall(payload, pollerUUID);
                    }, interval * 1000)
                };
            }
            return undefined;
        },

        /**
         * @param url
         * @param method
         * @param queryParams
         * @param successHandler
         * @param errorHandler
         * @param data
         * @param interval
         * @param pollerUUID
         */
        axiosPollingCall: function (
            {
                url,
                method = 'GET',
                queryParams = undefined,
                successHandler = null,
                errorHandler = null,
                data = null,
                interval = 5
            },
            pollerUUID) {
            if (!(this.activePollers[pollerUUID]['isPolling'])) {

                let queryString = this.getQueryParams(queryParams);
                if (queryString.length > 0) {
                    url += queryString;
                }
                let axiosPayload = {
                    baseURL: this.getBaseURL(),
                    url: url,
                    method: method,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8;',
                        'Authorization': `Token ${this.getAuthToken()}`,
                    },
                };
                this.activePollers[pollerUUID]['isPolling'] = true;
                axios(axiosPayload).then(response => {
                    successHandler(response['data'], pollerUUID);
                }).catch(error => {
                    if (this.isUnauthenticatedRequest(error)) {
                        this.removeAllPollers();
                        if (this.$route['name'] !== 'Logout') {
                            this.routeTo('Logout');
                        }
                    } else {
                        if (errorHandler) {
                            errorHandler(error, pollerUUID);
                        }
                    }
                }).finally(() => {
                    if (this.activePollers[pollerUUID]) {
                        this.activePollers[pollerUUID]['isPolling'] = false;
                    }
                });
            }
        },
        removeAllPollers: function () {
            Object.keys(this.activePollers).forEach(pollerUUID => this.removePoller(pollerUUID));
        },

    },
};
