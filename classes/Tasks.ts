import TaskDuration from "@/enum/TalksDuration";

export default class Task {
    id: string;
  title: string;
  duration: number;

  constructor(id:string, title: string, duration: keyof typeof TaskDuration | number) {
    this.id = id;
    this.title = title;
    if (typeof duration === 'string') {
      this.duration = TaskDuration[duration];
    } else {
      this.duration = duration;
    }
  }
}

