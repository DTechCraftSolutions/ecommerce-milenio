import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceItem } from 'mercadopago/models/preferences/create-payload.model';
import { NextRequest, NextResponse } from 'next/server';

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN as string,
});

export async function POST(req: NextRequest) {
  try {
    // Lendo os dados do corpo da requisição
    const { value, items, orderId } = await req.json();

    // Validações
    if (!value) {
      return NextResponse.json(
        { message: 'Sem valor para realizar a compra', value },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: 'Sem itens para realizar a compra', items },
        { status: 400 }
      );
    }

    // Criação da preferência de pagamento
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map(
          ({ name, price, quantity, imageUrl }: any): PreferenceItem => ({
            title: name,
            unit_price: price,
            quantity,
            picture_url: imageUrl,
            currency_id: 'BRL',
          })
        ),
        payment_methods: {
          installments: 10, // Limite de parcelas
        },
        notification_url: `https://milenio-api.vercel.app/orders/approved/${orderId}`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/failure`,
        },
        auto_return: 'approved',
      },
    });

    // Retorno da URL do Checkout Pro
    return NextResponse.json(
      { ok: true, url: response.init_point },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao criar a preferência:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Erro inesperado' },
      { status: 500 }
    );
  }
}
