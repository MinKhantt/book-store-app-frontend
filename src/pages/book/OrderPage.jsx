import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaClock,
  FaDollarSign,
  FaReceipt,
  FaBoxes,
} from "react-icons/fa";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <span className="p-1 bg-secondary text-white rounded">
                  # {index + 1}{" "}
                </span>
                <span className="text-sm text-back p-1 bg-primary rounded">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaReceipt className="text-gray-600" />
                <span className="font-medium">{order._id}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-gray-600" />
                <span className="font-medium">{order.name}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaEnvelope className="text-gray-600" />
                <span>{order.email}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaPhone className="text-gray-600" />
                <span>{order.phone}</span>
              </div>

              <div className="flex flex-col gap-2 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-gray-600" />
                  <h3 className="font-semibold text-lg text-gray-700">
                    Address
                  </h3>
                </div>

                <div className="flex flex-col space-y-2 ml-7">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <span className="text-gray-500">Street:</span>
                    <span className="font-medium text-gray-700">
                      {order.address.street}
                    </span>

                    <span className="text-gray-500">City:</span>
                    <span className="font-medium text-gray-700">
                      {order.address.city}
                    </span>

                    <span className="text-gray-500">Country:</span>
                    <span className="font-medium text-gray-700">
                      {order.address.country}
                    </span>

                    <span className="text-gray-500">State:</span>
                    <span className="font-medium text-gray-700">
                      {order.address.state}
                    </span>

                    <span className="text-gray-500">Zip Code:</span>
                    <span className="font-medium text-gray-700">
                      {order.address.zip}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaDollarSign className="text-gray-600" />
                <span className="font-medium text-gray-700 mt-auto">
                  Total: ${order.totalPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaBoxes className="text-gray-600" />
                <span className="font-medium text-gray-700 mt-auto">
                  Qty: {order.productIds.length}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <FaShoppingBag className="text-gray-600 mt-1" />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 mb-2">
                    Products ID
                  </span>
                  <ul className="space-y-1">
                    {order.productIds.map((productId, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium">{productId}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
