import { Request, Response } from "express"
import { IResource } from "../interface/resource.interface"
import resourcesModel from "../models/resources.model"

const addResource = async (req: Request, res: Response) => {
    try {
        const data: IResource = req.body
        const resource = new resourcesModel(data)
        const saveResource = resource.save()
        return res.send({ message: "Resource successfully Created", resource: saveResource })
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}
const getResource = async () => {

}
const updateResource = async () => {

}
const removeResource = async () => {

}
export default {
    addResource,
    getResource,
    updateResource,
    removeResource,
}