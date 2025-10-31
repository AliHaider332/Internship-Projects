import pdfToText from 'react-pdftotext';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createVector } from '../../server';

export const loadPDF = async (file) => {
  try {
    // Extract raw text
    const text = await pdfToText(file);
    const cleanedText = text.trim();
    if (!cleanedText) {
      throw new Error('No text content found in PDF');
    }
    // Split into chunks for further processing
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    // Use splitText() instead of splitDocuments()
    const chunks = await textSplitter.splitText(cleanedText);

    const response = await createVector(chunks);

    console.log(response.status);

    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    console.error('❌ PDF processing error:', error);
    throw new Error(`Failed to read PDF: ${error.message}`);
  }
};
