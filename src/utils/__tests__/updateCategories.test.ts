import { Category } from '../../types';
import { updateCategories } from '../updateCategories';

const catgories: Category[] = ['Для дома', 'Одежда', 'Электроника'];

describe('test updateCategories function', () => {
    it('return catgories without changedCategory', () => {
        const filtredCatgories = catgories.filter((el) => el !== 'Для дома');
        expect(updateCategories(catgories, 'Для дома')).toEqual<Category[]>(
            filtredCatgories
        );
    });
    it('return catgories with new changedCategory', () => {
        const testData = catgories.filter((el) => el !== 'Электроника');
        expect(updateCategories(testData, 'Электроника')).toEqual<Category[]>(
            catgories
        );
    });
});
