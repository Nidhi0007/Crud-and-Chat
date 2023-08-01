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
const getResource = async (req: Request, res: Response) => {
    try {
        const findResources = await resourcesModel.find()
        return res.send(findResources)
    } catch (error) {
        return res.status(401).json({ message: error });
    }

}
const updateResource = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body
        const updatedResource = await resourcesModel.findOneAndUpdate({ id: id }, {
            name: data.name,
            description: data.description
        }, {
            new: true
        })
        return res.send({ message: "Resource successfully updated", resource: updatedResource })
    } catch (error) {
        return res.status(401).json({ message: error });
    }


}
const removeResource = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await resourcesModel.deleteOne({ id: id })
        return res.send({ message: "Resource successfully deleted" })
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}
export default {
    addResource,
    getResource,
    updateResource,
    removeResource,
}