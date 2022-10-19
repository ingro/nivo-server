import { Router } from 'express'
import * as uuid from 'uuid'
import { forOwn } from 'lodash'
import { chartsMapping, ChartType, renderChart, samples } from '@nivo/static'
import fs from 'fs';
import { validate } from './validation'
import * as storage from './memory-storage'

export const nivo = Router()

nivo.get('/', (req, res) => {
    res.status(200).json({
        samples: Object.keys(samples).map(sample => {
            return `${req.protocol}://${req.get('host')}${req.originalUrl}/samples/${sample}.svg`
        }),
    })
})

// @ts-ignore
forOwn(chartsMapping, ({ schema }, type: ChartType) => {
    nivo.post(`/charts/${type}`, validate(schema), (req, res) => {
        // @ts-ignore
        const props = req.payload
        const id = uuid.v4()
        const url = `${req.protocol}://${req.get('host')}/nivo/r/${id}.svg`

        // console.log(props);

        storage.set(id, {
            type,
            props: props.value,
            url,
        })

        res.status(201).json({ id, url })
    })
})

nivo.get('/r/:id.svg', (req, res) => {
    const { id } = req.params

    const config = storage.get(req.params.id)
    
    // @ts-ignore
    // console.log(config.props.value.data);

    if (!config) {
        return res
            .set('Content-Type', 'text/plain')
            .status(404)
            .send(`no chart found for id "${id}"`)
    }

    const filePath = `static/${id}.svg`;

    if (fs.existsSync(filePath)) {
        console.log('Ritorno file gia generato');

        const file = fs.readFileSync(filePath);

        res.set('Content-Type', 'image/svg+xml').status(200).send(file);

        return;
    }

    console.log('Genero il file...');

    // @ts-ignore
    const rendered = renderChart(config, req.query)

    fs.writeFileSync(filePath, rendered);

    res.set('Content-Type', 'image/svg+xml').status(200).send(rendered)
})

forOwn(samples, (config, id) => {
    nivo.get(`/samples/${id}.svg`, (req, res) => {
        // @ts-ignore
        const rendered = renderChart(config, req.query)

        res.set('Content-Type', 'image/svg+xml').status(200).send(rendered)
    })
})