var MyBoardList = {
    props:['db'],
    template:`
    <div>
            <table class="table table-striped table-hover">
                <colgroup>
                    <col style="width: 10%;">
                    <col>
                    <col style="width: 10%">
                </colgroup>
                <thead>
                    <tr class="table-dark">
                        <th>글번호</th>
                        <th>글제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in db">
                        <td>{{item.no}}</td>
                        <td v-on:click="boardRead(item)" style="cursor:pointer">{{item.title}}</td>
                        <td>{{item.writer}}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button @click="boardWrite" type="button" class="btn btn-primary">글쓰기</button>            
            </div>
        </div>
    </div>            
    `,
    methods:{
        boardRead:function(info){
            this.$emit('board-read',info);
        },
        boardWrite:function(){
            this.$emit('board-write');
        }
    }
};

var MyBoardRead = {
    props:["db"],
    template:`
    <div>
        <table class="table">
            <colgroup>
                <col style="width: 10%;">
                <col>
                <col style="width: 10%">
            </colgroup>
            <thead>
                <tr class="table-dark">
                    <th>글번호 : {{db.no}}</th>
                    <th>글제목 : {{db.title}}</th>
                    <th>작성자 : {{db.writer}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="3">
                        <p v-html="db.content"></p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" class="btn btn-secondary" @click="boardModify(db.no)">수정</button>
            <button type="button" class="btn btn-danger" @click="boardDelete(db.no)">삭제</button>
            <button type="button" @click="boardList" class="btn btn-success">목록</button>
        </div>
    </div>            
    `,
    methods:{
        boardList:function(){
            this.$emit('board-list');
        },
        boardDelete:function(no){
            this.$emit('board-delete',no);
        },
        boardModify:function(no){
            this.$emit('board-modify',no);
        }
    }
};

var MyBoardWrite = {
    data:function(){
       return {
        no:0,
        title:'',
        writer:'',
        content:''
       } 
    },
    template: `
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th><input type="text" placeholder="글제목" style="width: 100%;" v-model="title"></th>
                    <th><input type="text" placeholder="글쓴이" style="width: 100%;" v-model="writer"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">
                        <textarea style="width:100%" placeholder="글내용" v-model="content"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button @click="boardSave" type="button" class="btn btn-primary">등록</button>
            <button type="button" @click="boardList" class="btn btn-success">목록</button>
        </div>
    </div>            
    `,
    methods:{
        boardList : function(){
            this.$emit('board-list');
        },
        boardSave : function(){
            this.$emit('board-save',{no:0,title:this.title,writer:this.writer,content:this.content})
        }
    }
};

var MyBoardModify = {
    props:['info'],
    template: `
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th><input type="text" placeholder="글제목" style="width: 100%;" v-model="info.title"></th>
                    <th><input type="text" placeholder="글쓴이" style="width: 100%;" v-model="info.writer" disabled="true"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">
                        <button class="btn btn-primary fw-bold" @click="textBold">볼드</button>
                        <button class="btn btn-primary fst-italic" @click="textItalic">이탤릭</button>
                        <select class="form-select d-inline w-25 align-middle" aria-label="Default select example">
                        <option selected>글자크기</option>
                            <option value="14px">14px</option>
                            <option value="16px">16px</option>
                            <option value="24px">24px</option>
                        </select>
                    </td>
                <tr>
                <tr>
                    <td colspan="2">
                        <textarea style="width:100%" placeholder="글내용" v-model="info.content"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button @click="boardModifyDone(info.no, info);" type="button" class="btn btn-primary">수정완료</button>
            <button type="button" @click="boardList" class="btn btn-success" >목록</button>
        </div>
    </div>            
    `,
    methods:{
        boardModifyDone : function(no,info){
            this.$emit('board-modify-done',no,info);
        },
        boardList:function(){
            this.$emit('board-list');
        },
        textBold:function(){
            this.$emit('text-bold');
        },
        textItalic:function(){
            this.$emit('text-italic');
        }
    }
};



new Vue({
    el: '#app',
    data:{
        boardData : [
            {
                no:0,
                title:'글1',
                content:'내용1',
                writer:'작성자1'
            },
            {
                no:1,
                title:'글2',
                content:'내용2',
                writer:'작성자2'
            },
            {
                no:2,
                title:'글3',
                content:'내용3',
                writer:'작성자3'
            },
        ],
        listOK:true,
        readOK:false,
        writeOK:false,
        modifyOK:false,
        info:{}
    },
    methods:{
        boardRead:function(info){
            this.info = info;
            this.readOK = true;
            this.listOK = false;
        },
        boardList:function(){
            this.listOK = true;
            this.readOK = false;
            this.writeOK = false;
            this.modifyOK = false;
        },
        boardWrite:function(){
            this.listOK = false;
            this.writeOK = true;
        },
        boardSave:function(info){
            var copy = {...info};
            copy.no = this.boardData.length != 0 ? this.boardData[this.boardData.length-1].no + 1 : 0;
            this.boardData.push(copy);
            this.writeOK = false;
            this.listOK = true;
        },
        boardDelete:function(no){
            var target = this.boardData.filter(function(a){
                return a.no == no;
            });
            var targetIndex = this.boardData.findIndex(function(a){
                return a.no == target.no;
            });
            this.boardData.splice(targetIndex,1);
            this.readOK = false;
            this.listOK = true;
            console.log(this.boardData)
        },
        boardModify:function(){
            this.readOK = false;
            this.modifyOK = true;
        },
        boardModifyDone:function(no,info){
            console.log(no,info);
            var copy = {...info};
            this.boardData[no] = copy;
            this.modifyOK = false;
            this.listOK = true;
        },
        textBold:function(){
            var target = document.getSelection();
            var text = target.toString();
            var boldText = '<b>' + text + '</b>';
            this.info.content = this.info.content.replace(text,boldText);
        },
        textItalic:function(){
            var target = document.getSelection();
            var text = target.toString();
            var italicText = '<i>' + text + '</i>';
            this.info.content = this.info.content.replace(text,italicText);
        }
    },
    components:{
        'my-board-list':MyBoardList,
        'my-board-read':MyBoardRead,
        'my-board-write':MyBoardWrite,
        'my-board-modify':MyBoardModify
    }
})