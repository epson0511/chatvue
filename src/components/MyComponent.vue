<template>
     <div class="component">
      <div> 從 props 來的 parentMsg ==> {{ parentMsg }} </div>
      <div> 自己的 msg ==> {{ msg }} </div>
      <div>A{{ aa }}</div>
    </div>
</template>
<script>
export default {
  data: () => {
    return {
      msg: '這是子元件的 msg'
    }
  },
  name: 'my-component',
  props: {
    parentMsg: String,
    aa: String,
  }
}
</script>