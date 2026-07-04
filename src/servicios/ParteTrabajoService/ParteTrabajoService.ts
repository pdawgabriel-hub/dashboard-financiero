import { crearCrudService } from "../CrudService/CrudService";
import { PARTES_TRABAJO_MOCK } from "../../mocks/partesTrabajoMock/partesTrabajoMock";
import type { ParteTrabajo } from "../../types/ParteTrabajo/ParteTrabajo";

export const parteTrabajoService = crearCrudService<ParteTrabajo>('partes_trabajo', PARTES_TRABAJO_MOCK, 'PRT');