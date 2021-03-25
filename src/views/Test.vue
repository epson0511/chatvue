<template>
    <div id = 'aaa'>
<p>{{ jpy }} 日幣 = {{ twd }}台幣</p>
<div>台幣 <input type="text" v-model="twd"></div>
<div>日幣 <input type="text" v-model="jpy"></div>
    </div>
    <div v-bind:id="itemId">v-bind測試區</div>
    <button :disabled="isdisable">v-bind disabled測試區</button >
    <div> 
        <input v-model="message"  placeholder="edit..." :style="msgStyle">
        <p v-bind:class="{ 'error':message.length > 10, active: isActive }">  message is : {{ message }} </p>
    </div>
    <div>
        <input type="radio" id="one" value="value是1" v-model="picked">
        <label for="one">One</label>
    </div>
    <div>
        <input type="radio" id="two" value="value是2" v-model="picked">
        <label for="two">Two</label>
    </div>
    <span>Picked : {{ picked }}</span>
       <br>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <input type="checkbox" id="mary" value="Mary" v-model="checkedNames">
    <label for="mary">Mary</label>
    <br>

    <p>Checked Name : {{ checkedNames }} </p>
    <br>
    <input type="checkbox" id="checkbox" v-model="isChecked">
    <label for="checkbox">Status: {{ isChecked }}</label>
    <br>

    <select v-model="selected">
        <option disabled value="">請選擇</option>
        <option>台北市</option>
        <option>基隆市</option>
        <option>新北市</option>
    </select> 
    <p>Selected: {{ selected || '未選擇'}} </p>   
    <p>Count : {{ count }}</p>
    <button v-on:click="plus">Plus</button>
    <br>
    <button @click="hello">Hello</button>
    <br>
    <h4>toggleModal with .self</h4>

    <div class="modal-mask" :style="modalStyle">
        <div class="modal-container"  @click.self="toggleModal">
        <div class="modal-body">Hello!</div>
        </div>
    </div>

  <button @click="isShow = true">Click Me</button>
   <p>你按下的是按鍵是: {{ pressKey }}</p>
  
  <div class="messages">
    <div v-for="m in messages" v-bind:key='m'>{{ m }}</div>
  </div>

  <input type="text" 
    placeholder="輸入任意文字後按下 enter 鍵"
    v-model.trim="msg" 
    @keydown.enter="addToMessages">
</template>
<script>
export default {
    data(){
        return{
            twd: 0.278,
            itemId: 'item-test-1',
            isdisable: true,
            message: 'v-model雙向綁定',
            picked: '尚未選擇',
            checkedNames: [],
            isChecked: true,
            selected: '',
            isActive: true,
            count: 0,
            isShow: false,
            pressKey: '',
            msg: '',
            messages: [],
        }
    },
    methods:{
        plus () {
            this.count += 2 ;
        },
        hello () {
            alert('Hello');
        },
        toggleModal () {
            this.isShow = !this.isShow;
        },
        press(e) {
            this.pressKey = e.key;
            window.setTimeout( () => { e.target.value = ''; }, 300)
        },
        addToMessages () {
            this.messages.push(this.msg);
            this.msg = '';
        }  
    },
    computed:{
        jpy : {
            get () {
              return Number.parseFloat(Number(this.twd) / 0.278).toFixed(3);
            },
            set (val) {
              return Number.parseFloat(Number(val) * 0.278).toFixed(3);
            }
        },
        isVaild: function() {
        return this.message.length <= 5;
        },
        msgStyle: function() {
        return {
            'border': this.isVaild ? '' : 'blue solid 1px',
            'color': this.isVaild ? '' : 'blue'
            };
        },
        modalStyle () {
            return {
                'display': this.isShow ? '' : 'none'
            };
        } 

    }
}
</script>
<style>
.error {
  border: red solid 1px;
  color: red;
}

h4 {
  margin: 1rem 0;
  font-size: 1rem;
}

.modal-mask {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-container {
  cursor: pointer;
  display: table-cell;
  vertical-align: middle;
}

.modal-body {
  cursor: auto;
  display: block;
  width: 50%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
}

.messages {
  padding: 6px 10px;
  width: 95%;
  height: 100px;
  margin-bottom: 1em;
  overflow-y: scroll;
  border: 1px solid #ccc;
}
</style>