/**
 * Created by yangbingxun on 2017/8/9.
 */

export default class Redo_Undo {
    constructor(limit){
        this.history = [];
        this.index = -1;
        this.limit = limit;
    }

    push(history) {
        if(this.limit - 1 > this.index && this.history.length < this.limit) {
            console.log(this.limit,this.index,this.history.length);
            this.history.splice(this.index+1, this.history.length);
            this.history.push(history);
            this.index++;
        }else {
            this.index = this.limit - 1;
            console.log(this.limit,this.index,this.history.length);
            this.history.shift();
            this.history.push(history);
        }
    }

    pop() {
        if(this.index > 0) {
            this.index--;
        } else {
            this.index = 0;
        }
        return this.history[this.index];
    }

    redo() {
        return this.pop()
    }

    undo() {
        if(this.limit - 1 > this.index && this.index < this.history.length - 1) {
            this.index++;
        } else {
            this.index = this.history.length - 1
        }
        return this.history[this.index];
    }

    couldRedo() {
        if(this.index > 0)
            return true;
        else
            return false;
    }

    couldUndo() {
        if(this.limit > this.index && this.index < this.history.length)
            return true;
        else
            return false
    }

}