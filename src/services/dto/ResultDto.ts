export interface CategoryResultSectionDTO {
    success: boolean;
    status: string;
    code: number;
    message: string;
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
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: SearchResultItemDTO[];
}

export interface SearchResultItemDTO {
    category: string;
    createdAt: Date;
    id: string;
    imageUrl: string;
    tagList: string[];
    uploader: string;
}

export interface FavoriteItemDTO {
    id: string;
    createdAt: Date;
    imageUrl: string;
    category: string;
    tagList: string[];
    imageId: string;
    uploader: string;
    order: number;
}
