/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns:[
            {
                protocol : "https",
                hostname : 'e-commerce-pied-xi.vercel.app'

            }
        ]
    }
};

export default nextConfig;
