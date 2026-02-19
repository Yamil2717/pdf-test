import { PDF } from '@libpdf/core';
import { MARGINS, SECTION_GAP, SUB_GAP, LOGO_URL } from './config';
import { newPage, fmt } from './core';
import { generateData } from './data';
import type { Renderer } from './types';

export async function generateEstadoCuenta(renderer: Renderer): Promise<Uint8Array> {
    const pdf = PDF.create();
    const data = generateData();

    const logoBytes = new Uint8Array(await (await fetch(LOGO_URL)).arrayBuffer());
    const logo = pdf.embedPng(logoBytes);

    let c = newPage(pdf, 1, logo);

    const c1 = MARGINS.left + 12;
    const c2 = MARGINS.left + 140;
    const c3 = c.W - MARGINS.right - 80;

    c.page.drawImage(logo, {
        x: c.W - MARGINS.right - 130, y: c.yPos - 40,
        width: 130, height: 50,
    });
    c.page.drawText('Estado de cuenta', {
        x: MARGINS.left, y: c.yPos, size: 14, color: renderer.colors.title,
    });
    c.yPos -= 18;
    c.page.drawText(`Cliente: ${data.cliente.documento} - ${data.cliente.nombre}`, {
        x: MARGINS.left, y: c.yPos, size: 8.5, color: renderer.colors.info,
    });
    c.yPos -= 14;
    c.page.drawText(`Fecha de impresión: ${data.cliente.fechaImpresion}`, {
        x: MARGINS.left, y: c.yPos, size: 8.5, color: renderer.colors.info,
    });
    c.yPos -= SECTION_GAP;

    c = renderer.mainTitle(c, 'LO QUE TENGO');

    c = renderer.subTitle(c, 'Cuentas de ahorros');
    c = renderer.drawTable(c,
        [{ text: 'Referencia', x: c1 }, { text: 'Concepto', x: c2 }, { text: 'Saldo total', x: c3 }],
        data.cuentasAhorro.map(r => [
            { text: r.referencia, x: c1 }, { text: r.concepto, x: c2 }, { text: fmt(r.saldo), x: c3 },
        ]),
    );
    c.yPos -= SECTION_GAP;

    c = renderer.subTitle(c, 'Aportes');
    c = renderer.drawTable(c,
        [{ text: 'Referencia', x: c1 }, { text: 'Concepto', x: c2 }, { text: 'Saldo total', x: c3 }],
        data.aportes.map(r => [
            { text: r.referencia, x: c1 }, { text: r.concepto, x: c2 }, { text: fmt(r.saldo), x: c3 },
        ]),
    );
    c.yPos -= SECTION_GAP;

    c = renderer.subTitle(c, 'Ahorros programados');
    c = renderer.drawTable(c,
        [{ text: 'Referencia', x: c1 }, { text: 'Concepto', x: c2 }, { text: 'Saldo total', x: c3 }],
        data.ahorrosProgramados.map(r => [
            { text: r.referencia, x: c1 }, { text: r.concepto, x: c2 }, { text: fmt(r.saldo), x: c3 },
        ]),
    );
    c.yPos -= SECTION_GAP;

    c = renderer.subTitle(c, 'CDATs');
    c = renderer.drawTable(c,
        [{ text: 'Referencia', x: c1 }, { text: 'Concepto', x: c2 }, { text: 'Saldo total', x: c3 }],
        data.cdats.map(r => [
            { text: r.referencia, x: c1 }, { text: r.concepto, x: c2 }, { text: fmt(r.saldo), x: c3 },
        ]),
    );
    c.yPos -= SECTION_GAP;

    const cc1 = MARGINS.left + 12;
    const cc2 = MARGINS.left + 175;
    const cc3 = MARGINS.left + 310;
    const cc4 = c.W - MARGINS.right - 80;

    c = renderer.subTitle(c, 'Compromisos de ahorro');
    c = renderer.drawTable(c,
        [
            { text: 'Concepto', x: cc1 }, { text: 'Compromiso', x: cc2 },
            { text: 'Fecha de pago', x: cc3 }, { text: 'Próximo pago', x: cc4 },
        ],
        data.compromisosAhorro.map(r => [
            { text: r.concepto, x: cc1 }, { text: r.compromiso, x: cc2 },
            { text: r.fechaPago, x: cc3 }, { text: r.proximoPago, x: cc4 },
        ]),
    );
    c.yPos -= SECTION_GAP * 1.5;

    c = renderer.mainTitle(c, 'LO QUE DEBO');

    const rc1 = MARGINS.left + 12;
    const rc2 = c.W - MARGINS.right - 200;
    const rc3 = c.W - MARGINS.right - 80;

    c = renderer.subTitle(c, 'Resumen');
    c = renderer.drawTable(c,
        [
            { text: 'Concepto', x: rc1 },
            { text: 'Fecha próximo\nvencimiento', x: rc2 },
            { text: 'Valor próximo\nvencimiento', x: rc3 },
        ],
        data.creditos.map(r => [
            { text: `${r.referencia} - ${r.concepto}`.substring(0, 55), x: rc1 },
            { text: r.fechaProximoVencimiento, x: rc2 },
            { text: fmt(r.valorProximoVencimiento), x: rc3 },
        ]),
    );
    c.yPos -= SECTION_GAP;

    c = renderer.subTitle(c, 'Detalles');
    c.yPos -= SUB_GAP;
    for (const cr of data.creditos) {
        c = renderer.creditCard(c, cr);
    }
    c.yPos -= SECTION_GAP;

    const tc1 = MARGINS.left + 12;
    const tc2 = MARGINS.left + 160;
    const tc3 = c.W - MARGINS.right - 180;
    const tc4 = c.W - MARGINS.right - 80;

    c = renderer.subTitle(c, 'Tarjetas');
    c = renderer.drawTable(c,
        [
            { text: 'Número de tarjeta', x: tc1 }, { text: 'Producto', x: tc2 },
            { text: 'Cupo asignado', x: tc3 }, { text: 'Cupo disponible', x: tc4 },
        ],
        data.tarjetas.map(r => [
            { text: r.numero, x: tc1 }, { text: r.producto, x: tc2 },
            { text: fmt(r.cupoAsignado), x: tc3 }, { text: fmt(r.cupoDisponible), x: tc4 },
        ]),
    );
    c.yPos -= SECTION_GAP * 1.5;

    c = renderer.ensure(c, 50);
    const disc = [
        'Si presenta inquietudes, quejas o reclamos con el presente estado de cuenta, por favor realizar la radicación de sus solicitudes en la Oficina Virtual',
        'mediante la opción "Mis PQRS" que se encuentra en el menú. Estas solicitudes recibirán respuesta en un plazo máximo de 15 días hábiles,',
        'posterior a su radicación.',
    ];
    disc.forEach(l => {
        c.page.drawText(l, { x: MARGINS.left, y: c.yPos, size: 7, color: renderer.colors.info });
        c.yPos -= 11;
    });

    renderer.footer(c);
    return pdf.save();
}
