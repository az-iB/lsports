import Joi from 'joi'
import { Router } from 'express'

import { validate } from '../middlewares'

import _events from "../controllers/event";

const router = new Router()

_events(router);

export default router