const url = '/api/users';
export const userlogin = async (UploadData: { email: string; password: string; }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UploadData),
        });
        return response.json();
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
