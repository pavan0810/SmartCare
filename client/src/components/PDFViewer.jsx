import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useState } from 'react'
export default function PDFViewer(props) {
    console.log(props.filePath)
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
    ).toString();

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function prevButtonClick() {
        setPageNumber(function(prevPageNumber) {
            return prevPageNumber - 1;
        })
    }

    function nextButtonClick() {
        setPageNumber(function(prevPageNumber) {
            return prevPageNumber + 1;
        })
    }
    return(
        <div>
            <button onClick={prevButtonClick} disabled={pageNumber <= 1}>Prev</button>
            <button onClick={nextButtonClick} disabled={pageNumber >= numPages}>Next</button>
            <Document file={props.filePath} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}