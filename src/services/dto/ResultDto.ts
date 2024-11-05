export interface CategoryResultSectionDTO {
    results: CategoryResultItemDTO[];
}

export interface CategoryResultItemDTO {
    id: number;
    categoryName: string;
    imageCategory: string | 'MUDO';
    titleImageUrl: string;
    lastMemeImageRegistTime: string;
}

export interface SearchResultSectionDTO {
    results: SearchResultItemDTO[];
}

export interface SearchResultItemDTO {
    id: number;
    imageUrl: string;
    imageCategory: string | 'MUDO';
    createdAt: string;
    modifiedAt: string;
}
