<template>
    <div class="list mdui-ripple mdui-ripple-blue" @click="$emit('click')">
        <div class="lists">
            <i :class="leftticon" class="left"></i>
            <div class="text"><span>{{name}}</span></div>
            <i :class="righticon" class="right"></i>
        </div>
    </div>
</template>
<script>
export default {
    name:'list',
    props:{
        name:String,
        leftticon:String,
        righticon:String
    }
}
</script>
<style scoped>
    .lists {
        width: 100%;
        height: 60px;
        background: rgb(251, 252, 249);
    }

    .text{
        width: 300px;
        position: relative;
        left: 50px;
    }
    .text span{
        font-size:18px;
        color: rgb(87, 83, 83);
    }
    .right{
        position: relative;
        right: -92%;
        top:-17px
    }
    .left{
        position: relative;
        right: -14px;
        top:19px
    }

</style>