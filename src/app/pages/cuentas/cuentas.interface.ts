export interface Cuentas {
    id:                  number;
    acreedor:            string;
    concepto:            string;
    ddm:                 number;
    ddg:                 number;
    saldoCapital:        number;
    interesPunitorio:    number;
    interesMoratorio:    number;
    gastosCobranza:      number;
    fechaUltimoPago:     Date;
    ultimoContacto:      Date;
    fechaProximaGestion: Date;
    tipoGestion:         number;
    deudor:              number;
}