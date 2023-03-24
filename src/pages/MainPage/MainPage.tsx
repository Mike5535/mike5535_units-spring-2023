import React, { useState } from 'react';

import type { Category, SortBy } from '../../types';

import { useCurrentTime, useProducts } from '../../hooks';
import { Categories, ProductCard, SortButton } from '../../components';
import {
    applyCategories,
    updateCategories,
    getNextSortBy,
    productComparator,
} from '../../utils';

import './MainPage.css';

export const MainPage = () => {
    const products = useProducts();
    const currentTime = useCurrentTime();

    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
        []
    );
    const [sortBy, setSortBy] = useState<SortBy>('по умолчанию');

    const onCategoryClick = (clickedCategory: Category) =>
        setSelectedCategories(
            updateCategories(selectedCategories, clickedCategory)
        );

    const onSortButtonClick = () => setSortBy(getNextSortBy(sortBy));

    products.sort(productComparator(sortBy));

    return (
        <div className="main-page">
            <h2 className="main-page__title">VK Маркет</h2>
            <h3>{currentTime}</h3>
            <div className="main-page__parameters">
                <Categories
                    selectedCategories={selectedCategories}
                    onCategoryClick={onCategoryClick}
                />
                <SortButton
                    currentSort={sortBy}
                    onSortButtonClick={onSortButtonClick}
                />
            </div>
            {applyCategories(products, selectedCategories).map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
};
