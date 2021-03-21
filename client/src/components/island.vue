<template>
    <div>
        <div class="island-welcome">
            <div v-if="startMap == false" class="island-welcome-container">
                <span>Please enter bitmap size</span>
                <input v-model="bitmapinput" placeholder="Bitmap size: n,m">
                <div class="btn-wrap">
                    <button class="solve-btn" @click="start()">RANDOMIZE</button>
                    <button class="solve-btn" @click="drow()">BONUS: DRAW</button>
                </div>
            </div>
        </div>
        <div class="island-map-container" v-if="bitmapinput !== '' && startMap == true">
            <div class="island-map-box-row"
            v-for="(rows,rowindex) in islandMatrix"
            v-bind:key="`${rowindex}`"
            >
                <div class="island-map-box-col"
                v-for="(col,colindex) in rows"
                v-bind:key="`${colindex}`"
                :class="{'active': col.isIland == true}"
                :style="{ 'background-color': col.color}"
                @click="markBit(col.index)">
                
                &nbsp;
                </div>
            </div>
        </div>
        <div class="solve-map" v-if="bitmapinput !== '' && startMap == true">
                <h1 v-if="amountOfIslands > 0">FOUND {{amountOfIslands}} ISLAND!</h1>
                <button class="solve-btn" @click="restart()" v-if="amountOfIslands > 0">RESTART</button>
                <button class="solve-btn" @click="solveMap()" v-if="amountOfIslands == 0">SOLVE</button>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Island',
    data(){
        return{
            rows:50,
            colums:50,
            bitmapinput:'',
            startMap:false,
            amountOfIslands:0,
            islandMatrix:[],
            visitedIndex:[],
            colorUsed:[],
            fillMap:true
        }
    },
    created() {
        // this.islandMatrix = [
        //         [{ isIland: 1,index:'0,0',color:'#fffff' }, { isIland: 1,index:'0,1',color:'#fffff' }, { isIland: 0,index:'0,2',color:'#fffff' }, { isIland: 0,index:'0,3',color:'#fffff' }, { isIland: 0,index:'0,4',color:'#fffff' }, { isIland: 0,index:'0,5',color:'#fffff' }, { isIland: 0,index:'0,6',color:'#fffff' }, { isIland: 1,index:'0,7',color:'#fffff' }, { isIland: 0,index:'0,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'1,0',color:'#fffff' }, { isIland: 0,index:'1,1',color:'#fffff' }, { isIland: 1,index:'1,2',color:'#fffff' }, { isIland: 1,index:'1,3',color:'#fffff' }, { isIland: 0,index:'1,4',color:'#fffff' }, { isIland: 1,index:'1,5',color:'#fffff' }, { isIland: 1,index:'1,6',color:'#fffff' }, { isIland: 0,index:'1,7',color:'#fffff' }, { isIland: 0,index:'1,8',color:'#fffff' }],
        //         [{ isIland: 1,index:'2,0',color:'#fffff' }, { isIland: 0,index:'2,1',color:'#fffff' }, { isIland: 0,index:'2,2',color:'#fffff' }, { isIland: 1,index:'2,3',color:'#fffff' }, { isIland: 0,index:'2,4',color:'#fffff' }, { isIland: 0,index:'2,5',color:'#fffff' }, { isIland: 1,index:'2,6',color:'#fffff' }, { isIland: 0,index:'2,7',color:'#fffff' }, { isIland: 0,index:'2,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'3,0',color:'#fffff' }, { isIland: 1,index:'3,1',color:'#fffff' }, { isIland: 1,index:'3,2',color:'#fffff' }, { isIland: 0,index:'3,3',color:'#fffff' }, { isIland: 0,index:'3,4',color:'#fffff' }, { isIland: 1,index:'3,5',color:'#fffff' }, { isIland: 0,index:'3,6',color:'#fffff' }, { isIland: 0,index:'3,7',color:'#fffff' }, { isIland: 1,index:'3,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'4,0',color:'#fffff' }, { isIland: 0,index:'4,1',color:'#fffff' }, { isIland: 0,index:'4,2',color:'#fffff' }, { isIland: 1,index:'4,3',color:'#fffff' }, { isIland: 1,index:'4,4',color:'#fffff' }, { isIland: 1,index:'4,5',color:'#fffff' }, { isIland: 1,index:'4,6',color:'#fffff' }, { isIland: 0,index:'4,7',color:'#fffff' }, { isIland: 1,index:'4,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'5,0',color:'#fffff' }, { isIland: 1,index:'5,1',color:'#fffff' }, { isIland: 1,index:'5,2',color:'#fffff' }, { isIland: 0,index:'5,3',color:'#fffff' }, { isIland: 0,index:'5,4',color:'#fffff' }, { isIland: 0,index:'5,5',color:'#fffff' }, { isIland: 0,index:'5,6',color:'#fffff' }, { isIland: 1,index:'5,7',color:'#fffff' }, { isIland: 0,index:'5,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'6,0',color:'#fffff' }, { isIland: 0,index:'6,1',color:'#fffff' }, { isIland: 1,index:'6,2',color:'#fffff' }, { isIland: 1,index:'6,3',color:'#fffff' }, { isIland: 1,index:'6,4',color:'#fffff' }, { isIland: 0,index:'6,5',color:'#fffff' }, { isIland: 0,index:'6,6',color:'#fffff' }, { isIland: 0,index:'6,7',color:'#fffff' }, { isIland: 0,index:'6,8',color:'#fffff' }],
        //         [{ isIland: 0,index:'7,0',color:'#fffff' }, { isIland: 0,index:'7,1',color:'#fffff' }, { isIland: 0,index:'7,2',color:'#fffff' }, { isIland: 0,index:'7,3',color:'#fffff' }, { isIland: 1,index:'7,4',color:'#fffff' }, { isIland: 0,index:'7,5',color:'#fffff' }, { isIland: 0,index:'7,6',color:'#fffff' }, { isIland: 1,index:'7,7',color:'#fffff' }, { isIland: 1,index:'7,8',color:'#fffff' }],
        //         [{ isIland: 1,index:'8,0',color:'#fffff' }, { isIland: 0,index:'8,1',color:'#fffff' }, { isIland: 1,index:'8,2',color:'#fffff' }, { isIland: 0,index:'8,3',color:'#fffff' }, { isIland: 0,index:'8,4',color:'#fffff' }, { isIland: 0,index:'8,5',color:'#fffff' }, { isIland: 1,index:'8,6',color:'#fffff' }, { isIland: 0,index:'8,7',color:'#fffff' }, { isIland: 0,index:'8,8',color:'#fffff' }]
        //     ];
        this.initializeIsland();
    },methods:{
        start:function(){
            var splitindex = this.bitmapinput.split(',')
            this.rows = splitindex[0]
            this.colums = splitindex[1]
            this.startMap = true
            this.initializeIsland();
        },
        drow:function(){
            var splitindex = this.bitmapinput.split(',')
            this.rows = splitindex[0]
            this.colums = splitindex[1]
            this.startMap = true
            this.fillMap = false
            this.initializeIsland();
        },
        initializeIsland:function() {
            var matrix = [];
            for (var i = 0; i < this.rows; ++i) {
                let row = []
                for (var k = 0; k < this.colums; ++k) {
                        row.push({isIland:(Math.random()>=0.5 && this.fillMap)? true : false,index:`${i},${k}`,color:'#fffff'})
                }
                matrix.push(row)
            }
            this.islandMatrix = matrix
        },
        restart:function(){
            this.rows = 50
            this.colums = 50
            this.amountOfIslands = 0
            this.islandMatrix = []
            this.visitedIndex = []
            this.colorUsed = []
            this.bitmapinput = ''
            this.startMap = false
            this.fillMap = true
        },
        markBit:function(bit){
            var splitindex = bit.split(',')
            var i = splitindex[0]
            var j = splitindex[1]
            this.islandMatrix[i][j].isIland = (this.islandMatrix[i][j].isIland ? false : true)
        },
        resetMap:function(islands) {
            let v = [[0, 1],[1, 0],[0, -1],[-1, 0],[1,1],[-1,-1],[1,-1],[-1,1]]
            var arr = islands;
            var indexToSkip = [];
            for(var m = 0 ; m < islands.length; m++){
                for(var n = 0; n < islands[m].length; n++){
                   var temp = v.filter(([h, j]) => h + m >= 0 && h + m < arr.length && j + n >= 0 && j + n < arr.length) .map(([h, j]) => arr[h + m][j + n]).filter(v => v != undefined)
                    if(m+1 < islands.length){
                        var nextarr = islands[m+1];
                        for(var k = 0; k < nextarr.length; k++){
                            if(temp.includes(nextarr[k])){
                                indexToSkip.push(m+1)
                                islands[m] = islands[m].concat(nextarr);
                                if(m+2 < islands.length){
                                    m = m+2;
                                    break;
                                }
                                
                            }
                            
                        }
                    }
                }
            } 
            // console.log(indexToSkip);
            for (var i = 0; i < islands.length; ++i) {
                var color = this.getRandomColor();
                while (!this.colorUsed.includes(color)) {
                    color = this.getRandomColor();
                    this.colorUsed.push(color)
                }
                for (var r = 0; r < islands[i].length; ++r) {
                    var splitIndexes = islands[i][r].split(',')
                    var a = splitIndexes[0];
                    var b = splitIndexes[1];
                    this.islandMatrix[a][b].color = color;
                }
                
            }
        },
        getRandomColor:function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        solveMap:function(){
            this.numIslands().then(res => {console.log("number of",res)})

        },
        bfs: async function(i, j,island){
            const queue = [[i, j]];

            while (queue.length) {
                const [i, j] = queue.shift();
        
                // this.islandMatrix[i][j].isIland = false;
                
                if (this.isIsland(i + 1, j) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i + 1, j]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i+1][j].index))
                        island.push(this.islandMatrix[i+1][j].index)
                }
                if (this.isIsland(i, j + 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i, j + 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i][j+1].index))
                        island.push(this.islandMatrix[i][j+1].index)
                }
                if (this.isIsland(i - 1, j) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i - 1, j]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i-1][j].index))
                        island.push(this.islandMatrix[i-1][j].index)
                }
                if (this.isIsland(i, j - 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i, j - 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i][j-1].index))
                        island.push(this.islandMatrix[i][j-1].index)
                }
                
                if (this.isIsland(i + 1, j + 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i + 1, j + 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i+1][j+1].index))
                        island.push(this.islandMatrix[i+1][j+1].index)
                }
                if (this.isIsland(i - 1, j + 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i - 1, j + 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i-1][j+1].index))
                        island.push(this.islandMatrix[i-1][j+1].index)
                }
                if (this.isIsland(i - 1, j - 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i - 1, j - 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i-1][j-1].index))
                        island.push(this.islandMatrix[i-1][j-1].index)
                }
                if (this.isIsland(i + 1, j - 1) && !this.visitedIndex.includes(this.islandMatrix[i][j].index)){ 
                    queue.push([i + 1, j - 1]); 
                    if(!this.visitedIndex.includes(this.islandMatrix[i+1][j-1].index))
                        island.push(this.islandMatrix[i+1][j-1].index)
                }
                this.visitedIndex.push(`${i},${j}`)
                // console.log(island);
            }
        },
        isIsland:function(i, j){
            return i >= 0 && i < this.islandMatrix.length && j >= 0 && j < this.islandMatrix[i].length && this.islandMatrix[i][j].isIland == true
        },
        numIslands: async function(){
            let counter = 0;
            let islands = [];
            let island = [];
            for (let i = 0; i < this.islandMatrix.length; i += 1) {
                for (let j = 0; j < this.islandMatrix[i].length; j += 1) {
                    if (this.islandMatrix[i][j].isIland == true && !this.visitedIndex.includes(this.islandMatrix[i][j].index)) {
                        counter += 1;
                        island.push(this.islandMatrix[i][j].index)
                        await this.bfs(i, j,island).then(() => {
                            islands.push(island)
                            island = [];
                        });
                        
                    }
                    this.visitedIndex.push(`${i},${j}`)
                }
            }
            this.resetMap(islands);
            this.amountOfIslands = counter;
            return counter;
        }

    },
    computed:{
        
        getSizeMap(){
            return this.rows * this.colums;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .island-welcome{
        display: flex;
        align-items: center;
        /* width: 50%; */
    }
    .island-welcome-container{
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
    }
    button{
        padding: 10px 0;
        background-color:#6393FC;
        color:white;
        border-radius: 5px;
    }
    .island-welcome-container span{
        padding: 0 0 25px 0;
        font-size: 20px;
        font-weight: 500
    }
    .island-welcome-container .btn-wrap{
        margin: 25px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
    .island-welcome-container .btn-wrap button{
        width: 150px;
    }
    .island-welcome-container .btn-wrap button:first-child{
        margin-bottom:10px;
    }
    .island-map-container{
        display: flex;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
    }
    
    .island-map-box-col{
        /* padding: 10% 10%; */
        width: 10px;
        height: 10px;
        border: 1px solid rgb(170, 170, 170);
        background-color: rgb(255, 255, 255);
    }
    .active {
        background-color: black;
        }
</style>
