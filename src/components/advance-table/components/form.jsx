import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  setup(props, { slots }) {
    return () => (
      <>
        <h2>hello world</h2>
      </>
    );
  },
});
