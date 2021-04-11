const moment = require('moment');
const fs = require('fs');
const path = 'config/participants.json';
module.exports = {
    ajouterParticipant,
    recupererParticipants
};

function writeInJson(participant) {

    if (!fs.existsSync(path)) {
        // pas de fichier
        let participants = {};
        participants[participant.email] = participant;
        let jsonContent = JSON.stringify(participants);
        fs.writeFileSync(path, jsonContent, 'utf8');
    } else {
        // deja un fichier
        const JSONdata = fs.readFileSync(path);
        let participants = JSON.parse(JSONdata);
        participants[participant.email] = participant;
        let jsonContent = JSON.stringify(participants);
        fs.writeFileSync(path, jsonContent, 'utf8');
    }

}

function recupererParticipants() {
        // on récupère tous les participants
        const JSONdata = fs.readFileSync(path);
        return JSON.parse(JSONdata);
}

function ajouterParticipant(email, entreprise, isMiagiste, niveau, nom, prenom, participation_conference, participation_repas, participation_stands, poste, stand, statut, tel, universitaire, adressePro, villePro, accompagner_email) {

    let participant = {};
    participant.email = email;
    participant.entreprise = entreprise;
    participant.isMiagiste = isMiagiste;
    participant.niveau = niveau;
    participant.nom = nom;
    participant.prenom = prenom;
    participant.participation_conference = participation_conference;
    participant.participation_repas = participation_repas;
    participant.participation_stands = participation_stands;
    participant.poste = poste;
    participant.stand = stand;
    participant.statut = statut;
    participant.tel = tel;
    participant.universitaire = universitaire;
    participant.adressePro = adressePro;
    participant.villePro = villePro;
    participant.accompagner_email = accompagner_email;
    writeInJson(participant);

    return participant;
}
