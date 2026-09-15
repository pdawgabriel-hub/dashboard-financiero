import { crearCrudService } from "../CrudService/CrudService";
import { PARTES_TRABAJO_MOCK } from "../../mocks/partesTrabajoMock/partesTrabajoMock";
import type { ParteTrabajo, ParteTrabajoInput, ParteTrabajoLinea, ParteTrabajoLineaInput } from "../../types/ParteTrabajo/ParteTrabajo";

const crud = crearCrudService<ParteTrabajo>('partes_trabajo', PARTES_TRABAJO_MOCK, 'PRT');

// Equivalente a _compute_subtotal de gestion.partes.trabajo.linea
function calcularLineas(lineas: ParteTrabajoLineaInput[]): ParteTrabajoLinea[] {
  return lineas.map((l) => ({
    ...l,
    coste_subtotal: Math.round((l.horas || 0) * (l.coste_hora || 0) * 100) / 100,
  }));
}

// Equivalente a _compute_totales de gestion.partes.trabajo
function calcularTotales(lineas: ParteTrabajoLinea[]) {
  const horas_totales = Math.round(lineas.reduce((suma, l) => suma + (l.horas || 0), 0) * 100) / 100;
  const coste_total_parte = Math.round(lineas.reduce((suma, l) => suma + l.coste_subtotal, 0) * 100) / 100;
  return { horas_totales, coste_total_parte };
}

export const parteTrabajoService = {
  ...crud,
  create(datos: ParteTrabajoInput): ParteTrabajo {
    const lineas = calcularLineas(datos.lineas);
    return crud.create({ ...datos, lineas, ...calcularTotales(lineas) });
  },
  update(id: string, datos: Partial<ParteTrabajoInput>): ParteTrabajo | undefined {
    const actual = crud.getById(id);
    if (!actual) return undefined;

    const lineas = datos.lineas ? calcularLineas(datos.lineas) : actual.lineas;
    return crud.update(id, { ...datos, lineas, ...calcularTotales(lineas) });
  },
};
