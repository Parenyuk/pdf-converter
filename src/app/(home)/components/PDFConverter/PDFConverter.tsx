

type ComponentType = {

}

export const PdfConverter = ({}: ComponentType) => {
    return (<div className={`flex flex-col items-center`}>
        <h1 className={'text-xl'}>Pdf Converter</h1>
        <textarea className="mx-[0] my-[8px] px-[16px] py-[12px] rounded-[8px] min-h-[250px] min-w-[400px] resize-y" />
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg 
        transition-transform transform focus:outline-none 
        focus:ring-blue-300 focus:ring-opacity-50`}>Convert to PDF</button>
    </div>)
};
