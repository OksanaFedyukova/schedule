import Task from "@/classes/Tasks";

export default class Session <T> {
    private Tasks: Task[];
    private duration: number;

    constructor(duration: number) {
        this.Tasks = [];
        this.duration = duration;
    }

    addTask(Task: Task) {
        if (this.canAddTask(Task)) {
            this.Tasks.push(Task);
            this.duration -= Task.duration;
            console.log(
                `Added Task: ${Task.title}, Remaining Duration: ${this.duration}`
            );
        } else {
            console.log(`Cannot add Task: ${Task.title}, Not enough time`);
        }
    }

    canAddTask(Task: Task) {
        return this.duration - Task.duration >= 0;
    }

    getTasks() {
        return this.Tasks;
    }
}

