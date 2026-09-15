import { crearCrudService } from "../CrudService/CrudService";
import { PARTES_ESPECIALISTA_MOCK } from "../../mocks/partesEspecialistaMock/partesEspecialistaMock";
import type { ParteEspecialista } from "../../types/ParteEspecialista/ParteEspecialista";

export const parteEspecialistaService = crearCrudService<ParteEspecialista>('partes_especialista', PARTES_ESPECIALISTA_MOCK, 'PES');
