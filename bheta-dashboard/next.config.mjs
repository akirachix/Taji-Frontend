/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', 
                hostname: 'maps.google.com',
                port: '',
                pathname: '/mapfiles/ms/icons/**', 
            },
        ],
    },
};

export default nextConfig;