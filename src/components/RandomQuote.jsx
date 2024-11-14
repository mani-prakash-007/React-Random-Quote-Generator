import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaCopy } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RandomQuote = () => {
  //State
  const [quote, setQuote] = useState();

  //Function for Reader
  const handleReader = () => {
    const reader = new SpeechSynthesisUtterance(
      `${quote.quote} by ${quote.author}`
    );
    speechSynthesis.speak(reader);
  };

  //Function for Copying Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(quote.quote);
    toast.success("Quote copied to clipboard");
  };

  //Function
  const handleTweet = () => {
    const tweeturl = `https://x.com/intent/tweet?url=${quote.content}`;
    window.open(tweeturl, "_blank");
  };
  //Function
  const fetchQuote = async () => {
    try {
      const apiUrl = "https://qapi.vercel.app/api/random";
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setQuote(response.data);
    } catch (error) {
      setQuote(error);
    }
  };
  //Side Effects
  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center border border-black bg-white lg:w-156 md:w-120 sm:w-108 w-108 mx-5 min-h-80 my-40 rounded-3xl">
        <div className="my-2 mx-5">
          <h1 className="font-bold text-4xl my-3 text-center">
            Quote of the Day
          </h1>
        </div>
        <div className="text-wrap my-5 mx-5 px-5">
          <div className="flex justify-center my-3 px-2">
            <FaQuoteLeft className="mx-2 text-xl" />
            <h1 className="font-poppins text-xl text-center my-2">
              {quote?.quote}
            </h1>
            <FaQuoteRight className="mx-2 text-xl" />
          </div>
          <p className="italic font-poppins text-end text-lg font-semibold mx-6">
            - {quote?.author}
          </p>
        </div>

        <div className="flex justify-center">
          <hr className="border w-132" />
        </div>
        <div className="flex justify-between py-5 my-2 mx-5">
          <div className="flex w-full mx-3 h-12">
            <button
              onClick={handleReader}
              className="border border-gray-400 bg-custom-gradient rounded-full text-xl p-3 active:scale-90 mx-2 hover:text-gray-500"
            >
              <HiMiniSpeakerWave />
            </button>
            <div>
              <button
                onClick={handleCopy}
                className="border border-gray-400 bg-custom-gradient rounded-full text-xl p-3 active:scale-90 mx-2 hover:text-gray-500"
              >
                <FaCopy />
              </button>
              <ToastContainer />
            </div>
            <button
              onClick={handleTweet}
              className="border border-gray-400 rounded-full bg-custom-gradient text-xl p-3 active:scale-90 mx-2 hover:text-gray-500"
            >
              <BsTwitterX />
            </button>
          </div>
          <div className="w-full mx-3 flex justify-end px-3">
            <button
              onClick={fetchQuote}
              className="border font-poppins font-thin border-gray-400 w-40 h-full bg-custom-gradient rounded-3xl active:scale-90"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
