"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useState } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import {convertTextToPdf} from "@/app/(home)/actions";
import packageJson from '../../../../../package.json';

type ComponentType = {}

export const PdfConverter = ({}: ComponentType) => {
    const pdfjsVersion = packageJson.devDependencies['pdfjs-dist'];

    const [text, setText] = useState('');
    const [pdfUrl, setPdfUrl] = useState<Uint8Array>(null);


    const handleConvertToPdf = async () => {
        try {
            const pdfUrl = await convertTextToPdf(text);
            console.log('pdfUrl', pdfUrl);
            setPdfUrl(pdfUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl">Pdf Converter</h1>
            <textarea
                className="mx-0 my-2 px-4 py-3 rounded min-h-[250px] min-w-[400px] resize-y"
                rows="10"
                placeholder="Enter the text"
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-transform transform focus:outline-none focus:ring-blue-300 focus:ring-opacity-50"
                onClick={handleConvertToPdf}
            >
                Convert to PDF
            </button>

            <div className="h-screen w-screen">
                {pdfUrl && (
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl={pdfUrl}
                            style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '350px' }}
                        />
                    </Worker>
                )}
            </div>
        </div>
    );
};
