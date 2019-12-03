export interface Cost {
    id: string;
    title: string;
    description: string;
    value: number;
    category: CostCategory
}

export enum CostCategory {
    SPORT = 'Sport',
    HEALTH = 'Health',
    OTHER = 'Other'
}