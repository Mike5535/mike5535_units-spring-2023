import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';
import { getPrice } from '../../utils';

jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
        getPrice: jest.fn(() => '40 000 ₽'),
    }));

afterEach(jest.clearAllMocks);

describe('Categories test', () => {
    const product: Product = {
            id: 1,
            name: 'Samsung',
            description: 'Смартфон',
            price: 40_000,
            priceSymbol: '₽',
            category: 'Для дома',
        };
    it('should render correctly', () => {
        const rendered = render(<ProductCard {...product} />);
        expect(rendered.asFragment()).toMatchSnapshot();
    });
    it('getPrice called once', () => {
        render(<ProductCard {...product} />);
        expect(getPrice).toBeCalledTimes(1);
    });
    it('should not contain img if Product has not imgUrl', () => {
        const {container} = render(<ProductCard {...product} />);
        expect(container.querySelector('img')).toBeNull();
    });
    it('should contain img with src = imgUrl if Product has imgUrl', () => {
        const imgUrl = 'anylink';
        const {container} = render(<ProductCard {...{imgUrl,...product}} />);
        expect(container.querySelector('img')?.src).toBe(`http://${window.location.hostname}/${imgUrl}`);
    });
});
