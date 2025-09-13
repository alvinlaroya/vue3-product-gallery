export type Product = {
    id: string;
    name: string;
    category: 'Books' | 'Games' | 'Electronics';
    price: number;
    inStock: boolean;
};

const DATA: Product[] = [
    { id: 'p1', name: 'Kind Vue Guide', category: 'Books', price: 29.99, inStock: true },
    { id: 'p2', name: 'Vue Racer', category: 'Games', price: 59.0, inStock: false },
    { id: 'p3', name: 'Noise-Cancel Buds', category: 'Electronics', price: 99.5, inStock: true },
    { id: 'p4', name: 'TypeScript Tactics', category: 'Books', price: 45.0, inStock: true },
    { id: 'p5', name: 'Indie Platformer', category: 'Games', price: 14.99, inStock: true },
];

export type Category = 'Books' | 'Games' | 'Electronics';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const categories = ['All', 'Books', 'Games', 'Electronics'];

export async function fetchProducts(opts?: {
    fail?: boolean;
}): Promise<Product[]> {
    await delay(200);
    if (opts?.fail) throw new Error('Failed to load products');

    return DATA;
}
