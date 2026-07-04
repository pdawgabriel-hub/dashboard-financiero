import { crearCrudService } from "../CrudService/CrudService";
import { OBRAS_MOCK } from "../../mocks/obrasMock/obrasMock";
import type { Obra } from "../../types/Obra/Obra";

export const obraService = crearCrudService<Obra>('obras', OBRAS_MOCK, 'OBRA');