/**
 * Created by yangbingxun on 2017/8/9.
 */

export default class SaveStack {
    constructor(limit){
        this.history = [];
        this.index = -1;
        this.limit = limit;
    }

    push(history) {
        if(this.limit - 1 > this.index && this.history.length < this.limit) {
            this.history.splice(this.index+1, this.history.length);
            this.history.push(history);
            this.index++;
        }else {
            this.index = this.limit - 1;
            this.history.shift();
            this.history.push(history);
        }
    }

    undo() {
        if(this.index > 0) {
            this.index--;
        } else {
            this.index = 0;
        }
        return this.getHistory()
    }

    redo() {
        if(this.limit - 1 > this.index && this.index < this.history.length - 1) {
            this.index++;
        } else {
            this.index = this.history.length - 1
        }
        return this.getHistory();
    }

    clear() {
        this.history.splice(1);
        this.index = 0;
    }

    clearAll() {
        this.history = [];
        this.index = -1;
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

    getHistory(index) {
        return this.history[index || this.index];
    }

}