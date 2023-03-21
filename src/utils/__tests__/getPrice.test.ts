import { getPrice } from '../getPrice';

describe('test get price function', () => {
    it('should return value with ruble symbol', () => {
        expect(getPrice(100, '₽')).toBe('100 ₽');
    });
    it('should return value with dollar symbol', () => {
        expect(getPrice(325, '$')).toBe('325 $');
    });
    it('should throw error withot symbol', () => {
        try {
            getPrice(325);
        } catch (e) {
            expect(e).toEqual({
                code: "unexpected_code"
            });
        }
    });
});
