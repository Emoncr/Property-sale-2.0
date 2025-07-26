export function createMetadata({
    title = "Square Donations",
    description =
    "Trusted by thousands, Square Donations offers a reliable and user-friendly platform to manage donations and campaigns. Boost your fundraising efforts with our easy-to-use tools.",
    path = "/",
    image = "/donation.png",
    keywords = [],
    openGraph = {},
    twitter = {},
    custom = {},
} = {}) {
    const fullUrl = `https://squaredonations.com${path}`;

    const imageObj =
        typeof image === "string"
            ? {
                url: image,
                width: 1200,
                height: 630,
                alt: title,
            }
            : image;

    return {
        title,
        description,
        keywords,
        metadataBase: new URL("https://squaredonations.com"),
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName: "MyApp",
            images: [imageObj],
            type: "website",
            ...openGraph,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageObj.url],
            ...twitter,
        },
        ...custom,
    };
}
