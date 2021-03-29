<template>
    <div>
        &nbsp;
    </div>
</template>

<script>
    export default {
        name:'col',
        data(){
            return{}

        },
        props:{
            col:[]
        },methods:{
            markBit:function(bit){
                console.log("Meow");
                if(!this.allowDrow)
                    return;
                var splitindex = bit.split(',')
                var i = splitindex[0]
                var j = splitindex[1]
                this.islandMatrix[i][j].isIland = (this.islandMatrix[i][j].isIland ? false : true)
            }
        }
    }
</script>

<style>

</style>