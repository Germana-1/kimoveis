import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedules/createSchedule.service";
import listPropertySchedulesService from "../services/schedules/listPropertySchedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const scheduleData: IScheduleRequest = req.body;
  const userId: string = req.user.id;
  const newSchedule = await createScheduleService(scheduleData, userId);

  return res.status(201).json(newSchedule);
};

const listPropertySchedulesController = async (req: Request, res: Response) => {
  const propertyId: string = req.params.id;
  const list = await listPropertySchedulesService(propertyId);

  return res.json(list);
};

export { createScheduleController, listPropertySchedulesController };
