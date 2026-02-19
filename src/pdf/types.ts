import { PDF, rgb } from '@libpdf/core';

export type Color = ReturnType<typeof rgb>;
export type Page = ReturnType<PDF['addPage']>;
export type EmbeddedImage = ReturnType<PDF['embedPng']>;

export interface Ctx {
    pdf: PDF;
    page: Page;
    yPos: number;
    pageNum: number;
    W: number;
    H: number;
    logo: EmbeddedImage;
}

export interface Col {
    text: string;
    x: number;
}

export interface ColorPalette {
    title: Color;
    info: Color;
    section: Color;
    header: Color;
    body: Color;
    border: Color;
    line: Color;
    footer: Color;
    label: Color;
    cardBorder: Color;
}

export interface CreditoData {
    referencia: string;
    concepto: string;
    fechaProximoVencimiento: string;
    valorProximoVencimiento: number;
    fechaPrestamo: string;
    montoSolicitado: number;
    saldoCancelacion: number;
    valorColocarseAlDia: number;
    cuotasPendientes: string;
    periodicidad: string;
    tasa: string;
}

export interface EstadoCuentaData {
    cliente: {
        nombre: string;
        documento: string;
        fechaImpresion: string;
    };
    cuentasAhorro: { referencia: string; concepto: string; saldo: number }[];
    aportes: { referencia: string; concepto: string; saldo: number }[];
    ahorrosProgramados: { referencia: string; concepto: string; saldo: number }[];
    cdats: { referencia: string; concepto: string; saldo: number }[];
    compromisosAhorro: {
        concepto: string;
        compromiso: string;
        fechaPago: string;
        proximoPago: string;
    }[];
    creditos: CreditoData[];
    tarjetas: {
        numero: string;
        producto: string;
        cupoAsignado: number;
        cupoDisponible: number;
    }[];
}

export interface Renderer {
    colors: ColorPalette;
    footer(c: Ctx): void;
    ensure(c: Ctx, h: number): Ctx;
    mainTitle(c: Ctx, text: string): Ctx;
    subTitle(c: Ctx, text: string): Ctx;
    drawTable(c: Ctx, headers: Col[], rows: Col[][]): Ctx;
    creditCard(c: Ctx, credit: CreditoData): Ctx;
}
