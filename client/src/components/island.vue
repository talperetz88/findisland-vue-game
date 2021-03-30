<template>
    <div>
        <div class="island-welcome">
            <div v-if="startMap == false" class="island-welcome-container">
                <span>Please enter bitmap size</span>
                <input v-model="bitmapinput" :class="{'error':isnumber}" placeholder="Bitmap size: n,m">
                <div class="btn-wrap">
                    <button class="solve-btn" @click="start()">RANDOMIZE</button>
                    <button class="solve-btn" @click="drow()">BONUS: DRAW</button>
                </div>
            </div>
        </div>
        <!-- <div class="island-map-container" v-if="bitmapinput !== '' && startMap == true">
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
            
        </div> -->
        <canvas id="matrix-canvas" v-if="bitmapinput !== '' && startMap == true" v-on:mouseup="markBit"></canvas>
        <div class="solve-map" v-if="bitmapinput !== '' && startMap == true">
                <h1 v-if="amountOfIslands > 0 && showRes == true">FOUND {{amountOfIslands}} ISLAND!</h1>
                <button class="solve-btn" @click="restart()" v-if="amountOfIslands > 0 && showRes == true">RESTART</button>
                <button class="solve-btn" @click="solveMap()" v-if="showRes == false">SOLVE</button>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Island',
    data(){
        return{
            rows:0,
            colums:0,
            bitmapinput:'',
            startMap:false,
            amountOfIslands:0,
            islandMatrix:[],
            visitedIndex:[],
            visitedIndexCount:[],
            colorUsed:[],
            islands:[],
            rowNbr:[-1, -1, -1, 0, 0, 1, 1, 1],// These arrays are used to get row and column numbers of 8 neighbors of a given cell
            colNbr:[-1, 0, 1, -1, 1, -1, 0, 1],
            fillMap:true,
            allowDrow:false,
            isnumber:false,
            showRes:false,
            matrixCanvas:null,
            rectWidth: 0
        }
    },
    mounted(){
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
        // this.initializeIsland();
    },methods:{
        markBit(event) {
            /* On click we are drowing the bit we wont on the bitmap */
            var x = Math.floor(event.layerX/10);
            var y = Math.floor(event.layerY/10);
            this.islandMatrix[x][y].isIland = (this.islandMatrix[x][y].isIland ? false : true)
            this.islandMatrix[x][y].color = (this.islandMatrix[x][y].isIland ? '#000000' : '#ffffff')
            this.renderCanvas()
        },start:function(){
            var splitindex = this.bitmapinput.split(',')
            this.rows = splitindex[0]
            this.colums = splitindex[1]
            if(this.rows == undefined || this.colums == undefined)
                return
            if(isNaN(this.rows) || isNaN(this.colums)){
                this.isnumber = true
                return;
            }
            else
                this.isnumber = false

            this.startMap = true
            setTimeout(()=>{this.initializeIsland()},10);
        },drow:function(){
            var splitindex = this.bitmapinput.split(',')
            this.rows = splitindex[0]
            this.colums = splitindex[1]
            this.startMap = true
            this.fillMap = false
            this.allowDrow =true;
            setTimeout(()=>{this.initializeIsland()},10);
        },
        initializeIsland:function() {
            console.log(new Date());
            var matrix = [];
            var cellSide = 10
            var c = document.getElementById("matrix-canvas");
            var ctx = c.getContext("2d");    
            this.matrixCanvas = ctx;
            c.width  = this.rows*cellSide;
            c.height = this.colums*cellSide;
            for (let i = 0; i < this.rows; ++i) {
                let row = []
                let row2 = [];
                for (var k = 0; k < this.colums; ++k) {
                    let x = i * cellSide;
                    let y = k * cellSide;
                    /* turn on the bit if we are not in drowing */
                    let island = (Math.random()>=0.5 && this.fillMap)
                    
                    /* set the bits in canvas */
                    var cellColor = '#ffffff';
                    if (island) cellColor = '#000000';
                    this.matrixCanvas.beginPath();
                    this.matrixCanvas.fillStyle =  cellColor
                    this.matrixCanvas.fillRect(x, y, cellSide, cellSide);
                    
                    row.push({isIland:island,index:`${i},${k}`,color:'#fffff'})
                    row2.push(false)
                }
                this.visitedIndexCount.push(row2) /* Make a bool array to mark visited cells */
                matrix.push(row)
            }

            this.drowGrid()
            this.islandMatrix = matrix
        },
        restart:function(){
            this.rows = 0;
            this.colums = 0;
            this.bitmapinput = '';
            this.startMap = false;
            this.amountOfIslands = 0;
            this.islandMatrix = [];
            this.visitedIndex = [];
            this.visitedIndexCount = [];
            this.colorUsed = [];
            this.islands = [];
            this.rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
            this.colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];
            this.fillMap = true;
            this.allowDrow = false;
            this.isnumber = false;
            this.showRes = false;
            this.rectWidth =  20;
        },drowGrid:function(){
            /* this function is drowing the grid */
            var cellSide = 10
            for (let i = 0; i < this.rows*cellSide; i++) {
                if(i % 10 === 0){
                    this.matrixCanvas.beginPath();
                    this.matrixCanvas.moveTo(i, 0);
                    this.matrixCanvas.lineTo(i, this.colums*cellSide);
                    this.matrixCanvas.closePath();
                    this.matrixCanvas.strokeStyle = "rgba(0,0,0,.2)";
                    this.matrixCanvas.stroke();
                }
            }

            for (let i = 0; i < this.rows*cellSide; i++) {
                if(i % 10 === 0){
                    this.matrixCanvas.beginPath();
                    this.matrixCanvas.moveTo(0, i);
                    this.matrixCanvas.lineTo(this.rows*cellSide, i);
                    this.matrixCanvas.closePath();
                    this.matrixCanvas.stroke();
                }
            }
        },renderCanvas:function(){
            let cellSide = 10
            for (var i = 0; i < this.rows; ++i) {
                for (var k = 0; k < this.colums; ++k) {
                    let x = i * cellSide;
                    let y = k * cellSide;
                    
                    var cellColor = '#ffffff';
                    if(this.islandMatrix[i][k].isIland) cellColor = this.islandMatrix[i][k].color
                    this.matrixCanvas.beginPath();
                    this.matrixCanvas.fillStyle =  cellColor
                    this.matrixCanvas.fillRect(x, y, cellSide, cellSide);
                }
            }
            this.drowGrid()
        },colorIsland:function(islands){

            for (let i = 0; i < islands.length; ++i) {
                var color = this.getRandomColor();
                /* Diffrent color for each island */
                while (!this.colorUsed.includes(color)) {
                    color = this.getRandomColor();
                    this.colorUsed.push(color)
                }
                /* Changing the color of the island in the original array */
                for (var r = 0; r < islands[i].length; ++r) {
                    var splitIndexes = islands[i][r].split(',')
                    var a = splitIndexes[0];
                    var b = splitIndexes[1];
                    this.islandMatrix[a][b].color = color;
                }
                
            }
            this.showRes = true;
            var cellSide = 10
            /* redrowing the canvas with the correct color for each island */
            for (let i = 0; i < this.rows; ++i) {
                for (var k = 0; k < this.colums; ++k) {
                    let x = i * cellSide;
                    let y = k * cellSide;
                    var cellColor = '#ffffff';
                    if(this.islandMatrix[i][k].isIland) cellColor = this.islandMatrix[i][k].color /* Color the island with his color*/
                    this.matrixCanvas.beginPath();
                    this.matrixCanvas.fillStyle =  cellColor
                    this.matrixCanvas.fillRect(x, y, cellSide, cellSide);
                }
            }
            this.drowGrid()
        },getRandomColor:function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color; 
        },
        solveMap:function(){
            console.log("beforeSolve",new Date());
            console.log(this.countIslands().then(res => {console.log("number of",res),this.colorIsland(this.islands);console.log("afterSolve",new Date());}));


        },countIslands: async function(){
            let count = 0;
            let island = [];
            for (let i = 0; i < this.rows; ++i){
                for (let j = 0; j < this.colums; ++j){
                    if (this.islandMatrix[i][j].isIland == true && !this.visitedIndexCount[i][j]){
                        island.push(`${i},${j}`)
                        await this.DFS(i, j,island)
                        .then(() => {
                            /* when we finish in DFS we have all the point of island */
                            this.islands.push(island) /* Pushing to islands array and starting new island */
                            island = [];
                        });
                        count++;
                    }
                }
            }
            console.log(count);
            this.amountOfIslands = count;
            return count;
        },DFS:async function(row, col,island){
            // Mark this cell as visited
            this.visitedIndexCount[row][col] = true;
             
            for (let k = 0; k < 8; ++k){/* Using the arrays rowNbr colNbr to visit the neighbors */
                if (this.isSafe( row + this.rowNbr[k], col + this.colNbr[k])){
                    await this.DFS( row +this.rowNbr[k], col + this.colNbr[k],island);
                    island.push(`${row +this.rowNbr[k]},${col + this.colNbr[k]}`)
                }
            }
        },isSafe:function(row,col){
            return (row >= 0) && (row < this.rows) && (col >= 0) && (col < this.colums) && (this.islandMatrix[row][col].isIland == true && !this.visitedIndexCount[row][col]);
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
    .error{
        background-color: lightcoral;
    }
    #matrix-canvas {
        border: 1px solid gray;
    }
</style>
