import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

export const useCategoryList = (): CategoryResultSectionDTO => {
    const { t, i18n } = useTranslation();
    const [categoryList, setCategoryList] = useState<CategoryResultSectionDTO>({
        success: true,
        status: 'success',
        code: 200,
        message: 'Mock data fetched successfully',
        results: [],
    });
    useEffect(() => {
        setCategoryList({
            success: true,
            status: 'success',
            code: 200,
            message: 'Mock data fetched successfully',
            results: [
                {
                    id: 1,
                    categoryName: t('CATEGORY-birthday'),
                    imageCategory: 'birthday',
                    titleImageUrl: resolveImagePath(
                        '/CategoryList/birthday.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 2,
                    categoryName: t('CATEGORY-happiness'),
                    imageCategory: 'happiness',
                    titleImageUrl: resolveImagePath(
                        '/CategoryList/happiness.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 3,
                    categoryName: t('CATEGORY-tiredness'),
                    imageCategory: 'tiredness',
                    titleImageUrl: resolveImagePath('/CategoryList/tired.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 4,
                    categoryName: t('CATEGORY-what'),
                    imageCategory: 'what',
                    titleImageUrl: resolveImagePath('/CategoryList/what.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 5,
                    categoryName: t('CATEGORY-flex'),
                    imageCategory: 'flex',
                    titleImageUrl: resolveImagePath('/CategoryList/flex.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 6,
                    categoryName: t('CATEGORY-sad'),
                    imageCategory: 'sad',
                    titleImageUrl: resolveImagePath('/CategoryList/sad.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 7,
                    categoryName: t('CATEGORY-mudo'),
                    imageCategory: 'mudo',
                    titleImageUrl: resolveImagePath('/CategoryList/mudo.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 8,
                    categoryName: t('CATEGORY-anger'),
                    imageCategory: 'anger',
                    titleImageUrl: resolveImagePath('/CategoryList/anger.jpg'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 9,
                    categoryName: t('CATEGORY-other'),
                    imageCategory: 'other',
                    titleImageUrl: resolveImagePath('/CategoryList/other.webp'),
                    lastMemeImageRegistTime: DATE,
                },
            ],
        });
    }, [i18n.language, t]);

    return categoryList;
};
