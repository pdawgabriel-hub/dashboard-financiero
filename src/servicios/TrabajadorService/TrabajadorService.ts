// Servicio para gestionar las operaciones del Crud Service
import { crearCrudService } from "../CrudService/CrudService";
import { TRABAJADORES_MOCK } from "../../mocks/trabajadoresMock/trabajadoresMock";
import type { Trabajador } from "../../types/Trabajador/Trabajador";

export const trabajadorService = crearCrudService<Trabajador>('trabajadores', TRABAJADORES_MOCK, 'TRAB')