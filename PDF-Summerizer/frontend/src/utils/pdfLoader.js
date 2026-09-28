import pdfToText from 'react-pdftotext';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createVector } from '../../server';

const MAX_SIZE = 10 * 1024 * 1024;

export const loadPDF = async (file) => {
  try {
    if (!file) throw new Error('No file provided');
    if (file.type !== 'application/pdf') throw new Error('Only PDF files are supported');
    if (file.size > MAX_SIZE) throw new Error('File size must be less than 10MB');

    const rawText = await pdfToText(file);
    const cleanedText = (rawText || '').trim();

    if (!cleanedText) {
      throw new Error('No readable text found in PDF (it may be scanned/image-only)');
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitText(cleanedText);

    if (!chunks?.length) throw new Error('Failed to split PDF into usable chunks');

    const response = await createVector(chunks);

    return {
      success: true,
      status: response?.status ?? 500,
      message: response?.message,
    };
  } catch (error) {
    throw new Error(`Failed to process PDF: ${error.message}`);
  }
};