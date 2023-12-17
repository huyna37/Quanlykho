import { mapState } from "vuex";
export default {
  data() {
    return {
      isMobileDeviceXL: false,
      isMobileDeviceXS: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  created() {
    this.onResize();
  },
  computed: mapState({}),
  methods: {
    onResize() {
      let windowsize = window.innerWidth;
      if (windowsize < 1200 && windowsize > 650) {
        this.isMobileDeviceXL = true;
        this.isMobileDeviceXS = false;
      } else if(windowsize <= 650) {
        this.isMobileDeviceXS = true;
        this.isMobileDeviceXL = false;
      }
    },
  },
};
