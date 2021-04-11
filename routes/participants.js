const express = require('express');

const router = express.Router();

const participantController = require('../controllers/participants');

const moment = require('moment');

router.get('', function (req, res, next) {
    let participants = participantController.recupererParticipants();
    return res.status(200).json(participants);
});

/**
 * Inscription d'un nouveau projet
 */
router.post('', function (req, res, next) {

    if (!req.body) {
        return res.status(400).send('Erreur 400 : Corps de requête non existant');
    }

    if (!req.body.email) {
        return res.status(400).send('Erreur 400 : Paramètre email manquant');
    }
    participantController.ajouterParticipant(
        req.body.email,
        req.body.entreprise,
        req.body.isMiagiste,
        req.body.niveau,
        req.body.nom,
        req.body.prenom,
        req.body.participation_conference,
        req.body.participation_repas,
        req.body.participation_stands,
        req.body.poste,
        req.body.statut,
        req.body.tel,
        req.body.universitaire,
        req.body.adressePro,
        req.body.villePro,
        req.body.accompagner_email);

    return res.status(201).json({'message': 'Participant ajouté'});

});

module.exports = router;
