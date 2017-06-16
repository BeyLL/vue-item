<template>
  <div>
    <div class="col-md-3" v-for="book in books">
    <div class="panel panel-primary">
      <div class="panel-heading">
    书名:{{book.bookName}}
      </div>
      <div class="panel-body text-center">
        <img :src="book.bookCover" alt="">
      </div>
      <div class="panel-footer">
    价格:{{book.bookPrice|currency('$')}}
        <router-link :to="{name:'detail',params:{id:book.id}}">详细信息</router-link>
        <!--我需要知道的是这本书的id-->
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  export default{
    filters:{
      currency(input,param1){
        return param1+input;
      }

    },
    beforeMount(){

      this.$http.get('/rook').then((res)=>{
//
           this.books=res.body;


       })
    },
    data(){
      return {
          books:[]


      }
    },
    components: {},
    methods: {}
  }

</script>

<style scoped>
img{
  width:100%;
  height:100%;
}
</style>
