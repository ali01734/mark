"use client"
import React, { useState } from 'react';
import Image from 'next/image';

type Order = {
  id: number;
  name: string;
  email: string;
  shipping_address: string;
  amount: string;
  price: string;
  preview_image: string;
  image_preview: string;
  picture_messing: number;
  tracking_id: string;
  delivery_status: number;
  logistics: number;
  intransit: number;
  artist_assign: number;
  courier_info: number;
  carrier_tracking_number: string;
  carrier_name: string;
  carrier_site_link: string;
  created_at: string;
};

type Options = string
type Prints = string

type ProductImage = string

type OrderProductDetails = {
  id: number;
  orders_id: number;
  products_id: number;
  person: string;
  products_price: string;
  products_quantity: string;
  radioColor: string;
  option_id: string;
  print_id: string;
};

type Product = {
  title: string;
};

const Page: React.FC = () => {
  const [productImage, setProductImage] = useState<ProductImage | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [orderProductDetails, setOrderProductDetails] = useState<OrderProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Options | null>(null);
  const [prints, setPrints] = useState<Prints | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderId = formData.get('orderId') as string;
    const orderEmail = formData.get('orderEmail') as string;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/order-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, orderEmail }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setOrder(data.data.order || null);
      setOrderProductDetails(data.data.orderProductDetails || null);
      setProductImage(data.data.image || null);
      setProduct(data.data.product || null);
      setOptions(data.data.options || null);
      setPrints(data.data.prints || null);

      setError(null);
    } catch (err) {
      setError('Failed to fetch order details.');
      setOrder(null);
      setOrderProductDetails(null);
    }
  };

  return (
    <main>
      <section>
        <div className="container mx-auto my-4 py-[48px] px-4 bg-gray-100">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-white p-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 grid grid-cols-4 items-center">
                    <label htmlFor="orderId" className="block text-sm font-medium col-span-1">
                      Order ID
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      id="orderId"
                      className="mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm col-span-3 text-[#495057] border-[#ced4da] border"
                      required
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-4 items-center">
                    <label htmlFor="orderEmail" className="block text-sm font-medium col-span-1">
                      Order Email
                    </label>
                    <input
                      type="email"
                      name="orderEmail"
                      id="orderEmail"
                      className="mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm col-span-3 text-[#495057] border-[#ced4da] border"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      aria-label="Submit"
                      className="btn px-[48px] py-2 bg-[#2bb673] text-white rounded-[.25rem] shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>
            {order && (
              <div className="w-full md:w-1/2 px-4 pt-4 md:pt-0">
                <div className="flex flex-wrap gap-3">
                  {/* Add dynamic status checkboxes if needed */}

                  {orderProductDetails && (
                  <div className=" flex gap-2 mr-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confirmed"
                    id="confirmed"
                    checked
                  />
                  <label
                    className="form-check-label text-gray-500 text-xs"
                    htmlFor="confirmed"
                  >
                    Confirmed
                  </label>
                </div>

                )}
                {order && order.picture_messing === 1 && (
                <div className=" flex gap-2 mr-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="missing"
                    id="missing"
                    checked
                  />
                  <label
                    className="form-check-label text-gray-500 text-xs"
                    htmlFor="missing"
                  >
                    Reference Picture Missing
                  </label>
                </div>
                )}

                {order && order.artist_assign === 1 && (
                <div className=" flex gap-2 mr-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="assigned"
                    id="assigned"
                    checked
                  />
                  <label
                    className="form-check-label text-gray-500 text-xs"
                    htmlFor="assigned"
                  >
                    Assigned artist
                  </label>
                </div>
                )}
                {order && order.image_preview !== null && (
                <div className=" flex gap-2 mr-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="preview"
                    id="preview"
                    checked
                  />
                  <label
                    className="form-check-label text-gray-500 text-xs"
                    htmlFor="preview"
                  >
                    Preview Sent
                  </label>
                </div>
                )}

                {order && order.image_preview !== null && (
                  <>
                    {order.image_preview === "digital" && order.delivery_status === 1 && (
                      <div className="flex gap-2 mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="delivery"
                          id="delivered"
                          defaultChecked
                        />
                        <label
                          className="form-check-label text-gray-500 text-xs"
                          htmlFor="delivered"
                        >
                          Delivered
                        </label>
                      </div>
                    )}

                    {order.logistics === 1 && (
                      <div className="flex gap-2 mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="logistics"
                          id="logistics"
                          defaultChecked
                        />
                        <label
                          className="form-check-label text-gray-500 text-xs"
                          htmlFor="logistics"
                        >
                          Delivery In Progress
                        </label>
                      </div>
                    )}

                    {order.intransit === 1 && (
                      <div className="flex gap-2 mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inTransit"
                          id="inTransit"
                          defaultChecked
                        />
                        <label
                          className="form-check-label text-gray-500 text-xs"
                          htmlFor="inTransit"
                        >
                          In Transit
                        </label>
                      </div>
                    )}

                    {order.delivery_status === 1 && (
                      <div className="flex gap-2 mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="delivered"
                          id="delivered"
                          defaultChecked
                        />
                        <label
                          className="form-check-label text-gray-500 text-xs"
                          htmlFor="delivered"
                        >
                          Delivered
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            )}
          </div>

          {order && (
            <div className="mt-10">
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-center bg-white text-sm">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-4 py-2">Product Image</th>
                      <th className="px-4 py-2">Product Title</th>
                      <th className="px-4 py-2">Order Number</th>
                      <th className="px-4 py-2">Person</th>
                      <th className="px-4 py-2">Canvas Option</th>
                      <th className="px-4 py-2">Frame Print</th>
                      <th className="px-4 py-2">Frame Color</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProductDetails ? (
                      <tr className="text-green-500">
                        <td className="px-4 py-2">
                          <Image
                            width={48}
                            height={48}
                            src={`${process.env.NEXT_PUBLIC_WEB_URL}/images/${productImage}`}
                            alt={product?.title || "Product Image"}
                            className="w-12"
                          />
                        </td>
                        <td className="px-4 py-2">{product?.title}</td>
                        <td className="px-4 py-2">{order.tracking_id}</td>
                        <td className="px-4 py-2">{orderProductDetails.person}</td>
                        {orderProductDetails.option_id !== null ? (
                            <td className="px-4 py-2">
                              {options || "NULL"}
                            </td>
                          ) : (
                            <td className="px-4 py-2">NULL</td>
                        )}
                        {orderProductDetails.print_id !== null ? (
                            <td className="px-4 py-2">
                              {prints || "NULL"}
                            </td>
                          ) : (
                            <td className="px-4 py-2">NULL</td>
                        )}
                        {orderProductDetails.radioColor !== null ? (
                            <td className="px-4 py-2">
                              {orderProductDetails.radioColor}
                            </td>
                          ) : (
                            <td className="px-4 py-2">NULL</td>
                        )}
                        <td className="px-4 py-2">{orderProductDetails.products_quantity}</td>
                        <td className="px-4 py-2">{order.amount}</td>
                        <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-4 py-2">No product details available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="w-full text-center py-10">
              {order.preview_image && (
                  <>
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/water_mark/${order.tracking_id}.jpg`}
                      download
                    >
                      <Image
                        width={96}
                        height={96}
                        src={`${process.env.NEXT_PUBLIC_WEB_URL}/water_mark/${order.tracking_id}.jpg`}
                        alt="Preview Image"
                        className="w-24 mx-auto"
                      />
                    </a>
                    <br />
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/water_mark/${order.tracking_id}.jpg`}
                      download
                      className="bg-[#17a2b8] text-white px-4 py-2 rounded mt-2 inline-block"
                    >
                      Download Image
                    </a>
                  </>
                )}

              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
