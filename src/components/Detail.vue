<template>
  <div>
    <div>
      <div class="panel panel-primary text-center">
        <div class="panel-heading">
          书名:<span v-show="!flag">{{book.bookName}}</span>
        </div>
        <input type="text" v-show="flag" v-model="book.bookName" >
        <div class="panel-body text-center">
          <img :src="book.bookCover" v-show="!flag" alt="">
        </div>
        <input type="text" v-show="flag" v-model="book.bookCover">
        <div class="panel-footer">
          价格:<span v-show="!flag">{{book.bookPrice | currency('$')}}</span>
          <input type="text" v-show="flag" v-model="book.bookPrice">
          <button class="btn btn-primary" v-show="!flag" @click="remove">删除</button>
          <button class="btn btn-warning" v-show="!flag" @click="change" >修改</button>
          <button class="btn btn-danger" v-show="flag" @click="update"> 确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    filters: {
      currency(input, param1){
        return param1 + input;

      }
    },
    beforeMount(){
      this.id = this.$route.params.id;
      console.log(this.id)
      this.$http.get('/rook?id='+ this.id).then(res => {
          console.log(res.body)
        this.book = res.body;

      })
    },
    data(){
      return {
        book: {
          bookName: '',
          bookCover: '',
          bookPrice: ''
        },
        flag: false,
        id: ''
      };

    },
    components: {},
    methods: {
        remove(){
            this.$http.delete('/rook?id='+this.id).then(()=>{

                this.$router.push('/list')
            })
        },
        change(){
            this.flag=!this.flag;
        },
      update(){
            this.$http.put('/rook?id='+this.id,this.book).then(()=>{
                this.flag=false;
                this.$router.push('/list');
            })
      }
    }
  }

</script>

<style scoped>

</style>
