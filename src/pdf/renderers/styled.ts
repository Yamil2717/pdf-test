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
    border: rgb(0.82, 0.82, 0.82),
    line: rgb(0.91, 0.91, 0.91),
    footer: rgb(0.5, 0.5, 0.5),
    label: rgb(0.4, 0.4, 0.4),
    cardBorder: rgb(0.85, 0.85, 0.85),
};

const FIELD_BG = rgb(0.969, 0.969, 0.969);

export function createStyledRenderer(): Renderer {
    const base = createBaseRenderer(COLORS);

    function drawTable(c: Ctx, headers: Col[], rows: Col[][]): Ctx {
        const tw = c.W - MARGINS.left - MARGINS.right;
        c = base.ensure(c, ROW_H * 2 + 20);

        let borderPage = c.page;
        let borderTopY = c.yPos + 12;

        function headerRow(): void {
            c.yPos -= 8;
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
                thickness: 0.8, color: COLORS.border,
            });
            c.yPos -= ROW_H - 10;
        }

        function closeBorder(): void {
            borderPage.drawRectangle({
                x: MARGINS.left, y: c.yPos,
                width: tw, height: borderTopY - c.yPos,
                borderColor: COLORS.border, borderWidth: 1, cornerRadius: 4,
            });
        }

        headerRow();
        let firstAfterHeader = true;

        for (let i = 0; i < rows.length; i++) {
            if (!fits(c, ROW_H + 10)) {
                closeBorder();
                base.footer(c);
                c = newPage(c.pdf, c.pageNum + 1, c.logo);
                borderPage = c.page;
                borderTopY = c.yPos + 12;
                headerRow();
                firstAfterHeader = true;
            }

            if (!firstAfterHeader) {
                c.page.drawLine({
                    start: { x: MARGINS.left + 4, y: c.yPos + ROW_H - 6 },
                    end: { x: MARGINS.left + tw - 4, y: c.yPos + ROW_H - 6 },
                    thickness: 0.3, color: COLORS.line,
                });
            }
            firstAfterHeader = false;

            rows[i].forEach(cell => {
                c.page.drawText(cell.text, { x: cell.x, y: c.yPos + 4, size: 8, color: COLORS.body });
            });
            c.yPos -= ROW_H;
        }

        c.yPos -= 4;
        closeBorder();
        return c;
    }

    function creditCard(c: Ctx, cr: CreditoData): Ctx {
        const cw = c.W - MARGINS.left - MARGINS.right;
        const fieldH = 18;
        const fieldGap = 6;
        const rh = fieldH + fieldGap;
        const numRows = 4;
        const titleH = 36;
        const cardPadX = 14;
        const cardPadTop = 14;
        const cardPadBot = 12;
        const fieldsH = numRows * rh - fieldGap;
        const cardH = cardPadTop + titleH + fieldsH + cardPadBot;

        c = base.ensure(c, cardH + 20);

        const cardTopY = c.yPos + 6;
        const cardBotY = cardTopY - cardH;

        const colGap = 10;
        const colW = (cw - cardPadX * 2 - colGap) / 2;
        const lx = MARGINS.left + cardPadX;
        const rx = lx + colW + colGap;

        c.page.drawRectangle({
            x: MARGINS.left, y: cardBotY,
            width: cw, height: cardH,
            borderColor: COLORS.cardBorder, borderWidth: 1, cornerRadius: 4,
        });

        const titleText = `${cr.referencia} - ${cr.concepto}`;
        const titleY = cardTopY - cardPadTop - 10;
        c.page.drawText(titleText.length > 65 ? titleText.substring(0, 62) + '...' : titleText, {
            x: lx, y: titleY, size: 8.5, color: COLORS.title,
        });

        const fieldsTopY = titleY - titleH + 10;
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

        let y = fieldsTopY;
        leftF.forEach(([l, v]) => {
            c.page.drawRectangle({
                x: lx, y: y - 4, width: colW, height: fieldH,
                color: FIELD_BG, cornerRadius: 4,
            });
            c.page.drawText(l, { x: lx + 6, y: y + 2, size: 7.5, color: COLORS.label });
            c.page.drawText(v, { x: lx + colW - 6 - v.length * 4.2, y: y + 2, size: 8, color: COLORS.body });
            y -= rh;
        });

        y = fieldsTopY;
        rightF.forEach(([l, v]) => {
            c.page.drawRectangle({
                x: rx, y: y - 4, width: colW, height: fieldH,
                color: FIELD_BG, cornerRadius: 4,
            });
            c.page.drawText(l, { x: rx + 6, y: y + 2, size: 7.5, color: COLORS.label });
            c.page.drawText(v, { x: rx + colW - 6 - v.length * 4.2, y: y + 2, size: 8, color: COLORS.body });
            y -= rh;
        });

        c.yPos = cardBotY - 16;
        return c;
    }

    return { ...base, drawTable, creditCard };
}
