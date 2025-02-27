export interface ITask {
    id: number;
    text: string;
    done: boolean;
}

export type sectionType = 'Work' | 'Study' | 'Home' | 'Health' | 'Creativity'
export type priorityType = '🟢 Low' | '🟡 Medium' | '🔴 High' | '🚨 Critacal' | '💤 Low effort'

export interface ICard {
    id: number;
    status: 'Done' | 'In Progress';
    section: sectionType;
    title: string;
    tasks: ITask[];
    deadline: Date;
    priority: priorityType;
}
