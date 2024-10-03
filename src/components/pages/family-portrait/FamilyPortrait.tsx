'use client';
import Link from "next/link";
import payment from "@/assets/shared/payment.png";
import Image from "next/image";
import Accordion from "./Accordion";
import ImageZoom from "./ImageZoom";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};


type PrintData = {
  id: number;
  name: string;
  country_id: number;
  amount: string;
  product_id: number;
  oil_paint_status: number;
};

type CanvasData = {
  id: number;
  name: string;
  country_id: number;
  amount: string;
};

type CountryData = {
  id: number;
  name: string;
  priority: number;
  code: string;
};

type OilPrintStatus = boolean;
type Portrait = object;

type DetailsSectionProps = {
  product: Product;
  printData: PrintData[];
  canvasData: CanvasData[];
  countryData: CountryData[];
  oilPrintStatus: OilPrintStatus;
  portrait: Portrait;

};



interface currencySessionData {
  countryCode?: string;
  currencySym?: string; 
  currencyValue?: number; 
  countryId?: number; 
}

const fetchPrintFrame = async (productId: number, countryId: number) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/V1/get-print-frame/${productId}/${countryId}`;
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API response status:", res.status);
      throw new Error(`Failed to fetch product data: ${res.status}`);
    }

    const responseData = await res.json();
    const resData = responseData.data;
    return resData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};


const DetailsSection: React.FC<DetailsSectionProps> = ({ 
  product, 
  printData: initialPrintData,
  canvasData: initialCanvasData,
  countryData, 
  oilPrintStatus, 
  portrait  
}) => {

  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState('choisir');
  const [selectedPrint, setSelectedPrint] = useState<PrintData | null>(null);
  const [selectedCanvas, setSelectedCanvas] = useState<CanvasData | null>(null);
  const [country, setCountry] = useState<number | null>(null);

  const [numPeople, setNumPeople] = useState<number>(0); // Default to 1 person
  const [printData, setPrintData] = useState<PrintData[]>(initialPrintData);
  const [canvasData, setCanvasData] = useState<CanvasData[]>(initialCanvasData);
  const [notes, setNotes] = useState<string | null>(null);
  const [selectedRadioColor, setSelectedRadioColor] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // For multiple images
  const [imageInputs, setImageInputs] = useState<string[]>(["upload-1"]);
  const [reviews, setReviews] = useState([]);
  const [curSession, setCurSession] = useState<currencySessionData>({});
  const [errors, setErrors] = useState({
    people: '',
    canvas: '',
    print: '',
    color: '',
    style: '',
  });

  const searchParams = useSearchParams();
  const qValue = searchParams?.get('q') || 0;



  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/reviews?product_id=${product.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReviews(data.data); // Assuming the response structure contains reviews in data.data
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    fetchReviews();
}, [product.id]); // Fetch reviews when productId changes




  useEffect(() => {
    let currencySession = JSON.parse(localStorage.getItem("currencySession") || "[]");
    if (currencySession) {
      setCurSession(currencySession)
      setCountry(currencySession.countryId )

    }

    const savedStyle = localStorage.getItem('selectedStyle');
    if (savedStyle) {
      setSelectedStyle(savedStyle); // Restore saved selection
    }

    if(qValue){
      setSelectedStyle('choisir')
    }
  }, [qValue]);

  const handleChange = (event:any) => {
    const newValue = event.target.value;
    setErrors((prevErrors) => ({ ...prevErrors, style: '' }));
    setSelectedStyle(newValue);
    localStorage.setItem('selectedStyle', newValue);
    if (newValue && newValue !== 'choisir') {
      router.push(`/family-portrait/${newValue}`); 
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioColor(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, color: '' }));
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleCheckboxChange = (print: PrintData) => {
    setSelectedPrint(print);
    setErrors((prevErrors) => ({ ...prevErrors, print: '' }));
  };

  const canvasHandleCheckboxChange = (canvas: CanvasData) => {
    setSelectedCanvas(canvas);
    setErrors((prevErrors) => ({ ...prevErrors, canvas: '' }));
  };

  const handlePeopleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNumPeople(parseInt(event.target.value, 10));
    setErrors((prevErrors) => ({ ...prevErrors, people: '' }));
  };

  const printPrice: number = selectedPrint ? parseFloat(selectedPrint.amount) * (curSession.currencyValue || 1) : 0;
  const canvasPrice: number = selectedCanvas ? parseFloat(selectedCanvas.amount) * (curSession.currencyValue || 1) : 0;

  
  const peoplePrice: number = (numPeople > 0) 
  ? (Number(product.price) * (numPeople - 1) * (curSession.currencyValue || 1)) 
  : 0;
  
  // Calculate the total price
  const totalPrice: number =
  (Number(product.price) * (curSession.currencyValue || 1) || 0) + // Include currencyValue
  printPrice +
  canvasPrice +
  peoplePrice; 
  
  const handleCountryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const productId = product.id; 
    const countryId = parseInt(event.target.value, 10);
    setCountry(countryId)
    const frameData = await fetchPrintFrame(productId, countryId);
    if (frameData) {
      setCanvasData(frameData.canvas);  // Assuming the response has a `canvasOptions` array
      setPrintData(frameData.print); 
    }
  };

 
  // Handler to add more image inputs
  const handleAddImageInput = () => {
    const newInputId = `upload-${imageInputs.length + 1}`;
    setImageInputs([...imageInputs, newInputId]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages(filesArray);
    }
  };
  
  const addToCart = async () => {
    try {


      let isValid = true;
      const newErrors = { people: '', canvas: '', print: '', color: '', style: '' };
  
      if (numPeople === 0 ) {
        newErrors.people = 'Please select how many people/pets.';
        isValid = false;
      }
  
      if (!selectedPrint && !selectedCanvas) {
        newErrors.canvas = 'Please select a canvas option.';
        isValid = false;
      }
  
      if (!selectedPrint && !selectedCanvas) {
        newErrors.print = 'Please select if you want to add a print with frame.';
        isValid = false;
      }
  
      if (selectedPrint && printPrice >= 1 && !selectedRadioColor) {
        newErrors.color = 'Please select a frame color.';
        isValid = false;
      }

      if (selectedStyle === "choisir") {
        newErrors.style = 'Please select a style.';
        isValid = false;
      }
  
      setErrors(newErrors);

      if (isValid) {
        const formData = new FormData();
        formData.append('product_id', product.id.toString());
        formData.append('person', numPeople.toString());
        formData.append('canvasPrint', selectedPrint ? String(selectedPrint.id) : '');
        formData.append('canvasOption', selectedCanvas ? String(selectedCanvas.id) : '');
        formData.append('radioColor', selectedRadioColor ? selectedRadioColor : '');
        formData.append('country', String(country));
        formData.append('notes', notes ? notes : '');
        selectedImages.forEach((image, index) => {
          formData.append(`filenames[${index}]`, image);
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/cart-insert`, {
          method: 'POST',
          body: formData,
        });
        console.log(response)
        if (response.ok) {
          const result = await response.json();
          const cartItem = {
            price: result.data.price,
            id: result.data.productId, 
            productTitle: result.data.productTitle, 
            person:result.data.person,
            country: result.data.country,
            canvasOption: result.data.canvasOption,
            canvasPrint: result.data.canvasPrint,
            canvasOptionName: result.data.canvasOptionName,
            canvasPrintName: result.data.canvasPrintName,
            radioColor: result.data.radioColor,
            notes: result.data.notes,
            image:result.data.image,
            imgId:result.data.imageId
          };

          let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
          // Check if item already exists in cart
          const existingItemIndex = cartItems.findIndex(
            (item: any) => item.id === cartItem.id && item.canvasPrint === cartItem.canvasPrint && item.canvasOption === cartItem.canvasOption
          );

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            cartItems[existingItemIndex].quantity += 1; // Increment quantity by 1
          } else {
            // Add new item if it doesn't exist
            cartItems.push({ ...cartItem, quantity: 1 }); // Start with quantity of 1
          }

          // Save updated cart items to localStorage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          console.log("Updated cart items:", cartItems);
          console.log('Cart added successfully:', result);
          router.push('/carts');
        } else {
          console.error('Failed to add to cart:', response.statusText);
          alert('Failed to add to cart');
        }
      }

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };



  return (
    <section>
      <div className="container mx-auto px-5 lg:px-10">
        <nav className="mt-[48px] pb-4">
          <ul className="flex text-[#5B6063] text-xl font-semibold py-[5px] px-[2px]">
            <li>
              <Link href={"/"} className="px-[5px]">Home</Link>
            </li>
            <li>
              <Link href={"/"}>{product.title}</Link>
            </li>
          </ul>
        </nav>
        <div className="grid lg:grid-cols-2 gap-10 relative z-10 overflow-hidden">
          <div>
            {/* Replace static ImageZoom with the product image */}
            <ImageZoom images={product.images} />
          </div>
          <div>
            <div>
              <h2 className="font-medium text-xl md:text-3xl ">{product.title}</h2>
              <span className="text-blue-600 text-[15px] ">Review (0)</span>
            </div>
            <div className="pt-10">
              <h3 className="text-[#2BB673] font-bold text-[1.75rem]">
                {totalPrice.toFixed(2)} <span className="font-bold">({curSession.currencySym ?? "GBP"})</span>
              </h3>
              <p className="text-[#69727B] mb-4">
                <span className="underline">Shipping</span> calculated at
                checkout.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="font-bold mb-2">Order in 3 easy steps</h2>
              <ul className="list-decimal pl-10 text-[#69727B] flex flex-col gap-4">
                <li>
                  <p>Choose the number of people you would like to draw?</p>
                </li>
                <li>
                  <p>Upload below the photos of the people for drawing.</p>
                </li>
                <li>
                  <p>Select your delivery method.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-4 mb-5">
              <label htmlFor="style-select" className="block text-lg">
                Hand Drawing Family Pencil Portraits
              </label>
              <select
                  id="style-select"
                  className="form-control block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                  name="apports"
                  value={selectedStyle}
                  onChange={handleChange}
                >
                  <option value="choisir" disabled>
                    Choose your style
                  </option>
                  {Object.entries(portrait).map(([title, id]) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
                {errors.style && <p className="text-red-500">{errors.style}</p>}
            </div>

          
            {/* Country selection */}
            <div className="space-y-4 mb-5">
              <label htmlFor="country-select" className="block text-lg">
                Where are you based? (MUST BE SELECTED):
              </label>
              <select
                  id="country-select"
                  className="form-control block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                  name="apports"
                  value={country ? country : "choisir"} // Set the selected value
                  onChange={handleCountryChange}
                >
                  <option value="choisir" disabled>
                    Choose a country
                  </option>
                  {countryData.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                
            </div>

            <div className="space-y-4 mb-5">
                <div>
                  <label htmlFor="another-country-select" className="block text-[15px]">
                    How many people / pets?: +{' '}
                    <span className="font-bold">
                      {peoplePrice.toFixed(2)}
                    </span>{' '}
                    <span>({curSession.currencySym ?? "GBP"})</span>
                  </label>
                  <select
                      id="another-country-select"
                      className="form-control block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                      name="apports"
                      defaultValue="0"
                      onChange={handlePeopleChange}
                      required 
                    >
                    <option value="0" disabled>Choose One</option>
                    {Array.from({ length: 30 }, (_, index) => index + 1).map(num => (
                      <option key={num} value={num}>
                        {num} People
                      </option>
                    ))}
                  </select>
                  {errors.people && <p className="text-red-500">{errors.people}</p>}
                </div>
              </div>

              {/* Canvas Option */}

              {!oilPrintStatus && (
                <div className="space-y-4 mb-5">
                  <div>
                    <label htmlFor="people">Canvas Options? (pick as many as you like): + </label>
                    <strong>{canvasPrice.toFixed(2)}</strong>
                    <span>&nbsp;&nbsp;({curSession.currencySym ?? "GBP"})</span> <br />
                    <div className="grid grid-cols-3 gap-5 mt-5 text-[15px]">
                      {canvasData.map((canvas) => (
                        <div key={canvas.id} className="flex gap-2 items-center">
                          <input
                            id={`frame-${canvas.id}`}
                            className="form-check-input canvas-Print"
                            type="checkbox"
                            name="canvasPrint[]"
                            value={canvas.id}
                            checked={selectedCanvas?.id === canvas.id}
                            onChange={() => canvasHandleCheckboxChange(canvas)}
                          />
                          <label className="form-check-label" htmlFor={`frame-${canvas.id}`}>
                            {canvas.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.canvas && <p className="text-red-500">{errors.canvas}</p>}
         
                  </div>
                </div>
              )}
            {/* Add a print with frame */}
            <div className="space-y-4 mb-5">
              <div>
                <label htmlFor="people">Add a print with frame?: + </label>
                <strong>{printPrice.toFixed(2)}</strong>
                <span>&nbsp;&nbsp;({curSession.currencySym ?? "GBP"})</span> <br />
                <div className="grid grid-cols-3 gap-5 mt-5 text-[15px]">
                  {printData.map((print) => (
                    <div key={print.id} className="flex gap-2 items-center">
                      <input
                        id={`frame-${print.id}`}
                        className="form-check-input canvas-Print"
                        type="checkbox"
                        name="canvasPrint[]"
                        value={print.id}
                        checked={selectedPrint?.id === print.id}
                        onChange={() => handleCheckboxChange(print)}
                      />
                      <label className="form-check-label" htmlFor={`frame-${print.id}`}>
                        {print.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.print && <p className="text-red-500">{errors.print}</p>}
              </div>
            </div>

            {printPrice >= 1 && (
              <div className="space-y-4 mb-5">
                <div>
                  <label htmlFor="frameColor" className="block text-sm font-medium">
                    Select Frame Color:
                  </label>
                  <div id="frameColorInput" className="flex flex-wrap gap-5 mt-5 text-sm">
                    <div className="flex items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioColor"
                        id="blackColor"
                        value="Black"
                        onChange={handleColorChange}
                      />
                      <label className="ml-2" htmlFor="blackColor">
                        Black
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioColor"
                        id="walnutColor"
                        value="Walnut"
                        onChange={handleColorChange}
                      />
                      <label className="ml-2" htmlFor="walnutColor">
                        Walnut
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioColor"
                        id="OAKColor"
                        value="OAK"
                        onChange={handleColorChange}
                      />
                      <label className="ml-2" htmlFor="OAKColor">
                        OAK
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioColor"
                        id="WhiteColor"
                        value="White"
                        disabled
                      />
                      <label className="ml-2" htmlFor="WhiteColor">
                        White <span className="text-red-500">(out of stock)</span>
                      </label>
                    </div>
                  </div>
                  {errors.color && <p className="text-red-500">{errors.color}</p>}
                </div>
              </div>
             )}


            <div className="">
              <label htmlFor="cmnt" className="mb-2 block">
                Add any notes?
              </label>
              <textarea
                id="cmnt"
                cols={30}
                rows={4}
                name="notes"
                onChange={handleNotesChange} 
                className="border border-gray-300 rounded-md w-full p-2"
              ></textarea>
            </div>

            {/* Upload images section */}
            <div className="mt-5">
                <label htmlFor="upload" className="block mb-1">
                  Upload Images?
                </label>

                  {imageInputs.map((inputId, index) => (
                    <div
                      key={inputId}
                      className="border border-[#ced4da] text-[#495057] mt-1 p-1 flex items-center"
                    >
                      <div className="w-1/2">
                        <input
                          type="file"
                          id={inputId}
                          name="upload"
                          className="w-full"
                          aria-label={`Upload Image ${index + 1}`}
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  ))}
                
                <div className="flex justify-end w-full mt-2">
                <button
                  className="bg-[#28a745] px-4 py-[6px] text-white rounded shadow transition-transform duration-300 ease-in-out hover:bg-[#239e58] hover:shadow-lg mb-1 text-xs"
                  onClick={handleAddImageInput}
                  aria-label="Attach More Images"
                  type="button"
                >
                  Attach More Images
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="mt-5">
              <button
               
                aria-label="Add to Cart"
                className="bg-[#2BB673] px-[10px] py-[5px] text-white font-bold text-lg rounded shadow transition-transform duration-300 ease-in-out hover:bg-[#239e58] hover:shadow-lg"
                id="Cart"
                onClick={addToCart}
                type="button"
              >
                Add to Cart
              </button>
            </div>

            {/* Payment section */}
            <div className="mt-2 font-bold">
              <p className="text-[#28a745]">Secure Checkout With</p>
            </div>
            <div>
              <Image className="w-[162px]" src={payment} alt="payment" />
            </div>
          </div>
        </div>
        <div>
        <Accordion productId={product.id} description={product.description} reviews={reviews} />
        </div>
      </div>
    </section>
  );
};
export default DetailsSection;
