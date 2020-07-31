<template>
  <div >
    <div class="topFixed">
      <div class="navBar">
        {{title}}
      </div>
      <div>
        <van-field v-model="search" label="查找" placeholder="请输入姓名或电话"  />
      </div>
    </div>

    <div class="listContain" >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in showList" :key="item.tel" :title="item.tel" class="item" @click="Tocall(item)">
          <div class="itemLeft">
            {{item.name}}
          </div>
          <div class="itemRight">
            {{item.tel}}
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {
    Dialog
  } from 'vant'
  import axios from 'axios'
  export default {
    name: 'page1',
    data() {
      return {
        title: '中学部通讯录',
        search: '',
        loading: true,
        finished: false,
        allList: [],
        selectList:[],
        showList:[]
      }
    },

    watch:{
      search(new1,old1){
        // console.log(new1)
        let count=0;
        let that=this
        this.selectList=[]
        for(let i in that.allList){
          if(that.allList[i].name.includes(new1)||that.allList[i].tel.includes(new1)){
            that.selectList.push(that.allList[i])
            count++;
          }
        }
        if(count>0){
          this.showList=this.selectList
        }
      }
    },
    methods: {
      onLoad() {
        let that = this
        if (this.finished == false) {
          console.log(12)
          // this.allList = [1, 2, 3]
          axios.get('./static/tel.json.txt')
            .then(function(res) {
              console.log(res)
              that.allList = res.data.domain_list
              that.showList=res.data.domain_list
            })
          this.finished = true,
            this.loading = false
        }
        if (this.finished == true) {
          console.log('加载完成')
        }
      },
      Tocall(item) {
        Dialog.confirm({
            title: '拨打电话',
            message: '拨打给' + item.name + '-' + item.tel,
          })
          .then(() => {
            // on confirm
            window.location.href = 'tel:' + item.tel
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    mounted() {
      // console.log(this)
      this.onLoad()
    }
  }
</script>

<style>
  .topFixed {
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: #fff;
    z-index: 9;
  }

  .navBar {
    background-color: #fff;
    line-height: 3rem;
    color: 333;
    font-size: 1.2rem;
  }

  .van-cell {
    line-height: 3rem;
    box-sizing: border-box;
    padding: 0rem 1rem;
  }

  .listContain{overflow: auto; background-color: #f7f8fa;position: absolute;top: 6rem;left: 0;width: 100vw;height: calc(100vh - 6rem);}
  .van-list {

    /* margin-top: 6rem; */
    border-top: 1px solid #ddd;
  }

  .van-list .item {
    border-bottom: 1px solid #ddd;
    font-size: 1.05rem;
    padding: 0.7rem 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .van-list .item:hover {
    background-color: #eee
  }

  .itemLeft {
    flex: 1;
    text-align: left;
    padding-left: 0.5rem;
  }

  .itemRight {
    flex: 3;
    text-align: left;
  }
</style>
