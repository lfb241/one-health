import { IEntityDTO } from "../models/entity-dto";

export const getObjectsOfType = (data: IEntityDTO[], type: string) => {
    return data.filter(e => e.type == type);
}