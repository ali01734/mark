import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sliders from "@/components/pages/productDetails/Sliders";
import CanvasDetail from "@/components/pages/canvas/details/Details";

type Price = {
  id: number;
  canvas_id: number;
  size: string;
  price: number;
};

type ProductData = {
  id: number;
  title: string;
  description: string;
  rating: number;
  country: string[];
  prices: Price[];
  images: string[];
};



const fetchProductData = async (id: number): Promise<ProductData> => {

  
  const res = await fetch(`${process.env.API_URL}/api/V1/canvas-details/${id}`, {
    next: { revalidate: 10 }, // ISR, will revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  return data.data;
};

const Page = async ({ params }: { params: { id: string } }) => {
  let product: ProductData | null = null;
  let error: string | null = null;

  try {
    const id = parseInt(params.id, 10); // Convert the id from string to number
    product = await fetchProductData(id);
  } catch (err) {
    error = "An error occurred while fetching the product data.";
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Add a null check before rendering CanvasDetail
  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <main>
      <CanvasDetail product={product} />
    </main>
  );
};

export default Page;
