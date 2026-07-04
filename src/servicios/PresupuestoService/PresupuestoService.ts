import { crearCrudService } from "../CrudService/CrudService";
import { PRESUPUESTOS_MOCK } from "../../mocks/presupuestosMock/presupuestosMock";
import type { Presupuesto } from "../../types/Presupuesto/Presupuesto";

export const presupuestoService = crearCrudService<Presupuesto>('presupuestos', PRESUPUESTOS_MOCK, 'PRES');