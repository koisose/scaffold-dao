"use server"
import { client } from "@gradio/client";
type ImageData = {
    path: string;
    url: string;
    size: number | null;
    orig_name: string;
    mime_type: string | null;
    is_stream: boolean;
};

async function generateImage(prompt:string):Promise<ImageData[]>{
    const app = await client("multimodalart/stable-cascade");
    const result = await app.predict("/run", [		
                    prompt, // string  in 'Prompt' Textbox component		
                    "", // string  in 'Negative prompt' Textbox component		
                    0, // number (numeric value between 0 and 2147483647) in 'Seed' Slider component		
                    1024, // number (numeric value between 1024 and 1536) in 'Width' Slider component		
                    1024, // number (numeric value between 1024 and 1536) in 'Height' Slider component		
                    10, // number (numeric value between 10 and 30) in 'Prior Inference Steps' Slider component		
                    0, // number (numeric value between 0 and 20) in 'Prior Guidance Scale' Slider component		
                    4, // number (numeric value between 4 and 12) in 'Decoder Inference Steps' Slider component		
                    0, // number (numeric value between 0 and 0) in 'Decoder Guidance Scale' Slider component		
                    1, // number (numeric value between 1 and 2) in 'Number of Images' Slider component
        ]);
    
    if (result && 'data' in result && Array.isArray(result.data)) {
        return result.data as ImageData[];
    } else {
        return [];
    }
}
