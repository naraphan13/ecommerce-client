// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useUserStore from "../store/userStore";
// import { toast } from "react-toastify";

// function Order() {
//     const token = useUserStore(state => state.token);
//     const user = useUserStore(state => state.user);
//     const [orders, setOrders] = useState([]);

//     // ✅ ดึงข้อมูลออเดอร์จาก API
//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get("http://localhost:8888/orders", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setOrders(response.data);
//         } catch (error) {
//             console.error("Failed to fetch orders:", error);
//         }
//     };
// console.log('token', token)
//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     // ✅ อัปเดตสถานะคำสั่งซื้อ (Admin)
//     const updateOrderStatus = async (orderId, newStatus) => {
//         try {
//             await axios.patch(
//                 `http://localhost:8888/orders/${orderId}/status`,
//                 { orderStatus: newStatus },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             toast.success("Order status updated!");
//             fetchOrders();
//         } catch (error) {
//             toast.error("Failed to update order.");
//             console.error("Failed to update order status:", error);
//         }
//     };

//     // ✅ อัปเดตสถานะ Payment (Admin)
//     const updatePaymentStatus = async (orderId, newStatus) => {
//         try {
//             await axios.patch(
//                 `http://localhost:8888/orders/${orderId}/payment`,
//                 { paymentStatus: newStatus },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             toast.success("Payment status updated!");
//             fetchOrders();
//         } catch (error) {
//             toast.error("Failed to update payment status.");
//             console.error("Failed to update payment status:", error);
//         }
//     };

//     return (
//         <div className="container my-4">
//             <h2 className="text-center mb-4 font-bold text-3xl">Your Orders</h2>

//             {orders.length === 0 ? (
//                 <p className="text-center text-gray-500">No orders found.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {orders.map((order) => (
//                         <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
//                             <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3>
//                             <p className="text-gray-700 mb-2">Total Price: <strong>${order.cartTotal}</strong></p>
//                             <p className="text-gray-700 mb-2">Status: <strong>{order.orderStatus}</strong></p>
//                             <p className="text-gray-700 mb-2">Payment: <strong>{order.paymentStatus}</strong></p>
//                             <p className="text-gray-700 mb-2">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>

//                             {/* รายการสินค้าในคำสั่งซื้อ */}
//                             <div className="border-t pt-2 mt-2">
//                                 <h4 className="font-semibold">Items:</h4>
//                                 <ul className="list-disc pl-5">
//                                     {order.orderItems.map((item, index) => (
//                                         <li key={index}>
//                                             {item.product.title} - {item.quantity} x ${item.price}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* ปุ่มสำหรับ Admin */}
//                             {user?.Role === "ADMIN" && (
//                                 <div className="mt-4">
//                                     {/* ปุ่มอัปเดตสถานะออเดอร์ */}
//                                     {order.orderStatus !== "Completed" ? (
//                                         <button
//                                             className="btn btn-success btn-sm me-2"
//                                             onClick={() => updateOrderStatus(order.id, "Completed")}
//                                         >
//                                             Mark as Completed
//                                         </button>
//                                     ) : (
//                                         <span className="text-green-600 me-2">Completed</span>
//                                     )}

//                                     {/* ปุ่มอัปเดตสถานะการชำระเงิน */}
//                                     {order.paymentStatus !== "Paid" ? (
//                                         <button
//                                             className="btn btn-primary btn-sm"
//                                             onClick={() => updatePaymentStatus(order.id, "Paid")}
//                                         >
//                                             Mark as Paid
//                                         </button>
//                                     ) : (
//                                         <span className="text-green-600">Paid</span>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Order;


















import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";

function Order() {
  const token = useUserStore(state => state.token);
  const user = useUserStore(state => state.user);
  const [orders, setOrders] = useState([]);

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
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center text-4xl font-bold text-green-600 mb-10">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-tr from-white via-sky-50 to-green-50 border border-green-100 shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2"> Order ID: {order.id}</h3>
              <p className="text-gray-700 mb-1">
                 <strong>Total Price:</strong>{" "}
                <span className="text-sky-600 font-semibold">฿{order.cartTotal}</span>
              </p>
              <p className="mb-1">
                 <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    order.orderStatus === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>
              <p className="mb-1">
                <strong>Payment:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Created: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {/* รายการสินค้า */}
              <div className="border-t border-dashed pt-3 mt-2">
                <h4 className="font-semibold text-gray-700 mb-2">🛒 Items:</h4>
                <ul className="space-y-1">
                  {order.orderItems.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-800 bg-white rounded px-3 py-1 shadow-sm border"
                    >
                      {item.product.title} — {item.quantity} × ฿{item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ปุ่มสำหรับ Admin */}
              {user?.Role === "ADMIN" && (
                <div className="mt-6 flex flex-col gap-3">
                  {order.orderStatus !== "Completed" ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() => updateOrderStatus(order.id, "Completed")}
                    >
                       Mark as Completed
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => updateOrderStatus(order.id, "Pending")}
                    >
                       Set to Pending
                    </button>
                  )}

                  {order.paymentStatus !== "Paid" ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => updatePaymentStatus(order.id, "Paid")}
                    >
                       Mark as Paid
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => updatePaymentStatus(order.id, "Unpaid")}
                    >
                       Mark as Unpaid
                    </button>
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


