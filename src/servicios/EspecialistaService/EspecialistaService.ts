import { crearCrudService } from "../CrudService/CrudService";
import { ESPECIALISTAS_MOCK } from "../../mocks/especialistasMock/especialistasMock";
import type { Especialista } from "../../types/Especialista/Especialista";

export const especialistaService = crearCrudService<Especialista>('especialistas', ESPECIALISTAS_MOCK, 'ESP');