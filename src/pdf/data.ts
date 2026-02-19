import type { EstadoCuentaData } from './types';

function rInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rCur(min: number, max: number): number {
    return rInt(min, max);
}

function pick<T>(a: T[]): T {
    return a[Math.floor(Math.random() * a.length)];
}

export function generateData(): EstadoCuentaData {
    const nombres = [
        'GABRIEL ANDRÉS SALINAS VILLA', 'ERIKA ANDREA NAVARRO VILLA',
        'SEBASTIAN CALDERON NAVARRO', 'SOFÍA CALDERÓN NAVARRO',
        'CARLOS ALBERTO GÓMEZ RUIZ', 'MARIA FERNANDA LÓPEZ DÍAZ',
        'ANDRÉS FELIPE MARTÍNEZ SOTO', 'LAURA VALENTINA HERRERA PEÑA',
        'JUAN PABLO RÍOS QUINTERO', 'CAMILA ANDREA OSPINA VÉLEZ',
    ];
    const concAhorro = [
        'AHORRO PROGRAMADO NUEVO', 'SUBSIDIO FAMILIAR', 'EDUCACION',
        'EDUCACION NUEVO', 'AHORRO NAVIDEÑO', 'VACACIONES',
        'FONDO DE EMERGENCIA', 'AHORRO VIVIENDA', 'SALUD BIENESTAR',
    ];
    const concCredito = [
        'COMPRA DE BIENES Y SERVICIOS - POLIZA DE HOGAR',
        'CREDI-APORTES - GASTOS PERSONALES',
        'LIBRE INVERSIÓN - REMODELACIÓN',
        'CRÉDITO EDUCATIVO - POSGRADO',
        'CRÉDITO DE VIVIENDA - CUOTA INICIAL',
        'CREDI-APORTES - CONSOLIDACIÓN DEUDAS',
        'LIBRE INVERSIÓN - VEHÍCULO',
    ];
    const periodicidades = ['Mensual', 'Quincenal', 'Trimestral'];
    const tasas = ['12.00 % NAMV', '19.26 % NAMV', '14.50 % NAMV', '16.80 % NAMV', '11.00 % NAMV'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    return {
        cliente: { nombre: 'ERIKA NAVARRO', documento: '31573393', fechaImpresion: '13/Feb/2026 11:05 am' },
        cuentasAhorro: Array.from({ length: rInt(6, 8) }, (_, i) => ({
            referencia: `01300${rInt(1000000, 9999999)}`,
            concepto: nombres[i % nombres.length],
            saldo: rCur(1, 5000000),
        })),
        aportes: Array.from({ length: rInt(2, 4) }, (_, i) => ({
            referencia: `${200 + i}-31573393`,
            concepto: i === 0 ? 'APORTES SOCIALES' : i === 1 ? 'AHORRO PERMANENTE' : `APORTE EXTRA ${i}`,
            saldo: rCur(500000, 15000000),
        })),
        ahorrosProgramados: Array.from({ length: rInt(6, 8) }, (_, i) => ({
            referencia: `${pick(['ED1', 'ED3', '211', '1'])}-${rInt(100000000, 999999999)}`,
            concepto: concAhorro[i % concAhorro.length],
            saldo: rCur(0, 3000000),
        })),
        cdats: Array.from({ length: rInt(5, 7) }, () => ({
            referencia: `90-${rInt(100000000, 999999999)}`,
            concepto: 'CDAT',
            saldo: rCur(1000000, 100000000),
        })),
        compromisosAhorro: Array.from({ length: rInt(3, 5) }, (_, i) => ({
            concepto: i === 0 ? 'CUOTA DE APORTES SOCIALES' : `COMPROMISO ${concAhorro[i % concAhorro.length]}`,
            compromiso: i === 0 ? '2.25% de sus ingresos' : `${rInt(50, 500)}.000 mensual`,
            fechaPago: 'Inmediato',
            proximoPago: 'Inmediato',
        })),
        creditos: Array.from({ length: rInt(3, 5) }, (_, i) => {
            const tot = pick([12, 24, 36, 48, 60]);
            return {
                referencia: `10-${rInt(100000000, 999999999)}`,
                concepto: concCredito[i % concCredito.length],
                fechaProximoVencimiento: 'Inmediato',
                valorProximoVencimiento: rCur(20000, 500000),
                fechaPrestamo: `${String(rInt(1, 28)).padStart(2, '0')}/${pick(meses)}/${rInt(2022, 2025)}`,
                montoSolicitado: rCur(500000, 10000000),
                saldoCancelacion: rCur(20000, 5000000),
                valorColocarseAlDia: rCur(20000, 500000),
                cuotasPendientes: `${rInt(2, tot)} / ${tot}`,
                periodicidad: pick(periodicidades),
                tasa: pick(tasas),
            };
        }),
        tarjetas: Array.from({ length: rInt(1, 3) }, () => {
            const cupo = rCur(1000000, 10000000);
            return {
                numero: `XXXX - XXXX - XXXX - ${String(rInt(100, 9999)).padStart(4, '0')}`,
                producto: pick(['TARJETA - COOPCENTRAL', 'TARJETA - VISA CLASICA', 'TARJETA - MASTERCARD']),
                cupoAsignado: cupo,
                cupoDisponible: rCur(0, cupo),
            };
        }),
    };
}
