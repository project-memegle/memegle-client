export interface ResultSectionDTO {
    results: ResultItemDTO[];
}

export interface ResultItemDTO {
    id: number;
    categoryName: string;
    imageCategory: string | 'MUDO';
    titleImageUrl: string;
    lastMemeImageRegistTime: string;
}
