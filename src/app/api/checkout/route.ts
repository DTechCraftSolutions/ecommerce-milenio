import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { value, items, orderId, shippingCost, customerId, paymentMethod } = await req.json();

    if (!value || value <= 0) {
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

    // Monta descrição dos itens (+ frete se houver)
    const description =
      items.map((item: any) => `${item.quantity}x ${item.description}`).join(', ') +
      (shippingCost > 0 ? ', Frete' : '');

    // Calcula dueDate (3 dias à frente)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const dueDateStr = dueDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

    const paymentMethodAsaas = {
      'credit': {
        billingType: 'CREDIT_CARD',
        chargeType: 'INSTALLMENT',
      },
      'pix': {
        billingType: 'PIX',
        chargeType: 'DETACHED',
      },
      'boleto': {
        billingType: 'BOLETO',
        chargeType: 'DETACHED',
      }
    }
 

    // Payload para o Asaas
    const payload: any = {
      name: `Pedido #${orderId}`,
      description,
      billingType: paymentMethodAsaas[paymentMethod as keyof typeof paymentMethodAsaas].billingType,       // Permite boleto, pix, cartão de crédito e débito
      chargeType: paymentMethodAsaas[paymentMethod as keyof typeof paymentMethodAsaas].chargeType,
      value: Number(value),
      dueDate: dueDateStr,
      dueDateLimitDays: 3,
      maxInstallmentCount: value > 20 ? 12 : 1,
      notificationEnabled: true,
      callbackUrl: {
        successUrl: `${process.env.APP_URL}`,
      }
    };

    if (customerId) {
      payload.customer = customerId;
    }


    const endpointAsaas = process.env.AMBIENT === 'production' ? 'https://api.asaas.com/v3/paymentLinks' : 'https://sandbox.asaas.com/api/v3/paymentLinks';
    
    let asaasData: any = null;
    
    try {
      const asaasResponse = await axios.post(endpointAsaas, payload, {
        headers: {
          'Content-Type': 'application/json',
          'access_token': `$${process.env.ASAAS_API_KEY!}`
        }
      });
      
      asaasData = asaasResponse.data;
    } catch (error: any) {
      const msg = error.response?.data?.errors || error.message || 'Erro ao criar payment link';
      return NextResponse.json(
        { ok: false, error: msg },
        { status: error.response?.status || 500 }
      );
    }
    
    // Verifica se veio url
    if (!asaasData || !asaasData.url) {
      const msg = asaasData?.errors || 'Nenhuma URL de pagamento retornada';
      return NextResponse.json(
        { ok: false, error: msg },
        { status: 500 }
      );
    }



    try {
      const apiURL = process.env.API_URL || 'http://localhost:3333';
      const paymentData = {
        asaasId: asaasData.id,
        orderId,
        value,
        url: asaasData.url,
        status: asaasData.status || 'PENDING',
      };
      
      console.log('Registrando pagamento na API:', { apiURL, paymentData });
      
      await axios.post(`${apiURL}/payments`, paymentData, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } catch (e) {
      console.error('Erro ao registrar pagamento na API:', e);
    }


    // Sucesso: retorna { ok: true, url }
    return NextResponse.json(
      { ok: true, url: asaasData.url },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Erro ao criar payment link Asaas:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Erro inesperado' },
      { status: 500 }
    );
  }
}
