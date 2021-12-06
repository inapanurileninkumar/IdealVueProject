<template>
  <p>Hello world</p>
</template>
<script>
export default {
  name: "IdealComponent",
  components: {},
  data: function () {
    return {};
  },
  computed: {},
  watch: {},
  beforeMount: function () {},
  beforeDestroy: function () {},
  methods: {
    setupComponent: function () {},
    handleChildEvent: function (action, payload) {
      let actionMap = {};
      if (actionMap[action]) {
        actionMap[action](payload);
      }
    },
  },
};
</script>