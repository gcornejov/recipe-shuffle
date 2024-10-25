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
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: '32xjxyiu7vyafojx.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;
