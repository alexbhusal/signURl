import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const body = await request.json();
  const { paramsToSign } = body;

  if (!paramsToSign || !paramsToSign.public_id) {
    return new Response(
      JSON.stringify({ error: "Missing public_id in paramsToSign" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Sign the request to obtain a signature
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  // Generate a URL for the image with a 5-minute expiration time
  const imageUrl = cloudinary.url(paramsToSign.public_id, {
    sign_url: true,
    expires: 300, // 5 minutes (300 seconds)
  });

  console.log("Generated Image URL:", imageUrl);

  return new Response(
    JSON.stringify({ signature, imageUrl }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
