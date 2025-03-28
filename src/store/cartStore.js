import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(persist((set, get) => ({

    products: [],
    product: null,
    carts: [],
    cart: [],
    currentProduct: null,
    loading: false,
    createProduct: async (body, token, user) => {

        const rs = await axios.post('http://localhost:8888/product/create', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set(state => ({
            posts: [{ ...rs.data.result, name: [], description: [] }, ...state.posts]

        }))
    },
    getAllProduct: async (token) => {

        set({ loading: true })
        const rs = await axios.get('http://localhost:8888/product', {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ products: rs.data.product, loading: false })
        return rs.data.product

    },
    getProduct: (item) => {
        set({ product: item })
    },
    getCart: (item) => {
        set(state => {
            const existingProduct = state.cart.find(product => product.id === item.id);

            if (existingProduct) {
                // ถ้าสินค้ามีอยู่แล้ว ให้เพิ่ม quantity
                return {
                    cart: state.cart.map(product =>
                        product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
                    )
                };
            } else {
                // ถ้ายังไม่มี ให้เพิ่มเข้าไปและตั้งค่า quantity เป็น 1
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                };
            }
        });
    },
    getAllCart: async (token) => {

        set({ loading: true })
        const rs = await axios.get('http://localhost:8888/cart', {
            headers: { Authorization: `Bearer ${token}` }
        })
        set({ carts: rs.data.product, loading: false })
        return rs.data.product

    },

    deleteProduct: async (postId, token) => {

        const rs = await axios.delete(`http://localhost:8888/product/delete/${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set(state => ({
            products: state.products.filter(product => product.id !== postId)

        }))
    },

    setCurrentPost: (post) => set({ currentPost: post }),

    updatePosts: async (postId, token, body) => {
        const rs = await axios.patch(`http://localhost:8888/product/${postId}`, body, { headers: { Authorization: `Bearer ${token}` } })
    }


}), {
    name: 'state'
}))


export default useCartStore