import type { PDF } from '@libpdf/core';
import { MARGINS } from './config';
import type { Ctx, ColorPalette, EmbeddedImage, Renderer } from './types';

export function newPage(pdf: PDF, n: number, logo: EmbeddedImage): Ctx {
    const page = pdf.addPage({ size: 'a4' });
    return { pdf, page, pageNum: n, logo, W: page.width, H: page.height, yPos: page.height - MARGINS.top };
}

export function fits(c: Ctx, h: number): boolean {
    return c.yPos - h >= MARGINS.bottom;
}

export function fmt(v: number): string {
    return `$ ${v.toLocaleString('es-CO')}`;
}

export function createBaseRenderer(
    colors: ColorPalette,
): Omit<Renderer, 'drawTable' | 'creditCard'> {
    function footer(c: Ctx): void {
        c.page.drawText(`Página ${c.pageNum}`, {
            x: MARGINS.left, y: 30, size: 7, color: colors.footer,
        });
        c.page.drawText('Generado el 19/02/2026', {
            x: c.W - MARGINS.right - 100, y: 30, size: 7, color: colors.footer,
        });
    }

    function ensure(c: Ctx, h: number): Ctx {
        if (!fits(c, h)) {
            footer(c);
            return newPage(c.pdf, c.pageNum + 1, c.logo);
        }
        return c;
    }

    function mainTitle(c: Ctx, text: string): Ctx {
        c = ensure(c, 40);
        c.page.drawText(text, { x: MARGINS.left, y: c.yPos, size: 11, color: colors.section });
        c.yPos -= 22;
        return c;
    }

    function subTitle(c: Ctx, text: string): Ctx {
        c = ensure(c, 40);
        c.page.drawText(text, { x: MARGINS.left, y: c.yPos, size: 9.5, color: colors.title });
        c.yPos -= 16;
        return c;
    }

    return { colors, footer, ensure, mainTitle, subTitle };
}
