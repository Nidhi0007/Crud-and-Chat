import { Request, Response } from "express";
import { IResource } from "../interface/resource.interface";
import resourcesModel from "../models/resources.model";
import { io, redisClient } from "../..";

//  add resource
const addResource = async (req: Request, res: Response) => {
  try {
    const findResource = await resourcesModel.findOne({ name: req.body.name });
    if (findResource) {
      throw new Error(`Resource ${req.body.name} is already registered`);
    }
    const page = req.query.page;
    const cacheKey = `pagination:${page}`;
    const data: IResource = req.body;
    const resource = new resourcesModel(data);
    const saveResource = await resource.save();

    if (saveResource) {
      await redisClient.del(cacheKey);
    }
    return res.json({
      message: "Resource successfully Created",
      resource: saveResource,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// get all resource
const getResource = async (req: Request, res: Response) => {
  try {
    let page: number = Number(req.query.page) ? Number(req.query.page) : 1;
    const cacheKey = `pagination:${page}`;
    let findResources: any = [];
    let count = 0;
    let limit = 5;
    let cacheData = await redisClient.get(cacheKey);
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      findResources = parsedData.findResources;
      count = parsedData.count;
    } else {
      findResources = await resourcesModel
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ name: 1 })
        .exec();
      count = await resourcesModel.count();
      let result = { findResources: [], count: count };
      if (findResources.length) {
        result.count = count;
        result.findResources = findResources;
        redisClient.set(cacheKey, JSON.stringify(result));
      }
    }
    return res.send({
      resources: findResources,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// update resource
const updateResource = async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    const cacheKey = `pagination:${page}`;
    const id = req.params.id;
    const data = req.body;
    const findResource = await resourcesModel.findOne({ name: req.body.name });
    if (findResource && findResource.id !== req.params.id) {
      throw new Error(`Resource ${req.body.name} is already registered`);
    }
    await resourcesModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
      }
    );
    await redisClient.del(cacheKey);
    return res.json({ message: "Resource successfully updated" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

//  remove resources
const removeResource = async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    const cacheKey = `pagination:${page}`;
    const id = req.params.id;
    await resourcesModel.findByIdAndDelete(id);
    await redisClient.del(cacheKey);
    return res.send({ message: "Resource successfully deleted" });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

export default {
  addResource,
  getResource,
  updateResource,
  removeResource,
};
