import { Request, Response } from 'express';
import errorHandler from '../Utility/errorHandler.js';
import CarService from './CarService.js';
import { Car } from '@prisma/client';

export default class CarController {
    constructor() {}

    public async getAllCarsExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue } =
            request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize)
                throw new Error('Queries missing');

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
            };

            const carService = new CarService();
            const result = await carService.getAllCars(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getCarByIdExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;

        try {
            if (!id) throw new Error('Id missing');

            const carService = new CarService();
            const result: Car | null = await carService.getCarById(
                parseInt(id)
            );
            if (!result) throw new Error('Car not found');

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async createCarExecuter(
        request: Request<ReqParams, {}, NewCar, ReqQuery>,
        response: Response
    ) {
        const {
            registrationNumber,
            vinNumber,
            model,
            brand,
            modelVariant,
            customerId,
            firstRegistration,
            mileage,
            lastInspectionDate,
            lastInspectionKind,
            lastInspectionResult,
        } = request.body;

        try {
            if (
                !registrationNumber ||
                !vinNumber ||
                !model ||
                !brand ||
                !modelVariant ||
                !customerId ||
                !firstRegistration ||
                !mileage ||
                !lastInspectionDate ||
                !lastInspectionKind ||
                !lastInspectionResult
            )
                throw new Error('Missing data');

            const newCar: NewCar = {
                registrationNumber,
                vinNumber,
                model,
                brand,
                modelVariant,
                customerId,
                firstRegistration,
                mileage,
                lastInspectionDate,
                lastInspectionKind,
                lastInspectionResult,
            };
            const carService = new CarService();
            const result: Car = await carService.createCar(newCar);

            response.status(201).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateMilageOnCarExecuter(
        // TODO: vær sikker på hvorvidt Id skal med i updatedCar objektet
        request: Request<ReqParams, {}, UpdatedCar, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;
        const {
            registrationNumber,
            vinNumber,
            model,
            brand,
            modelVariant,
            customerId,
            firstRegistration,
            mileage,
            lastInspectionDate,
            lastInspectionKind,
            lastInspectionResult,
        } = request.body;

        try {
            if (
                !id ||
                !registrationNumber ||
                !vinNumber ||
                !model ||
                !brand ||
                !modelVariant ||
                !customerId ||
                !firstRegistration ||
                !mileage ||
                !lastInspectionDate ||
                !lastInspectionKind ||
                !lastInspectionResult
            )
                throw new Error('Missing data');

            const updatedCar: UpdatedCar = {
                ...request.body,
            };
            const carService = new CarService();
            const result: Car = await carService.updateCar(
                parseInt(id),
                updatedCar
            );

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async deleteCarExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;

        try {
            if (!id) throw new Error('Id missing');

            const carService = new CarService();
            const result = await carService.deleteCar(parseInt(id));
            if (!result) throw new Error('Car not found');
            response
                .status(200)
                .json({ message: `Car with id: ${id} deleted` });
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
