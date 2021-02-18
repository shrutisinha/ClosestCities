import express from 'express';
import { filterCities, findClosestCities, getCities, getCity } from '../../services/cities';
import { ICity } from '../../utils/types';

const router = express.Router();

router.get('/cities', async function (req, res, next) {
    try {
        const data: any = await getCities();
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

router.get('/city/:id', async function (req, res, next) {
    try {
        const data: ICity = await getCity(req.params);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

router.get(['/search/','/search/:name'], async function (req, res, next) {
    try {
        const data: ICity[] = await filterCities(req.params, req.body);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

router.get('/neighbours/:id', async function (req, res, next) {
    try {
        const data: ICity[] = await findClosestCities(req.params);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

export default router;
