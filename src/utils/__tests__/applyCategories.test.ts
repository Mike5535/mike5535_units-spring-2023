import { Product } from '../../types';
import { applyCategories } from '../applyCategories';

describe('test applyCategories function', () => {
    const products:Product[] = [{
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
    }];

    it('should return products if categories.length === 0', () => {
        expect(applyCategories(products, [])).toEqual(products);
    });
    it('should return products with transferred categories', () => {
        const filtresProducts = products.filter(el=> el.category === 'Одежда');
        expect(applyCategories(products, ['Одежда'])).toEqual(filtresProducts);
    });
});
