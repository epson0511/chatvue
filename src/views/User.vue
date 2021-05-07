<template>
  <div class="user">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <h3>使用者頁面</h3>
    <div class="user-body">
      <Card class="cardarea">
        <template #header>
          <img
            class="userimg"
            src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
            style="height: 15rem"
          />
          <div>
            <Button icon="pi pi-image" label="變更圖片" />
          </div>
        </template>
        <template #title> 你的名字你的名字你的名字 </template>
        <template #subtitle> 身份：master、mod、etc... </template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </template>
        <template #footer>
          <!-- <Button icon="pi pi-check" label="Save" />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-left: 0.5em"
          /> -->
        </template>
      </Card>
    </div>
  </div>
</template>
<script>
import QuickLink from "@/components/QuickLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";

export default {
  components: {
    QuickLink,
    Card,
    Button,
  },
};
</script>
<style>
.user-body {
  z-index: 1;
  max-height: calc(94vh - 190px);
  overflow: overlay;
  text-align: -webkit-center;
}
.cardarea {
  margin-top: 3%;
  width: 70%;
}
@media screen and (min-width: 900px) {
  .cardarea {
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .cardarea .userimg {
    margin: 25% 3% 10% 3% !important;
  }
}
.cardarea .userimg {
  width: 200px !important;
  height: 200px !important;
  margin: 5% 3% 3% 3%;
  object-fit: cover;
}
</style>