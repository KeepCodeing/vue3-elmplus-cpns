import mitt from "mitt";

export default {
  install(app) {
    app.provide("eventBus", new mitt());
  },
};
