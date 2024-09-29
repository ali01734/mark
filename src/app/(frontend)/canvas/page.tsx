import Product from "@/components/pages/canvas/product/Product";

// Define types for canvas data
type CanvasItem = {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: string;
  country: string[]; // Parse country as an array of strings
};

type CanvasData = {
  canvases: CanvasItem[];
};

const Page = async () => {
  let canvases: CanvasItem[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.API_URL}/api/V1/canvas`, {
      next: { revalidate: 10 }, // Cache the result and revalidate every 10 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    if (data.status === "success") {
      // Parse the country field to ensure it's an array
      canvases = data.data.canvases.map((item: any) => ({
        ...item,
        country: JSON.parse(item.country), // Convert the country field to an array of strings
      })) as CanvasItem[];
     
    } else {
      error = "Failed to load canvases.";
    }
  } catch (err) {
    error = "An error occurred while fetching the data.";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <section className="pb-20">
        <div className="container">
          <h2 className="text-center font-medium text-4xl my-10">
            Canvas Art Bestsellers
          </h2>
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-5">
              <Product canvases={canvases} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
