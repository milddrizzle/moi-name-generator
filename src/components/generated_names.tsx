import { GoPlusCircle } from "react-icons/go";
import { FaRepeat } from "react-icons/fa6";
import AnimatedText from "./animated_text";
import { useEffect, useState } from "react";
import useRequestContext from "../hooks/use_request_context";


interface GeneratedNamesProps {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const GeneratedNames = ({ setStep }: GeneratedNamesProps) => {
    const { formData, setFormData, streamedData, setLoading, zodiacSign, isComplete, setStreamedData } = useRequestContext()
    const [displayList, setDisplayList] = useState<string[]>([])

    // hide state while printing
    const [showBtns, setShowBtns] = useState<boolean>(false)

    const [collectZodiac, setZodiac] = useState("")

    // Show more names when the "Show More" button is clicked
    const showMore = () => {
    setShowBtns(false); // Hide buttons while fetching

    // fetch new data
    setLoading(true)
    }

    useEffect(() => {
        if (isComplete === "finish") {
            setTimeout(() => setShowBtns(true), 500); // Wait 500ms before showing
        } else {
            setShowBtns(false);
        }
    }, [isComplete]);            


  useEffect(() => {
    if (streamedData.length > 0) {
        const newItems = streamedData?.split("--").map(item => item.trim()).filter(item => item) || [];
        setDisplayList(newItems.slice(1))
    }
  }, [streamedData])

  useEffect(() => {
    setZodiac(zodiacSign)
  }, [zodiacSign])
      
    const backToForm = () => {
        setFormData({
            gender: '',
            name_origin: 'No preference',
            meaning: 'No preference',
            due_date: '',
            not_pregnant: false,
            name_type: '',
            names_avoid: '',
            version: ''
        })
        setStreamedData(" ")
        setStep(0)
    }


    
    return (
        <section className="flex items-center p-4 md:p-12 shadow-lg font-main flex-col gap-6 rounded-lg bg-[#f8f7ee] text-black w-full max-w-2xl min-h-[400px]">
            {
                (formData.due_date !== '') ? 
                <div className="flex w-[100%] gap-2">
                    <h1 className="text-[18px] text-black self-start font-bold">
                        Here's Your Baby's Astrological Sign:
                    </h1>
                    <p className="text-[18px] text-black self-start font-bold">
                        {collectZodiac}
                    </p>
                </div> : <></>
            }
            {
                streamedData.length > 0 ? (
                    <>
                    <h1 className="text-[18px] text-black self-start font-bold">
                        Behold! Enchanting baby names we've found just for you:
                    </h1>
                    <div className="w-[100%] flex flex-col gap-4">
                        {
                            displayList.map((item) => (
                                <p key={item} className="font-sub font-extralight text-left w-[100%]">
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                    {
                        showBtns && <div className={`gap-3 sm:gap-4 w-[100%] flex-col sm:flex-row justify-center items-center ${showBtns ? 'flex' : 'hidden'}`}>
                            <button 
                            className="w-fit px-[0.75rem] text-[0.875rem] h-[2rem] min-h-[2rem] bg-[#6b6ea5] rounded-full justify-center text-white flex gap-4 items-center font-[600]" 
                            onClick={showMore}
                            >
                            <GoPlusCircle className="w-4 h-4 text-white" />
                            Show me more
                            </button>
                            <button 
                            onClick={backToForm} 
                            className="w-fit px-[0.75rem] text-[0.875rem] h-[2rem] min-h-[2rem] bg-[#6b6ea5] rounded-full justify-center text-white flex gap-4 font-[600] items-center"
                            >
                            <FaRepeat className="w-4 h-4 text-white" />
                            Start Over
                            </button>
                        </div>
                    }
                    </>
                ) : (
                    <p>No names available</p>
                )
                }
        </section>
    )
}

export default GeneratedNames