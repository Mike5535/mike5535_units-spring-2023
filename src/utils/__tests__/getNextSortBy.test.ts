import { getNextSortBy } from '../getNextSortBy';
import type { SortBy } from '../../types';

const sortValues: SortBy[] = [
    'по умолчанию',
    'по возрастанию цены',
    'по убыванию цены',
];

describe.each(sortValues)('test applyCategories function', (sortValue) => {
    const idx = sortValues.indexOf(sortValue);
    const sorted =
        idx === sortValues.length - 1 ? sortValues[0] : sortValues[idx + 1];
    it(`should return ${sortValue} if sortBy === ${sorted}`, () => {
        expect(getNextSortBy(sortValue)).toBe(sorted);
    });
});
