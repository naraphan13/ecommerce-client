import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useProductStore = create(persist((set, get) => ({
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

        console.log('rs', rs)
        // set(state => ({
        //     posts: [{ ...rs.data.result, name: [], description: [] }, ...state.posts]

        // }))
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
                // ถ้าสินค้าอยู่แล้ว, เพิ่ม quantity
                return {
                    cart: state.cart.map(product =>
                        product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
                    )
                };
            } else {
                // ถ้ายังไม่มีสินค้า, เพิ่มเข้าไปและตั้ง quantity = 1
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
    createOrder: async (token,navigate) => {
        const { cart } = get();


        if (!token) {
            toast.error("Please login first.");
            navigate('/login')
            return;
          }



        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const orderData = {
            items: cart.map(item => ({
                productId: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            })),
            total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            status: "Pending",
        };

        try {
            const response = await axios.post("http://localhost:8888/orders/create", orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Order Created:", response.data.order);
            set({ cart: [] }); // ✅ ล้างตะกร้าหลังจากสร้างออเดอร์สำเร็จ
            toast.success("Order created successfully!");
            return response.data.order
            // navigate('/order')
        } catch (error) {
            toast.error("Failed to create order.");
            console.error("Error creating order:", error);
        }
    },
    removeFromCart: (id) => {
        set(state => {
            const existingProduct = state.cart.find(product => product.id === id);

            if (existingProduct && existingProduct.quantity > 1) {
                // ถ้าสินค้ามีอยู่ใน cart และ quantity > 1, ให้ลดจำนวนลง 1
                return {
                    cart: state.cart.map(product =>
                        product.id === id ? { ...product, quantity: product.quantity - 1 } : product
                    )
                };
            } else {
                // ถ้า quantity = 1 ให้ลบออกจาก cart
                return {
                    cart: state.cart.filter(product => product.id !== id)
                };
            }
        });
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
    name: 'product',
    storage: createJSONStorage(() => localStorage)
}))


export default useProductStore