import { Request, Response } from "express"
import { IResource } from "../interface/resource.interface"
import resourcesModel from "../models/resources.model"
import { redisClient } from "../.."
const addResource = async (req: Request, res: Response) => {
    try {
        const page = req.query.page
        const cacheKey = `pagination:${page}`;
        const data: IResource = req.body
        const resource = new resourcesModel(data)
        const saveResource = await resource.save()
        if (saveResource) {
            await redisClient.del(cacheKey)
        }
        return res.json({ message: "Resource successfully Created", resource: saveResource })
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}
const getResource = async (req: Request, res: Response) => {
    try {
        let page: number = Number(req.query.page) ? Number(req.query.page) : 1
        const cacheKey = `pagination:${page}`;
        let findResources: any = [];
        let limit = 5;
        let cacheData = await redisClient.get(cacheKey);
        if (cacheData) {
            const parsedData = JSON.parse(cacheData);
            findResources = parsedData;

        } else {
            findResources = await resourcesModel.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            redisClient.set(cacheKey, JSON.stringify(findResources));
        }
        const count = await resourcesModel.count();
        return res.send({
            resources: findResources,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        return res.status(401).json({ message: error });
    }

}
const updateResource = async (req: Request, res: Response) => {
    try {
        const page = req.query.page
        const cacheKey = `pagination:${page}`;
        const id = req.params.id
        const data = req.body
        await resourcesModel.findOneAndUpdate({ _id: id }, {
            ...data
        })
        await redisClient.del(cacheKey)
        return res.send({ message: "Resource successfully updated" })
    } catch (error) {
        return res.status(401).json({ message: error });
    }


}
const removeResource = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await resourcesModel.deleteOne({ _id: id })
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