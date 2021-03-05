const path = require('path')
const express = require('express')
const xss = require('xss')
const foldersService = require('./folders-service.js')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folders => ({
    id: folders.id,
    name: xss(folders.name)
})

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        foldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name } = req.body
        const newFolder = { name }

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })
            }
        }
        newFolder.name = name;

        foldersService.insertFolder(
            req.app.get('db'),
            newFolder
        )

            .then(folders => {
                res
                    .status(201)
                    .json(serializeFolder(folders))
            })
            .catch(next)
    })

module.exports = foldersRouter