"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from 'next/image';

type Review = {
  id: number;
  product_id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  body: string;
  image?: string;
  recommend: boolean;
  status: string;
  image_status: string;
  created_at: string;
  updated_at: string;
};

type TabsProps = {
  productId: number;
  description: string;
  reviews: Review[];
};

const Tabs: React.FC<TabsProps> = ({ productId, description, reviews }) => {
  const [model, setModel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [customerReviews, setCustomerReviews] = useState<Review[]>(reviews);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/V1/reviews?product_id=${productId}`
      );
      const data = await response.json();
      if (data.status === "success") {
        setCustomerReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [productId]);
  
  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab, fetchReviews]);

  return (
    <div className="my-6">
      <ul className="flex border-b border-gray-200">
        <li className="mr-4">
          <button
            aria-label="Description"
            className={`inline-block py-2 px-4 font-medium ${
              activeTab === "description"
                ? "text-[#2BB673] border-b-2 border-[#2BB673]"
                : " hover:text-[#2BB673]"
            }`}
            onClick={() => handleTabChange("description")}
          >
            Description
          </button>
        </li>
        <li className="mr-4">
          <button
            aria-label="Reviews"
            className={`inline-block py-2 px-4 font-medium ${
              activeTab === "reviews"
                ? "text-[#2BB673] border-b-2 border-[#2BB673]"
                : " hover:text-[#2BB673]"
            }`}
            onClick={() => handleTabChange("reviews")}
          >
            Reviews
          </button>
        </li>
      </ul>
  
      <div className="mt-4">
        {activeTab === "description" && (
          <div
            className="p-4 flex flex-col gap-5 rounded"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
  
        {activeTab === "reviews" && (
          <div className="p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              {/* Reviews Count on the Left */}
              <p>Reviews ({customerReviews.length})</p>
              
              {/* Write A Review Button on the Right */}
              <button
                onClick={() => setModel(true)}
                aria-label="Write A Review"
                type="button"
                className="bg-[#2BB673] text-white py-2 px-4 rounded shadow transition-transform duration-300 ease-in-out hover:bg-[#239e58] hover:shadow-lg"
              >
                Write A Review
              </button>
            </div>
  
            <hr className="my-3" />
            <div className="flex flex-wrap mb-4">
              {customerReviews.map((review) => (
                <div key={review.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="border p-4 rounded-lg shadow-md">
                    <div className="flex items-center mb-2">
                      {/* Name and Location */}
                      <p className="font-semibold text-lg flex items-center">
                        {review.name} 
                        <span className="ml-2 flex items-center">
                          {/* Custom Location SVG */}
                          <svg
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="icon_icon__ECGRl"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.404 1.904A6.5 6.5 0 0 1 14.5 6.5v.01c0 .194 0 .396-.029.627l-.004.03-.023.095c-.267 2.493-1.844 4.601-3.293 6.056a18.723 18.723 0 0 1-2.634 2.19 11.015 11.015 0 0 1-.234.154l-.013.01-.004.002h-.002L8 15.25l-.261.426h-.002l-.004-.003-.014-.009a13.842 13.842 0 0 1-.233-.152 18.388 18.388 0 0 1-2.64-2.178c-1.46-1.46-3.05-3.587-3.318-6.132l-.003-.026v-.068c-.025-.2-.025-.414-.025-.591V6.5a6.5 6.5 0 0 1 1.904-4.596ZM8 15.25l-.261.427.263.16.262-.162L8 15.25Zm-.002-.598a17.736 17.736 0 0 0 2.444-2.04c1.4-1.405 2.79-3.322 3.01-5.488l.004-.035.026-.105c.018-.153.018-.293.018-.484a5.5 5.5 0 0 0-11 0c0 .21.001.371.02.504l.005.035v.084c.24 2.195 1.632 4.109 3.029 5.505a17.389 17.389 0 0 0 2.444 2.024Z"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM4.5 6.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
                            ></path>
                          </svg>
                          <span className="ml-1 text-gray-500">IE</span>
                        </span>
                      </p>
                    </div>
  
                    <div className="flex items-center mb-2">
                      {/* Trustpilot Rating Image */}
                      <div className="flex items-center">
                      <Image
                          src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg"
                          alt="5-star rating"
                          width={96}  // Set a width value (w-24 is 96px)
                          height={24} // Set the height value (optional, auto adjusts based on aspect ratio)
                        />
                      </div>
  
                      {/* Verified Badge */}
                      <div className="flex items-center ml-4">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 10.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-1 text-sm text-black font-semibold">
                          Verified
                        </span>
                      </div>
  
                      {/* Review Date */}
                      <span className="text-sm text-gray-500 ml-4">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
  
                    <p className="text-gray-600">{review.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  
      {model && (
        <Model
          setModel={setModel}
          model={model}
          productId={productId}
          fetchReviews={fetchReviews}
        />
      )}
    </div>
  );
}  

export default Tabs;

// Modal Component
interface IModalProps {
  productId: number;
  setModel: (model: boolean) => void;
  model: boolean;
  fetchReviews: () => void;
}

const Model: React.FC<IModalProps> = ({
  setModel,
  model,
  productId,
  fetchReviews,
}) => {
  // Use useMemo to ensure initialFormData is stable
  const initialFormData = useMemo(() => ({
    productId: productId,
    name: "",
    country: "",
    rating: 0,
    title: "",
    body: "",
    image: [] as File[],
  }), [productId]); // Add productId as a dependency if it can change

  // Form state
  const [formData, setFormData] = useState(initialFormData);

  // Reset formData when the modal opens
  useEffect(() => {
    if (model) {
      setFormData(initialFormData);
    }
  }, [model, initialFormData]); 

  const [errors, setErrors] = useState({
    name: "",
    country: "",
    rating: "",
    title: "",
    body: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = { name: "", country: "", rating: "", title: "", body: "" };

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formData.country) {
      errors.country = "Country is required";
      isValid = false;
    }
    if (formData.rating === 0) {
      errors.rating = "Rating is required";
      isValid = false;
    }
    if (!formData.title) {
      errors.title = "Title is required";
      isValid = false;
    }
    if (!formData.body) {
      errors.body = "Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset error on change
  };

  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating });
    setErrors({ ...errors, rating: "" }); // Reset rating error
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const form = new FormData();
      form.append("product_id", formData.productId.toString());
      form.append("name", formData.name);
      form.append("country", formData.country);
      form.append("rating", formData.rating.toString());
      form.append("title", formData.title);
      form.append("body", formData.body);

      // Append files if they exist
      if (formData.image.length > 0) {
        formData.image.forEach((file, index) => {
          form.append(`image[${index}]`, file, file.name);
        });
      }

      console.log("FormData content:", Array.from(form.entries()));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/V1/reviews`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();
      if (response.ok && data.status === "success") {
        fetchReviews(); // Fetch the latest reviews after successful submission
        setModel(false); // Close the modal
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[99999]">
      <div className="bg-white p-4 rounded">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[900px] p-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h5 className="text-2xl font-semibold">Write a review</h5>
              <button
                onClick={() => setModel(false)}
                type="button"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="py-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group w-full">
                    <label htmlFor="name" className="block font-medium w-full">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control mt-1 p-2 border border-gray-300 rounded w-full ${
                        errors.name && "border-red-500"
                      }`}
                      required
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group w-full">
                    <label
                      htmlFor="country"
                      className="block font-medium w-full"
                    >
                      Country<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      className={`form-control mt-1 p-2 border border-gray-300 rounded w-full bg-transparent ${
                        errors.country && "border-red-500"
                      }`}
                      required
                      onChange={handleChange}
                      value={formData.country}
                    >
                      <option value="" disabled>
                        Choose One
                      </option>
                      <option value="UK">UK</option>
                      <option value="IE">IE</option>
                      <option value="US">US</option>
                      <option value="CA">CA</option>
                      <option value="AU">AU</option>
                    </select>
                    {errors.country && (
                      <span className="text-red-500 text-sm">
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="rating" className="block font-medium">
                    Rating<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`cursor-pointer ${
                          formData.rating >= star
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {errors.rating && (
                    <span className="text-red-500 text-sm">{errors.rating}</span>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="title" className="block font-medium">
                    Review Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control mt-1 p-2 border border-gray-300 rounded w-full ${
                      errors.title && "border-red-500"
                    }`}
                    required
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">{errors.title}</span>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="body" className="block font-medium">
                    Review Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="body"
                    className={`form-control mt-1 p-2 border border-gray-300 rounded w-full ${
                      errors.body && "border-red-500"
                    }`}
                    rows={4}
                    required
                    onChange={handleChange}
                  />
                  {errors.body && (
                    <span className="text-red-500 text-sm">{errors.body}</span>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="images" className="block font-medium">
                    Upload Images (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#2BB673] text-white rounded hover:bg-[#239e58]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};