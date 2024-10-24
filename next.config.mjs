/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/recipes",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
