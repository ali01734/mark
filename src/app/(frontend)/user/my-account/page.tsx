"use client"

import React, { useEffect, useState } from "react";

interface OrderData {
  id: number;
  name: string;
  phone: string;
  email: string;
  city_name: string;
  shipping_address: string;
  status: number;
  productDetails: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const loadOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/user-my-order`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
        if (data.data && Array.isArray(data.data)) {
          setOrders(data.data); // Directly set orders if it's an array
      } else {
          setOrders([]); // Reset to empty array if data is not an array
      }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="w-full">
        <h3 className="text-center text-xl font-bold mb-5">
          ----- Order History -----
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Delivery Address</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Product Details</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => {
                // Parse the shipping_address JSON object
                const shippingAddress = order.shipping_address && typeof order.shipping_address === 'string' 
                  ? JSON.parse(order.shipping_address) 
                  : order.shipping_address;

                return (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{order.id}</td>
                    <td className="px-4 py-2 border">{order.name}</td>
                    <td className="px-4 py-2 border">{order.phone}</td>
                    <td className="px-4 py-2 border">{order.email}</td>
                    <td className="px-4 py-2 border">
                      City: {shippingAddress?.city ?? "N/A"}<br />
                      Postal Code: {shippingAddress?.postal_code ?? "N/A"}<br />
                      State: {shippingAddress?.state ?? "N/A"}<br />
                      Address: {shippingAddress?.address ?? "N/A"}<br />
                      Country: {shippingAddress?.country ?? "N/A"}<br />
                      Apartment Info: {shippingAddress?.address_apartment ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {order.status === 0 ? "Pending" : "Fulfilled"}
                    </td>
                    <td className="px-4 py-2 border"></td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
