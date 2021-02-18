import express from 'express';
import { filterCities, findClosestCities, getCities, getCity } from '../../services/cities';

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

router.get('/city/:name', async function (req, res, next) {
    try {
        const data: any = await getCity(req.params);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

router.get('/search/:name', async function (req, res, next) {
    try {
        const data: any = await filterCities(req.params);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

router.get('/neighbours/:name', async function (req, res, next) {
    try {
        const data: any = await findClosestCities(req.params);
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
        next();
    }
});

export default router;
