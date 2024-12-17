import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

export const useMockCategoryList = (): CategoryResultSectionDTO => {
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
                        '/temp/birthday/birthday-02.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 2,
                    categoryName: t('CATEGORY-happiness'),
                    imageCategory: 'happiness',
                    titleImageUrl: resolveImagePath(
                        '/temp/Happiness/happiness-01.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 3,
                    categoryName: t('CATEGORY-tiredness'),
                    imageCategory: 'tiredness',
                    titleImageUrl: resolveImagePath(
                        '/temp/Tired/tired-01.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 4,
                    categoryName: t('CATEGORY-what'),
                    imageCategory: 'what',
                    titleImageUrl: resolveImagePath('/temp/what/what-01.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 5,
                    categoryName: t('CATEGORY-flex'),
                    imageCategory: 'flex',
                    titleImageUrl: resolveImagePath('/temp/flex/flex-01.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 6,
                    categoryName: t('CATEGORY-sad'),
                    imageCategory: 'sad',
                    titleImageUrl: resolveImagePath('/temp/Sad/sad-07.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 7,
                    categoryName: t('CATEGORY-mudo'),
                    imageCategory: 'mudo',
                    titleImageUrl: resolveImagePath('/temp/Mudo/mudo-04.webp'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 8,
                    categoryName: t('CATEGORY-anger'),
                    imageCategory: 'anger',
                    titleImageUrl: resolveImagePath('/temp/Anger/anger-05.jpg'),
                    lastMemeImageRegistTime: DATE,
                },
                {
                    id: 9,
                    categoryName: t('CATEGORY-hunger'),
                    imageCategory: 'hunger',
                    titleImageUrl: resolveImagePath(
                        '/temp/hungry/hungry-02.webp'
                    ),
                    lastMemeImageRegistTime: DATE,
                },
            ],
        });
    }, [i18n.language, t]);

    return categoryList;
};
