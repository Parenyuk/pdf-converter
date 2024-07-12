import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { PdfConverter } from './PdfConverter';
import {describe, expect, test} from "@jest/globals";
import { screen } from '@testing-library/dom'

global.fetch = jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3]))

describe('PdfConverter', () => {
    test('handleConvertToPdf converts text to PDF and updates state', async () => {
        const { getByPlaceholderText, getByText } = render(<PdfConverter />);

        // Mocking user input
        const textarea = screen.getByPlaceholderText(/Enter the text/i);
        fireEvent.change(textarea, { target: { value: 'Sample text' } });

        const title = "Convert to PDF"

        // Clicking on the Convert to PDF button
        const convertButton = screen.getByText(/Convert to PDF/i);
        fireEvent.click(convertButton);
    });

    test('handleConvertToPdf handles errors gracefully', async () => {
        // Mocking the convertTextToPdf function to throw an error
        jest.spyOn(console, 'error').mockImplementation(() => {});
        const convertTextToPdfMock = jest.fn().mockRejectedValue(new Error('Conversion failed'));

        const { getByPlaceholderText, getByText } = render(<PdfConverter />);

        // Mocking user input
        const textarea = getByPlaceholderText('Enter the text');
        fireEvent.change(textarea, { target: { value: 'Sample text' } });

        // Clicking on the Convert to PDF button
        const convertButton = screen.getByText(/Convert to PDF/i);
        fireEvent.click(convertButton);

        // Wait for the error handling process
        await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error)));
    });
});
