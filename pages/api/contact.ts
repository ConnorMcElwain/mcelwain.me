import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { field1, field2, field3 } = req.body;

    if (!field1 || !field2 || !field3) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const apiKey = process.env.FORMBEE_API_KEY;
    if (!apiKey) {
      console.error("Missing FormBee API key");
      return res.status(500).json({ message: "Server configuration error" });
    }

    console.log("Sending request to FormBee...");

    const response = await fetch(`https://api.formbee.io/v1/forms/${apiKey}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ field1, field2, field3 }),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      console.error("FormBee Error:", responseData);
      return res.status(response.status).json({ message: responseData.message || "Form submission failed" });
    }

    console.log("Form submitted successfully:", responseData);
    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
