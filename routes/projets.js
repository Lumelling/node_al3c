const express = require('express');

const router = express.Router();

const projetController = require('../controllers/projets');

const moment = require('moment');

router.get('', function (req, res, next) {
        let projets = projetController.recupererProjet();
        return res.status(200).json(projets);
});

router.get('/:id', function (req, res, next) {
        let projet = projetController.recupererProjet(req.params.id);
        return res.status(200).json(projet);
});

/**
 * Inscription d'un nouveau projet
 */
router.post('', function (req, res, next) {

        if (!req.body) {
                return res.status(400).send('Erreur 400 : Corps de requête non existant');
        }

        if (!req.body.name) {
                return res.status(400).send('Erreur 400 : Paramètre name manquant');
        }

        projetController.ajouterProjet(
            req.body.name,
            req.body.banner,
            req.body.icon,
            req.body.tags,
            req.body.abstract,
            req.body.presented_by,
            req.body.about_project,
            req.body.innovation,
            req.body.realisation,
            req.body.facebook,
            req.body.linkedin,
            req.body.instagram,
            req.body.twitter,
            req.body.youtube,
            req.body.website);

        return res.status(201).json({'message': 'Projet ajouté'});

});

module.exports = router;
