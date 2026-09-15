import { crearCrudService } from "../CrudService/CrudService";
import { PARTES_PROVEEDOR_MOCK } from "../../mocks/partesProveedorMock/partesProveedorMock";
import type { ParteProveedor } from "../../types/ParteProveedor/ParteProveedor";

export const parteProveedorService = crearCrudService<ParteProveedor>('partes_proveedor', PARTES_PROVEEDOR_MOCK, 'PPR');
