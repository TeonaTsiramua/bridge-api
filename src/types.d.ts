import { ResourceOptions } from "adminjs";
import { Request, Response } from "express";
import { Model } from "mongoose";

type AdminResource = {
    resource: Model<any>;
    options: ResourceOptions;
};