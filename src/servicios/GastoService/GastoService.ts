import { crearCrudService } from "../CrudService/CrudService";
import { GASTOS_MOCK } from "../../mocks/gastosMock/gastosMock";
import type { Gasto } from "../../types/Gasto/Gasto";

export const gastoService = crearCrudService<Gasto>('gastos', GASTOS_MOCK, 'GAST');