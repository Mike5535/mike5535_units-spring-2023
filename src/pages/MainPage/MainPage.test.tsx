import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getNextSortBy } from '../../utils';
import { MainPage } from './MainPage';
import { PriceSymbol } from '../../types';
import * as React from 'react';
import type { Category } from '../../types';
import * as timeModule from '../../hooks/useCurrentTime';

const products = [
    {
        id: 1,
        name: 'Костюм гуся',
        description: 'Запускаем гуся, работяги',
        price: 1000,
        priceSymbol: '₽',
        category: 'Одежда',
    },
    {
        id: 2,
        name: 'IPhone 14 Pro',
        description: 'Latest iphone, buy it now',
        price: 999,
        priceSymbol: '$',
        category: 'Электроника',
        imgUrl: '/iphone.png',
    },
    {
        id: 3,
        name: 'Принтер',
        description: 'Незаменимая вещь для студента',
        price: 7000,
        category: 'Электроника',
    },
];

jest.useFakeTimers().setSystemTime(new Date('2011-01-01T00:00:00.000Z'));

jest.mock('../../utils/getNextSortBy', () => ({
    __esModule: true,
    getNextSortBy: jest.fn(() => 'по возрастанию цены'),
}));

jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
    getPrice: jest.fn(
        (value: number, symbol: PriceSymbol = '₽'): string =>
            `${value.toLocaleString('ru-RU')} ${symbol}`
    ),
}));

jest.mock('../../hooks/useProducts', () => ({
    __esModule: true,
    useProducts: jest.fn(() => products),
}));

describe('test mainPage', () => {
    afterEach(() => {
        jest.resetModules();
    });
    it('should render correctly', () => {
        const rendered = render(<MainPage />);
        expect(rendered.asFragment()).toMatchSnapshot();
    });
    it('should select category', () => {
        const rendered = render(<MainPage />);

        expect(getNextSortBy).toHaveBeenCalledTimes(0);
        fireEvent.click(rendered.getByText('Сортировать по умолчанию'));
        expect(getNextSortBy).toHaveBeenCalledTimes(1);
    });
});

describe('test mainPage select category', () => {
    it('should select category', () => {
        jest.spyOn(timeModule, 'useCurrentTime').mockImplementationOnce(
            jest.fn()
        );
        const initState: Category[] = [];
        const setState = jest.fn();
        jest.spyOn(React, 'useState').mockImplementationOnce(
            () => [initState, setState] as [any, any]
        );

        const { container } = render(<MainPage />);

        expect(setState).toHaveBeenCalledTimes(0);
        fireEvent.click(
            container.querySelector('.categories__badge') as HTMLDivElement
        );
        expect(setState).toHaveBeenCalledTimes(1);
    });
});
