import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";

function Order() {
    const token = useUserStore(state => state.token);
    const user = useUserStore(state => state.user);
    const [orders, setOrders] = useState([]);

    // ✅ ดึงข้อมูลออเดอร์จาก API
    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8888/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ✅ อัปเดตสถานะคำสั่งซื้อ (Admin)
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:8888/orders/${orderId}/status`,
                { orderStatus: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Order status updated!");
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update order.");
            console.error("Failed to update order status:", error);
        }
    };

    // ✅ อัปเดตสถานะ Payment (Admin)
    const updatePaymentStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:8888/orders/${orderId}/payment`,
                { paymentStatus: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Payment status updated!");
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update payment status.");
            console.error("Failed to update payment status:", error);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4 font-bold text-3xl">Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3>
                            <p className="text-gray-700 mb-2">Total Price: <strong>${order.cartTotal}</strong></p>
                            <p className="text-gray-700 mb-2">Status: <strong>{order.orderStatus}</strong></p>
                            <p className="text-gray-700 mb-2">Payment: <strong>{order.paymentStatus}</strong></p>
                            <p className="text-gray-700 mb-2">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>

                            {/* รายการสินค้าในคำสั่งซื้อ */}
                            <div className="border-t pt-2 mt-2">
                                <h4 className="font-semibold">Items:</h4>
                                <ul className="list-disc pl-5">
                                    {order.orderItems.map((item, index) => (
                                        <li key={index}>
                                            {item.product.title} - {item.quantity} x ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ปุ่มสำหรับ Admin */}
                            {user?.Role === "ADMIN" && (
                                <div className="mt-4">
                                    {/* ปุ่มอัปเดตสถานะออเดอร์ */}
                                    {order.orderStatus !== "Completed" ? (
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => updateOrderStatus(order.id, "Completed")}
                                        >
                                            Mark as Completed
                                        </button>
                                    ) : (
                                        <span className="text-green-600 me-2">Completed</span>
                                    )}

                                    {/* ปุ่มอัปเดตสถานะการชำระเงิน */}
                                    {order.paymentStatus !== "Paid" ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => updatePaymentStatus(order.id, "Paid")}
                                        >
                                            Mark as Paid
                                        </button>
                                    ) : (
                                        <span className="text-green-600">Paid</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Order;
