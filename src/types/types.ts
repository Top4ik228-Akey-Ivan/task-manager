export interface ITask {
    id: number;
    text: string;
    done: boolean;
}

export type sectionType = 'All' | 'Work' | 'Study' | 'Home' | 'Health' | 'Creativity'
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

export interface IBoard {
    id: number;
    title: string;
    cards: ICard[];
}
