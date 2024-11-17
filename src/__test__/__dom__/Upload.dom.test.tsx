import { render, screen, fireEvent } from '@testing-library/react';
import Upload from '../../pages/Upload';

describe('Upload Component', () => {
    test('handles file selection and validation', () => {
        render(<Upload />);
        const fileInput = screen.getByRole('textbox', {
            name: /userfile/i,
        }) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });

        if (fileInput.files) {
            expect(fileInput.files[0]).toEqual(file);
            expect(fileInput.files).toHaveLength(1);
        } else {
            throw new Error('File input is null');
        }
    });

    test('submits the form with a valid file', () => {
        render(<Upload />);
        const fileInput = screen.getByRole('textbox', {
            name: /userfile/i,
        }) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });

        if (fileInput.files) {
            fireEvent.click(screen.getByText('업로드 하기'));
            // Add assertions for form submission
        } else {
            throw new Error('File input is null');
        }
    });

    test('handles errors during file upload', () => {
        render(<Upload />);
        const fileInput = screen.getByRole('textbox', {
            name: /userfile/i,
        }) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });

        if (fileInput.files) {
            fireEvent.click(screen.getByText('업로드 하기'));
            // Add assertions for error handling
        } else {
            throw new Error('File input is null');
        }
    });
});
