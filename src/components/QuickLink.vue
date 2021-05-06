<template>
  <Button
    label="直播間"
    icon="pi pi-video"
    class="p-button-text p-button-warning"
    @click="to_main"
  />
  <Button
    label="聊天室"
    icon="pi pi-comments"
    class="p-button-text p-button-warning"
    @click="to_chatroom"
  />
  <Button
    label="開發中"
    icon="pi pi-times-circle"
    class="p-button-text p-button-danger"
  />
  <Button
    label="開發中"
    icon="pi pi-times-circle"
    class="p-button-text p-button-danger"
  />
  <Button
    label="開發中"
    icon="pi pi-times-circle"
    class="p-button-text p-button-danger"
  />
</template>
<script>
import Button from "primevue/button";

export default {
  name: "mainpage",
  data() {
    return {};
  },

  components: {
    Button,
  },
  methods: {
    to_main() {
      this.$router.push({ path: "/main" });
    },
    to_chatroom() {
      this.$router.push({ path: "/chatroom" });
    },
  },
};
</script>
<style></style>;
