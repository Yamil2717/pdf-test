import { rgb } from '@libpdf/core';
import { MARGINS, ROW_H } from '../config';
import { createBaseRenderer, fits, fmt, newPage } from '../core';
import type { Ctx, Col, CreditoData, Renderer } from '../types';

const COLORS = {
    title: rgb(0.2, 0.2, 0.2),
    info: rgb(0.4, 0.4, 0.4),
    section: rgb(0.0, 0.35, 0.75),
    header: rgb(0.35, 0.35, 0.35),
    body: rgb(0.15, 0.15, 0.15),
    border: rgb(0.85, 0.85, 0.85),
    line: rgb(0.85, 0.85, 0.85),
    footer: rgb(0.5, 0.5, 0.5),
    label: rgb(0.4, 0.4, 0.4),
    cardBorder: rgb(0.85, 0.85, 0.85),
};

export function createStructureRenderer(): Renderer {
    const base = createBaseRenderer(COLORS);

    function drawTable(c: Ctx, headers: Col[], rows: Col[][]): Ctx {
        const tw = c.W - MARGINS.left - MARGINS.right;
        c = base.ensure(c, ROW_H * 2 + 20);

        function headerRow(): void {
            let maxLines = 1;
            headers.forEach(h => {
                const lines = h.text.split('\n');
                if (lines.length > maxLines) maxLines = lines.length;
                lines.forEach((line, idx) => {
                    c.page.drawText(line, { x: h.x, y: c.yPos - idx * 10, size: 8, color: COLORS.header });
                });
            });
            c.yPos -= 4 + maxLines * 10;
            c.page.drawLine({
                start: { x: MARGINS.left, y: c.yPos },
                end: { x: MARGINS.left + tw, y: c.yPos },
                thickness: 0.5, color: COLORS.line,
            });
            c.yPos -= ROW_H - 10;
        }

        headerRow();
        let firstAfterHeader = true;

        for (let i = 0; i < rows.length; i++) {
            if (!fits(c, ROW_H + 10)) {
                base.footer(c);
                c = newPage(c.pdf, c.pageNum + 1, c.logo);
                headerRow();
                firstAfterHeader = true;
            }

            if (!firstAfterHeader) {
                c.page.drawLine({
                    start: { x: MARGINS.left, y: c.yPos + ROW_H - 6 },
                    end: { x: MARGINS.left + tw, y: c.yPos + ROW_H - 6 },
                    thickness: 0.3, color: COLORS.line,
                });
            }
            firstAfterHeader = false;

            rows[i].forEach(cell => {
                c.page.drawText(cell.text, { x: cell.x, y: c.yPos + 4, size: 8, color: COLORS.body });
            });
            c.yPos -= ROW_H;
        }

        return c;
    }

    function creditCard(c: Ctx, cr: CreditoData): Ctx {
        const tw = c.W - MARGINS.left - MARGINS.right;
        const rh = 22;
        const numRows = 4;
        const titleH = 30;
        const cardH = titleH + numRows * rh + 10;

        c = base.ensure(c, cardH + 20);

        const lx = MARGINS.left + 15;
        const rx = MARGINS.left + tw / 2 + 10;

        c.page.drawLine({
            start: { x: MARGINS.left, y: c.yPos + 10 },
            end: { x: MARGINS.left + tw, y: c.yPos + 10 },
            thickness: 0.5, color: COLORS.line,
        });

        const titleText = `${cr.referencia} - ${cr.concepto}`;
        c.page.drawText(titleText.length > 70 ? titleText.substring(0, 67) + '...' : titleText, {
            x: MARGINS.left + 12, y: c.yPos - 5, size: 8.5, color: COLORS.title,
        });
        c.yPos -= 22;

        const fy = c.yPos;
        const leftF: [string, string][] = [
            ['Fecha de préstamo:', cr.fechaPrestamo],
            ['Saldo cancelación:', fmt(cr.saldoCancelacion)],
            ['Cuotas pendientes:', cr.cuotasPendientes],
            ['Tasa:', cr.tasa],
        ];
        const rightF: [string, string][] = [
            ['Monto solicitado:', fmt(cr.montoSolicitado)],
            ['Valor para colocarse al día:', fmt(cr.valorColocarseAlDia)],
            ['Periodicidad:', cr.periodicidad],
        ];

        let y = fy;
        leftF.forEach(([l, v]) => {
            c.page.drawText(l, { x: lx, y, size: 7.5, color: COLORS.label });
            c.page.drawText(v, { x: lx + 110, y, size: 8, color: COLORS.body });
            y -= rh;
        });
        y = fy;
        rightF.forEach(([l, v]) => {
            c.page.drawText(l, { x: rx, y, size: 7.5, color: COLORS.label });
            c.page.drawText(v, { x: rx + 145, y, size: 8, color: COLORS.body });
            y -= rh;
        });

        c.yPos = fy - leftF.length * rh - 5;

        c.page.drawLine({
            start: { x: MARGINS.left, y: c.yPos },
            end: { x: MARGINS.left + tw, y: c.yPos },
            thickness: 0.5, color: COLORS.line,
        });

        c.yPos -= 16;
        return c;
    }

    return { ...base, drawTable, creditCard };
}
