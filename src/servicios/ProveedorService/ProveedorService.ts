import { crearCrudService } from "../CrudService/CrudService";
import { PROVEEDORES_MOCK } from "../../mocks/proveedoresMock/proveedoresMock";
import type { Proveedor } from "../../types/Proveedor/Proveedor";

export const proveedorService = crearCrudService<Proveedor>('proveedores', PROVEEDORES_MOCK, 'PROV');