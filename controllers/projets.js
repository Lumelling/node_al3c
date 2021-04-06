const moment = require('moment');
const fs = require('fs');
const path = 'config/projets.json';
module.exports = {
    ajouterProjet,
    recupererProjet
};

function writeInJson(projet) {

    if (!fs.existsSync(path)) {
        // pas de fichier
        let projets = {};
        projets[projet.name] = projet;
        let jsonContent = JSON.stringify(projets);
        fs.writeFileSync(path, jsonContent, 'utf8');
    } else {
        // deja un fichier
        const JSONdata = fs.readFileSync(path);
        let projets = JSON.parse(JSONdata);
        projets[projet.name] = projet;
        let jsonContent = JSON.stringify(projets);
        fs.writeFileSync(path, jsonContent, 'utf8');
    }

}

function recupererProjet(projet) {
    if (projet) {
        // on récupère qu'un seul projet
        const JSONdata = fs.readFileSync(path);
        return JSON.parse(JSONdata)[projet];

    } else {
        // on récupère tous les projets
        const JSONdata = fs.readFileSync(path);
        return JSON.parse(JSONdata);

    }
}

function ajouterProjet(name, banner, icon, tags, slogan, abstract, presented_by, about_project, innovation, realisation, facebook, linkedin, instagram, twitter, youtube, website) {

    let projet = {};
    projet.name = name;
    projet.banner = banner;
    projet.icon = icon;
    projet.tags = tags;
    projet.slogan = slogan;
    projet.abstract = abstract;
    projet.presented_by = presented_by;
    projet.about_project = about_project;
    projet.innovation = innovation;
    projet.realisation = realisation;
    projet.facebook = facebook;
    projet.linkedin = linkedin;
    projet.instagram = instagram;
    projet.twitter = twitter;
    projet.youtube = youtube;
    projet.website = website;
    writeInJson(projet);

    return projet;
}
