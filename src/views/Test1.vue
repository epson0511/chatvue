<template>
  <h1>Test1</h1>
  <div id="appTest1">
    <!-- 這是外層元件的 msg -->
    <h3>{{ msg }}</h3>

    <!-- 這裡的 v-bind:parent-msg 可以簡寫為 :parent-msg -->
    <my-component v-bind:parent-msg="msg" v-bind:aa="aaa"></my-component>
  </div>
</template>

<script>
import  MyComponent from '@/components/MyComponent.vue';

export default {
  data() {
    return (
      {
        msg: "這是外層元件的 msg",
        aaa:"自訂的aaa字串以aa傳入",
      }
    );
  },
  props: ['parentMsg'],
  components: {
    MyComponent
  }
};




</script>