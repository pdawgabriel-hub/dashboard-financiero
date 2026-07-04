import { crearCrudService } from "../CrudService/CrudService";
import { INGRESOS_MOCK } from "../../mocks/ingresoMock/ingresoMock";
import type { Ingreso } from "../../types/Ingreso/Ingreso";

export const ingresoService = crearCrudService<Ingreso>('ingresos', INGRESOS_MOCK, 'INGR');