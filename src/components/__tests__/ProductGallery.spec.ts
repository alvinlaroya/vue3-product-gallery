import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import ProductGallery from '../ProductGallery.vue'

/* --- Mock data --- */
const mockProducts = [
    { id: 'p1', name: 'Kind Vue Guide', category: 'Books', price: 29.99, inStock: true },
    { id: 'p2', name: 'Vue Racer', category: 'Games', price: 59.0, inStock: false },
    { id: 'p3', name: 'Noise-Cancel Buds', category: 'Electronics', price: 99.5, inStock: true },
    { id: 'p4', name: 'TypeScript Tactics', category: 'Books', price: 45.0, inStock: true },
    { id: 'p5', name: 'Indie Platformer', category: 'Games', price: 14.99, inStock: true },
]

/* --- Mock composables ---  */
const mockRefresh = vi.fn()
const mockToggleFavorite = vi.fn()

// mock useProducts composable
vi.mock('../../composables/useProduct', () => ({
    useProducts: vi.fn()
}))

// mock useFavorites composable
vi.mock('../../composables/useFavorite', () => ({
    useFavorites: vi.fn()
}))

describe('ProductGallery', () => {
    beforeEach(async () => {
        vi.clearAllMocks()

        // set up default mocks
        const { useProducts } = await import('../../composables/useProduct')
        const { useFavorites } = await import('../../composables/useFavorite')

        vi.mocked(useProducts).mockReturnValue({
            data: ref(mockProducts),
            loading: ref(false),
            error: ref(null),
            refresh: mockRefresh,
        })

        vi.mocked(useFavorites).mockReturnValue({
            isFavorite: vi.fn((id: string) => false),
            toggleFavorite: mockToggleFavorite,
        })
    })

    it('renders list after fetchProducts resolves', async () => {
        const wrapper = mount(ProductGallery)
        await flushPromises()

        // check that all products are rendered
        expect(wrapper.text()).toContain('Kind Vue Guide')
        expect(wrapper.text()).toContain('Vue Racer')
        expect(wrapper.text()).toContain('TypeScript Tactics')
        expect(wrapper.text()).toContain('Indie Platformer')
    })

    it('filters by name: typing "vue" narrows products', async () => {
        const wrapper = mount(ProductGallery)
        await flushPromises()

        const input = wrapper.find('input#filter')
        await input.setValue('vue')
        await flushPromises()

        // should only show products with "vue" in the name
        expect(wrapper.text()).toContain('Kind Vue Guide')
        expect(wrapper.text()).toContain('Vue Racer')
        expect(wrapper.text()).not.toContain('TypeScript Tactics')
        expect(wrapper.text()).not.toContain('Noise-Cancel Buds')
        expect(wrapper.text()).not.toContain('Indie Platformer')
    })

    it('sorts by price: switching to High→Low reorders items', async () => {
        const wrapper = mount(ProductGallery)
        await flushPromises()

        const select = wrapper.find('select#sort')
        await select.setValue('desc')
        await flushPromises()

        // get all product prices from the rendered list
        const priceElements = wrapper.findAll('span').filter(el =>
            el.text().startsWith('$')
        )
        const prices = priceElements.map(el =>
            parseFloat(el.text().replace('$', ''))
        )

        // check that prices are in descending order
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1])
        }

        // verify the highest price item is first
        expect(prices[0]).toBe(99.5) // Noise-Cancel Buds
    })

    it('favorite toggle: clicking button toggles state and updates UI', async () => {
        const wrapper = mount(ProductGallery)
        await flushPromises()

        // find the first favorite button (ProductGrid component)
        const favoriteButton = wrapper.find('button[aria-label*="Favorite"]')
        expect(favoriteButton.exists()).toBe(true)

        // click favorite button
        await favoriteButton.trigger('click')

        // verify that toggleFavorite function was called
        expect(mockToggleFavorite).toHaveBeenCalled()
    })

    it('error state: shows message and retry calls API again', async () => {
        // mock error state by overriding the useProducts mock
        const { useProducts } = await import('../../composables/useProduct')
        vi.mocked(useProducts).mockReturnValue({
            data: ref(null),
            loading: ref(false),
            error: ref('Failed to load products'),
            refresh: mockRefresh,
        })

        const wrapper = mount(ProductGallery)
        await flushPromises()

        // check error message is displayed
        expect(wrapper.text()).toContain('Failed to load products')

        // find and click retry button
        const retryButton = wrapper.find('button[aria-label="Retry loading products"]')
        expect(retryButton.exists()).toBe(true)

        await retryButton.trigger('click')

        // verify refresh was called
        expect(mockRefresh).toHaveBeenCalled()
    })

    it('shows loading state initially', async () => {
        const { useProducts } = await import('../../composables/useProduct')

        vi.mocked(useProducts).mockReturnValue({
            data: ref(null),
            loading: ref(true),
            error: ref(null),
            refresh: mockRefresh,
        })

        const wrapper = mount(ProductGallery)

        expect(wrapper.text()).toContain('Loading products…')
    })

    it('shows empty state when no products match search', async () => {
        const wrapper = mount(ProductGallery)
        await flushPromises()

        const filterInput = wrapper.find('input#filter')
        await filterInput.setValue('nonexistent')
        await flushPromises()

        expect(wrapper.text()).toContain('No result found.')
    })
})
