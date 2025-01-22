export default {
  mounted(el, bindind) {
    // console.log(el, bindind);
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    }
    const callback = (entries) => {
      if (entries[ 0 ].isIntersecting) {
        bindind.value()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
}
