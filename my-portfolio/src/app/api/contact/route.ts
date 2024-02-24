import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";
import { NEXT_PUBLIC_DISCORD } from "../../../../config/index.";

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string()
})

const WEBHOOK_URL = NEXT_PUBLIC_DISCORD!

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name, email, message} = bodySchema.parse(body);

    const messageData = {
      "embeds": [
        {
          "type": "rich",
          "title": `Mensagem de Contato`,
          "description": `você recebeu uma nova mensagem`,
          "color": 0x830a0a,
          "fields": [
            {
              "name": `Nome`,
              "value": name,
              "inline": true
            },
            {
              "name": `Email`,
              "value": email,
              "inline": true
            },
            {
              "name": `Mensagem`,
              "value": message
            }
          ]
        }
      ]
    };

    await axios.post(WEBHOOK_URL, messageData)

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso!'
    })

  } catch (error) {
    console.log(error);
    return  NextResponse.error();
  }
}