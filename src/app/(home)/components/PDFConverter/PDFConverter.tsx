"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import {useEffect, useState} from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import {convertTextToPdf} from "@/app/(home)/actions";
import packageJson from '../../../../../package.json';
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const loadConversionHistory = () => {
    if (typeof window !== "undefined") {
        const savedHistory = localStorage.getItem('pdfConversionHistory');
        if (savedHistory) {
            try {
                const parsedHistory = JSON.parse(savedHistory);
                if (Array.isArray(parsedHistory)) {
                    return parsedHistory;
                } else {
                    console.error('Invalid data format in localStorage');
                    return [];
                }
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
                return [];
            }
        }
    }
    return [];
};

export const PdfConverter = () => {
    const pdfjsVersion = packageJson.devDependencies['pdfjs-dist'];

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [text, setText] = useState('');
    const [pdfUrl, setPdfUrl] = useState<Uint8Array | null>(null);

    const [conversionHistory, setConversionHistory] = useState(loadConversionHistory());

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const history = loadConversionHistory();
        setConversionHistory(history);
    }, []);


    useEffect(() => {
        if (isClient) {
            localStorage.setItem('pdfConversionHistory', JSON.stringify(conversionHistory));
        }
    }, [conversionHistory, isClient]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('pdfConversionHistory');
        console.log('savedHistory', savedHistory);
    }, []);

    useEffect(() => {
        localStorage.setItem('pdfConversionHistory', JSON.stringify(conversionHistory));
    }, [conversionHistory]);

    const handleHistoryItemClick = async (pdfUrl: Uint8Array) => {
            try {
                setPdfUrl(pdfUrl);
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
    };


    const handleConvertToPdf = async () => {
        try {
            const pdfUrl = await convertTextToPdf(text);
            console.log('pdfUrl111', pdfUrl);
            setPdfUrl(pdfUrl);

            setConversionHistory(prevHistory => [...prevHistory, pdfUrl]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        console.log('conversionHistory', conversionHistory);
    }, [conversionHistory]);

    return (
        <div className="flex">
            <div className="flex flex-col items-center">
                <h1 className="text-xl">Pdf Converter</h1>
                <textarea
                    className="mx-0 my-2 px-4 py-3 rounded min-h-[250px] w-[50vw] resize-y"
                    rows={10}
                    placeholder="Enter the text"
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg
                    transition-transform transform focus:outline-none focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleConvertToPdf}
                >
                    Convert to PDF
                </button>

                {isClient && pdfUrl && (
                    <div className={'flex items-center h-[250px] mt-[24px] min-w-[50vw] max-w-[50vw]'}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                            <Viewer
                                fileUrl={pdfUrl}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        </Worker>
                    </div>
                )}
            </div>
            <div className='ml-[40px] min-w-[180px]'>
                <h2 className="text-xl mb-[8px]">Conversion History</h2>
                {
                    isClient && (
                        <ul className="list-disc">
                            {conversionHistory.map((item, index) => (
                                <li key={index} className="text-blue-500 cursor-pointer list-none"
                                    onClick={() => handleHistoryItemClick(item)}>
                                    Converted Document {index + 1}
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
};
