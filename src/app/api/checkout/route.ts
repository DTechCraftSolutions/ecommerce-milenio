import { fetchApi } from "@/api";
import mercadopago from "mercadopago";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
import { NextRequest } from "next/server";

mercadopago.configure({
    access_token: String(process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN),
})

export async function POST(req: NextRequest){
    const {value, items, orderId} = await req.json();
    if (!value) {
        return Response.json({
            message: "Sem valor para realizar a compra",
            value
        })
    }
    if (!items) {
        return Response.json({
            message: "Sem itens para realizar a compra",
            items
        })
    }
    try {
        const response = await mercadopago.preferences.create({
            items: items.map(({name, price, quantity, imageUrl}: any) => {
                const item: PreferenceItem = {
                    title: name,
                    unit_price: price,
                    quantity: quantity,
                    picture_url: imageUrl,
                    currency_id: "BRL",
                }
                return item
            }),
            payment_methods: {
              installments: 10
            },
            notification_url: `https://milenio-api.vercel.app/orders/approved/${orderId}`,
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        
              failure: `${process.env.NEXT_PUBLIC_APP_URL}`,
            },
          });
        return Response.json({
            ok: true,
            url: response.body.init_point
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            ok: false,
            error
        })
    }
}