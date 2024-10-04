import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Upload from '../pages/Upload';

jest.mock('axios');

describe('Upload Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component', () => {
        render(<Upload />);
        expect(screen.getByText('업로드 하기')).toBeInTheDocument();
    });

    test('handles file selection and validation', () => {
        render(<Upload />);
        const fileInput = screen.getByLabelText(
            /userfile/i
        ) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });
        if (fileInput.files) {
            expect(fileInput.files[0]).toBe(file);
        }
    });

    test('submits the form with a valid file', async () => {
        const mockPost = axios.post as jest.Mock;
        mockPost.mockResolvedValue({ data: 'success' });

        render(<Upload />);
        const fileInput = screen.getByLabelText(
            /userfile/i
        ) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });
        if (fileInput.files) {
            fireEvent.click(screen.getByText('업로드 하기'));

            await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
            expect(mockPost).toHaveBeenCalledWith(
                '/upload',
                expect.any(FormData),
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
        }
    });

    test('handles errors during file upload', async () => {
        const mockPost = axios.post as jest.Mock;
        mockPost.mockRejectedValue(new Error('Upload failed'));

        render(<Upload />);
        const fileInput = screen.getByLabelText(
            /userfile/i
        ) as HTMLInputElement;
        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png',
        });

        fireEvent.change(fileInput, { target: { files: [file] } });
        if (fileInput.files) {
            fireEvent.click(screen.getByText('업로드 하기'));

            await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
            expect(screen.getByText('돌아가')).toBeInTheDocument();
        }
    });
});
