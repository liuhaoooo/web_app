<template>
    <div class="friendlist mdui-ripple mdui-ripple-blue" @click="$emit('click')" >
        <div class="list">
            <img :src="avatar" alt="">
            <div class="text"><span>{{username}}</span></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'friendlist',
    props:{
        avatar:String,
        username:String
    }
}
</script>
<style scoped>
    .list {
        width: 100%;
        height: 50px;
        background: rgb(251, 252, 249);
        border-bottom:rgb(230, 226, 226) solid 0.1px;
    }
    .text{
        width: 200px;
        position: relative;
        left: 60px;
        top: -28px;
    }
    .text span{
        font-size:20px;
        color: rgb(43, 40, 40);
    }
    .list img{
        position: relative;
        right: -6px;
        top:4px;
        width: 40px;
        height: 40px;
        border-radius: 50%
    }
</style>