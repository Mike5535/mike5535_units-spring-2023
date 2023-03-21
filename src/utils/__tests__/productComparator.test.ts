import { Product } from "../../types";
import { productComparator } from "../productComparator";

const product:Product[] = [{
    id: 1,
    name: 'Костюм гуся',
    description: 'Запускаем гуся, работяги',
    price: 1_000,
    priceSymbol: '₽',
    category: 'Одежда',
},
{
    id: 2,
    name: 'IPhone 14 Pro',
    description: 'Latest iphone, buy it now',
    price: 200,
    priceSymbol: '₽',
    category: 'Электроника',
    imgUrl: '/iphone.png',
},
{
    id: 3,
    name: 'Принтер',
    description: 'Незаменимая вещь для студента',
    price: 3_000,
    priceSymbol: '₽',
    category: 'Электроника',
}];

describe('test productComparator function with sortBy === по умолчанию', () => {
    it('return 0 if sortBy === по умолчанию', () => {
        expect(productComparator('по умолчанию')(product[0],product[1])).toBe(0);
    });
});

describe('test productComparator function with sortBy === по убыванию цены', () => {
    it('return 0 if first price === second price', () => {
        expect(productComparator('по убыванию цены')(product[0],product[0])).toBe(0);
    });
    it('return 1 if sortBy === по убыванию цены and 2 product > 1 product ', () => {
        expect(productComparator('по убыванию цены')(product[1],product[0])).toBe(1);
    });
    it('return -1 if sortBy === по убыванию цены and 1 product > 2 product ', () => {
        expect(productComparator('по убыванию цены')(product[0],product[1])).toBe(-1);
    });
});

describe('test productComparator function with sortBy === по возрастанию цены', () => {
    it('return -1 if sortBy === по возрастанию цены цены and 2 product > 1 product ', () => {
        expect(productComparator('по возрастанию цены')(product[1],product[0])).toBe(-1);
    });
    it('return 1 if sortBy === по возрастанию цены and 1 product > 2 product ', () => {
        expect(productComparator('по возрастанию цены')(product[0],product[1])).toBe(1);
    });
});
