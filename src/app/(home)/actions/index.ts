"use server"

export async function convertTextToPdf(text: string) {
  const url = `http://95.217.134.12:4010/create-pdf?apiKey=${process.env.API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (response.ok) {
      const res = await response.blob();
      const blob = new Blob([res], { type: 'application/pdf' });
      const uintArr = new Uint8Array(await blob.arrayBuffer());
      return uintArr;
    }
    throw new Error(`Failed to create PDF: ${response.statusText}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
